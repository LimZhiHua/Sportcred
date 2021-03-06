import { SERVER_ROOT,  DEFAULT_HEADER } from "../urls";
// const Post = require('../models/post');
const fetch = require("node-fetch");

export const newPost = async (new_post) => {
  console.log("new post is", new_post)
  const url = SERVER_ROOT + "/post/"

  const request = {
    method: "post",
    body: JSON.stringify(new_post),
    headers:  DEFAULT_HEADER(),
  }

  const result = {}

  const response = await fetch(url, request);
  if (response.status === 200) {
    result.status = 200
    const msg = await response.json()
    result.post = msg.post;
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;

}

export const getAllPosts = async () => {
  const url = SERVER_ROOT + "/post/"

  const request = {
    method: "get",
  }

  const result = {}

  const response = await fetch(url, request);

  if (response.status === 200) {
    result.status = 200
    const msg = await response.json()
    console.log("msg is", msg)
    // ADD:
    /////////////////////////////////////
    result.postsArray = msg.postsArray;
    ////////////////////////////////////
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}

export const getPost = async (post_id) => {

  const result = {}

  if (post_id === "") {
    const msg = "Post id is required"
    result.status = 400
    result.error = msg
    return result
  }

  const url = SERVER_ROOT + "/post/" + post_id

  const request = {
    method: "get",
  }

  const response = await fetch(url, request);
  if (response.status === 200) {
    result.status = 200
    const msg = await response.json()
    result.foundPost = msg.foundPost;
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}

export const editPost = async (post_id, likes, dislikes)=>{
  const url = SERVER_ROOT + "/post/" + post_id
  const result = {}
  const request = {
    method: "post",
    body: JSON.stringify({likes: likes, dislikes:dislikes}),
    headers:  DEFAULT_HEADER(),
  }

  const response = await fetch(url, request);
  if (response.status === 200) {
    result.status = 200
    result.msg = await response.json()
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;

}