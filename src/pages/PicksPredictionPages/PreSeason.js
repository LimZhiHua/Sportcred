import React, { useState, useEffect } from "react";
import FloatingSection from "../../customComponents/FloatingSection";
import { makeStyles } from '@material-ui/core/styles';

import './PreSeason.css';
import * as APIs from "../../controller/picks";

import {useAuth0} from "@auth0/auth0-react"
import { SinglePlayerDropdown } from "../../customComponents/dropdown/singleSelect";
import { SimpleDropdown } from "../../customComponents/dropdown/simpleDropdown";

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


     // should probably change it in the future, but this was the most staightforward way to do it initially
     const [selectedDefensePlayer, setSelectedDefensePlayer] = useState('')
     const [selectedRookiePlayer, setSelectedRookiePlayer] = useState('')
     const [selectedMVPPlayer, setSelectedMVPPlayer] = useState('')
     const [selected6thPlayer, setSelected6thPlayer] = useState('')
     const [selectedImprovedPlayer, setSelectedImprovedPlayer] = useState('')

     const [defaultDefensePlayer, setDefaultDefensePlayer] = useState('')
     const [defaultRookiePlayer, setDefaultRookiePlayer] = useState('')
     const [defaultMVPPlayer, setDefaultMVPPlayer] = useState('')
     const [default6thPlayer, setDefault6thPlayer] = useState('')
     const [defaultImprovedPlayer, setDefaultImprovedPlayer] = useState('')
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
      if(selectedDefensePlayer !== "Please Select a Player"){
        const response = await APIs.assignPick(playerID, "Defense Player", selectedDefensePlayer, curYear)
        if(response.status === 200){
          window.alert(selectedDefensePlayer + " has been saved as your defense player pick")
        }else{
          window.alert("Something went wrong when trying to save your pick")
        }
      }
     }

     const saveRookiePlayer = async () => {
      if(selectedRookiePlayer !== "Please Select a Player"){
        const response = await APIs.assignPick(playerID, "Rookie Player", selectedRookiePlayer, curYear)
        if(response.status === 200){
          window.alert(selectedRookiePlayer + " has been saved as your rookie player pick")
        }else{
          window.alert("Something went wrong when trying to save your pick")
        }
      }
     }   

     const saveMVPPlayer = async () => {
      if(selectedMVPPlayer !== "Please Select a Player"){
        const response = await APIs.assignPick(playerID, "MVP Player", selectedMVPPlayer, curYear)
        if(response.status === 200){
          window.alert(selectedMVPPlayer + " has been saved as your MVP pick")
        }else{
          window.alert("Something went wrong when trying to save your pick")
        }
      }
     }   
    
     const save6thPlayer = async () => {
      if(selected6thPlayer !== "Please Select a Player"){
        const response = await APIs.assignPick(playerID, "6th Player", selected6thPlayer, curYear)
        if(response.status === 200){
          window.alert(selected6thPlayer + " has been saved as your 6th player pick")
        }else{
          window.alert("Something went wrong when trying to save your pick")
        }
      }
     }   

     const saveImprovedPlayer = async () => {
      if(selectedImprovedPlayer !== "Please Select a Player"){
        const response = await APIs.assignPick(playerID, "Improved Player", selectedImprovedPlayer, curYear)
        if(response.status === 200){
          window.alert(selectedImprovedPlayer + " has been saved as your most improved pick")
        }else{
          window.alert("Something went wrong when trying to save your pick")
        }
      }
     }   
     //---------setting the default players for the dropdowns------------

     
     // first time we open the page, lets get the default players based on their last saved selection
    useEffect(() => {
      refreshData();
      
      const setDefaultItem = async (sectionName, settingFunction) => {
        let player = (await APIs.getCurrentPick(playerID, sectionName, curYear))
        if(player.status !== 400){
          player = player.pick.pick
        }else{
          player = "Please Select a Player"
        }
        settingFunction(player)
       } 
      setDefaultItem("Defense Player", setDefaultDefensePlayer)
      setDefaultItem("Rookie Player", setDefaultRookiePlayer)
      setDefaultItem("MVP Player", setDefaultMVPPlayer)
      setDefaultItem( "6th Player", setDefault6thPlayer)
      setDefaultItem("Improved Player", setDefaultImprovedPlayer)
    },[]);

    // this is to convert the players from our API call to a flat array (to stick in our menuitems)
     useEffect ( () =>{
      setPlayerList(toSingleArray(result))
   },[result])

   if(playerList.length !== 0 ){
    return (
      <div>
       <h1 className={styles.h1}>Pre-Season Predictions</h1>
       <FloatingSection>
          <SimpleDropdown key={"MVP"}title={"MVP of the Year"} answerBox={true} boxTitle={"Season MVPs"} selected={handleChangeMVP}  default={defaultMVPPlayer} styles = {styles} values={playerList}    onSelect={saveMVPPlayer} ></SimpleDropdown>
       </FloatingSection>
       <FloatingSection>
          <SimpleDropdown  key={"Defense"} title={"Defense Player of the Year"} answerBox={true} boxTitle={"Season Defense Player"} selected={handleChangeDefense} default={defaultDefensePlayer} styles = {styles} values={playerList}    onSelect={saveDefensePlayer} ></SimpleDropdown>
       </FloatingSection>
        <FloatingSection>
          <SimpleDropdown  key={"Rookie"} title={"Rookie of the Year"} answerBox={true} boxTitle={"Season Rookie"} selected={handleChangeRookie} default={defaultRookiePlayer} styles = {styles} values={playerList}    onSelect={saveRookiePlayer} ></SimpleDropdown>
       </FloatingSection>
       <FloatingSection>
          <SimpleDropdown  key={"6th"} title={"6th Player of the Year"} answerBox={true} boxTitle={"Season 6th Player"} selected={handleChange6th} default={default6thPlayer} styles = {styles} values={playerList}    onSelect={save6thPlayer} ></SimpleDropdown>
       </FloatingSection>
       <FloatingSection>
          <SimpleDropdown  key={"Improved"} title={"Most Improved Player of the Year"}answerBox={true}  boxTitle={"Season Most Improved Player Player"} selected={handleChangeImproved} default={defaultImprovedPlayer} styles = {styles} values={playerList}    onSelect={saveImprovedPlayer} ></SimpleDropdown>
       </FloatingSection>

       </div>
  );
   }else{
     return <div></div>
   }
    
}

export default PreSeason;