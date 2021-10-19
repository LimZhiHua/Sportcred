import React, { Component } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './postSlider.css'
import Typography from '@material-ui/core/Typography';
import {editPost} from "../../controller/post"

const styles = theme => ({
  agree: {
    border: 0,
    borderRadius: 40,
    height: '20px',
    width: '80px',
    background: '#86C232',
    fontSize: '10px',
    marginRight: '0px',
    marginTop: '0px',
    '&:hover': {
      background: '#86C232',
      opacity: 0.8
    },
    zIndex: 10
  },
  disagree : {
    border: 0,
    borderRadius: 40,
    height: '20px',
    width: '80px',
    background: '#FF652F',
    fontSize: '10px',
    marginTop: '-20px',
    marginBottom: "-20px",
    '&:hover': {
      background: '#FF652F',
      opacity: 0.8
    },
    zIndex: 10
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
    marginLeft: '-20px',
    marginRight: "-20px",
  }
});

class PostSlider extends Component {
  
  constructor(props) {
      super(props);
      this.state = {progress: 0 };
      this.onClickAgree = this.onClickAgree.bind(this);
      this.onClickDisagree = this.onClickDisagree.bind(this);
  }
  componentDidMount(){
    this.initializeProgress();
  }
  initializeProgress() {
    const curProp = this.props
    let likes = curProp.likes
    let dislikes = curProp.dislikes
    let likePerc = 0
    // dont wanna divide by 0 lol
    if((likes.length + dislikes.length)>0){
      likePerc = likes.length/(likes.length + dislikes.length) * 100
    }
    console.log("like perc is", likePerc)
    this.setState({progress : likePerc})
  }

  onClickAgree() {
    // First, we need to check who has already agreed/disagreed with this post
    const curProp = this.props
    let likes = curProp.likes
    let dislikes = curProp.dislikes
    let userID = curProp.userID
    let postID = curProp.postID
    // If user has agreed, then do nothing. If user disagreed, then remove disagree, add agree
    if(likes.includes(userID)){
      return
    }else{
        likes.push(userID)
    }
    // Remove it from the dislikes if he likes it
    dislikes = dislikes.filter(item => item !== userID)

    // now that we know who likes/dislikes our thing, we should update the backend.
    editPost(postID, likes, dislikes)
    // Calculate the new percentage
    let likePerc = likes.length/(likes.length + dislikes.length) * 100
    
    this.setState({progress : likePerc})
  }

  onClickDisagree() {
    // this is like onClickAgree execpt with disagree instead
    const curProp = this.props
    let likes = curProp.likes
    let dislikes = curProp.dislikes
    let userID = curProp.userID
    let postID = curProp.postID

    if(dislikes.includes(userID)){
      return
    }else{
      dislikes.push(userID)
    }
    // Remove it from the dislikes if he likes it
    likes = likes.filter(item => item !== userID)
    // Calculate the new percentage
    let likePerc = likes.length/(likes.length + dislikes.length) * 100
    editPost(postID, likes, dislikes)

    this.setState({progress : likePerc})
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className="row-setup">
          <Button className={classes.agree}variant="text" onClick={this.onClickAgree}>Agree</Button>
          <LinearProgress className={classes.bar} variant="determinate"  label={`${this.state.progress}%`} default={this.state.default}value={this.state.progress} />
          <Button variant="text" className={classes.disagree} onClick={this.onClickDisagree}>Disagree</Button>
        </div>
        <Typography className={classes.percentage} variant="body2">{`${Math.round(this.state.progress)}%`}</Typography>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(PostSlider);