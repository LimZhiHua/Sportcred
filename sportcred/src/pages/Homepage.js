import React, { useState } from "react";
import { Link } from "react-router-dom";

import SigninComponent from "../customComponents/SigninComponent";
import RegisterComponent from "../customComponents/RegisterComponent";

import Button from '@material-ui/core/Button';

// Stuff that should not be here
import { getAllPosts } from '../controller/post';

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

                <ul>
                    <li><Link to={SIGNIN_URL}>Sigin</Link></li>
                    <li><Link to={SIGNUP_URL}>Signup</Link></li>
                </ul>
            </FloatingSection>
            <FloatingSection>
                <h2>Dev Notes</h2>
                <pre style={{overflow: "auto"}}>
                    - Auth stuff and reducers from Binary-1's project not imported (Just so its less confusing)
                </pre>
            </FloatingSection>
            <FloatingSection>
                <h2>Test Client API Calls<br></br>(Check Network Tab for Success)</h2>
                <Button variant="contained" onClick={getAllPosts}>Get All Posts</Button>
                <a href="http://localhost:5000/api-docs/"><Button variant="contained" color="primary">See API DOCS</Button></a>
            </FloatingSection>
        </div>
    )
}

export default Homepage;
