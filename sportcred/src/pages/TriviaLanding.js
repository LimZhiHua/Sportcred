import React from "react";
import { Button } from "reactstrap";
import FloatingSection from "../customComponents/FloatingSection";
import "../App.css";
import { useHistory } from "react-router-dom";

import {
    TRIVIA_SINGLE_PLAYER_URL
  } from "../urls";
const TriviaLanding = () => {

    const history = useHistory();

    const goToSinglePlayer = () =>{ 
      history.push(TRIVIA_SINGLE_PLAYER_URL);
    }
    
    
    return (
        <FloatingSection>
            <h1>TriviaLanding TODO</h1>
            <br></br>
            <Button  id="SinglePlayerButton" onClick={goToSinglePlayer}>Single Player</Button>

            <br></br>
            <br></br>
            <Button >Multiplayer</Button>

        </FloatingSection>
    )
}

export default TriviaLanding;