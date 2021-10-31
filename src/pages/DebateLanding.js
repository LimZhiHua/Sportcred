import React from "react";
import FloatingSection from "../customComponents/FloatingSection";
import {DefaultButton} from "../customComponents/buttons/Buttons";
import { useHistory } from "react-router-dom";
import { ANALYSIS_LANDING_URL, ANALYSIS_ANSWER_URL, ANALYSIS_RATING_URL, ANALYSIS_HISTORY_URL } from "../urls";

const DebateLanding = () => {

    const history = useHistory();

    const goAnwserQuestion = () =>{
        history.push(ANALYSIS_ANSWER_URL);
    }

    const goRateAnswers = () =>{
        history.push(ANALYSIS_RATING_URL);
    }

    const goViewQuestionsAnswers = () =>{
        history.push(ANALYSIS_HISTORY_URL);
    }

    return (
        <FloatingSection>
            <h1>Analysis Landing</h1>
            <br></br>
            <DefaultButton label= {"Anwser Today's Question"} onClick = {goAnwserQuestion}/>
            <br></br>
            <br></br>
            <DefaultButton label= {"Rate Anwser for Today's Question"} onClick = {goRateAnswers}/>
            <br></br>
            <br></br>
            <DefaultButton label= {"View Previous Questions and Answers"} onClick = {goViewQuestionsAnswers}/>
            <br></br>
            <br></br>

        </FloatingSection>
            )
}

export default DebateLanding;