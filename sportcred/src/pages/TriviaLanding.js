import React from "react";
import FloatingSection from "../customComponents/FloatingSection";
import "../App.css";
import { useHistory } from "react-router-dom";
import {DefaultButton} from "../customComponents/buttons/Buttons"


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
            <DefaultButton label= {"Single Player"} onClick = {goToSinglePlayer}/>
            <br></br>
            <br></br>
            <DefaultButton label= {"Multiplayer"} />

        </FloatingSection>
    )
}

export default TriviaLanding;