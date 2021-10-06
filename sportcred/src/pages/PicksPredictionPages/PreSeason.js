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


     const [date, setDate] = React.useState('');
     const playerID = user.sub.split("|")[1]


     const handleChangeDefense = (event) => {
         //setDate(event.target.value);
         setSelectedDefensePlayer(event.target.value)
     };
     const handleChangeRookie = (event) => {
      //setDate(event.target.value);
      setSelectedRookiePlayer(event.target.value)
  };

     const [playerList, setPlayerList] = useState([])
     
     const [result, setData] = React.useState([]);

     const [defaultDefensePlayer, setDefaultDefensePlayer] = useState('')
     const [selectedDefensePlayer, setSelectedDefensePlayer] = useState('')
     const [defaultRookiePlayer, setDefaultRookiePlayer] = useState('')
     const [selectedRookiePlayer, setSelectedRookiePlayer] = useState('')

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
  
     const saveDefensePlayer = async () => {
      if(selectedDefensePlayer != "Please Select a Player"){
        const response = await APIs.assignPick(playerID, "Defense Player", selectedDefensePlayer, 2021)
        if(response.status == 200){
          window.alert(selectedDefensePlayer + " has been saved as your defense player pick")
        }else{
          window.alert("Something went wrong when trying to save your pick")
        }
      }
     }

     const saveRookiePlayer = async () => {
      if(selectedRookiePlayer != "Please Select a Player"){
        const response = await APIs.assignPick(playerID, "Rookie Player", selectedRookiePlayer, 2021)
        if(response.status == 200){
          window.alert(selectedRookiePlayer + " has been saved as your rookie player pick")
        }else{
          window.alert("Something went wrong when trying to save your pick")
        }
      }
     }
    
     const setDefaultDefense = async () => {
      let player = (await APIs.getCurrentPick(playerID, "Defense Player", 2021))
      if(player.status !== 400){
        player = player.pick.pick
      }else{
        player = "Please Select a Player"
      }
      setDefaultDefensePlayer(player)
     } 
     const setDefaultRookie = async () => {
      let player = (await APIs.getCurrentPick(playerID, "Rookie Player", 2021))
      if(player.status !== 400){
        player = player.pick.pick
      }else{
        player = "Please Select a Player"
      }
      setDefaultRookiePlayer(player)
     } 
     
     // first time we open the page, lets get the players
    useEffect(() => {
      refreshData();
      setDefaultDefense();
      setDefaultRookie();
    }, []);


     useEffect ( () =>{
      setPlayerList(toSingleArray(result))
   },[result])

   if(defaultDefensePlayer!== "" && defaultRookiePlayer !== "" && playerList.length !== 0 ){
    return (
      <div>
       <h1 className={styles.h1}>Pre-Season Predictions</h1>
       <Button variant="contained" onClick={refreshData}>Get All Players</Button>
       <FloatingSection>
          <div>
          <div> Defense Player of the Year</div>
          <div className='component'>
             <div className='sub-component'>
               <div className='sub-sub'>
                  <div>Defense Players</div>
                  <FormControl variant="outlined" className={styles.formControl}>
                    <Select
                      id="demo-customized-select"
                      onChange={handleChangeDefense}
                      defaultValue={defaultDefensePlayer}
                      input={<BootstrapInput />}
                    >
                       <MenuItem  value={"Please Select a Player"} style={{backgroundColor: 'grey', color: "white"}} >
                            <p style={{ color: 'white' }}>Please Select a Player</p> 
                        </MenuItem>
                      {
                       playerList.map((item, index) => (
                        <MenuItem  key={item} value={item} style={{backgroundColor: 'grey', color: "white"}} >
                            <p style={{ color: 'white' }}> {item}</p> 
                        </MenuItem>
                      ))
                      }                       

                    </Select>
                </FormControl>
                <div>
                <AnswerButton style={{width: '100px', height: '10px'}} label='Save' onClick={saveDefensePlayer}></AnswerButton>
                </div>
              </div>
             </div>

             <div className='img-holder'>
             </div>
             
          </div>
          </div>
       </FloatingSection>
        <FloatingSection>
          <div>
          <div> Rookie of the Year</div>
          <div className='component'>
             <div className='sub-component'>
               <div className='sub-sub'>
                  <div>Rookies</div>
                  <FormControl variant="outlined" className={styles.formControl}>
                    <Select
                      id="demo-customized-select"
                      onChange={handleChangeRookie}
                      defaultValue={defaultRookiePlayer}
                      input={<BootstrapInput />}
                    >
                       <MenuItem  value={"Please Select a Player"} style={{backgroundColor: 'grey', color: "white"}} >
                            <p style={{ color: 'white' }}>Please Select a Player</p> 
                        </MenuItem>
                      {
                       playerList.map((item, index) => (
                        <MenuItem  key={item} value={item} style={{backgroundColor: 'grey', color: "white"}} >
                            <p style={{ color: 'white' }}> {item}</p> 
                        </MenuItem>
                      ))
                      }                       

                    </Select>
                </FormControl>
                <div>
                <AnswerButton style={{width: '100px', height: '10px'}} label='Save' onClick={saveRookiePlayer}></AnswerButton>
                </div>
              </div>
             </div>

             <div className='img-holder'>
             </div>
             
          </div>
          </div>
       </FloatingSection>
       </div>
  );
   }else{
     return <div></div>
   }
    
}

export default PreSeason;