import React, { useState, useEffect }  from "react";
import { Button } from "reactstrap";
import FloatingSection from "../customComponents/FloatingSection";
import "../App.css";
import {greyButton, yellowButton} from "../style.jsx"






const TriviaSinglePlayer = () => {
    const [gameStarted, setGameStarted] = useState(false);
    
    const [questionList, setQuestionList] = useState([])
    const [curQuestion, setCurQuestion] = useState('')
    const [questNum, setQuestNum ] = useState(0)

    const [answerList, setAnswerList] = useState([])
    const [curAnswers, setCurAnswers] = useState([])
    const [correctAnswers, setCorrectAnswers] = useState([])


    const [secondsLeft, setSecondsLeft] = useState(15)

    const [score, setScore] = useState(0)


    const startGame = () =>{
        gameEnded = false;
        setGameStarted(true)
    }

    const checkAnswer = (e) => {
        if(e.target.innerText === correctAnswers[questNum]){
            setScore(score + 1)
        }
        
        nextQuestion()
    }

    const nextQuestion = () =>{
        setQuestNum( questNum + 1)
        setSecondsLeft(15)
    }

    let gameEnded = false;

    //----------Lets put all the random components in this section----------
    const startButton = () =>{
        if(! gameStarted){
            return <div>
            <br></br>
               <Button style = {yellowButton} onClick={startGame}>Start Game</Button>
               <br></br>`
           </div>
        }
    }

    const playAgainButton = () =>{
        if(gameEnded){
            return <div>
            <br></br>
               <Button style = {yellowButton} onClick={startGame}>Play Again</Button>
               <br></br>`
           </div>
        }
    }

    const questionBoard = () =>{
        return(
            <div>
                <h1> {curQuestion}</h1>
                <h2> {secondsLeft}</h2>
                <table className="table table-dark">
                    <tbody>
                    <tr>
                        <th><Button id="answer 0" for style = {greyButton} onClick={checkAnswer}>{curAnswers[0]}</Button></th>
                        <th><Button id="answer 1" style = {greyButton} onClick={checkAnswer} >{curAnswers[1]}</Button></th>
                    </tr>       
                    <tr>
                        <th><Button id="answer 2" style = {greyButton} onClick={checkAnswer}>{curAnswers[2]}</Button></th>
                        <th><Button id="answer 3" style = {greyButton} onClick={checkAnswer} >{curAnswers[3]}</Button></th>
                    </tr>
                    </tbody>
                </table>
            </div>
            )
    }
    
    const triviaBoard = () =>{
        if(gameStarted){
            if(questNum  < questionList.length){
                if(secondsLeft  <=0 )    {
                    nextQuestion()
                }
                return questionBoard()
            }else{
                gameEnded = true;
                return <p> You got {score}/{questionList.length}</p>
            }
           
        }
               
    }    
    //----------Lets put all the API calls in this section-------------
    // (hardcoding them for now though)
    const getQuestions=  () =>{
        // i aint gonna bother with getting the questions from backend right now. gonna just make up some questions.
        setQuestionList(["What is your name?", "What is your quest?", "What is your favourite colour?", "What is the airspeed velocity of an unladen swallow?"])
    }

    const getAnswers = () =>{
        setAnswerList( [
            [ "Bob", "Arthur", "John Cena", "John Wick"],
            ["To Seek the holy grail", "To take a nap", "Revenge", "Fun"],
            ["Red", "Orange", "Green", "Blue"],
            ["20km/h", "30km/h", "40km/h", "50km/h"]
    ])

    setCorrectAnswers([
        "Arthur", "To Seek the holy grail", "Blue", "40km/h"
    ])
    }
    //-------------lets group the useEffects together--------------------------------------------
    useEffect( () => {
        getQuestions()
        getAnswers()

    },[])

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

    //------------------------------------------------------------------------

    return (
        <FloatingSection>
            <h1>Trivia Single Player</h1>
            <br></br>
            <br></br>
            {startButton()}
            {triviaBoard()}
        </FloatingSection>
    )
}

export default TriviaSinglePlayer;