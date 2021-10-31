

import React from "react";
import "./FloatingSection.css";

import SliderComponent from "./slider/SliderComponent";
import Card from "../customComponents/card/Card";
import { DefaultButton } from "./buttons/Buttons";

function AnalysisResponseVote(props) {
    const response = props.response
    if(response !== undefined){
      const answer = response.response 
      const question = props.question || ""
      const responseID = response._id
      const averageScore = response.averageScore
      return (
          <div>
          <Card style={{display : 'flex'}}>
            <h2>{question}</h2>
            <h4>{answer}</h4>
            <SliderComponent value={props.value || 0} fixed={props.fixed || false}responseID={responseID} averageScore={averageScore} saveScore={props.saveScore}></SliderComponent>
          </Card>
          </div>
      )
    }else{
      return <div></div>
    }
   
}

export default AnalysisResponseVote;