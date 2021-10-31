const express = require('express');
const router = express.Router();

const AnalysisQuestion = require('../models/analysisQuestion');
const AnalysisResponse = require('../models/analysisResponse');
const AnalysisVote = require('../models/analysisVote');
const AnalysisGroup = require('../models/analysisGroup');

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
 * /analysis/addQuestion:
 *   post:
 *     summary: Add a analysis question.
 *     description: Add a analysis question.
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
 *               scheduledDay:
 *                 type: string 
 *                 description: The date in YYYY-MM-DD
 *     tags:
 *      - analysis
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
router.post('/addQuestion', async (req, res) => {
    var analysisQuestion = new AnalysisQuestion({
      question: req.body.question,
      scheduledDay: req.body.scheduledDay 
    });
  
    try {
      await analysisQuestion.save();
      res.status(200).send({id: analysisQuestion._id});
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
});

/**
 * @swagger
 * /analysis/getQuestion/:id:
 *   get:
 *     summary: Get today's analysis question and know whether user has responsed.
 *     description: Get today's analysis question and know whether user has responsed.
 *     tags:
 *      - analysis
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
router.get('/getQuestion/:id', async (req, res) => {
    // ignore the time in date
    const a = new Date(Date.now()); 
    const date = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const question = await AnalysisQuestion.findOne({scheduledDay: {$gte: date}});
    if (!question) return res.status(200).send();
    const response = await AnalysisResponse.findOne({questionId: question._id, userId:  req.params.id})

    return res.status(200).send({
        questionId: question._id,
        question: question.question,
        answered: response !== null
    })
    }
    
);

/**
 * @swagger
 * /analysis/getQuestions:
 *   get:
 *     summary: Get a list of analysis questions.
 *     description: Get a list of analysis questions.
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
 *      - analysis
 *     responses:
 *       200:
 *         description: List of questions sorted from most to least recent.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                $ref: '#/components/schemas/AnalysisQuestion'
*/
router.get('/getQuestions', async (req, res) => {
    const limit     = Math.abs(parseInt(req.query.limit)) || 100;
    const page      = Math.abs(parseInt(req.query.page)) - 1 || 0;
    const questions = await AnalysisQuestion.find({}).sort({scheduledDay: -1}).skip(page*limit).limit(limit);
    if(questions === null){
      return res.status(404).send("no daily question found")
    }else{
      return res.status(200).send(questions);
    }
});


/**
 * @swagger
 * /analysis/addResponse:
 *   post:
 *     summary: Add a analysis response.
 *     description: Add a analysis response.
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
 *                 description: The analysis response
 *     tags:
 *      - analysis
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
router.post('/addResponse', async (req, res) => {

    const response = await AnalysisResponse
                        .findOne({questionId: req.body.questionId, userId: req.body.userId})
                        .catch(() => console.log('invalid question or user id'));
    
    if (response) return res.status(400).send('Response already given!');  

    var analysisResponse = new AnalysisResponse({
      questionId: req.body.questionId,
      userId: req.body.userId,
      response: req.body.response 
    });

    try {
      await analysisResponse.save();
      res.status(200).send({id: analysisResponse._id});
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
});

/**
 * @swagger
 * /analysis/getResponses:
 *   get:
 *     summary: Get a list of analysis responses.
 *     description: Get a list of analysis questions based on the questionId.
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
 *      - analysis
 *     responses:
 *       200:
 *         description: List of responses sorted from most to least recent.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                $ref: '#/components/schemas/AnalysisResponse'
*/
router.get('/getResponses/:questionId', async (req, res) => {
    // TODO: if use has not responsed to the analysis, do not allow bypassing to responses  
    const limit = Math.abs(parseInt(req.query.limit)) || 100;
    const page  = Math.abs(parseInt(req.query.page)) - 1 || 0;
    const responses = await AnalysisResponse
                                .find({questionId: req.params.questionId})
                                .sort({_id: -1})
                                .skip(page*limit)
                                .limit(limit)
                                .catch(() => {
                                  return res.status(400).send("Question does not exist");
                                });
    return res.status(200).send(responses);
});

/**
 * @swagger
 * /analysis/getResponses:
 *   get:
 *     summary: Get a single response.
 *     description: Get a single response based on questionID and userID.
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
 *      - analysis
 *     responses:
 *       200:
 *         description: a response based on userID and questionId
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                $ref: '#/components/schemas/AnalysisResponse'
*/
router.get('/getResponse/:questionId/:userId', async (req, res) => {
  // TODO: if use has not responsed to the analysis, do not allow bypassing to responses  
  const response = await AnalysisResponse
                              .findOne({questionId: req.params.questionId, userId:req.params.userId})
                              .catch(() => {
                                return res.status(400).send("Question does not exist");
                              });
  if(response == null){
    return res.status(404).send("response not found");
  }
  return res.status(200).send(response);
});

/**
 * @swagger
 * /analysis/createGroup:
 *   post:
 *     summary: Create analysis group for question - UNUSED.
 *     description: Create analysis group for question.
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
 *      - analysis
 *     responses:
 *       200:
 *         description: Success.
*/
router.post('/createGroup', async (req, res) => {

    const responses = await AnalysisResponse
                        .find({questionId: req.body.questionId})
                        .catch(() => console.log('invalid question id'));

    let groupSize = 4;
    if (responses.length % 4 === 1) {groupSize = 3};

    const groups = partition(responses, groupSize);
    try {
        groups.forEach((group) => {
            var analysisGroup = new AnalysisGroup({
                questionId: req.body.questionId,
            });
            analysisGroup.save().then(() => {    
                group.forEach((response) => {
                    response.groupId = analysisGroup._id;
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
 * /analysis/addGroupVotes:
 *   post:
 *     summary: Add a votes to analysis responses - UNUSED.
 *     description: Add a votes to analysis responses.
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
 *      - analysis
 *     responses:
 *       200:
 *         description: Success.
*/
router.post('/addGroupVotes', async (req, res) => {
    // NOTE: UNUSED ENDPOINT
    
    // TODO: Verification? or only on result scoring?
    if (!req.body.votes) return res.status(400).send('Votes are required');
    try {
        req.body.votes.forEach((vote) => {
            var analysisVote = new AnalysisVote({
                responseId: vote.responseId,
                rating: vote.rating,
                userId: req.body.userId
            });
            analysisVote.save();
        })
      res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

/**
 * @swagger
 * /analysis/addVote:
 *   post:
 *     summary: Add a vote to a analysis response.
 *     description: Add a vote to a analysis response.
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
 *      - analysis
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
router.post('/addVote', async (req, res) => {

  const response = await AnalysisResponse.findOne({_id: req.body.responseId});
  if (!response) return res.status(400).send("Response not found");
  if (response.userId === req.body.userId) return res.status(200).send("Cannot vote on your own response");

  try {
    const exists = await AnalysisVote.findOne({userId: req.body.userId, responseId: req.body.responseId})
    if(exists !== null){
      return res.status(409).send("user has already voted on this response!");
    }
    var analysisVote = new AnalysisVote({
      responseId: req.body.responseId,
      rating: req.body.rating,
      userId: req.body.userId
    });
    await analysisVote.save();
    let counter = 1 + response.responseCount
    let sum = response.responseCount * response.averageScore + req.body.rating
   
    await AnalysisResponse.updateOne({_id: req.body.responseId},{averageScore: sum/counter, responseCount: counter});
    
    res.status(200).send();
   
  } catch (err) {
      console.log(err);
      res.status(500).send(err);
  }
});


router.get('/getVotes/:responseId', async (req, res) => {
  const vote = await AnalysisVote.findOne({responseId: req.params.responseId});
  if (!vote) return res.status(400).send("Vote not found");

  console.log("id is", req.params.responseId)
  try {
    const votes = await AnalysisVote.find({responseId: req.params.responseId})
    if(votes === null){
      return res.status(400).send("no one has voted on this");
    }else{
      console.log("votes is", votes)
    }
  
    res.status(200).send(votes);
  } catch (err) {
      console.log(err);
      res.status(500).send(err);
  }
});

module.exports = router;
