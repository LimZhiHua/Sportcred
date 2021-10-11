import React from 'react';
import Button from '@material-ui/core/Button';
import "./Buttons.css";
import { makeStyles } from '@material-ui/core/styles';

const useDefaultStyles = makeStyles({
  root: {
    background: '#909090',
    border: 0,
    borderRadius: "2em",
    padding: '0.3em 1.5em',
    '&:hover': {
       background: '#909090',
      opacity: 0.8
    },
  },
  submitStyle: {
    background: '#86C232',
    '&:hover': {
      background: '#86C232',
    },
  },
  dangerStyle: {
    background: '#FF652F',
    '&:hover': {
      background: '#FF652F',
    },
  },
});

export function DefaultButton(props) {
  const classes = useDefaultStyles();
    return (
          <Button 
            variant="contained"
            className={classes.root + " " + props.className}
            {...props}>
              {props.label}
          </Button>
      )
}

export function AnswerButton(props) {
  const classes = useDefaultStyles();
    return (
          <Button 
            variant="contained"
            className={classes.root + " " + classes.submitStyle + " " + props.className}
            {...props}>
              {props.label}
          </Button>
      )
}

export function DangerButton(props) {
  const classes = useDefaultStyles();
    return (
          <Button 
            variant="contained"
            className={classes.root + " " + classes.dangerStyle + " " + props.className}
            {...props}>
              {props.label}
          </Button>
      )
}

export function UploadButton(props) {
    return (
      <div>
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span" style={props.style} >
            {props.label}
          </Button>
        </label>
        <input accept="image/*" id="icon-button-file" type="file" />
      </div>
    )
}