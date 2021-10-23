import React from "react";
import FloatingSection from "../customComponents/FloatingSection";
import {DefaultButton} from "../customComponents/buttons/Buttons";
import { useHistory } from "react-router-dom";
import { ANALYSIS_LANDING_URL, ANALYSIS_ANSWER_URL, ANALYSIS_RATING_URL, ANALYSIS_HISTORY_URL } from "../urls";

const AnalysisHistory = () => {

    const history = useHistory();

    const goAnwserQuestion = () =>{
      history.push(ANALYSIS_ANSWER_URL);
    }

    return (
        <FloatingSection>
            <h1>Past Questions</h1>
            <br></br>
            <DefaultButton label= {"Q: What is life"} handleClick = {goAnwserQuestion}/>
            <br></br>
            <br></br>

        </FloatingSection>
)}

export default AnalysisHistory;