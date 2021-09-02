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
import './regularSeason.css';

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
    marginLeft: '20rem',
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


const RegularSeason = () => {
    const styles = useStyles();

     const [date, setDate] = React.useState('');
     const handleChange = (event) => {
         setDate(event.target.value);
     };

     var dateLength = ["03-03-2021", '04-08-2021', '05-08-2021'];

    return (
        <div>
         <h1 className={styles.h1}>Regular Season Picks</h1>
         <div className={styles.subHeader}>
         <h2 className={styles.h2}>Daily Team Pick</h2>
        <FormControl variant="outlined" className={styles.formControl}>
        {/* <InputLabel id="demo-customized-select-label">Choose a date</InputLabel> */}
        <Select
          id="demo-customized-select"
          value={date}
          placeholder="Choose a date"
          onChange={handleChange}
          input={<BootstrapInput />}
        >
         {/* <MenuItem value="" disabled selected hidden>Choose a date</MenuItem> */}
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"03-08-2021"}>03-08-2021</MenuItem>
          <MenuItem  value={"04-08-2021"}>04-08-2021</MenuItem>
          <MenuItem value={"05-08-2021"}>05-08-2021</MenuItem>
        </Select>
      </FormControl>
         </div>
         {
           dateLength.map(element => {
             return (<FloatingSection><div className='voteGroup'> <div><div className='date'> {element}
             </div></div> <div className='vs-bock'><div className='inline'>Team 1</div>     vs    <div className='inline'>Team 2</div></div> </div>
             </FloatingSection>);  
           })
         }
         </div>
    );
}

export default RegularSeason;