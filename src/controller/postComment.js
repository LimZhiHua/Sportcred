import { SERVER_ROOT,  DEFAULT_HEADER } from "../urls";
const fetch = require("node-fetch");

export const newPostComment = async (new_post_comment, post_id, author_id) => {

  const url = SERVER_ROOT + "/post/" + post_id + "/postComment/"
  const request = {
    method: "post",
    body: JSON.stringify({text: new_post_comment, author_id: author_id}),
    headers:  DEFAULT_HEADER(),
  }
        
  const result = {}

  const response = await fetch(url, request);

  if (response.status === 200){
    result.status = 200
    //const msg = await response.json()
    //result.user = msg.user;
  }else{
    console.log(response)
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