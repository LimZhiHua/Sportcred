import React from "react";
import { Link } from "react-router-dom";
import { Button } from '@material-ui/core';

// Stuff that should not be here
import { getAllPosts } from '../controller/post';

import {
    SIGNIN_URL,
    SIGNUP_URL
  } from "../urls";

import FloatingSection from "../customComponents/FloatingSection";

const Homepage = () => {
    return (
        <div>
            <FloatingSection>
                <h1>Sportscred App</h1>
                <p>This is the initial landing page for when users are not logged in?</p>
                {/* TODO: make navbar elsewhere */}
                <ul>
                    <li><Link to={SIGNIN_URL}>Sigin</Link></li>
                    <li><Link to={SIGNUP_URL}>Signup</Link></li>
                </ul>
            </FloatingSection>
            <FloatingSection>
                <h2>Dev Notes</h2>
                <pre>
                    - Auth stuff and reducers from Binary-1's project not imported (Just so its less confusing)
                </pre>
                <h3>If this button is nice and blue than Material UI is working</h3>
                <Button variant="contained" color="primary">Test Button Primary</Button>
            </FloatingSection>
            <FloatingSection>
                <h2>Test Client API Calls<br></br>(Check Network Tab for Success)</h2>
                <Button variant="contained" onClick={getAllPosts}>Get All Posts</Button>
            </FloatingSection>
        </div>
    )
}

export default Homepage;
