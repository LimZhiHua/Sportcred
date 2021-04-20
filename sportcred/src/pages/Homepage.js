import React from "react";
import { Link } from "react-router-dom";
import Signin from "./Signin";

import {
    SIGNIN_URL,
    SIGNUP_URL
  } from "../urls";

const Homepage = () => {
    return (
        <div>
            <h1>Sportscred App TODO</h1>
            {/* TODO: make navbar elsewhere */}
            <ul>
                <li><Link to={SIGNIN_URL}>Sigin</Link></li>
                <li><Link to={SIGNUP_URL}>Signup</Link></li>
            </ul>
        </div>
    )
}

export default Homepage;
