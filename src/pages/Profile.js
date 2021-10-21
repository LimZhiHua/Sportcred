import React, { useState,useEffect } from "react";
import FloatingSection from "../customComponents/FloatingSection";
import {Grid, Paper} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

import {DefaultButton} from "../customComponents/buttons/Buttons"
import  {getUser} from '../controller/user';
import {
    EDIT_PROFILE_URL,
  } from "../urls";
  
import {useAuth0} from "@auth0/auth0-react"



//--------------------------------------------------------------
// icons
import { 
    AiOutlineMessage, AiOutlineMore, AiOutlineShareAlt,
    AiOutlineLeft, AiOutlineRight,
} from "react-icons/ai";

// components
import PostSlider from "../customComponents/postSlider/PostSlider";
import {BasicTextFields, BasicTextArea} from "../customComponents/inputFields/inputFields"
import {AnswerButton} from "../customComponents/buttons/Buttons"

// controllers
import { getAllPosts, newPost } from '../controller/post';
import { getComments, newPostComment } from '../controller/postComment';
// import  {getUsername} from '../controller/user';

// Auth

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paperWhite: {
      padding: theme.spacing(2),
      textAlign: 'center',
    },
  }));


const PostContainer = (props) => {
    return (
        <FloatingSection className={props.className}>
            {props.children}
        </FloatingSection>
    )
}

const PostHeader = ({displayname = "Unknown", score = 0, datetime = new Date(Date.now()).toLocaleString()}) => {
    return (
        <div className="post-header">
            <Grid container spacing={3}>
                <Grid item xs={6} className="left">
                    <span className="displayname">{displayname}</span>
                    <span className="acs-score">{score}</span>
                </Grid>
                <Grid item xs={6} className="right">
                    <span className="datetime">{datetime}</span>
                </Grid>
            </Grid>
        </div>
    )
}

const PostCreate = ({onSubmit=()=>{}}) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const { user } = useAuth0();
    // i legit have no idea why i need this thing. normally, just calling user.sub.split("|") works.
    // I think its cause normally i keep all my hooks and stuffs in 
    let userID = null
    if(user != null){
        userID = user.sub.split("|")[1]
    }
    return (
        <PostContainer>
            <div className="post-body right">
                <p className="title center">Have thoughts? Share them</p>
                <BasicTextFields fullWidth label="Title" value={title} onChange={e => setTitle(e.target.value)}/>
                <BasicTextArea fullWidth label="Description" value={desc} onChange={e => setDesc(e.target.value)}/>
                <AnswerButton
                    label="Post"
                    onClick={()=>
                        newPost({
                            title: title,
                            description: desc,
                            authorId: userID
                        }).then(() => {
                            setTitle("");
                            setDesc("");
                            onSubmit();
                        })
                    }
                />
            </div>
        </PostContainer>
    )
}

const Post = ({
        postId,
        authorId,
        title = "Unset title",
        likes,
        dislikes,
        content = ".... ....... .... .... ... ....... ...",
        numComments = 0,
        CommentSection = () => <div></div>
    }) => {
        const { user } = useAuth0();
        const userID = user.sub.split("|")[1]

        const [showComment, setShowComment] = useState(false);
        // const [commentsData, setCommentsData]  = useState([]);
        // const refreshComments = () => getComments(postId).then((data)=>setCommentsData(data.commentsArray));

        // useEffect(() => {
        //     if (showComment) refreshComments();
        // }, [showComment])

        return (
            <PostContainer>
                <PostHeader displayname={authorId}/>
                <div className="post-body">
                    <div className="title">{title}</div>
                    <div className="content">{content}</div>
                </div>
                <div className="post-footer lined-footer">
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} sm={8}>
                            <PostSlider likes={likes} dislikes={dislikes}postID ={postId}userID={userID}/>
                        </Grid>
                        <Grid item xs={5} sm={2}>
                            <div className="center-center icon-button"
                                    onClick={()=>setShowComment(!showComment)}>
                                <AiOutlineMessage/><span className="comment-count">{numComments}</span>
                            </div>
                        </Grid>
                        <Grid item xs={4} sm={1} className="center-center">
                            <AiOutlineShareAlt className="icon-button"/>
                        </Grid>
                        <Grid item xs={3} sm={1} className="right">
                            <AiOutlineMore className="icon-button"/>
                        </Grid>
                    </Grid>
                    {(showComment) 
                        ? <CommentSection postId={postId}/> 
                        : <div></div>}
                </div>
            </PostContainer>
        )
}

const PostComment = ({commentId, comment = "Unfinished comment... ... . . ....", authorId}) => {

    return <PostContainer>
        <PostHeader displayname={authorId}/>
        <div className="post-body">
            <div className="content">{comment}</div>
        </div>
    </PostContainer>
}

const CommentCreate = ({postId, onSubmit=()=>{}}) => {
    const [desc, setDesc] = useState("");
    const { user } = useAuth0();
    const userID = user.sub.split("|")[1]
    return <div className="flex-container">
        <div className="flex-main">
            <BasicTextArea fullWidth label="Comment" value={desc} onChange={e => setDesc(e.target.value)}/>
        </div>
        <AnswerButton style={{margin: "1em"}}
            label="Post" 
            onClick={()=>
                newPostComment(
                    desc,
                    postId,
                    userID
                ).then(() => {
                    setDesc("");
                    onSubmit();
                })
            }/>
    </div>
}

const CommentSection = ({postId}) => {

    const [commentsData, setCommentsData]  = useState([]);

    const refreshComments = () => getComments(postId).then((data)=>setCommentsData(data.commentsArray));
    useEffect(() => {
        refreshComments()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return <div className="comment-section">
        <CommentCreate postId={postId} onSubmit={refreshComments}/>
        <div className="comment-group">
            {/* <PostComment /> */}
            {
                commentsData.map(comment => {

                    return <PostComment 
                    key={comment._id} 
                    commentId={comment._id}
                    comment={comment.text}
                    authorId={comment.authorId}
                />
                }
                   
                )
            }
        </div>
        <div className="center-center"><AiOutlineLeft className="icon-button"/><span>Page #</span><AiOutlineRight className="icon-button"/></div>
    </div>
}


const PostsSection = ({postsData=[]}) => {

    const { user } = useAuth0();
    const userID = user.sub.split("|")[1]
    console.log("posts", postsData);
    return <>{
        postsData.map(post => {
            if(post.authorId ===  userID){
                return <Post 
                key={post._id} 
                postId={post._id}
                authorId={post.authorId}
                title={post.title}
                likes={post.likes}
                dislikes={post.dislikes}
                content={post.description}
                numComments={post.numComments}
                CommentSection={CommentSection}
            />
            }else{
               return  <div></div>
            }
        }
            
        )
    }</>
}

const PostsPage = () => {

    const [postsData, setPostsData] = useState([]);

    const refreshPosts = () => getAllPosts().then((data)=>setPostsData(data.postsArray));

    useEffect(() => {
        refreshPosts();
    }, [])

    return (
        <>
            <PostCreate onSubmit={refreshPosts}/>
            {/* <Post CommentSection={()=><CommentSection/>}/> */}
            <PostsSection postsData={postsData}/>
        </>
    )
}



//------------------------------------------------------------------


const Profile = () => {
    // im hardcoding a userID for now 

    const { user } = useAuth0();

    const classes = useStyles();

    const [acs, setACS] = useState(0)
    const [description, setDescription] = useState('')
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('')
    const [username, setUsername] = useState('')
    const [profilePicB64, setProfilePicB64] = useState(null)

    const history = useHistory();
    const goToEditProfile = () =>{ 
      history.push(EDIT_PROFILE_URL);
    }
    
    const userID = user.sub.split("|")[1]

    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function getUserInfo() {
        const info = await getUser(userID)
        const user = info.user
        setACS(user.acs)
        setDescription(user.description)
        setEmail(user.email)
        setStatus(user.status)
        setUsername(user.username)
        setProfilePicB64(user.profilePic)
    }

    useEffect (() =>{
        getUserInfo()
    });

    const LabelDetail = ({label, value, indented=false}) => {
        return (
            <div className="post-header">
                <b>{label}: </b> 
                {(indented)
                    ? <div className="indent">{value}</div>
                    : <span>{value}</span>}
            </div>
        );
    };

    return (
        <div style={{padding: "1em"}}>
            <h1 style={{color: "white"}}>My Profile</h1>
            <Grid   container 
                    spacing={1} 
                    alignItems="center"
                    style={{padding: "1em"}}>
                <Grid   item 
                        md="auto" 
                        xs={12} 
                        style={{backgroundColor: "#343434"}}>
                    <img 
                        src={profilePicB64? profilePicB64 : null} 
                        alt={profilePicB64? profilePicB64.name : null} 
                        style={{minWidth:        "200px",
                                maxwidth:        "500px", 
                                height:          "300px",
                                minHeight:       "300px",
                                backgroundColor: "#909090"}}/>
                </Grid>
                <Grid item md xs={12}>
                    <Paper  className={classes.paperWhite} 
                            style={{backgroundColor: "#909090",
                                    boxSizing:       "border-box",
                                    minHeight:       "300px",
                                    textAlign:       "left"}}>
                        <LabelDetail label="ACS" value={acs}/>
                        <LabelDetail label="Username" value={username}/>
                        <LabelDetail label="Email" value={email}/>
                        <LabelDetail label="Status" value={status} indented={true}/><br/>
                        <LabelDetail label="About Me" value={description} indented={true}/>
                    </Paper>
                </Grid>
            </Grid>
            <DefaultButton label= {"Edit"} onClick={goToEditProfile} />
            <br/>
            <br/>
            <FloatingSection><h1>My Posts</h1></FloatingSection>
            <FloatingSection>
             <PostsPage></PostsPage>
            </FloatingSection>
        </div>

    )
}

export default Profile;