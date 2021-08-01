const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const User = require('../models/user');
const activationToken = require('../models/activationToken');
const resetToken = require('../models/resetToken');
const {registrationValidation, loginValidation, EditProfileValidation} = require('../validations/user_validations');

/**
 * DESIGN NOTES:
 *  - maybe better to separate the table of pending registation vs registered accounts
 * 
 */


// TODO: fix email verification service
/* NOTES:
    - storing unactivated list of users can lead to spam. Maybe should delete after X amount of minutes
*/

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user. NOTE-> EMAIL VERIFICATION NEEDS FIXING.
 *     description: Register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Unique username.
 *               email:
 *                 type: string 
 *                 description: The email.
 *               password:
 *                 type: string 
 *                 description: The account password with min length 6.
 *     tags:
 *      - auth
 *     responses:
 *       400:
 *         description: Username or email already exists.
 *       500:
 *         description: Server Error.
 *       200:
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string 
 *                   description: user's userId
*/
router.post('/register', async (req, res) => {

  // Front end validations
  const {error} = registrationValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the user already exists
  const username_exists = await User.findOne({username: req.body.username});
  if (username_exists) return res.status(400).send('User with this username already exists');

  const email_exists = await User.findOne({email: req.body.email});
  if (email_exists) return res.status(400).send('User with this email already exists');

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hash(req.body.password, salt);

  // Create new user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashed_password,
    activated: true,                // TODO: temp
  });

  const origToken = crypto.randomBytes(16).toString('hex')
  const hashedToken = await bcrypt.hash(origToken, 10)
  const token = new activationToken({
    _userId: user._id,
    token: hashedToken
  });

  try{
    await user.save();
    await token.save();
  }catch(err){
    res.status(400).send(err);
  }

  // TODO: TEMP
  return res.status(200).send({ user: user._id });

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.SPORTCRED_EMAIL,
      pass: process.env.SPORTCRED_PASS
    }
  });

  var mailOptions = {
    from: 'no-reply@sportcred.com',
    to: user.email,
    subject: 'Account Verification Link',
    text: 'Hello '+ user.username +',\n\n' + 'This link will expire 24 hours from now, please verify your account by clicking the link: ' +
          '\nhttp:\/\/localhost:5000\/user\/confirm\/' + user._id + '\/' + origToken + '\n\nThank You!\n'
  };

  transporter.sendMail(mailOptions, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send('Technical Issue!, Please click on resend to verify your Email.')
    };

    return res.status(200).send({ user: user._id });
  });
});

 /**
 * @swagger
 * /user/resend-activation:
 *   post:
 *     summary: Resends email activation.
 *     description: Resends email activation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     tags:
 *      - auth
 *     responses:
 *       400:
 *         description: User not found.
 *       500:
 *         description: Server Error with emailer.
 *       200:
 *         description: Success.
*/
router.post('/resend-activation', async (req, res) => {
  const user = await User.findOne({_id: req.body.userId});
  if (!user) return res.status(400).send('User not found');

  if (user.activated) return res.status(200).send('Your account has already been activated, please continue.');

  await activationToken.findOneAndDelete({_userId: user.id});

  const origToken = crypto.randomBytes(16).toString('hex')
  const hashedToken = await bcrypt.hash(origToken, 10)
  var token = new activationToken({
    _userId: user._id,
    token: hashedToken
  });

  try{
    await token.save();
  }catch(err){
    return res.status(400).send(err);
  }

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.SPORTCRED_EMAIL,
      pass: process.env.SPORTCRED_PASS
    }
  });

  var mailOptions = {
    from: 'no-reply@sportcred.com',
    to: user.email,
    subject: 'Account Verification Link',
    text: 'Hello '+ user.username +',\n\n' + 'This link will expire 24 hours from now, please verify your account by clicking the link: ' +
          '\nhttp:\/\/localhost:5000\/user\/confirm\/' + user._id + '\/' + origToken + '\n\nThank You!\n'
  };

  transporter.sendMail(mailOptions, function (err) {
    if (err) return res.status(500).send('Technical Issue!, Please click on resend to verify your Email.');
  });

  return res.status(200).send('Activation email sent!');
});

 /**
 * @swagger
 * /user/confirm/{id}/{token}:
 *   get:
 *     summary: Activates user with token verification
 *     description: Activates user with token verification
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user.
 *         schema:
 *           type: string
 *       - in: path
 *         name: token
 *         required: true
 *         description: activation token
 *         schema:
 *           type: string
 *     tags:
 *      - auth
 *     responses:
 *       400:
 *         description: Client error.
 *       200:
 *         description: Success.
*/
router.get('/confirm/:id/:token', async (req, res) => {
  const token = await activationToken.findOne({_userId: req.params.id});
  if(!token) return res.status(400).send('This verification link has expired. Please click on resend to verify your Email.');

  const tokenIsValid = await bcrypt.compare(req.params.token, token.token);
  if (!tokenIsValid) return res.status(400).send('This verification link is invalid. Please click on resend to verify your Email.');

  const user = await User.findOneAndUpdate({_id: token._userId}, {activated: true})
  if (!user) return res.status(400).send('An error occurred, user not found.');

  if(user.activated) return res.status(200).send('Account is already activated. Please login!');

  return res.status(200).send('Your account has been successfully verified');
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Logins in the user
 *     description: Logins in the user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Unique username.
 *               password:
 *                 type: string 
 *                 description: The account password with min length 6.
 *     tags:
 *      - auth
 *     responses:
 *       200:
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string 
 *                   description: user's userId
*/
router.post('/login', async (req, res) => {

  const {error} = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Find the user in the database
  const user = await User.findOne({username: req.body.username});
  if (!user) return res.status(400).send('username does not exist');

  // Check password
  const valid_password = await bcrypt.compare(req.body.password, user.password);
  if (!valid_password) return res.status(400).send('username or password is incorrect');

  if(!user.activated){ 
    return res.status(400).send('Your Email has not been verified. Please verify.');
    
    // TODO: Email verification shouldn't be here
    await activationToken.findOneAndDelete({_userId: user.id});

    const origToken = crypto.randomBytes(16).toString('hex')
    const hashedToken = await bcrypt.hash(origToken, 10)
    var token = new activationToken({
      _userId: user._id,
      token: hashedToken
    });

    try{
      await token.save();
    }catch(err){
      return res.status(500).send(err);
    }

    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.SPORTCRED_EMAIL,
        pass: process.env.SPORTCRED_PASS
      }
    });

    var mailOptions = {
      from: 'no-reply@sportcred.com',
      to: user.email,
      subject: 'Account Verification Link',
      text: 'Hello '+ user.username +',\n\n' + 'This link will expire 24 hours from now, please verify your account by clicking the link: ' +
            '\nhttp:\/\/localhost:5000\/user\/confirm\/' + user._id + '\/' + origToken + '\n\nThank You!\n'
    };

    transporter.sendMail(mailOptions, function (err) {
      if (err) return res.status(500).send('Technical Issue!, Please click on resend to verify your Email.');
    });

    return res.status(200).send({user: user.id});
  }

  // FOR NOW, JUST SEND THE USER ID. HOWEVER, CHANGE THIS TO THE BELOW TO SEND TOKEN
  return res.status(200).send({user: user.id});

  // TODO: CHANGE THIS BACK TO USING TOKENS
  // // Create a remember me token
  // const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
  // res.header('auth-token', token).send(token)

});

/**
 * @swagger
 * /user/forgot-password:
 *   post:
 *     summary: Send request to reset password.
 *     description: Send request to reset password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string 
 *                 description: The email.
 *     tags:
 *      - auth
 *     responses:
 *       400:
 *         description: Client Error.
 *       500:
 *         description: Server Error.
 *       200:
 *         description: Success.
*/
router.post('/forgot-password', async (req, res) => {
  const user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send('This email is not registered');

  await resetToken.findOneAndDelete({_userId: user.id});

  const origToken = crypto.randomBytes(16).toString('hex')
  const hashedToken = await bcrypt.hash(origToken, 10)
  var token = new resetToken({
    _userId: user._id,
    token: hashedToken
  });

  try{
    await token.save();
  }catch(err){
    return res.status(400).send(err);
  }

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.SPORTCRED_EMAIL,
      pass: process.env.SPORTCRED_PASS
    }
  });

  var mailOptions = {
    from: 'no-reply@sportcred.com',
    to: user.email,
    subject: 'Reset Password',
    text: 'Hello '+ user.username +',\n\n' + 'Someone (hopefully you) requested to reset your SportCred password. ' +
          'If you did not request this, please ignore this email, no action is required.\n\nPlease verify your account to allow ' +
          'password reset by clicking the link: ' +
          '\nhttp:\/\/localhost:5000\/user\/reset-password\/' + user._id + '\/' + origToken + '\n\nThank You!\n'
  };

  transporter.sendMail(mailOptions, function (err) {
    if (err) return res.status(500).send('Technical Issue!, Please click on resend to verify your Email.');
  });

  return res.status(200).send('Password Reset email has been sent to ' + req.body.email);
})

 /**
 * @swagger
 * /user/reset-password/{id}/{token}:
 *   get:
 *     summary: Send form to reset user password via token
 *     description: Send form to reset user password via token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user.
 *         schema:
 *           type: string
 *       - in: path
 *         name: token
 *         required: true
 *         description: comfirmation token
 *         schema:
 *           type: string
 *     tags:
 *      - auth
 *     responses:
 *       400:
 *         description: Client error.
 *       200:
 *         description: Success. Sends a form.
*/
router.get('/reset-password/:id/:token', async (req, res) => {
  const token = await resetToken.findOne({_userId: req.params.id});
  if(!token) return res.status(400).send('This password reset link has expired. Please resend.');

  const tokenIsValid = await bcrypt.compare(req.params.token, token.token);
  if (!tokenIsValid) return res.status(400).send('This password reset link is invalid. Please resend.');

  return res.status(200).send(
    '<form action="/user/authenticate-reset" method="POST">' +
      '<input type="hidden" name="id" value="' + req.params.id + '" />' +
      '<input type="hidden" name="token" value="' + req.params.token + '" />' +
      '<input type="password" name="password" value="" placeholder="Enter your new password..." />' +
      '<input type="submit" value="Reset Password" />' +
    '</form>'
  );
})


/**
 * @swagger
 * /user/authenticate-reset:
 *   post:
 *     summary: Authenticate password reset.
 *     description: Authenticate password reset.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: User's id.
 *               token:
 *                 type: string 
 *                 description: confirmation token.
 *               password:
 *                 type: string 
 *                 description: The new password with min length 6.
 *     tags:
 *      - auth
*/
router.post('/authenticate-reset', async (req, res) => {
  const userId = req.body.id;
  const token = req.body.token;
  const password = req.body.password;

  const t = await resetToken.findOne({_userId: userId});
  if(!t) return res.status(400).send('Authentication failed. Please return to the SportCred app and try again.');

  const tokenIsValid = await bcrypt.compare(token, t.token);
  if (!tokenIsValid) return res.status(400).send('Authentication failed. Please return to the SportCred app and try again.');

  const user = await User.findOne({_id: userId})
  if (!user) return res.status(400).send('An error occurred, user not found.');

  const {error} = loginValidation({username: user.username, password: password});
  if (error) return res.status(400).send(error.details[0].message);

  const hashedPass = await bcrypt.hash(password, 10);
  user.password = hashedPass;
  await user.save();

  await resetToken.findOneAndDelete({_userId: userId});
  return res.status(200).send('Successfully updated password, return to app and login with new password!')
})

 /**
 * @swagger
 * /user/get-user/{id}:
 *   get:
 *     summary: Gets the user by ID.
 *     description: Returns the user's info given it's ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve.
 *         schema:
 *           type: string
 *     tags:
 *      - auth
 *     responses:
 *       400:
 *         description: Cannot find user.
 *       200:
 *         description: The user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/User'
*/
router.get('/get-user/:id', async (req, res) => {
  const user = await User.findOne({_id: req.params.id});
  if (!user) return res.status(400).send('user query failed');
  return res.status(200).send(user);
})

//------------------------------------------------------------------------------testing------------------------------
router.post('/testing', async (req, res) => {
  console.log("running testing")
  const {error} = EditProfileValidation(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  // Find the user in the database
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashed_password = await bcrypt.hash(req.body.password, salt);
      await User.update({email : req.body.email}, {$set: { "password" : hashed_password}});
    }
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('cannot find the user');
    await User.update({email : req.body.email}, 
      {$set: { "username" : req.body.username || user.username, 
               "status": req.body.status || user.status,
               "description": req.body.description || user.description,
               "profilePic": req.body.profilePic || user.profilePic
             }});

    res.send({ action: true });

  } catch (error) {
    console.log(error);
    res.send({ action: false, response: "you have some error in edit profile section check log for more information" });
  }

})


 /**
 * @swagger
 * /user/get-user-by-name/{username}:
 *   get:
 *     summary: Gets the user by username.
 *     description: Returns the user's info given it's username.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user to retrieve.
 *         schema:
 *           type: string
 *     tags:
 *      - auth
 *     responses:
 *       400:
 *         description: Cannot find user.
 *       200:
 *         description: The user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/User'
*/
router.get('/get-user-by-name/:username', async (req, res) => {
  const user = await User.findOne({username: req.params.username});
  if (!user) return res.status(400).send('user query failed');
  return res.status(200).send(user);
})

 /**
 * @swagger
 * /user/edit-prof:
 *   post:
 *     summary: Edit's the user's profile.
 *     description: Edit's the user's profile.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: (optional) the new username.
 *               email:
 *                 type: string
 *                 description: (required) the user's email.
 *               status:
 *                 type: string 
 *                 description: (optional) the new status of the user.
 *               description:
 *                 type: string 
 *                 description: (optional) the new description.
 *     tags:
 *      - auth
 *      - profile
 *     responses:
 *       200:
 *         description: status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 action:
 *                   type: boolean 
 *                   description: whether the action succeeded
 *                 response:
 *                   type: string
 *                   description: the error message if any
*/
router.post('/edit-prof', async (req, res) => {
  const {error} = EditProfileValidation(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  // Find the user in the database
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashed_password = await bcrypt.hash(req.body.password, salt);
      await User.update({email : req.body.email}, {$set: { "password" : hashed_password}});
    }
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('cannot find the user');
    await User.update({email : req.body.email}, 
      {$set: { "username" : req.body.username || user.username, 
               "status": req.body.status || user.status,
               "description": req.body.description || user.description,
               "profilePic": req.body.profilePic || user.profilePic
             }});

    res.send({ action: true });

  } catch (error) {
    console.log(error);
    res.send({ action: false, response: "you have some error in edit profile section check log for more information" });
  }

});



module.exports = router;
