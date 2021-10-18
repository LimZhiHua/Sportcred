import React from "react";
import FloatingSection from "../customComponents/FloatingSection";

import { getAllPosts, newPost } from '../controller/post';

// material ui
import Button from '@material-ui/core/Button';

import {
    SERVER_ROOT
} from "../urls";


const DevHomePage = () => {
    return (
        <div>
            <FloatingSection>
                <h2>Dev Notes</h2>
                <pre style={{overflow: "auto"}}>
                    - Auth stuff and reducers from Binary-1's project not imported (Just so its less confusing)
                </pre>
            </FloatingSection>
            <FloatingSection>
                <h2>Test Client API Calls<br></br>(Check Network Tab for Success)</h2>
                <Button variant="contained" onClick={getAllPosts}>Get All Posts</Button>
                <a href={SERVER_ROOT + "/api-docs/"}><Button variant="contained" color="primary">See API DOCS</Button></a>
            </FloatingSection>
        </div>
    );
}

export default DevHomePage;