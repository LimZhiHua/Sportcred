import React, { useState, useEffect }  from "react";
import { Button } from "reactstrap";
import FloatingSection from "../customComponents/FloatingSection";
import "../App.css";
import {DefaultButton, AnswerButton} from "../customComponents/buttons/Buttons"
import {Grid} from '@material-ui/core/';

 import  {addTrivia, getTrivia, incrementScore, finishTrivia, resetTriviaCount, getTriviaCount, subtractTriviaCount} from '../controller/trivia';






const TriviaSinglePlayer = () => {
    const [gameStarted, setGameStarted] = useState(false);
    
    const [questionList, setQuestionList] = useState([])
    const [curQuestion, setCurQuestion] = useState('')
    const [questNum, setQuestNum ] = useState(0)

    const [answerList, setAnswerList] = useState([])
    const [curAnswers, setCurAnswers] = useState([])
    const [correctAnswers, setCorrectAnswers] = useState([])


    const [secondsLeft, setSecondsLeft] = useState(17)

    const [score, setScore] = useState(0)
    const [sessionID, setSessionID] = useState()

    //-------------------------request body formats for making the API calls-----------------------------------------------
    
    // Replace this with the actual playerID once we get that part implemented
    // Dont just stick any random string when testing. it needs to be a valid mongoDB ID
    const playerID = "60e39a703a9e9634446d66e6"
    var player = {        
        "players":  [
        {
          "userId": playerID,
          "totalScore": 0,
          "done": false,
        },
        {
            "userId": playerID,
            "totalScore": 0,
            "done": false,
          }
      ]
    }
    //-------------------------------------------------

    // Used to start a game (duh)
    const startGame = async () =>{
        // First, we need to make sure they have games they can play

        const trivCount =  (await getTriviaCount(playerID)).triviaCount
        if(trivCount < 0){
            window.alert("You are out of trivia tries today!")
            return;
        }
        // we pass the player info in and get a game ID
        const gameID = (await addTrivia(player)).id
        // We use that gameID to get our trivia session and set our gamePlayerInfo
        const triviaSession = await getTrivia(gameID)
        const quiz = triviaSession.trivia.questions
        const questions = quiz.map(e => e.question)
        const answers = quiz.map(e => e.answers)


        // We subtract at the start of the game to prevent abuse
        subtractTriviaCount(playerID)
        setSessionID(gameID)
        // Loop through the answers and make an array of all the correct ones
        const corAnswers = answers.map(answerArray =>{
            for(var i = 0; i < answerArray.length; i++){
                if(answerArray[i].isCorrect){
                    return answerArray[i].answerBody
                }
            }
        })

        // look man, i aint going through and remembering all the correct answers when testing. Just open console to see the answers
        console.log("quiz is", quiz)
        console.log("answers is", answers)

        // We save the questions/answers in them states
        setQuestionList(questions)
        setAnswerList(answers)
        setCorrectAnswers(corAnswers)

        // reason why i used gameEnded and gameStarted is for the end game screen. 
        gameEnded = false;
        setGameStarted(true)
    }
 
    // Once they finish answering, there is a play again button to bring them back to home.
    const endGame = () =>{

        // Currently, cause we have no users, it crashes cause he tries to getUser. 
        finishTrivia(sessionID, playerID, score)
        setGameStarted(false)
        setQuestNum(0)
        setScore(0)
    }

    const checkAnswer = (e) => {
        if(e.target.textContent === correctAnswers[questNum]){
            setScore(score + 1)
            incrementScore(sessionID, playerID)
        }
        nextQuestion()
    }

    const nextQuestion = () =>{
        setQuestNum( questNum + 1)
        setSecondsLeft(17)
    }

    let gameEnded = false;

    //----------Lets put all the random components in this section----------
    const startButton = () =>{
        if(! gameStarted){
            return <div>
            <br></br>
            <DefaultButton label= {"Start Game"} handleClick = {startGame}/>
               <br></br>
           </div>
        }
    }

    const playAgainButton = () =>{
        if(gameEnded){
            return <div>
            <br></br>
               <Button onClick={endGame}>Play Again</Button>
               <br></br>`
           </div>
        }
    }

    const questionBoard = () =>{
        return(
            <div>
                <h1> {curQuestion}</h1>
                <h2> {secondsLeft}</h2>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <AnswerButton label= {curAnswers[0].answerBody} handleClick = {checkAnswer}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AnswerButton label= {curAnswers[1].answerBody} handleClick = {checkAnswer}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AnswerButton label= {curAnswers[2].answerBody} handleClick = {checkAnswer}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AnswerButton label= {curAnswers[3].answerBody} handleClick = {checkAnswer}/>
                    </Grid>
                </Grid>
            </div>
            )
    }

    // Returns the questions if we are in a game. Once the game ends, return the score screen.
    const triviaBoard = () =>{
        if(gameStarted){
            if(questNum  < questionList.length){
                if(secondsLeft  <=0 )    {
                    nextQuestion()
                }
                return questionBoard()
            }else{
                gameEnded = true;
                return scoreScreen()
            }
           
        }
               
    }    

    const scoreScreen = () =>{
        return <div>
        <p> You got {score}/{questionList.length}</p>
        {playAgainButton()}
        </div>
    }

    const resetCount = async () =>{
       console.log("output of reset trivia count is", await resetTriviaCount(playerID))

    }

    const getCount = async () =>{
       const trivCount =  (await getTriviaCount(playerID)).triviaCount
       console.log("get trivia returend", trivCount)
     }

     
    const subtractCount = async () =>{
        const trivCount =  await subtractTriviaCount(playerID)
        console.log("subtract trivia returend", trivCount.triviaCount)
      }
    //-------------lets group the useEffects together--------------------------------------------


    useEffect( () => {
        setCurQuestion(questionList[questNum])
        setCurAnswers(answerList[questNum])
    },[questNum, questionList, answerList])



    useEffect(() => {
        const interval = setInterval(() => {
          setSecondsLeft(secondsLeft => secondsLeft - 1);
        }, 1000);
        return () => clearInterval(interval);
      }, [secondsLeft]);

    //
    return (
        <FloatingSection>
            <button onClick={resetCount}>testing reset</button>
            <button onClick={getCount}>testing get</button>
            
            <button onClick={subtractCount}>testing subtract</button>
            <h1>Trivia Single Player</h1>
            <br></br>
            <br></br>
            {startButton()}
            {triviaBoard()}
        </FloatingSection>
    )
}

export default TriviaSinglePlayer;