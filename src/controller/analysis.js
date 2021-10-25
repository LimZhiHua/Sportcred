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

export const getDailyQuestion = async (date) => {

  const result = {}

  if (date === "") {
    const msg = "date is required"
    result.status = 400
    result.error = msg
    return result
  }

  const url = SERVER_ROOT + "/analysis/getQuestion/" + date

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
    // ADD:
    /////////////////////////////////////
    result.questionsArray = msg.questionsArray;
    ////////////////////////////////////
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}

export const addResponse = async (questionId, userId, response) => {
  const url = SERVER_ROOT + "/analysis/addResponse"
  const request = {
    method: "post",
    body: JSON.stringify({questionId: questionId,
      userId: userId,
      response: response}),
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

export const getResponses = async () => {
  const url = SERVER_ROOT + "/analysis/getResponses/"

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
    result.questionsArray = msg.questionsArray;
    ////////////////////////////////////
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}

export const addVote = async (date) => {

  const result = {}

  if (date === "") {
    const msg = "date is required"
    result.status = 400
    result.error = msg
    return result
  }

  const url = SERVER_ROOT + "/analysis/addVote/" + date

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