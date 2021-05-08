import React, { useState, useEffect, useRef }  from "react";
import { Button, Table } from "reactstrap";
import FloatingSection from "../customComponents/FloatingSection";
import "../App.css";
import {greyButton, yellowButton} from "../style.jsx"






const TriviaSinglePlayer = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [questionStarted, setQuestionStarted] = useState(false)

    const [questionList, setQuestionList] = useState([])
    const [curQuestion, setCurQuestion] = useState('')
    const [questNum, setQuestNum ] = useState(0)

    const [answerList, setAnswerList] = useState([])
    const [curAnswers, setCurAnswers] = useState(["placeholder","placeholder","placeholder","placeholder"])

    const [secondsLeft, setSecondsLeft] = useState(15)

    const [newQuestion, setNewQuestion ] = useState(false)

    const startGame = () =>{
        setGameStarted(true)
    }

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



    const questionBoard = () =>{
        return(
            <div>
                <h1> {curQuestion}</h1>
                <h2> {secondsLeft}</h2>
                <table className="table table-dark">
                    <tbody>
                    <tr>
                        <th><Button style = {greyButton}>{curAnswers[0]}</Button></th>
                        <th><Button style = {greyButton}>{curAnswers[1]}</Button></th>
                    </tr>       
                    <tr>
                        <th><Button style = {greyButton}>{curAnswers[2]}</Button></th>
                        <th><Button style = {greyButton}>{curAnswers[3]}</Button></th>
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
                    setQuestNum( questNum + 1)
                    setSecondsLeft(2)
                }
                return questionBoard()
            }else{
                return <p> DONEEEEEEEEEEEEEEE</p>
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
    const testing = () =>{
        setQuestNum(questNum + 1)
        console.log("question number is", questNum)
        console.log('question is', curQuestion)
        console.log('answer is', curAnswers)
        console.log("game started is", gameStarted)
    }

    const testing2 = () =>{
        setGameStarted(false)
    }
    return (
        <FloatingSection>
            <Button onClick={testing} style={yellowButton}> testing button</Button>
            <Button onClick={testing2} style={yellowButton}> testing button 2</Button>
            <h1>Trivia Single Player</h1>
            <br></br>
            <br></br>
            {startButton()}
            {triviaBoard()}
        </FloatingSection>
    )
}

export default TriviaSinglePlayer;