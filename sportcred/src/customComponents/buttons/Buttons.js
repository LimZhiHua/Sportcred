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
  },
});

export function DefaultButton(props) {
  const classes = useDefaultStyles();
    return (
        <div>
          <Button 
          className={classes.root}
          onClick={props.handleClick}>{props.label}</Button>
        </div>
      )
}

export function AnswerButton(props) {
  const classes = useAnswerStyles();
    return (
        <div>
          <Button 
          className={classes.root}
          onClick={props.handleClick}>{props.label}</Button>
        </div>
      )
}

export function DangerButton(props) {
  const classes = useDangerStyles();
    return (
        <div>
          <Button 
          className={classes.root}
          onClick={props.handleClick}>{props.label}</Button>
        </div>
      )
}
