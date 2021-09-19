import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyleField = makeStyles({
  root: {
    // width: '50ch',
    '& label.Mui-focused': {
      color: '#c4c4c4',
    },
    '& .MuiInputLabel-root': {
      color: '#b0b0b0',
    },
    '& .MuiOutlinedInput-root': {
      marginBottom: "0.75em",
      '& input': {
        color: '#c4c4c4',
      },
      '& fieldset': {
        borderColor: '#6B6E70',
      },
      '&:hover fieldset': {
        borderColor: '#ffff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#c4c4c4',
      },
    },
  },
});

const useStyleArea = makeStyles({
  root: {
    // width: '50ch',
    '& label.Mui-focused': {
      color: '#c4c4c4',
    },
    '& .MuiInputLabel-root': {
      color: '#b0b0b0',
    },
    '& .MuiOutlinedInput-root': {
      marginBottom: "0.75em",
      '& textarea': {
        color: '#c4c4c4',
      },
      '& fieldset': {
        borderColor: '#6B6E70',
      },
      '&:hover fieldset': {
        borderColor: '#ffff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#c4c4c4',
      },
    },
  },
});

export function BasicTextFields(props) {
  const classes = useStyleField();
   return (
       <TextField className={classes.root} label={props.label} variant="outlined" {...props} />
  );
}

export function BasicTextArea(props) {
  const classes = useStyleArea();
   return (
      <TextField
          className={classes.root}
          label={props.label}
          onChange={props.handleChange}
          multiline
          variant="outlined"
          {...props}
      />
  );
}