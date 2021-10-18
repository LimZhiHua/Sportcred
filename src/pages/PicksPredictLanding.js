import React from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import {
    REGULAR_SEASON_URL,
    PLAYOFFS_BRACKET_URL,
    PRESEASON_URL,
  } from "../urls";

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
        <Link to={PLAYOFFS_BRACKET_URL}>
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
}

export default PicksPredictLanding;