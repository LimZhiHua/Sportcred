import React from 'react';
import Button from '@material-ui/core/Button';
import "./Buttons.css";
import { makeStyles } from '@material-ui/core/styles';

const useDefaultStyles = makeStyles({
  root: {
    background: '#909090',
    border: 0,
    borderRadius: 40,
    height: '50%',
    width: '20%',
    padding: '1em',
    '&:hover': {
       background: '#909090',
      opacity: 0.8
    },
  },
});

const useAnswerStyles = makeStyles({
  root: {
    background: '#86C232',
    border: 0,
    borderRadius: 40,
    height: '50%',
    width: '20%',
    padding: '1em',
    '&:hover': {
      background: '#86C232',
      opacity: 0.8
    },
  },
});

const useDangerStyles = makeStyles({
  root: {
    background: '#FF652F',
    border: 0,
    borderRadius: 40,
    height: '50%',
    width: '20%',
    padding: '1em',
    '&:hover': {
      background: '#FF652F',
      opacity: 0.8
    },
  },
});

export function DefaultButton(props) {
  const classes = useDefaultStyles();
    return (
          <Button 
          variant="contained"
          className={classes.root}
          onClick={props.handleClick}
          style={props.style}>{props.label}</Button>
      )
}

export function AnswerButton(props) {
  const classes = useAnswerStyles();
    return (
          <Button 
          variant="contained"
          className={classes.root}
          onClick={props.handleClick}
          style={props.style}>{props.label}</Button>
      )
}

export function DangerButton(props) {
  const classes = useDangerStyles();
    return (
          <Button 
          variant="contained"
          className={classes.root}
          onClick={props.handleClick}
          style={props.style}>{props.label}</Button>
      )
}
