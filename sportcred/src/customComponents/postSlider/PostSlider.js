import React, { Component } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './postSlider.css'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const styles = theme => ({
  agree: {
    border: 0,
    borderRadius: 40,
    height: '20px',
    width: '80px',
    background: '#86C232',
    fontSize: '10px',
    marginRight: '5px',
    marginTop: '2.5px',
    '&:hover': {
      background: '#86C232',
      opacity: 0.8
    },
  },
  disagree : {
    border: 0,
    borderRadius: 40,
    height: '20px',
    width: '80px',
    background: '#FF652F',
    fontSize: '10px',
    marginTop: '2.5px',
    '&:hover': {
      background: '#FF652F',
      opacity: 0.8
    },
  },
  bar : {
    width: '30%',
    borderRadius: 13,
    backgroundColor: '#909090',
    height: 17,
    marginRight: '5px',
    marginTop: '4px'
  }
});

class PostSlider extends Component {
  
  constructor(props) {
      super(props);
      this.state = {progress: 0};
      this.onClickAgree = this.onClickAgree.bind(this);
      this.onClickDisagree = this.onClickDisagree.bind(this);
      this.initializeProgress();
  }

  initializeProgress() {
    this.setState({progress : 0})
  }

  onClickAgree() {
    this.setState({progress : this.state.progress + 10})
  }

  onClickDisagree() {
    // if (this.state.progress === 0) {
    //   return;
    // }
    this.setState({progress : this.state.progress - 10})
  }

  render() {
    const { classes } = this.props;

    return (
        <div className="row-setup">
        <Button className={classes.agree}variant="contained" onClick={this.onClickAgree}>Agree</Button>
        <LinearProgress className={classes.bar} variant="determinate"  label={`${this.state.progress}%`} value={this.state.progress} />
        <Box minWidth={35}>
        <Typography variant="body2">{`${Math.round(
          this.state.progress,
        )}%`}</Typography>
      </Box>
        <Button variant="contained" className={classes.disagree} onClick={this.onClickDisagree}>Disagree</Button>
        </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(PostSlider);