import React from "react";
import { Button } from "reactstrap";
import FloatingSection from "../customComponents/FloatingSection";
import "../App.css";
import {orangeButton} from "../style.jsx"

const TriviaLanding = () => {
    return (
        <FloatingSection>
            <h1>TriviaLanding TODO</h1>
            <Button className = "orangeButton">why you no work</Button>
            <br></br>
            <Button style = {orangeButton}>this works, but Jenny hates it</Button>

            <br></br>
            <Button variant = "primary">why you no work</Button>

        </FloatingSection>
    )
}

export default TriviaLanding;