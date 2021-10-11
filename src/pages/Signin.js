import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FloatingSection from "../customComponents/FloatingSection";
import {useAuth0} from "@auth0/auth0-react"
import LoginButton from '../customComponents/buttons/LoginButton';
import LogoutButton from '../customComponents/buttons/LogoutButton';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '27ch',
        background: "white",
        borderRadius: "10px",
        margin: "auto"

    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
        paddingBottom: '1ch'
    },
    button: {
        width: '23ch',
        margin: "auto"

    },
    container: {
        width: '30ch',
        display: 'flex',
        flexDirection: 'column'
    },

}));

// import React from "react";
// import {DefaultButton, AnswerButton, DangerButton} from "../customComponents/buttons/Buttons";
// import SliderComponent from "../customComponents/slider/SliderComponent.js";
// import { BasicTextFields, BasicTextArea } from "../customComponents/inputFields/inputFields.js";
// import PostSlider from "../customComponents/postSlider/PostSlider"


const Signin = () => {
    const styles = useStyles();
    const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();

    if (isAuthenticated) {
        getAccessTokenSilently().then((value) => sessionStorage.setItem('token', value));
    } 

    return (
        <div>
                <FloatingSection>
                    {(isAuthenticated) 
                        ? <LogoutButton/>
                        : <LoginButton/>}
                </FloatingSection>
        </div>
    );
}

export default Signin;