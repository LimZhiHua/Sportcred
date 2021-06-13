import React from 'react';
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
    const classes = useStyles();
    return (
      <div className="default-slider-class">
          <Slider 
          className={classes.root}
          defaultValue={50}
          min={0}
          max={100}
          valueLabelDisplay="auto">
          </Slider>
      </div>
      )
}

export default SliderComponent;