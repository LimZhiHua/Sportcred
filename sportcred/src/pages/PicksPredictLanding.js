import React, {useState} from "react";
import FloatingSection from "../customComponents/FloatingSection";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import {
    REGULAR_SEASON_URL,
    PLAYOFFS_BRACKET_URL,
    PRESEASON_URL,
  } from "../urls";

import { isOnRoute, getThisRoute } from '../utils';

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
    playoff: {
        background: '#ffff00',
        border: 0,
         opacity: 0.9,
        //borderRadius: 40,
        height: '97vh',
        width: '20%',
        padding: '1em',
        '&:hover': {
        background: '#ffff00',
        opacity: 0.8
        },
    },
    preseason: {
        background: '#00FF00',
        opacity: 0.9,
        border: 0,
        //borderRadius: 40,
        height: '97vh',
        width: '20%',
        padding: '1em',
        '&:hover': {
        background: '#00FF00',
        opacity: 0.8
        },
    },
    left: {
        height: '100%',
        float: 'left',
    },
    right: {
        height: '100%',
        float: 'right',
    },
    buttonGroup: {
        display: 'inline'
    }
}));

// const goToRegularSeason = () =>{
//     console.lg(window.location);
//     window.location.href =  window.location.href.concat(REGULAR_SEASON_URL);
// }

// const goToPreSeason = () =>{
//     window.location.href =  window.location.href.concat(PRESEASON_URL);
// }

// const goToPlayOffs = () =>{
//     window.location.href =  window.location.href.concat(PLAYOFFS_BRACKET_URL);
// }
import { Bracket, RoundProps } from 'react-brackets';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';




//import { Bracket } from 'react-tournament-bracket';
const useDefaultStyles = makeStyles({
  root: {
    background: '#909090',
    width: '2',
  },
 
});

const curDate = new Date()
const rounds = [
    {
      title: 'Round one',
      seeds: [
        {
          id: 1,
          date: curDate.toDateString(),
          teams: [{ name: 'Team A' }, { name: 'Team B' }],
        },
        {
          id: 2,
          date: curDate.toDateString(),
          teams: [{ name: 'Team C' }, { name: 'Team D' }],
        },
        {
          id: 3,
          date: curDate.toDateString(),
          teams: [{ name: 'Team E' }, { name: 'Team F' }],
        },
        {
          id: 4,
          date: curDate.toDateString(),
          teams: [{ name: 'Team G' }, { name: 'Team H' }],
        },
      ],
    },
    {
      title: 'Round Two',
      seeds: [
        {
          id: 5,
          date: curDate.toDateString(),
          teams: [{ name: 'Team A' }, { name: 'Team C' }],
        },
    
        {
          id: 6,
          date: curDate.toDateString(),
          teams: [{ name: 'Team E' }, { name: 'Team H' }],
        },
      ],
    },
    {
      title: 'Round Four',
      seeds: [
        {
          id: 3,
          date: curDate.toDateString(),
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
  
const PicksPredictLanding = () => {
    const styles = useStyles();
    return (
        <div >
        <div className={styles.buttonGroup}>
        <Link to={REGULAR_SEASON_URL}>
        <Button
         variant="contained"
         className={styles.regular}>
         Regular Season
        </Button>
        </Link>
        </div>
        <div className={styles.buttonGroup}>
        <Link to={PRESEASON_URL}>
        <Button
         variant="contained"
         className={styles.playoff}>
         PlayOffs
        </Button>
        </Link>
        </div>
        <div className={styles.buttonGroup}>
        <Link to={PRESEASON_URL}>
         <Button
         variant="contained"
         className={styles.preseason}>
         Pre-Season 
        </Button>
        </Link>
        </div>
        </div>
    );
=======

  const [index, setIndex] = useState(undefined);

  const handleStepChange = (step) => {
    setIndex(step);
  };
    
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
        <Bracket rounds={rounds.slice(0,1)} roundTitleComponent={title} style={{align:"center"}}/>
        </div>
        <div style={Object.assign({}, styles.slide, styles.slide2)}>
        <Bracket rounds={rounds.slice(1,2)} roundTitleComponent={title}/>
        </div>
        <div style={Object.assign({}, styles.slide, styles.slide3)}>
        <Bracket rounds={rounds.slice(2,3)} roundTitleComponent={title}/>
        </div>
    </SwipeableViews>  

    return (
        <div>
            <h1>PicksPredictLanding TODO</h1>
            <Bracket rounds={rounds} roundTitleComponent={title}/>
            <FloatingSection>
            {swiper}
            </FloatingSection>
            <FloatingSection>
            {swiperBrackets}
            </FloatingSection>
        </div>
    )
}

export default PicksPredictLanding;