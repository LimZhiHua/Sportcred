const express = require('express');
const router = express.Router();
const triviaSession = require('../models/triviaSession');
const User = require('../models/user');

const { checkJwt } = require("../authz/checkJwt")


 /**
 * @swagger
 * /trivia/addSession:
 *   post:
 *     summary: Create a new trivia session with players.
 *     description: Creates a new trivia game session given the players and returns the session id. A trivia session has information about the generated questions and the players.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               players:
 *                 type: array
 *                 description: Players for the round.
 *                 items:
 *                    $ref: '#/components/schemas/triviaPlayer'
 *     tags:
 *      - trivia
 *     responses:
 *       500:
 *         description: Error creating the game session.
 *       200:
 *         description: Returns the session id of the trivia game.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string 
*/
router.post('/addSession', async (req, res) => {
    const questions = [
        {
            question: "Who is PG of Brooklyn Nets?",
            answers: [
                { isCorrect: false, optionNumber: 1, answerBody: "Kevin Durant" },
                { isCorrect: true, optionNumber: 2, answerBody: "Kyrie Irving" },
                { isCorrect: false, optionNumber: 3, answerBody: "Jamal Crawford" },
                { isCorrect: false, optionNumber: 4, answerBody: "Caris LeVert" }
            ]
        },
        {
            question: "Who won MVP in the 2020 NBA Playoffs?",
            answers: [
                { isCorrect: true, optionNumber: 1, answerBody: "LeBron James" },
                { isCorrect: false, optionNumber: 2, answerBody: "Anthony Davis" },
                { isCorrect: false, optionNumber: 3, answerBody: "Tyler Herro" },
                { isCorrect: false, optionNumber: 4, answerBody: "Jimmy Butler" }
            ]
        },
        {
            question: "Which team had the highest PPG in the 2019-2020 NBA season?",
            answers: [
                { isCorrect: false, optionNumber: 1, answerBody: "Mavericks" },
                { isCorrect: false, optionNumber: 2, answerBody: "Clippers" },
                { isCorrect: false, optionNumber: 3, answerBody: "Rockets" },
                { isCorrect: true, optionNumber: 4, answerBody: "Bucks" }
            ]
        },
        {
            question: "Which of these players had the highest 3-point percentage in the 2019-2020 NBA season?",
            answers: [
                { isCorrect: false, optionNumber: 1, answerBody: "Paul George" },
                { isCorrect: false, optionNumber: 2, answerBody: "Jayson Tatum" },
                { isCorrect: false, optionNumber: 3, answerBody: "Kyle Korver" },
                { isCorrect: true, optionNumber: 4, answerBody: "JJ Redick" }
            ]
        },
        {
            question: "Who is the only player in NBA history to have scored 100 points in one game?",
            answers: [
                { isCorrect: false, optionNumber: 1, answerBody: "Michael Jordan" },
                { isCorrect: false, optionNumber: 2, answerBody: "Elgin Baylor" },
                { isCorrect: false, optionNumber: 3, answerBody: "Kareem Abdul-Jabbar" },
                { isCorrect: true, optionNumber: 4, answerBody: "Wilt Chamberlain" }
            ]
        },
    ]

    const session = {
        players: req.body.players,
        questions: questions
    }

    try {
        const sesh = new triviaSession(session);
        await sesh.save();
        return res.status(200).send({ id: sesh._id })
    } catch (err) {
        console.log("\n\nERR =\n\n" + err);
        res.status(500).send('error adding trivia');
    }
});

 /**
 * @swagger
 * /trivia/{id}:
 *   get:
 *     summary: Get the trivia session info.
 *     description: Given an trivia session id, returns the game info.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to retrieve.
 *         schema:
 *           type: string
 *     tags:
 *      - trivia
 *     responses:
 *       404:
 *         description: Could not find the session id.
 *       200:
 *         description: Returns the game session info.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: 
 *                foundSession: 
 *                  type: object
 *                  $ref: '#/components/schemas/triviaSession'
*/
router.get('/:id',  async (req, res) => {
    const foundSession = await triviaSession.findById(req.params.id).catch((err) => {
        return res.status(404).send(err)
    })
    return res.status(200).send({ foundSession: foundSession })
})

 /**
 * @swagger
 * /trivia/add-point:
 *   post:
 *     summary: Update score by 1 point.
 *     description: Update the score of a player by one point given the player's pid and game session sid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pid:
 *                 type: string
 *                 description: Player id to increment.
 *               sid:
 *                 type: string
 *                 description: Game session id.
 *     tags:
 *      - trivia
 *     responses:
 *       404:
 *         description: Game session not found.
 *       200:
 *         description: success
*/
router.post('/add-point', async (req, res) => {
    try {
        const game = await triviaSession.findById(req.body.sid)
        game.players.forEach(p => {
            if (p.userId === req.body.pid) {
                p.totalScore += 1
            }
        })
        await game.save()
        return res.status(200).send("Correct!")
    } catch (err) {
        console.log(err)
        res.status(404).send(err);
    }
})

 /**
 * @swagger
 * /trivia/finish-trivia:
 *   post:
 *     summary: Finish the trivia game.
 *     description: Finish the trivia game.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pid:
 *                 type: string
 *                 description: Current player's id.
 *               sid:
 *                 type: string
 *                 description: Game session id.
 *     tags:
 *      - trivia
 *     responses:
 *       404:
 *         description: Game session not found.
 *       200:
 *         description: Complete the game
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trivia:
 *                   type: string 
 *                   description: Game session id.
 *                 currPlayer:
 *                   type: string 
 *                 otherPlayer:
 *                   type: string 
*/
router.post('/finish-trivia', async (req, res) => {
    try {
        const game = await triviaSession.findById(req.body.sid)
        var currPlayer
        var otherPlayer
        game.players.forEach(p => {
            if (p.userId === req.body.pid) {
                p.done = true
                currPlayer = p
            } else {
                otherPlayer = p
            }
            
        })
        await game.save()
        return res.status(200).send({trivia: game._id, currPlayer: currPlayer, otherPlayer: otherPlayer})
    } catch (err) {
        console.log(err)
        res.status(404).send(err);
    }
})

router.post('/reset-trivia-count',  checkJwt, async (req, res) => {
    // Find the user in the database

    try {
        const user = await User.findById({_id: req.body.playerID});
        if (!user) return res.status(400).send('cannot find the user');
        
        await User.update({email : user.email}, 
            {$set: { 
            "triviaCount": 10,
                   }});  
     res.send({ action: true });
     
    } catch (error) {
      console.log(error);
      res.send({ action: false, response: "you have some error in updating the user" });
    }
 
    return res.status(200);
})


router.get('/get-trivia-count/:id', checkJwt, async (req, res) => {

    // Find the user in the database
   
    try {
        const user = await User.findById({_id: req.params.id});
        if (!user) return res.status(400).send('cannot find the user');  
        res.status(200).send(user.triviaCount);
     
    } catch (error) {
      console.log(error);
      res.status(400).send("user query failed")
    }
    
    return res.status(200);
})

router.post('/subtract-trivia-count/:id', async (req, res) => {

    // Find the user in the database
   
    try {
        const user = await User.findById({_id: req.params.id});
        if (!user) return res.status(400).send('cannot find the user');  
        await User.update({email : user.email}, 
            {$set: { 
            "triviaCount": user.triviaCount - 1,
                   }});  
        res.send({ action: true });
     
    } catch (error) {
      console.log(error);
      res.send({ action: false, response: "you have some error in updating the user" });
    }
    
    return res.status(200);
})
module.exports = router;