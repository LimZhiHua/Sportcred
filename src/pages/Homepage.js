import './Homepage.css'
import React, { useState, useEffect } from "react";
import {PostsPage} from "../customComponents/Posts"
import {useAuth0} from "@auth0/auth0-react"


const Homepage = () => {

    const { getAccessTokenSilently, isAuthenticated} = useAuth0();
    if (isAuthenticated) {
        getAccessTokenSilently().then((value) => sessionStorage.setItem('token', value));
    } 
    return (
        <div>
            <PostsPage></PostsPage>
        </div>
    )
}

export default Homepage;
