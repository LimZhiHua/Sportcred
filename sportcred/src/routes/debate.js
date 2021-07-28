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
