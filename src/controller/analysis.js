import { SERVER_ROOT,  DEFAULT_HEADER } from "../urls";

const fetch = require("node-fetch");

// TODO: not done!
export const addQuestion = async (question) => {
  console.log("question added it:", question)
  const url = SERVER_ROOT + "/analysis/addQuestion"
  const request = {
    method: "post",
    body: JSON.stringify(question),
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

export const getDailyQuestion = async (userID) => {

  const result = {}

  if (userID === "") {
    const msg = "userID is required"
    result.status = 400
    result.error = msg
    return result
  }

  const url = SERVER_ROOT + "/analysis/getQuestion/" + userID

  const request = {
    method: "get",
    headers:  DEFAULT_HEADER(),
  }

  const response = await fetch(url, request);
  if (response.status === 200) {
    result.status = 200
    const msg = await response.json()
    result.foundPost = msg;
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}

export const getQuestions = async () => {
  const url = SERVER_ROOT + "/analysis/getQuestions/"

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
    result.questionsArray = msg;
    ////////////////////////////////////
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}

export const addResponse = async (questionId, userId, answer) => {
  const url = SERVER_ROOT + "/analysis/addResponse"
  const request = {
    method: "post",
    body: JSON.stringify({questionId: questionId,
      userId: userId,
      response: answer}),
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
/*
export const addResponse = async (date) => {

  const result = {}

  if (date === "") {
    const msg = "date is required"
    result.status = 400
    result.error = msg
    return result
  }

  const url = SERVER_ROOT + "/analysis/addResponse/" + date

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
*/
export const getResponses = async (questionID) => {
  console.log("questiondid is", questionID)
  const url = SERVER_ROOT + "/analysis/getResponses/" + questionID
  const request = {
    method: "get",
    headers:  DEFAULT_HEADER()
  }

  const result = {}

  const response = await fetch(url, request);
  if (response.status === 200) {
    result.status = 200
    const msg = await response.json()
    // ADD:
    /////////////////////////////////////
    result.responseArray = msg;
    ////////////////////////////////////
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}


export const getResponse = async (questionID, userID) => {
  const url = SERVER_ROOT + "/analysis/getResponse/" + questionID + "/" + userID
  const request = {
    method: "get",
    headers:  DEFAULT_HEADER()
  }

  const result = {}

  const response = await fetch(url, request);
  if (response.status === 200) {
    result.status = 200
    const msg = await response.json()
    // ADD:
    /////////////////////////////////////
    result.responseArray = msg;
    ////////////////////////////////////
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}

export const addVote = async (responseID, userID, rating) => {

  const result = {}

  const url = SERVER_ROOT + "/analysis/addVote"

  const request = {
    method: "post",
    headers:  DEFAULT_HEADER(),
    body: JSON.stringify({responseId: responseID,
      rating: rating ,
      userId:userID }),

  }

  const response = await fetch(url, request);


  
  if (response.status === 200) {
    result.status = 200
    
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }
  
  return result;
}


export const getVotes = async (responseID) => {

  const result = {}

  const url = SERVER_ROOT + "/analysis/getVotes/" +  responseID

  const request = {
    method: "get",
    headers:  DEFAULT_HEADER(),
  }

  const response = await fetch(url, request);
  if (response.status === 200) {
    result.status = 200
    const msg = await response.json()
    console.log("msg is", msg)
    result.votes = msg;
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}