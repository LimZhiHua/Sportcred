import React, { useState, useRef, useEffect } from "react";
import FloatingSection from "../../customComponents/FloatingSection";
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import './PreSeason.css';
import {AnswerButton,} from "../../customComponents/buttons/Buttons";
import * as APIs from "../../controller/picks";

import {useAuth0} from "@auth0/auth0-react"
import { SinglePlayerDropdown } from "../../customComponents/dropdown/singleSelect";

const useStyles = makeStyles((theme) => ({
    regular: {
        background: '#FF0000',
        border: 0,
         opacity: 0.9,
        //borderRadius: 40,
        height: '97vh',
        width: '20%',
        padding: '1em',
        '&:hover': {
        background: '#FF0000',
        opacity: 0.8
        },
    },
    h1 : {
        color: '#DCDCDC',
    },
    h2: {
        color: '#DCDCDC',
        fontWeight: 'normal',
        display: 'inline',
        marginLeft:'0.2rem',
    },
    rowGroup: {
        display: 'inline'
    },
    formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    '& label.Mui-focused': {
      color: '#c4c4c4',
    },
    //height: 100,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#c4c4c4',
      },
      '&:hover fieldset': {
        borderColor: '#ffff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#c4c4c4',
      },
    },
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    subHeader: {
        backgroundColor: '#343434',
        //minWeight: 100,
        overflow: 'hidden',
        display: 'inline-block',
        borderRadius: 5,
    },
    menuItem: {
      color: 'red',
        backgroundColor: "pink", // updated backgroundColor
    },
    whiteBackground:{
      backgroundColor: "white"
    }
}));

const BootstrapInput = withStyles((theme) => ({
//   root: {
//     'label': {
//       marginTop: theme.spacing(0), 
//     },
//     '& label.Mui-focused': {
//       padding: '10px 26px 10px 12px',
//     },
//   },
  input: {
    borderRadius: 4,
    position: 'relative',
    //backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);


const PreSeason = () => {
    const styles = useStyles();
    const { user } = useAuth0();


     const playerID = user.sub.split("|")[1]
     // Its annoying to display the menu, so im making a function to flatten the array
     const toSingleArray = (resultArray) =>{
      const appendTeam =  resultArray.map(curTeam => {
        // each item is a dictionary with an array. 

        // for each item, I take the team name (team)
        const teamName = curTeam.team
        // then i take the player (players)
        // append the team name for each
        return curTeam.players.map( player => {
           return teamName + "-" + player
        })
      })
     // convert all the teams into one.
      const playerList = appendTeam.flat()
      return playerList
    }

    const refreshData = () => {
      console.log("refreshing data")
     APIs.getPicksData().then((data)=>setData(data.playersByTeams));  
    }   

     const [playerList, setPlayerList] = useState([])
     
     const [result, setData] = React.useState([]);

     const [selectedDefensePlayer, setSelectedDefensePlayer] = useState('')
     const [selectedRookiePlayer, setSelectedRookiePlayer] = useState('')
     const [selectedMVPPlayer, setSelectedMVPPlayer] = useState('')
     const [selected6thPlayer, setSelected6thPlayer] = useState('')
     const [selectedImprovedPlayer, setSelectedImprovedPlayer] = useState('')
     const curYear = 2021


     //------ to handle the changing of selections
     const handleChangeDefense = (event) => {
        //setDate(event.target.value);
        setSelectedDefensePlayer(event.target.value)
    };
    const handleChangeRookie = (event) => {
      setSelectedRookiePlayer(event.target.value)
    };

    const handleChangeMVP = (event) => {
      setSelectedMVPPlayer(event.target.value)
    };
    
    const handleChange6th = (event) => {
      setSelected6thPlayer(event.target.value)
    };
  
    const handleChangeImproved = (event) => {
      setSelectedImprovedPlayer(event.target.value)
    };
     //---------saving the selected player----------------
     const saveDefensePlayer = async () => {
      if(selectedDefensePlayer != "Please Select a Player"){
        const response = await APIs.assignPick(playerID, "Defense Player", selectedDefensePlayer, curYear)
        if(response.status == 200){
          window.alert(selectedDefensePlayer + " has been saved as your defense player pick")
        }else{
          window.alert("Something went wrong when trying to save your pick")
        }
      }
     }

     const saveRookiePlayer = async () => {
      if(selectedRookiePlayer != "Please Select a Player"){
        const response = await APIs.assignPick(playerID, "Rookie Player", selectedRookiePlayer, curYear)
        if(response.status == 200){
          window.alert(selectedRookiePlayer + " has been saved as your rookie player pick")
        }else{
          window.alert("Something went wrong when trying to save your pick")
        }
      }
     }   

     const saveMVPPlayer = async () => {
      if(selectedMVPPlayer !== "Please Select a Player"){
        const response = await APIs.assignPick(playerID, "MVP Player", selectedMVPPlayer, curYear)
        if(response.status == 200){
          window.alert(selectedMVPPlayer + " has been saved as your MVP pick")
        }else{
          window.alert("Something went wrong when trying to save your pick")
        }
      }
     }   
    
     const save6thPlayer = async () => {
      if(selected6thPlayer != "Please Select a Player"){
        const response = await APIs.assignPick(playerID, "6th Player", selected6thPlayer, curYear)
        if(response.status == 200){
          window.alert(selected6thPlayer + " has been saved as your 6th player pick")
        }else{
          window.alert("Something went wrong when trying to save your pick")
        }
      }
     }   

     const saveImprovedPlayer = async () => {
      if(selectedImprovedPlayer != "Please Select a Player"){
        const response = await APIs.assignPick(playerID, "Improved Player", selectedImprovedPlayer, curYear)
        if(response.status == 200){
          window.alert(selectedImprovedPlayer + " has been saved as your most improved pick")
        }else{
          window.alert("Something went wrong when trying to save your pick")
        }
      }
     }   
     //---------setting the default players for the dropdowns------------

     const setDefaultItem = async (sectionName, settingFunction) => {
      let player = (await APIs.getCurrentPick(playerID, sectionName, curYear))
      if(player.status !== 400){
        player = player.pick.pick
      }else{
        player = "Please Select a Player"
      }
      settingFunction(player)
     } 
     
     // first time we open the page, lets get the default players based on their last saved selection
    useEffect(() => {
      refreshData();
      setDefaultItem("Defense Player", setSelectedDefensePlayer)
      setDefaultItem("Rookie Player", setSelectedRookiePlayer)
      setDefaultItem("MVP Player", setSelectedMVPPlayer)
      setDefaultItem( "6th Player", setSelected6thPlayer)
      setDefaultItem("Improved Player", setSelectedImprovedPlayer)
    }, []);

    // this is to convert the players from our API call to a flat array (to stick in our menuitems)
     useEffect ( () =>{
      setPlayerList(toSingleArray(result))
   },[result])

   if(playerList.length !== 0 ){
    return (
      <div>
       <h1 className={styles.h1}>Pre-Season Predictions</h1>
       <Button variant="contained" onClick={refreshData}>Get All Players</Button>
       <FloatingSection>
          <SinglePlayerDropdown title={"MVP of the Year"} boxTitle={"Season MVPs"} selected={handleChangeMVP} default={selectedMVPPlayer} styles = {styles} values={playerList}    onSelect={saveMVPPlayer} ></SinglePlayerDropdown>
       </FloatingSection>
       <FloatingSection>
          <SinglePlayerDropdown title={"Defense Player of the Year"} boxTitle={"Season Defense Player"} selected={handleChangeDefense} default={selectedDefensePlayer} styles = {styles} values={playerList}    onSelect={saveDefensePlayer} ></SinglePlayerDropdown>
       </FloatingSection>
        <FloatingSection>
          <SinglePlayerDropdown title={"Rookie of the Year"} boxTitle={"Season Rookie"} selected={handleChangeRookie} default={selectedRookiePlayer} styles = {styles} values={playerList}    onSelect={saveRookiePlayer} ></SinglePlayerDropdown>
       </FloatingSection>
       <FloatingSection>
          <SinglePlayerDropdown title={"6th Player of the Year"} boxTitle={"Season 6th Player"} selected={handleChange6th} default={selected6thPlayer} styles = {styles} values={playerList}    onSelect={save6thPlayer} ></SinglePlayerDropdown>
       </FloatingSection>
       <FloatingSection>
          <SinglePlayerDropdown title={"Most Improved Player of the Year"} boxTitle={"Season Most Improved Player Player"} selected={handleChangeImproved} default={selectedImprovedPlayer} styles = {styles} values={playerList}    onSelect={saveImprovedPlayer} ></SinglePlayerDropdown>
       </FloatingSection>

       </div>
  );
   }else{
     return <div></div>
   }
    
}

export default PreSeason;