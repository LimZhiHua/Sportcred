import React, { Component } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './postSlider.css'
import Typography from '@material-ui/core/Typography';

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
    width: '100%',
    borderRadius: 13,
    backgroundColor: '#909090',
    height: 20,
    marginRight: '5px',
    marginTop: '4px'
  },
  percentage : {
    position: "relative",
    top: "-20px",
    marginBottom: "-20px",
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
    // First, we need to check who has already agreed/disagreed with this post

    // If user has agreed, then do nothing. If user disagreed, then remove disagree, add agree



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
      <div>
        <div className="row-setup">
          <Button className={classes.agree}variant="contained" onClick={this.onClickAgree}>Agree</Button>
          <LinearProgress className={classes.bar} variant="determinate"  label={`${this.state.progress}%`} value={this.state.progress} />
          <Button variant="contained" className={classes.disagree} onClick={this.onClickDisagree}>Disagree</Button>
        </div>
        <Typography className={classes.percentage} variant="body2">{`${Math.round(this.state.progress)}%`}</Typography>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(PostSlider);