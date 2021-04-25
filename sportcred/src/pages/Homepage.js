import React from "react";
import { Link } from "react-router-dom";

import {
    SIGNIN_URL,
    SIGNUP_URL
  } from "../urls";

import FloatingSection from "../customComponents/FloatingSection";

const Homepage = () => {
    return (
        <FloatingSection>
            <h1>Sportscred App</h1>
            <p>This is the initial landing page for when users are not logged in?</p>
            {/* TODO: make navbar elsewhere */}
            <ul>
                <li><Link to={SIGNIN_URL}>Sigin</Link></li>
                <li><Link to={SIGNUP_URL}>Signup</Link></li>
            </ul>
        </FloatingSection>
    )
}

export default Homepage;
