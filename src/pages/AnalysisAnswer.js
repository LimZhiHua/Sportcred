import FloatingSection from "../customComponents/FloatingSection";
import {BasicTextArea} from "../customComponents/inputFields/inputFields";
import {DefaultButton} from "../customComponents/buttons/Buttons"
import  {addTrivia, getTrivia, incrementScore, finishTrivia} from '../controller/trivia';
import React, { useState, useEffect }  from "react";

import { getDailyQuestion, addResponse } from "../controller/analysis";
import {useAuth0} from "@auth0/auth0-react"



const AnalysisAnswer = () => {
  const [todaysQuestion, setTodaysQuestion] = useState('Unfortunately, we have run out of questions ')
  const [questionID, setQuestionID] = useState(null)
  const [answer, setAnswer] = useState("")
  // this is to see if he has already answered
  const [answered, setAnswered] = useState("")
  const { user } = useAuth0();
  const userID = user.sub.split("|")[1]


  const setDailyQuestion = async () => {
    const dailyQuestion = (await getDailyQuestion(userID)).foundPost
    console.log("----------------question is--------------", dailyQuestion)
    setTodaysQuestion(dailyQuestion.question)
    setQuestionID(dailyQuestion.questionId)
    setAnswered(dailyQuestion.answered)
    // I should set the default value of the answer if he has answered. 
  }

  function changeAnswer(e){
    setAnswer(e.target.value)
}


const submitAnswer = async () =>{
  if(!answered){
     const status = (await addResponse(questionID, userID, answer)).status
     if(status == 200){
       window.alert("Answer saved successfully")
       setAnswered(true)
     }
  }else{
    window.alert("You have already saved a response!")
  }
}

  useEffect(() => {
    setDailyQuestion()
}, [setTodaysQuestion]);


  return (
    <>
      <FloatingSection>
        <h1>Today's Analysis</h1>
        <br></br>
        <h3>{todaysQuestion}</h3>
        <BasicTextArea onChange={changeAnswer} style={{ 'height': "500px", "width": "80%" }}></BasicTextArea>
        <br></br>
        <DefaultButton style={{ 'backgroundColor': "#FF652F"}}label= {"SUBMIT"}  onClick = {submitAnswer} />
      </FloatingSection>
    </>
  )
}

export default AnalysisAnswer;