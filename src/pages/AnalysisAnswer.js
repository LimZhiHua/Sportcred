import FloatingSection from "../customComponents/FloatingSection";
import {BasicTextArea} from "../customComponents/inputFields/inputFields";
import {DefaultButton} from "../customComponents/buttons/Buttons"
import  {addTrivia, getTrivia, incrementScore, finishTrivia} from '../controller/trivia';
import React, { useState, useEffect }  from "react";




const submitAnswer = () =>{


}

const getQuestion = () => {

}


const AnalysisAnswer = () => {
  const [todaysQuestion, setTodaysQuestion] = useState('')

  return (
    <>
      <FloatingSection>
        <h1>Today's Analysis</h1>
        <br></br>
        <h3>Q: What is life?</h3>
        <BasicTextArea style={{ 'height': "500px" }}></BasicTextArea>
        <br></br>
        <br></br>
        <DefaultButton style={{ 'backgroundColor': "#FF652F"}}label= {"SUBMIT"} onClick = {submitAnswer} />
      </FloatingSection>
    </>
  )
}

export default AnalysisAnswer;