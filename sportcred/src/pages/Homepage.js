import React, { useState } from "react";
import { Link } from "react-router-dom";

import SigninComponent from "../customComponents/SigninComponent";
import RegisterComponent from "../customComponents/RegisterComponent";

import Button from '@material-ui/core/Button';

import {
    SIGNIN_URL,
    SIGNUP_URL
} from "../urls";

import FloatingSection from "../customComponents/FloatingSection";

var counter = 0;


const Homepage = () => {
    const [loginOrRegister, setLoginOrRegister] = useState("Register");
    const [loginOrRegisterComponent, setLoginOrRegisterComponent] = useState(<SigninComponent />);

    const buttonPress = () => {
        if (counter === 0) {
            counter++;
            setLoginOrRegister("Login")
            setLoginOrRegisterComponent(<RegisterComponent />);
        } else {
            counter--;
            setLoginOrRegister("Register")
            setLoginOrRegisterComponent(<SigninComponent />);
        }
    }
    return (
        <div>
            <FloatingSection>
                <h1>Sportscred App</h1>
                {/* TODO: make navbar elsewhere */}
                {loginOrRegisterComponent}
                <a href="#" onClick={(e) => buttonPress()}>{loginOrRegister} </a>

            </FloatingSection>
        </div>
    )
}

export default Homepage;
