const express = require('express');
const router = express.Router();
const Post = require('../models/post')
const User = require("../models/user")
const { postValidation, getPostValidation } = require('../validations/postValidations');

 /**
 * @swagger
 * /post:
 *   get:
 *     summary: Get all posts.
 *     description: Gets all posts.
 *     tags:
 *      - post
 *     parameters:
 *       - in: query
 *         name: limit
 *         default: 100
 *         description: Get the most recent limit of responses
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         default: 1
 *         description: The page of responses sized according to the limit
 *         schema:
 *           type: integer
 *     responses:
 *       500:
 *         description: Error getting posts.
 *       200:
 *         description: List of all posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                $ref: '#/components/schemas/Post'
*/
router.get('/', async (req, res) => {
  const limit     = Math.abs(parseInt(req.query.limit)) || 25;
  const page      = Math.abs(parseInt(req.query.page)) - 1 || 0;
  let allPosts  = await Post
                    .find({})
                    .sort({_id: -1})
                    .skip(page*limit)
                    .limit(limit)
                    .catch((error) => {
                      return res.status(500).send("error getting all posts")
                  });


  
  // the author of the post might have changed his username, so we gotta go and get the new one
  let updateUsername = []
  for (var index in allPosts){
    const username =  (await User.findOne({_id: allPosts[index].authorId})).username
    let newPost = allPosts[index]
    newPost["author"] = username
    updateUsername.push(newPost)
  }
    try {
    return res.status(200).send({ postsArray: updateUsername });
  } catch (err) {
    return res.status(500).send(err)
  }
});

 /**
 * @swagger
 * /post:
 *   post:
 *     summary: Create a new post.
 *     description: Create a new post.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the post.
 *                 example: My amazing post of 2021
 *               description:
 *                 type: string 
 *                 description: The body of of the post.
 *     tags:
 *      - post
 *     responses:
 *       400:
 *         description: Invalid request.
 *       500:
 *         description: Error creating the post.
 *       200:
 *         description: List of all posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   type: string 
*/
router.post('/', async (req, res) => {
  // Front end validations
  const { error } = postValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Create post
  const newPost = {
    //   author: {
    //       id: req.body.userId
    //   },
    title: req.body.title,
    description: req.body.description,
    authorId: req.body.authorId
  }

  try {
    const post = new Post(newPost);

    await post.save();
    return res.status(200).send({ post: post._id })

  } catch (err) {
    return res.status(500).send('error creating post');

  }

});

 /**
 * @swagger
 * /post/{id}:
 *   get:
 *     summary: Get a post.
 *     description: Returns a post based on ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to retrieve.
 *         schema:
 *           type: string
 *     tags:
 *      - post
 *     responses:
 *       500:
 *         description: Error getting the post.
 *       200:
 *         description: List of all posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Post'
*/
router.get("/:id", async (req, res) => {
  const foundPost = await Post
    .findOne({_id: req.params.id})
    .catch((err) => {
      return res.status(400).send(err)
    })

  if (!foundPost) 
    return res.status(500).send(err)
  else
    return res.status(200).send(foundPost)
})

router.post("/:id", async (req, res) => {
  const likes = req.body.likes
  const dislikes = req.body.dislikes
  const foundPost = await Post
    .findOne({_id: req.params.id})
    .catch((err) => {
      return res.status(400).send(err)
    })
  
  if (!foundPost) 
    return res.status(500).send({msg:"could not find post"})
  else{
    const query = {_id: req.params.id}
    const update = { likes:likes, dislikes:dislikes}
    try{
      await Post.updateOne(query, update, {})
      return res.status(200).send({msg:"Post updated"})
    }catch{
      return res.status(400).send({msg:"post could not be updated"})
    }

  }
})

module.exports = router;
