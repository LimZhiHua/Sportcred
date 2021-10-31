import React, { useState, useEffect } from 'react';
import Slider from '@material-ui/core/Slider';
import './SliderComponent.css'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    color: '#c4c4c4',
    height: 48,
    "&:hover": {
      color: '#dedede'
    },
  },
});

function SliderComponent(props) {
    const [value, setValue] = useState(50)
    const classes = useStyles();
    const responseID = props.responseID

    const saveScore = (e, value) => {
      props.saveScore(responseID, value)
      setValue(value)
    }


    if(props.fixed){
      return (
        <div className="default-slider-class">
            <Slider 
            className={classes.root}
            min={0}
            max={100}
            value={props.averageScore}
            valueLabelDisplay="auto"
            >
            </Slider>
        </div>
        )
    }else{
      return (
        <div className="default-slider-class">
            <Slider 
            className={classes.root}
            min={0}
            max={100}
            defaultValue={0}
            valueLabelDisplay="auto"
            onChange={saveScore}
            >
            </Slider>
        </div>
        )
    }

}

export default SliderComponent;