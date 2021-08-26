import './Homepage.css'
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';

import { AiOutlineMessage, AiOutlineMore, AiOutlineShareAlt } from "react-icons/ai";

import SigninComponent from "../customComponents/SigninComponent";
import RegisterComponent from "../customComponents/RegisterComponent";
import PostSlider from "../customComponents/postSlider/PostSlider";

import Button from '@material-ui/core/Button';

// Stuff that should not be here
import { getAllPosts } from '../controller/post';

import {
    SIGNIN_URL,
    SIGNUP_URL
} from "../urls";

import FloatingSection from "../customComponents/FloatingSection";

var counter = 0;

const PostContainer = ({
        Header = () => <div></div>, 
        Body = () => <div></div>, 
        Footer = () => <div></div>}) => {
    return (
        <FloatingSection>
            <Header/>
            <Body/>
            <Footer/>
        </FloatingSection>
    )
}

const PostHeader = ({displayname = "Unknown", score = 0, datetime = new Date(Date.now()).toLocaleString()}) => {
    return (
        <div className="post-header">
            <Grid container spacing={3}>
                <Grid item xs={6} className="left">
                    <span className="displayname">{displayname}</span>
                    <span className="acs-score">{score}</span>
                </Grid>
                <Grid item xs={6} className="right">
                    <span className="datetime">{datetime}</span>
                </Grid>
            </Grid>
        </div>
    )
}

const PostCreate = () => {
    return (
        <PostContainer className="postcontainer"
            Body={()=>
                <div>
                    <div>Lala</div>
                </div>
            }
        />
    )
}

const Post = ({
        title = "Unset title", 
        content = ".... ....... .... .... ... ....... ...",
        numComments = 0    
    }) => {
    return (
        <PostContainer 
            Header={PostHeader}
            Body={()=>
                <div className="post-body">
                    <div className="title">{title}</div>
                    <div className="content">{content}</div>
                </div>
            }
            Footer={()=>
                <div className="post-footer lined-footer">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={8}>
                            <PostSlider/>
                        </Grid>
                        <Grid item xs={5} sm={2} className="center-center">
                            <AiOutlineMessage/><span className="comment-count">{numComments}</span>
                        </Grid>
                        <Grid item xs={4} sm={1} className="center-center">
                            <AiOutlineShareAlt/>
                        </Grid>
                        <Grid item xs={3} sm={1} alignItems="center" className="right">
                            <AiOutlineMore/>
                        </Grid>
                    </Grid>
                </div>
            }
        />
    )
}

const PostsPage = () => {

    return (
        <>
            <PostCreate/>
            <Post/>
        </>
    )
}

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
            <hr/>
            <PostsPage></PostsPage>
        </div>
    )
}

export default Homepage;
