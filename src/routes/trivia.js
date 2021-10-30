const express = require('express');
const router = express.Router();
const triviaSession = require('../models/triviaSession');
const User = require('../models/user');
const TriviaQuestions = require("../models/triviaQuestions")

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

        // Get 10 random questions from our triviaquestions db
        const questions = await TriviaQuestions.aggregate([{$sample:{size: 10}}])
        // Format it in this form:
        /*
            {
                question: "Who is PG of Brooklyn Nets?",
                answers: [
                    { isCorrect: false, answerBody: "Kevin Durant" },
                    { isCorrect: true,  answerBody: "Kyrie Irving" },
                    { isCorrect: false,  answerBody: "Jamal Crawford" },
                    { isCorrect: false,  answerBody: "Caris LeVert" }
                ]
            },
        */
        const formattedQuestions =
            questions.map( question => {
                const fQuest = {} //formattedQuestion
                fQuest["catgeory"] = question["category"]
                fQuest["question"] = question["question"]
                fQuest["answers"] = question["choices"].map(answerBody => {
                    const item = {}
                    if(answerBody === question["answer"]){
                        item["isCorrect"] = true
                    }else{
                        item["isCorrect"] = false
                    }
                    item["answerBody"] = answerBody
                    return item
                })
                return fQuest
    
            })
        
        console.log(JSON.stringify(formattedQuestions))
        console.log(formattedQuestions)
    const session = {
        players: req.body.players,
        questions: formattedQuestions
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
      
        // We check the user's last login date.
      let curDate =  new Date().toISOString().split("T")[0]
      const lastLogin = user.lastLogin.toISOString().split("T")[0]
      console.log("last login is", lastLogin)
      console.log("current date is", curDate)
      if(curDate < lastLogin){
         await User.update({email : user.email}, 
            {$set: { "triviaCount": 10, }});  
        // await User.updateOne({_id: req.body.playerID}, {lastLogin: curDate})
            
         res.send({ action: true });
      }
        // Updating the user (in the future, should change it to use id instead of email)
       
     
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


//--------------------this is for our own use.---------------

router.post('/generate-trivia-questions/', async (req, res) => {

    // Find the user in the database
    const questions = {
        "questions": [
           {
              "questionId": 1,
              "category": "basketball",
              "star": false,
              "question": "Who is the only other player other than Jamal Murray to score 50 on less than 24 field goal attempts?",
              "answer": "Bob Cousy",
              "choices": [
                 "Michael Jordan",
                 "Lebron James",
                 "Bob Cousy",
                 "Kareem Abdul Jabbar"
              ]
           },
           {
              "questionId": 2,
              "category": "basketball",
              "star": false,
              "question": "Who are the two players to have 25 point halves in a single playoff series?",
              "answer": "Jamal Murray/Allen Iverson",
              "choices": [
                 "Jamal Murray/Allen Iverson",
                 "James Harden/Russel Westbrook",
                 "Michael Jordan/Kobe Bryant",
                 "Steph Curry/Lebron James"
              ]
           },
           {
              "questionId": 3,
              "category": "basketball",
              "star": true,
              "question": "Who was the NBA’s first ever unanimous mvp?",
              "answer": "Steph Curry",
              "choices": [
                 "Michael Jordan",
                 "Shaquille O’Neal",
                 "LeBron James",
                 "Steph Curry"
              ]
           },
           {
              "questionId": 5,
              "category": "basketball",
              "star": true,
              "question": "Who was the youngest player to score 10,000 points?",
              "answer": "LeBron James",
              "choices": [
                 "Kobe Bryant",
                 "LeBron James",
                 "Michael Jordan",
                 "Kevin Durant"
              ]
           },
           {
              "questionId": 7,
              "category": "basketball",
              "star": true,
              "question": "Who scored the most points in a single NBA game?",
              "answer": "Wilt Chamberlain",
              "choices": [
                 "Kobe Bryant",
                 "Wilt Chamberlain",
                 "James Harden",
                 "Michael Jordan"
              ]
           },
           {
              "questionId": 8,
              "category": "basketball",
              "star": true,
              "question": "What team has the worst W-L percentage in NBA history?",
              "answer": "Minnesota Timberwolves",
              "choices": [
                 "Minnesota Timberwolves",
                 "Phoenix Suns",
                 "Cleveland Cavaliers",
                 "New York Knicks"
              ]
           },
           {
              "questionId": 9,
              "category": "basketball",
              "star": true,
              "question": "Who has the most Finals MVP’s?",
              "answer": "Michael Jordan",
              "choices": [
                 "Kareem Abdul Jabbar",
                 "Magic Johnson",
                 "Shaquille O’Neal",
                 "Michael Jordan"
              ]
           },
           {
              "questionId": 10,
              "category": "basketball",
              "star": true,
              "question": "What franchise has the most HOF’s to date?",
              "answer": "Boston Celtics",
              "choices": [
                 "Los Angeles Lakers",
                 "Chicago Bulls",
                 "Boston Celtics",
                 "San Antonio Spurs"
              ]
           },
           {
              "questionId": 12,
              "category": "basketball",
              "star": true,
              "question": "What was the name of Toronto’s first NBA team?",
              "answer": "Toronto Huskies",
              "choices": [
                 "Toronto Raptors",
                 "Toronto Huskies",
                 "Toronto Knickerbokers",
                 "Toronto Grizzlies"
              ]
           },
           {
              "questionId": 13,
              "category": "basketball",
              "star": true,
              "question": "Who are the only two players in NBA history to average a triple double in a single season?",
              "answer": "Oscar Robertson/Russell Westbrook",
              "choices": [
                 "Oscar Robertson/Lebron James",
                 "Magic Johnson/Russel Westbrook",
                 "Luka Doncic/James Harden",
                 "Oscar Robertson/Russell Westbrook"
              ]
           },
           {
              "questionId": 14,
              "category": "basketball",
              "star": true,
              "question": "Who holds the record for most assists in a single game?",
              "answer": "Scott Skiles- 30",
              "choices": [
                 "Kevin Porter- 29",
                 "Magic Johnson- 32",
                 "John Stockton- 31",
                 "Scott Skiles- 30"
              ]
           },
           {
              "questionId": 15,
              "category": "basketball",
              "star": true,
              "question": "What team drafted Kobe Bryant?",
              "answer": "Charlotte Hornets",
              "choices": [
                 "Charlotte Hornets",
                 "Los Angeles Lakers",
                 "Minnesota Timberwolves",
                 "Los Angeles Clippers"
              ]
           },
           {
              "questionId": 16,
              "category": "basketball",
              "star": true,
              "question": "What team did Kobe Bryant score 81 points against?",
              "answer": "Toronto Raptors",
              "choices": [
                 "Dallas Mavericks",
                 "Portland Trailblazers",
                 "Toronto Raptors",
                 "Washington Wizards"
              ]
           },
           {
              "questionId": 17,
              "category": "basketball",
              "star": true,
              "question": "Who holds the record for most steals in a playoff game?",
              "answer": "Allen Iverson",
              "choices": [
                 "Manu Ginobli",
                 "Scottie Pippen",
                 "Allen Iverson",
                 "Gary Payton"
              ]
           },
           {
              "questionId": 18,
              "category": "basketball",
              "star": true,
              "question": "Draymond Green was selected with the ____ pick in the NBA draft.",
              "answer": "35th",
              "choices": [
                 "5th",
                 "20th",
                 "35th",
                 "60th"
              ]
           },
           {
              "questionId": 19,
              "category": "basketball",
              "star": true,
              "question": "Youngest player to ever record a triple double in NBA history?",
              "answer": "Markelle Fultz",
              "choices": [
                 "Lebron James",
                 "Luka Doncic",
                 "Markelle Fultz",
                 "Oscar Robertson"
              ]
           },
           {
              "questionId": 20,
              "category": "basketball",
              "star": true,
              "question": "What year was the NBA created?",
              "answer": "1949",
              "choices": [
                 "1920",
                 "1949",
                 "1952",
                 "1961"
              ]
           },
           {
              "questionId": 21,
              "category": "basketball",
              "star": true,
              "question": "What university did Dwayne Wade attend?",
              "answer": "Marquette",
              "choices": [
                 "Duke",
                 "Boston College",
                 "Georgia Tech",
                 "Marquette"
              ]
           },
           {
              "questionId": 22,
              "category": "basketball",
              "star": false,
              "question": "How many players to this date have made the jump from high school to the NBA?",
              "answer": "44",
              "choices": [
                 "10",
                 "22",
                 "44",
                 "75"
              ]
           },
           {
              "questionId": 23,
              "category": "basketball",
              "star": true,
              "question": "How many championship rings does the Laker franchise have?",
              "answer": "16",
              "choices": [
                 "18",
                 "16",
                 "15",
                 "11"
              ]
           },
           {
              "questionId": 24,
              "category": "basketball",
              "star": false,
              "question": "What is Shaquille O’neal’s career PPG average?",
              "answer": "23.7",
              "choices": [
                 "19.5",
                 "23.7",
                 "27.3",
                 "30.1"
              ]
           },
           {
              "questionId": 25,
              "category": "basketball",
              "star": false,
              "question": "Who scored the Toronto Raptors first ever franchise basket?",
              "answer": "Alvin Robertson",
              "choices": [
                 "Damon Stoudamire",
                 "Vince Carter",
                 "Doug Christie",
                 "Alvin Robertson"
              ]
           },
           {
              "questionId": 26,
              "category": "basketball",
              "star": true,
              "question": "Who is the only player to average a triple double in the NBA finals?",
              "answer": "LeBron James",
              "choices": [
                 "LeBron James",
                 "Magic Johnson",
                 "Larry Bird",
                 "Oscar Robertson"
              ]
           },
           {
              "questionId": 27,
              "category": "basketball",
              "star": true,
              "question": "Who was the only team to beat Michael Jordan in a series between 1991 and 1998?",
              "answer": "Orlando Magic",
              "choices": [
                 "Houston Rockets",
                 "Detroit Pistons",
                 "Boston Celtics",
                 "Orlando Magic"
              ]
           },
           {
              "questionId": 28,
              "category": "basketball",
              "star": true,
              "question": "How many points did Reggie Miller score in the final 18.7 seconds of Game 1 against the New York Knicks in 1995?",
              "answer": "8",
              "choices": [
                 "6",
                 "8",
                 "10",
                 "12"
              ]
           },
           {
              "questionId": 29,
              "category": "basketball",
              "star": false,
              "question": "Which coach did Latrell Spreewell choke in practice?",
              "answer": "PJ Carlesimo",
              "choices": [
                 "Flip Saunders",
                 "PJ Carlesimo",
                 "Don Nelson",
                 "Eric Musselman"
              ]
           },
           {
              "questionId": 30,
              "category": "basketball",
              "star": false,
              "question": "Who did the Toronto Raptors trade in exchange to the rights for Vince Carter in 1998?",
              "answer": "Antawn Jamison",
              "choices": [
                 "Mike Bibby",
                 "Keon Clark",
                 "Bonzi Wells",
                 "Antawn Jamison"
              ]
           },
           {
              "questionId": 31,
              "category": "basketball",
              "star": true,
              "question": "Who won the 1997 rookie of the year?",
              "answer": "Allen Iverson",
              "choices": [
                 "Marcus Camby",
                 "Steve nash",
                 "Allen Iverson",
                 "Kobe Bryant"
              ]
           },
           {
              "questionId": 32,
              "category": "basketball",
              "star": true,
              "question": "Who were the first team to be a #1 seed and lose to a #8 seed in the NBA playoffs?",
              "answer": "Seattle SuperSonics",
              "choices": [
                 "LA Lakers",
                 "Seattle SuperSonics",
                 "Portland Trailblazers",
                 "Milwaukee Bucks",
              ]
           },
           {
              "questionId": 33,
              "category": "basketball",
              "star": false,
              "question": "When was the last time Kobe Byrant made all NBA first team?",
              "answer": "2012-13",
              "choices": [
                 "2013-14",
                 "2012-13",
                 "2011-12",
                 "2010-11"
              ]
           },
           {
              "questionId": 34,
              "category": "basketball",
              "star": false,
              "question": "What two teams did Kareem Abdul-Jabbar play for?",
              "answer": "LA Lakers, Milwaukee Bucks",
              "choices": [
                 "Baltimore Bullets, Seattle Supersonics",
                 "LA Lakers, New York Knicks",
                 "Milwauke Bucks, Houston Rockets",
                 "LA Lakers, Milwaukee Bucks"
              ]
           },
           {
              "questionId": 35,
              "category": "basketball",
              "star": false,
              "question": "What team originally drafted Brandon Roy in 2006?",
              "answer": "Minnesota Timberwolves",
              "choices": [
                 "Minnesota Timberwolves",
                 "Indian Pacers",
                 "Washington Wizards",
                 "Toronto Raptors"
              ]
           },
           {
              "questionId": 36,
              "category": "basketball",
              "star": false,
              "question": "1989 NBA Playoffs - Game 5 between the Chicago Bulls and Cleveland Cavaliers - Michael Jordan made what came to be known today as \"The Shot\". The Bulls were trailing by one point and had the ball with 3 seconds to go. Who did Jordan shoot over?",
              "answer": "Craig Ehlo",
              "choices": [
                 "Craig Ehlo",
                 "Ron Harper",
                 "Larry Nance",
                 "Mark Price"
              ]
           },
           {
              "questionId": 37,
              "category": "basketball",
              "star": false,
              "question": "What shoes was Jordan wearing when he made his first well known “game winner”?",
              "answer": "Jordan 4",
              "choices": [
                 "Jordan 1",
                 "Jordan 3",
                 "Jordan 4",
                 "Jordan 13"
              ]
           },
           {
              "questionId": 38,
              "category": "basketball",
              "star": true,
              "question": "Which of the following was a NBA scoring champ one year after being named Rookie of the Year?",
              "answer": "Dave Bing",
              "choices": [
                 "Dave Bing",
                 "Michael Jordan",
                 "Lebron james",
                 "Kobe Bryant"
              ]
           },
           {
              "questionId": 39,
              "category": "basketball",
              "star": true,
              "question": "What number did Scottie Pippen wear?",
              "answer": "33",
              "choices": [
                 "23",
                 "32",
                 "33",
                 "34",
                 "43"
              ]
           },
           {
              "questionId": 40,
              "category": "basketball",
              "star": true,
              "question": "Who won the 2005 NBA MVP?",
              "answer": "Steve Nash",
              "choices": [
                 "Lebron James",
                 "Kobe Bryant",
                 "Steve Nash",
                 "Dirk Nowitzki"
              ]
           },
           {
              "questionId": 41,
              "category": "basketball",
              "star": true,
              "question": "What player led the NBA in points per game during the 03-04 season?",
              "answer": "Tracy McGrady",
              "choices": [
                 "Peja Stojakovic",
                 "Kevin Garnett",
                 "Kobe Bryant",
                 "Tracy McGrady"
              ]
           },
           {
              "questionId": 42,
              "category": "basketball",
              "star": true,
              "question": "What year did LeBron James win his first MVP?",
              "answer": "2008-2009",
              "choices": [
                 "2007-2008",
                 "2006-2007",
                 "2008-2009",
                 "2010-2011"
              ]
           },
           {
              "questionId": 43,
              "category": "basketball",
              "star": true,
              "question": "Who was the NBA’s first ever MVP in 1956?",
              "answer": "Bob Pettit",
              "choices": [
                 "Bob Pettit",
                 "George Mikan",
                 "Bill Sharman",
                 "Larry Foust"
              ]
           },
           {
              "questionId": 44,
              "category": "basketball",
              "star": true,
              "question": "What was LeBron James rookie stat line?",
              "answer": "20PPG-5APG-5RPG",
              "choices": [
                 "18PPG-6APG-6RSP",
                 "25PPG-5APG-6RPG",
                 "20PPG-5APG-5RPG",
                 "22PPG-8APG-5RPG"
              ]
           },
           {
              "questionId": 45,
              "category": "basketball",
              "star": true,
              "question": "Who won MVP in 2008?",
              "answer": "Kobe Bryant",
              "choices": [
                 "Chris Paul",
                 "Steve Nash",
                 "Dirk Nowitzki",
                 "Steve Jobs"
              ]
           },
           {
              "questionId": 46,
              "category": "basketball",
              "star": true,
              "question": "What team did Damian Lillard eliminate with an iconic game winner over Paul George?",
              "answer": "OKC thunder",
              "choices": [
                 "Indiana Pacers",
                 "LA Clippers",
                 "OKC thunder",
                 "Atlanta hawks"
              ]
           },
           {
              "questionId": 47,
              "category": "basketball",
              "star": true,
              "question": "How many sixth man of the year awards has Jamal Crawford won?",
              "answer": "3",
              "choices": [
                 "2",
                 "3",
                 "4",
                 "5"
              ]
           },
           {
              "questionId": 48,
              "category": "basketball",
              "star": true,
              "question": "Which player is the all time leader in points scored for the Memphis Grizzlies?",
              "answer": "Mike Conley",
              "choices": [
                 "Marc Gasol",
                 "Zach Randolph",
                 "Pau Gasol",
                 "Mike Conley"
              ]
           },
           {
              "questionId": 49,
              "category": "basketball",
              "star": false,
              "question": "Which player was traded from the Toronto Raptors for Kawhi Leonard?",
              "answer": "DeMar DeRozen",
              "choices": [
                 "Malachi Richardson",
                 "DeMar DeRozen",
                 "Delon Wright",
                 "CJ Miles"
              ]
           },
           {
              "questionId": 50,
              "category": "basketball",
              "star": true,
              "question": "Which player scored 37 points in a single quarter?",
              "answer": "Klay Thompson",
              "choices": [
                 "James Johnson",
                 "Steph Curry",
                 "James Harden",
                 "Klay Thompson"
              ]
           },
           {
              "questionId": 51,
              "category": "basketball",
              "star": true,
              "question": "Who is the all time leader in points scored for the Toronto Raptors?",
              "answer": "DeMar DeRozan",
              "choices": [
                 "DeMar DeRozan",
                 "Vince Carter",
                 "Chris Bosh",
                 "Kawhi Leonard"
              ]
           },
           {
              "questionId": 52,
              "category": "basketball",
              "star": true,
              "question": "What is Dwayne Wade’s nickname?",
              "answer": "Flash",
              "choices": [
                 "Lightning",
                 "Speedy",
                 "Invisible Man",
                 "Flash"
              ]
           }
        ]
     }
   
    const exitingQuesions = await TriviaQuestions.countDocuments()
    if(exitingQuesions === 0){
        const response = await TriviaQuestions.insertMany(questions.questions)
    }
    
   
    
    return res.status(200);
})







module.exports = router;