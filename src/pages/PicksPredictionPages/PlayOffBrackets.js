
import React, {useState} from "react";
import FloatingSection from "../../customComponents/FloatingSection";
import { Bracket, RoundProps } from 'react-brackets';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import {Grid} from '@material-ui/core/';


//import { Bracket } from 'react-tournament-bracket';1
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
  
const PlayOffBrackets = () => {

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
            <h1>PlayOffBrackets TODO</h1>
            <div >
            <Grid container spacing = {1}>
              <Grid item xs={6}>
               <Bracket rounds={rounds} roundTitleComponent={title}  />
              </Grid>
              <Grid item xs={6}>
              <Bracket rounds={rounds} roundTitleComponent={title} rtl={"LTR"} />
              </Grid>
            </Grid>
            </div>

            <FloatingSection>
            {swiper}
            </FloatingSection>
            <FloatingSection>
            {swiperBrackets}
            </FloatingSection>
        </div>
    )
}

export default PlayOffBrackets;