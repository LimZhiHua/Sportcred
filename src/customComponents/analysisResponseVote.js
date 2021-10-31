

import React from "react";
import "./FloatingSection.css";

import SliderComponent from "./slider/SliderComponent";
import Card from "../customComponents/card/Card";
import { DefaultButton } from "./buttons/Buttons";

function AnalysisResponseVote(props) {
    const response = props.response
    const answer = response.response
    const responseID = response._id
    const averageScore = response.averageScore
    return (
        <div>
        <Card style={{display : 'flex'}}>
          <h4>{answer}</h4>
          <SliderComponent responseID={responseID} averageScore={averageScore} saveScore={props.saveScore}></SliderComponent>
        </Card>
        </div>
    )
}

export default AnalysisResponseVote;