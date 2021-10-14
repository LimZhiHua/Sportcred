import React,{useEffect, useState} from "react";
import FloatingSection from "../../customComponents/FloatingSection";
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import * as APIs from "../../controller/picks";
import './regularSeason.css';
import {getRegularSeasonData} from "../../controller/picks"

import {SimpleDropdown} from "../../customComponents/dropdown/simpleDropdown"

const todayDate = new Date()


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
    marginLeft: '20rem',
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

const parseData = async () =>{
  // gamesByDate gives me an array. each element has:
  // dateTime
  // team => [team1: abc, team2: def]
  const gameList = await (await getRegularSeasonData()).gamesByDate
  // What i want to do, is, first split it by dates. Each index will be an array of 1 date
  let gamesByDate = []
  // I keep a dictionary which points from date to index. also have an array of datesfor our dropdown
  let dateInfo = {}
  let dateList = []
  let dateIndex = -1 // starting at -1 so that when we add our 1st item, the index becomes 0
  console.log(gameList)
  // Dates are in yyyy-mm-dd
  // Gonna use a for loop instead of a map cause i want to keep track of the previous date
  let curDate =  todayDate.toISOString().split("T")[0]
  for(var i = 0; i < gameList.length; i++){
    // We check the previous date with the date from 
    curDate =  gameList[i].dateTime.split("T")[0]
    if(curDate in dateInfo){
      // If we are on the same date, then we just append to our current array
      gamesByDate[dateInfo[curDate]].push(gameList[i].team)
    }else{

      // if we have gone to a new date, we create a new array in gamesByDate
      gamesByDate.push([[gameList[i].team]])
      dateIndex ++;
      // Make sure to add that date to the dateInfo dictionary too!
      dateInfo[gameList[i].dateTime.split("T")[0]] = dateIndex
      dateList.push(curDate)
    }
  }
  // we store this game data in this form. 1st array contains all the games in one day, 2nd array is the actual date.
  console.log(([gamesByDate, dateInfo, dateList]))
  return([gamesByDate, dateInfo, dateList])
}  
  
const RegularSeason = () => {
    const styles = useStyles();

     const [date, setDate] = React.useState('');
     //gameData holds the info for all the games across all the dates
     const [gameData, setGameData] = useState(null)
     // curGameData contains the info for the selected date
     const [curGameData, setCurGameData] = useState([])
    
     const [selectedDate, setSelecetdDate] = useState()

     var dateLength = ["03-03-2021", '04-08-2021', '05-08-2021'];

    const getData = async () =>{
      setGameData(await parseData())
    }

    // once we select a date, we need to find out the games being played on that day.
    const setCurrentDateInfo = (event) =>{
      setSelecetdDate(event.target.value)
      console.log("selected", event.target.value)
    }

     useEffect ( () =>{
       getData()
    },[])
    if(gameData !== null){
        return (
          <div>
          <h1 className={styles.h1}>Regular Season Picks</h1>
          <div className={styles.subHeader}>
          {/* <InputLabel id="demo-customized-select-label">Choose a date</InputLabel> */}
        <SimpleDropdown boxTitle="Select your Date" values={gameData[2]} styles={styles} selected={setCurrentDateInfo} default={gameData[2][0]}>
        </SimpleDropdown>
          </div>
          {
            dateLength.map(element => {
              return (<FloatingSection><div className='voteGroup'> <div><div className='date'> {element}
              </div></div> <div className='vs-bock'><div className='inline'>Team 1</div>     vs    <div className='inline'>Team 2</div></div> </div>
              </FloatingSection>);  
            })
          }
          </div>
      );
    }else{
      return(<div></div>)
    }

}

export default RegularSeason;