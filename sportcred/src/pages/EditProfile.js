import React, { useState,useEffect, useRef} from "react";
import FloatingSection from "../customComponents/FloatingSection";
import {BasicTextFields, BasicTextArea} from "../customComponents/inputFields/inputFields";
import {DefaultButton} from "../customComponents/buttons/Buttons"

import {Button, Grid, Paper, Typography} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import  {getUser, editData, testing} from '../controller/user';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    columnsLabel:{
      width:'20%'
    },
    greyBackground:{
        //backgroundColor: 'black',
        textAlign: 'left',
        padding: theme.spacing(2),
    },
    imgStyle:{
        width:'20%',
        height:'100%'
    }
  }));

const EditProfile = () => {

    const classes = useStyles();

    const [acs, setACS] = useState(0)
    const [description, setDescription] = useState('')
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('')
    const [username, setUsername] = useState('')

    const [profilePicB64, setProfilePicB64] = useState(null)
    const [newProfilePicB64, setNewProfilePicB64] = useState(null)

    const [newDescription, setNewDescription] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newStatus, setNewStatus] = useState('')
    const [newUsername, setNewUsername] = useState('')

    const userID = "60e39a703a9e9634446d66e6"
    
    //-----------Use Effects and the functions made for it (cause you cant call await directly in useEffect)
    async function getUserInfo() {
        const info = await getUser(userID)
        const user = info.user
        setACS(user.acs)
        setDescription(user.description)
        setEmail(user.email)
        setStatus(user.status)
        setUsername(user.username)
        setProfilePicB64(user.profilePic)
        //setDisplayImage(window.URL.createObjectURL(new Blob(base64StringToArrayBuffer(user.profilePicB64))))
    }

    useEffect ( () =>{
        getUserInfo()
    },[description, email])

    // For setting the default new info.
    useEffect ( () =>{
        setNewDescription(description)
        setNewEmail(email)
        setNewStatus(status)
        setNewUsername(username)
        setNewProfilePicB64(profilePicB64)
    },[username, description, email, status, profilePicB64])

     async function fileSelectHandler (event){
        let file_size = event.target.files[0].size;
        console.log("image is this size:", file_size)
        if(file_size < 100000){
            let b64Image = await toBase64(event.target.files[0])
            setProfilePicB64(b64Image)
            setNewProfilePicB64(b64Image)
        }else{
            window.alert("Please selecta an image with size less than 100kb")
        }
    } 

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    function changeUsername(e){
        setNewUsername(e.target.value)
    }

    function changeStatus(e){
        setNewStatus(e.target.value)
    }

    function changeDescription(e){
        setNewDescription(e.target.value)
    }

    function changeEmail(e){
        setNewDescription(e.target.value)
    }

    async function saveNewInfo(){
        const data = {
            "username": newUsername,
            "email": email,    // look man, idk why we can change username, but not email. The edit data checks for username, so im using the old one
            "status": newStatus,
            "description": newDescription,
            "profilePic": newProfilePicB64
          }
        const response = (await editData(data))
        if(response.status == 200){
            window.alert("Data Saved")
            getUserInfo()

        }else{
            window.alert(response.error)
        }
    }

    return (
        <FloatingSection>
            <h1>Edit Profile</h1>   
            <Grid container spacing = {1} >
                <Grid item xs={8} container justify="flex-start">
                    <h1> Hello {username}</h1>
                </Grid>
                <Grid item xs={4} container justify="flex-end">
                    <DefaultButton label="save" onClick={saveNewInfo}/>
                </Grid>
            </Grid>
            <Grid container spacing = {2} className={classes.greyBackground}>
                <Grid item xs={6}  >
                        <Grid container spacing = {1} >
                        <Grid item xs={3} sm={3} >
                                <h2> <b>Username:</b> </h2>
                            </Grid>        
                            <Grid item xs = {9}>
                                <BasicTextArea label = {username} handleChange={changeUsername}></BasicTextArea>
                            </Grid>                            
                            <Grid item xs={3} >
                                <h2> <b>Status:</b> </h2>
                            </Grid>        
                            <Grid item xs = {9}>
                                <BasicTextArea label = {status} handleChange={changeStatus}></BasicTextArea>
                            </Grid>
                            <Grid item xs={3} >
                                <h2> <b>Bio:</b> </h2>
                            </Grid>        
                            <Grid item xs = {9}>
                                <BasicTextArea label = {description} handleChange={changeDescription}></BasicTextArea>
                            </Grid>
                            <Grid item xs={3} >
                                <h2> <b>Email:</b> </h2>
                            </Grid>        
                            <Grid item xs = {9}>
                                <BasicTextArea label = {email} handleChange={changeEmail}></BasicTextArea>
                            </Grid>
                        </Grid>
                    </Grid>
                
                <Grid item  >
                    <input type="file" onChange={fileSelectHandler} accept=".jpg,.jpeg,.png"/><br></br>
                    <img src={newProfilePicB64? newProfilePicB64 : profilePicB64} alt={profilePicB64? profilePicB64.name : null} style={{maxWidth: "500px", maxHeight:"300px"}}/>
                </Grid>
            </Grid>
        </FloatingSection>
    )
}

export default EditProfile;