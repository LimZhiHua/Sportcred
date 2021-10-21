import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';


// icons
import { 
    AiOutlineMessage, AiOutlineMore, AiOutlineShareAlt,
    AiOutlineLeft, AiOutlineRight,
} from "react-icons/ai";

// components
import PostSlider from "../customComponents/postSlider/PostSlider";
import {BasicTextFields, BasicTextArea} from "../customComponents/inputFields/inputFields"
import {AnswerButton} from "../customComponents/buttons/Buttons"
import FloatingSection from "../customComponents/FloatingSection";

// controllers
import { getAllPosts, newPost } from '../controller/post';
import { getComments, newPostComment } from '../controller/postComment';
// import  {getUsername} from '../controller/user';

// Auth
import {useAuth0} from "@auth0/auth0-react"



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


const PostsSection = ({userFilter= false, postsData=[]}) => {
    const { user } = useAuth0();
    const userID = user.sub.split("|")[1]
    console.log("user filter is", userFilter)
    return <>{
        postsData.map(post => 
            {   // if we dont care about who our posts are from, just return them (no user filter)
                if(!userFilter){
                    return   <Post 
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
                // if we do care, then we return a post only if it is a correct one (return <div></div> otherwise, so it doesn't complain about returning nulls)
                }else if(userID === post.authorId){
                    return   <Post 
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
                }
            }
          
        )
    }</>
}

export const PostsPage = (props) => {

    const [postsData, setPostsData] = useState([]);

    const refreshPosts = () => getAllPosts().then((data)=>setPostsData(data.postsArray));

    useEffect(() => {
        refreshPosts();
    }, [])

    //userFilter is just for the profile page to filter out your own posts
    return (
        <>
            <PostCreate onSubmit={refreshPosts}/>
            {/* <Post CommentSection={()=><CommentSection/>}/> */}
            <PostsSection userFilter = {props.filter}  postsData={postsData}/>
        </>
    )
}

 