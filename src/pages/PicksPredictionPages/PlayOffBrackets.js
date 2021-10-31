
import React, {useState, useEffect} from "react";
import FloatingSection from "../../customComponents/FloatingSection";
import { Bracket } from 'react-brackets';
import SwipeableViews from 'react-swipeable-views';
import {Grid} from '@material-ui/core/';
import {getRegularSeasonData} from "../../controller/picks"
import { SimpleDropdown } from "../../customComponents/dropdown/simpleDropdown"


//import { Bracket } from 'react-tournament-bracket';1


const todayDate = new Date()
const rounds = [
    {
      title: 'Round one',
      seeds: [
        {
          id: 1,
          date: todayDate.toDateString(),
          teams: [{ name: 'Team A' }, { name: 'Team B' }],
        },
        {
          id: 2,
          date: todayDate.toDateString(),
          teams: [{ name: 'Team C' }, { name: 'Team D' }],
        },
        {
          id: 3,
          date: todayDate.toDateString(),
          teams: [{ name: 'Team E' }, { name: 'Team F' }],
        },
        {
          id: 4,
          date: todayDate.toDateString(),
          teams: [{ name: 'Team G' }, { name: 'Team H' }],
        },
      ],
    },
    {
      title: 'Round Two',
      seeds: [
        {
          id: 5,
          date: todayDate.toDateString(),
          teams: [{ name: 'Team A' }, { name: 'Team C' }],
        },
    
        {
          id: 6,
          date: todayDate.toDateString(),
          teams: [{ name: 'Team E' }, { name: 'Team H' }],
        },
      ],
    },
    {
      title: 'Round Four',
      seeds: [
        {
          id: 3,
          date: todayDate.toDateString(),
          teams: [{ name: 'Team A' }, { name: 'Team C' }],
        },
      ],
    },
  ];

  const title = (title, roundIndex) => {
    return <div style={{ textAlign: 'center', color: 'black', fontWeight: "bold" }}>{title}</div>;
  }

  // this is the styling for the swiping thingy.
  const styles =  {slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    background: '#FEA900',
  },
  slide2: {
    background: '#B3DC4A',
  },
  slide3: {
    background: '#6AC0FF',
  },}
  
const PlayOffBrackets = () => {

  const [index, setIndex] = useState(undefined);
  const [gamesByDate, setGamesByDate] = useState([]);
  const [gameData, setGameData] = useState([[],[]])
  const handleStepChange = (step) => {
    setIndex(step);
  };
  
  const testing = async ()=>{
    console.log("games by date is", gamesByDate)
  }


  // This is used to convert data from the API into a format readable by the brackets
  const parseData = async () =>{
    // gamesByDate gives me an array. each element has:
    // dateTime
    // team => [team1: abc, team2: def]
    const gameList = await (await getRegularSeasonData()).gamesByDate
    // What i want to do, is, first split it by dates. Each index will be an array of 1 date
    // I also keep another array with the date info
    let gamesByDate = []
    let dateInfo = []
    let dateIndex = -1 // starting at -1 so that when we add our 1st item, the index becomes 0
    console.log(gameList)
    // Dates are in yyyy-mm-dd
    // Gonna use a for loop instead of a map cause i want to keep track of the previous date
    let prevDate = todayDate.toISOString().split("T")[0]
    let curDate =  todayDate.toISOString().split("T")[0]
    for(var i = 0; i < gameList.length; i++){
      // We check the previous date with the date from 
      curDate =  gameList[i].dateTime.split("T")[0]
      if(curDate ===  prevDate){
        // If we are on the same date, then we just append to our current array
        gamesByDate[dateIndex].push(gameList[i].team)
      }else{

        // if we have gone to a new date, we replace prevDate with the new one, then we create a new array in gamesByDate
        prevDate = curDate
        gamesByDate.push([[gameList[i].team]])
        dateIndex ++;

        // Make sure to add that date to the dateInfo array too!
        dateInfo.push(gameList[i].dateTime.split("T"[0]))
      }
    }
    // we store this game data in this form. 1st array contains all the games in one day, 2nd array is the actual date.
    setGameData([gamesByDate, dateInfo])
  }  
    
  useEffect ( () =>{
    parseData()
  },[])

    const swiper =  <SwipeableViews 
    index={index}
    onChangeIndex={handleStepChange}
    enableMouseEvents
>
    <div style={Object.assign({}, styles.slide, styles.slide1)}>
      slide n°1
    </div>
    <div style={Object.assign({}, styles.slide, styles.slide2)}>
      slide n°2
    </div>
    <div style={Object.assign({}, styles.slide, styles.slide3)}>
      slide n°3
    </div>
    </SwipeableViews>    
    


    // ----------swiper with the brackets--------------------------
    const swiperBrackets =  <SwipeableViews 
            index={index}
            onChangeIndex={handleStepChange}
            enableMouseEvents
        >
        <div style={Object.assign({}, styles.slide, styles.slide1)}>
        <Grid>
          <Grid container spacing = {1} >
            <Grid item xs={6} container justify="flex-start">
              <Bracket rounds={rounds.slice(0,1)} roundTitleComponent={title} style={{align:"center"}}/>
            </Grid>
            <Grid item xs={6} container justify="flex-start">
              <SimpleDropdown boxTitle={"Season MVPs"} styles = {styles} values={["a", "b","c"]} default={"a"}> </SimpleDropdown>
              <SimpleDropdown boxTitle={"Season MVPs"} styles = {styles} values={["a", "b","c"]}  default={"a"}>  </SimpleDropdown>
              <SimpleDropdown boxTitle={"Season MVPs"} styles = {styles} values={["a", "b","c"]}  default={"a"}> </SimpleDropdown>

            </Grid>
          </Grid>
        </Grid>

        </div>
        <div style={Object.assign({}, styles.slide, styles.slide2)}>
        <Bracket rounds={rounds.slice(1,2)} roundTitleComponent={title}/>
        </div>
        <div style={Object.assign({}, styles.slide, styles.slide3)}>
        <Bracket rounds={rounds.slice(2,3)} roundTitleComponent={title}/>
        </div>
    </SwipeableViews>  




    

    return (
        <div>{/*
          <button onClick={testing}> </button>
            <h1>PlayOffBrackets TODO</h1>
            <FloatingSection>
            {swiper}
            </FloatingSection>
            <FloatingSection>
            {swiperBrackets}
            </FloatingSection>*/}
          <FloatingSection>
            <h1> Coming Soon!</h1>
          </FloatingSection>
        </div>
    )
}

export default PlayOffBrackets;