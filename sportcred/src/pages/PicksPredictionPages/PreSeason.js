import React from "react";
import FloatingSection from "../../customComponents/FloatingSection";
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import './PreSeason.css';
import {AnswerButton,} from "../../customComponents/buttons/Buttons";

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
    h1 : {
        color: '#DCDCDC',
    },
    h2: {
        color: '#DCDCDC',
        fontWeight: 'normal',
        display: 'inline',
        marginLeft:'0.2rem',
    },
    rowGroup: {
        display: 'inline'
    },
    formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    '& label.Mui-focused': {
      color: '#c4c4c4',
    },
    //height: 100,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#c4c4c4',
      },
      '&:hover fieldset': {
        borderColor: '#ffff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#c4c4c4',
      },
    },
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    subHeader: {
        backgroundColor: '#343434',
        //minWeight: 100,
        overflow: 'hidden',
        display: 'inline-block',
        borderRadius: 5,
    }
}));

const BootstrapInput = withStyles((theme) => ({
//   root: {
//     'label': {
//       marginTop: theme.spacing(0), 
//     },
//     '& label.Mui-focused': {
//       padding: '10px 26px 10px 12px',
//     },
//   },
  input: {
    borderRadius: 4,
    position: 'relative',
    //backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);


const PreSeason = () => {
    const styles = useStyles();

     const [date, setDate] = React.useState('');
     const handleChange = (event) => {
         setDate(event.target.value);
     };

     var dateLength = ["03-03-2021", '04-08-2021', '05-08-2021'];

    return (
        <div>
         <h1 className={styles.h1}>Pre-Season Predictions</h1>
         <FloatingSection>
            <div>
            <div> Defense Player of the Year</div>
            <div className='component'>
               <div className='sub-component'>
                 <div className='sub-sub'>
                    <div>Defense Players</div>
                    <FormControl variant="outlined" className={styles.formControl}>
                      <Select
                        id="demo-customized-select"
                        value={date}
                        placeholder="Choose a date"
                        onChange={handleChange}
                        input={<BootstrapInput />}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Player 1"}>Player 1</MenuItem>
                        <MenuItem  value={"Player 2"}>Player 2</MenuItem>
                        <MenuItem value={"Player 3"}>Player 3</MenuItem>
                      </Select>
                  </FormControl>
                  <div>
                  <AnswerButton style={{width: '100px', height: '10px'}} label='Save'></AnswerButton>
                  </div>
                </div>
               </div>

               <div className='img-holder'>
               </div>
               
            </div>
            </div>
         </FloatingSection>
          <FloatingSection>
            <div>
            <div> Rookie of the Year</div>
            <div className='component'>
               <div className='sub-component'>
                 <div className='sub-sub'>
                    <div>Rookies</div>
                    <FormControl variant="outlined" className={styles.formControl}>
                      <Select
                        id="demo-customized-select"
                        value={date}
                        placeholder="Choose a date"
                        onChange={handleChange}
                        input={<BootstrapInput />}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Player 1"}>Rookie 1</MenuItem>
                        <MenuItem  value={"Player 2"}>Rookie 2</MenuItem>
                        <MenuItem value={"Player 3"}>Rookie 3</MenuItem>
                      </Select>
                  </FormControl>
                  <div>
                  <AnswerButton style={{width: '100px', height: '10px'}} label='Save'></AnswerButton>
                  </div>
                </div>
               </div>

               <div className='img-holder'>
               </div>
               
            </div>
            </div>
         </FloatingSection>
         </div>
    );
}

export default PreSeason;