import React from 'react';
import Button from '@material-ui/core/Button';
import "./Buttons.css";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: '#c4c4c4',
    border: 0,
    borderRadius: 40,
    height: '50%',
    width: '20%',
    padding: '1em',
  },
});

function DefaultButton(props) {
  const classes = useStyles();
    return (
        <div>
          <Button 
          className={classes.root}
          onClick={props.handleClick}>{props.label}</Button>
        </div>
      )
}
export default DefaultButton;