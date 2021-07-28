const express = require('express');
const router = express.Router();

const DebateQuestion = require('../models/debateQuestion');
const DebateResponse = require('../models/debateResponse');
const DebateVote = require('../models/debateVote');
const DebateGroup = require('../models/debateGroup');

const User = require('../models/user');

// -------------------- UTILS ---------------------

function partition(input, spacing) {
    var output = [];
    for (var i = 0; i < input.length; i += spacing) {
        output[output.length] = input.slice(i, i + spacing);
    }
    return output;
}

// -------------------------------------------------


// TODO general validation to check fields exist

/**
 * @swagger
 * /debate/addDebateQuestion:
 *   post:
 *     summary: Add a debate question.
 *     description: Add a debate question.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: The question
 *               debateDay:
 *                 type: string 
 *                 description: The date in YYYY-MM-DD
 *     tags:
 *      - debate
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
 *                   description: The question ID
*/
router.post('/addDebateQuestion', async (req, res) => {
    var debateQuestion = new DebateQuestion({
      question: req.body.question,
      debateDay: req.body.debateDay 
    });
  
    try {
      await debateQuestion.save();
      res.status(200).send({id: debateQuestion._id});
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
});

/**
 * @swagger
 * /debate/getQuestion:
 *   get:
 *     summary: Get today's debate question and know whether user has responsed.
 *     description: Get today's debate question and know whether user has responsed.
 *     tags:
 *      - debate
 *     parameters:
 *      - in: query
 *        name: userId
 *        required: true
 *        description: The userId of the user.
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: The question of the day, empty if none.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 questionId:
 *                   type: boolean 
 *                   description: Today's question ID
 *                 question:
 *                   type: string
 *                   description: The question statement
 *                 answered:
 *                   type: boolean
 *                   description: Whether the user has answered for today
*/
router.get('/getQuestion', async (req, res) => {
    // ignore the time in date
    const a = new Date(Date.now()); 
    const date = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const question = await DebateQuestion.findOne({debateDay: {$gte: date}});
    if (!question) return res.status(200).send({});

    const response = await DebateResponse.findOne({questionId: question._id, userId: req.query.userId})
    return res.status(200).send({
        questionId: question._id,
        question: question.question,
        answered: response != null
    });
});

/**
 * @swagger
 * /debate/getDebateQuestions:
 *   get:
 *     summary: Get a list of debate questions.
 *     description: Get a list of debate questions.
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
 *     tags:
 *      - debate
 *     responses:
 *       200:
 *         description: List of questions sorted from most to least recent.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                $ref: '#/components/schemas/DebateQuestion'
*/
router.get('/getDebateQuestions', async (req, res) => {
    const limit     = Math.abs(parseInt(req.query.limit)) || 100;
    const page      = Math.abs(parseInt(req.query.page)) - 1 || 0;
    const questions = await DebateQuestion.find({}).sort({debateDay: -1}).skip(page*limit).limit(limit);
    return res.status(200).send(questions);
});


/**
 * @swagger
 * /debate/addDebateResponse:
 *   post:
 *     summary: Add a debate response.
 *     description: Add a debate response.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionId:
 *                 type: string
 *                 description: The question
 *               userId:
 *                 type: string 
 *                 description: The user's ID
 *               response:
 *                 type: string 
 *                 description: The debate response
 *     tags:
 *      - debate
 *     responses:
 *       200:
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string 
 *                   description: The response ID
*/
router.post('/addDebateResponse', async (req, res) => {

    const response = await DebateResponse
                        .findOne({questionId: req.body.questionId, userId: req.body.userId})
                        .catch(() => console.log('invalid question or user id'));
    
    if (response) return res.status(400).send('Response already given!');  

    var debateResponse = new DebateResponse({
      questionId: req.body.questionId,
      userId: req.body.userId,
      response: req.body.response 
    });

    try {
      await debateResponse.save();
      res.status(200).send({id: debateResponse._id});
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
});

/**
 * @swagger
 * /debate/getDebateResponses:
 *   get:
 *     summary: Get a list of debate responses.
 *     description: Get a list of debate questions based on the questionId.
 *     parameters:
 *       - in: query
 *         name: questionId
 *         default: 100
 *         description: The question ID
 *         schema:
 *           type: string
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
 *     tags:
 *      - debate
 *     responses:
 *       200:
 *         description: List of responses sorted from most to least recent.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                $ref: '#/components/schemas/DebateResponse'
*/
router.get('/getDebateResponses', async (req, res) => {
    // TODO: if use has not responsed to the debate, do not allow bypassing to responses
    const limit = Math.abs(parseInt(req.query.limit)) || 100;
    const page  = Math.abs(parseInt(req.query.page)) - 1 || 0;

    const responses = await DebateResponse
                                .find({questionId: req.query.questionId})
                                .sort({_id: -1})
                                .skip(page*limit)
                                .limit(limit);
    return res.status(200).send(responses);
});

/**
 * @swagger
 * /debate/createGroup:
 *   post:
 *     summary: Create debate group for question - UNUSED.
 *     description: Create debate group for question.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionId:
 *                 type: string
 *                 description: The question ID
 *     tags:
 *      - debate
 *     responses:
 *       200:
 *         description: Success.
*/
router.post('/createGroup', async (req, res) => {

    const responses = await DebateResponse
                        .find({questionId: req.body.questionId})
                        .catch(() => console.log('invalid question id'));

    let groupSize = 4;
    if (responses.length % 4 === 1) {groupSize = 3};

    const groups = partition(responses, groupSize);
    try {
        groups.forEach((group) => {
            var debateGroup = new DebateGroup({
                questionId: req.body.questionId,
            });
            debateGroup.save().then(() => {    
                group.forEach((response) => {
                    response.groupId = debateGroup._id;
                    response.save();
                })
            });
        })
        res.status(200).send();
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

/**
 * @swagger
 * /debate/addDebateGroupVotes:
 *   post:
 *     summary: Add a votes to debate responses - UNUSED.
 *     description: Add a votes to debate responses.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId: 
 *                 type: string
 *               groupId: 
 *                 type: string
 *               votes:
 *                 type: array
 *                 description: 
 *                 items: 
 *                   type: object
 *                   properties:
 *                     responseId:
 *                        type: string
 *                     rating:
 *                        type: number
 *     tags:
 *      - debate
 *     responses:
 *       200:
 *         description: Success.
*/
router.post('/addDebateGroupVotes', async (req, res) => {
    // NOTE: UNUSED ENDPOINT
    
    // TODO: Verification? or only on result scoring?
    if (!req.body.votes) return res.status(400).send('Votes are required');
    try {
        req.body.votes.forEach((vote) => {
            var debateVote = new DebateVote({
                responseId: vote.responseId,
                rating: vote.rating,
                userId: req.body.userId
            });
            debateVote.save();
        })
      res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

/**
 * @swagger
 * /debate/addDebateReponseVote:
 *   post:
 *     summary: Add a vote to a debate response.
 *     description: Add a vote to a debate response.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId: 
 *                 type: string
 *               responseId:
 *                 type: string
 *               rating:
 *                 type: number
 *     tags:
 *      - debate
 *     responses:
 *       200:
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string 
 *                   description: The vote ID
*/
router.post('/addDebateReponseVote', async (req, res) => {

  const response = await DebateResponse.findOne({_id: req.body.responseId});
  if (!response) return res.status(400).send("Response not found");
  if (response.userId == req.body.userId) return res.status(200).send("Cannot vote on your own response");

  try {
    var debateVote = new DebateVote({
      responseId: req.body.responseId,
      rating: req.body.rating,
      userId: req.body.userId
    });
    debateVote.save();
    res.status(200).send({id: debateVote._id});
  } catch (err) {
      console.log(err);
      res.status(500).send(err);
  }
});

module.exports = router;
