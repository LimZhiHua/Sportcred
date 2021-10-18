import React, { useState,useEffect } from "react";
import FloatingSection from "../customComponents/FloatingSection";
import {Grid, Paper} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

import {DefaultButton} from "../customComponents/buttons/Buttons"
import  {getUser} from '../controller/user';
import {
    EDIT_PROFILE_URL,
  } from "../urls";
  
import {useAuth0} from "@auth0/auth0-react"

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paperWhite: {
      padding: theme.spacing(2),
      textAlign: 'center',
    },
  }));




const Profile = () => {
    // im hardcoding a userID for now 

    const { user } = useAuth0();

    const classes = useStyles();

    const [acs, setACS] = useState(0)
    const [description, setDescription] = useState('')
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('')
    const [username, setUsername] = useState('')
    const [profilePicB64, setProfilePicB64] = useState(null)

    const history = useHistory();
    const goToEditProfile = () =>{ 
      history.push(EDIT_PROFILE_URL);
    }
    
    const userID = user.sub.split("|")[1]

    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function getUserInfo() {
        const info = await getUser(userID)
        const user = info.user
        setACS(user.acs)
        setDescription(user.description)
        setEmail(user.email)
        setStatus(user.status)
        setUsername(user.username)
        setProfilePicB64(user.profilePic)
    }

    useEffect (() =>{
        getUserInfo()
    });

    const LabelDetail = ({label, value, indented=false}) => {
        return (
            <div className="post-header">
                <b>{label}: </b> 
                {(indented)
                    ? <div className="indent">{value}</div>
                    : <span>{value}</span>}
            </div>
        );
    };

    return (
        <div style={{padding: "1em"}}>
            <h1 style={{color: "white"}}>My Profile</h1>
            <Grid   container 
                    spacing={1} 
                    alignItems="center"
                    style={{padding: "1em"}}>
                <Grid   item 
                        md="auto" 
                        xs={12} 
                        style={{backgroundColor: "#343434"}}>
                    <img 
                        src={profilePicB64? profilePicB64 : null} 
                        alt={profilePicB64? profilePicB64.name : null} 
                        style={{minWidth:        "200px",
                                maxwidth:        "500px", 
                                height:          "300px",
                                minHeight:       "300px",
                                backgroundColor: "#909090"}}/>
                </Grid>
                <Grid item md xs={12}>
                    <Paper  className={classes.paperWhite} 
                            style={{backgroundColor: "#909090",
                                    boxSizing:       "border-box",
                                    minHeight:       "300px",
                                    textAlign:       "left"}}>
                        <LabelDetail label="ACS" value={acs}/>
                        <LabelDetail label="Username" value={username}/>
                        <LabelDetail label="Email" value={email}/>
                        <LabelDetail label="Status" value={status} indented={true}/><br/>
                        <LabelDetail label="About Me" value={description} indented={true}/>
                    </Paper>
                </Grid>
            </Grid>
            <DefaultButton label= {"Edit"} onClick={goToEditProfile} />
            <br/>
            <br/>
            <FloatingSection><h1>My Posts</h1></FloatingSection>
            <FloatingSection>
                <h1>Im guessing we are going to have a component for the feed? since we will likely be using it in other parts of the app</h1>
            </FloatingSection>
        </div>

    )
}

export default Profile;