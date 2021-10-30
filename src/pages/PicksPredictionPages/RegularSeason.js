import React,{useEffect, useState} from "react";
import FloatingSection from "../../customComponents/FloatingSection";
import { makeStyles } from '@material-ui/core/styles';
import './regularSeason.css';
import {getRegularSeasonData, assignRegularPick, getCurrentRegularPick} from "../../controller/picks"
import {useAuth0} from "@auth0/auth0-react"
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
      gamesByDate.push([gameList[i].team])
      dateIndex ++;
      // Make sure to add that date to the dateInfo dictionary too!
      dateInfo[gameList[i].dateTime.split("T")[0]] = dateIndex
      dateList.push(curDate)
    }
  }
  // we store this game data in this form. 1st array contains all the games in one day, 2nd array is the actual date.
  return([gamesByDate, dateInfo, dateList])
}  
  
const RegularSeason = () => {
    const styles = useStyles();
    const { user } = useAuth0();
    const userID = user.sub.split("|")[1]

     //gameData holds the info for all the games across all the dates
     const [gameData, setGameData] = useState(null)
     // curGameData contains the info for the selected date
     const [curGameData, setCurGameData] = useState([])
    // this is for the selected date in the dropdown
     const [selectedDate, setSelecetdDate] = useState()
     // This is to store the list of all the picks the user has
    const [userPicks, setUserPicks] = useState([]);

    // because we need the current date to find out our pick info, i need to store it in another variable (cant just use selected date)
    const [curDate, setCurDate] = useState("")

    const getData = async () =>{
      setGameData(await parseData())
      const pickData =  (await getCurrentRegularPick(userID)).pick.RegularSeasonPicks
      let picksDict = {}
      for(var i = 0; i < pickData.length; i++){
        picksDict[pickData[i].matchID] = pickData[i].pick
      }
      setUserPicks(picksDict)
    }


    const setCurrentDateInfo = (event) =>{
      setSelecetdDate(event.target.value)
    }

    const setSelectedPickInfo = (event, data)=> {
      //picksData[data] = event.target.value
      //setSelectedPick(picksData)
      assignRegularPick(userID, event.target.value, data)
    }
    // once we select a date, we need to find out the games being lpayed on that day.
    const handleDateSelection = () =>{
      // find out the index using our dicitonary
      const index = gameData[1][selectedDate]
      setCurGameData(gameData[0][index])
      setCurDate(selectedDate)
    }

     useEffect ( () =>{
       getData()
    },[])


    useEffect ( () =>{
      if(gameData != null){
        setCurGameData(gameData[0][0])
        setSelecetdDate(gameData[2][0])
      }
    },[gameData])
    if(gameData !== null && curGameData != null){
        return (
          <div>
          <h1 className={styles.h1}>Regular Season Picks</h1>
          <div className={styles.subHeader}>
        <SimpleDropdown id={"Date Selector"} boxTitle="Select your Date" values={gameData[2]} styles={styles} selected={setCurrentDateInfo} onSelect={handleDateSelection} default={''} answerBox={true}></SimpleDropdown>
          <br></br>
          </div>
          {/* curGameData is an array of arrays of arrays like this.
              [
                [ [team1,team2], [team3, team4] ],
                [ [team5,team6], [team7, team8], [team9, team10] ]
              ]
             For each of the "team" options, I need to generate a floating section => I double map. The first lets me gets an array of arrays. For each of those, i generate anothe box 

          */}
          {
            curGameData.map(teamList => {
              //teamList should look like:  [ [team1,team2], [team3, team4] ]
              return teamList.map(match => {
                // match should look like: [team1,team2]
                return (<FloatingSection key={curDate+match["team1"] + "vs" + match["team2"]}>
                          <div className='voteGroup'> <div>
                          </div>
                           <div className='vs-bock'><div className='inline'>{match["team1"]}</div>     vs    <div className='inline'>{match["team2"]}</div></div> </div>
                           <SimpleDropdown  key={curDate+match["team1"] + "vs" + match["team2"]} boxTitle="Take your pick" values={["",match["team1"], match["team2"]]} styles={styles}  selected={((e) => setSelectedPickInfo(e, curDate+match["team1"]+"vs"+match["team2"]))} answerBox={false} default={userPicks[curDate+match["team1"] + "vs" + match["team2"]] || ""}></SimpleDropdown>
                        </FloatingSection>); 
              })
            })
          }
          </div>
      );
    }else{
      return(<div></div>)
    }

}

export default RegularSeason;