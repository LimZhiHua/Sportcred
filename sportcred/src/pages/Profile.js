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


    async function getUserInfo() {
        const info = await getUser(userID)
        const user = info.user
        console.log("info is", info.user)
        setACS(user.acs)
        setDescription(user.description)
        setEmail(user.email)
        setStatus(user.status)
        setUsername(user.username)
        setProfilePicB64(user.profilePic)

    }

    useEffect ( () =>{

        getUserInfo()

    })

    return (
        <div>
            <Grid container spacing = {3}>
                <Grid item xs={4}>
                    <Paper className={classes.paperWhite}>{username} </Paper>
                </Grid>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={4}>
                    <DefaultButton label= {"Edit"} onClick={goToEditProfile} />
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paperWhite}><b>ACS: </b>{acs} </Paper>
                </Grid>
                <Grid item xs={4}>
                        <img src={profilePicB64? profilePicB64 : null} alt={profilePicB64? profilePicB64.name : null} style={{maxWidth: "500px", maxHeight:"300px"}}/>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paperWhite}> <div><b>About Me:</b> <br/>{description}</div> </Paper>
                </Grid>
                <Grid item xs={12}>
                    <FloatingSection>
                         <h1>Im guessing we are going to have a component for the feed? since we will likely be using it in other parts of the app</h1>
                    </FloatingSection>
                </Grid>


        </Grid>

        </div>

    )
}

export default Profile;