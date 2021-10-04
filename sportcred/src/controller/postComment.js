import { SERVER_ROOT } from "../urls";
const PostComment = require('../models/post');
const fetch = require("node-fetch");

export const newPostComment = async (new_post_comment, post_id) => {

  const url = SERVER_ROOT + "/post/" + post_id + "/postComment/"

  const request = {
    method: "post",
    body: JSON.stringify({text: new_post_comment}),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    }
  }

  const result = {}

  const response = await fetch(url, request);

  if (response.status === 200){
    result.status = 200
    //const msg = await response.json()
    //result.user = msg.user;
  }else{
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;

}

export const getComments = async (post_id) => {
  const url = SERVER_ROOT + "/post/" + post_id + "/comments/";

  const request = {
    method: "get",
  }

  const result = {}

  const response = await fetch(url, request);
  if (response.status === 200) {
    result.status = 200
    const msg = await response.json()
    // ADD:
    /////////////////////////////////////
    result.commentsArray = msg.commentsArray;
    ////////////////////////////////////
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}