import { sendNotif } from "./notif";
import { getUser } from "./user";

const fetch = require("node-fetch");

export const resetTriviaCount = async (playerID) => {
  const response = await fetch(
    "http://localhost:5000/trivia/reset-trivia-count",
    {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "auth-token": "jsonwebtoken",
        },
        body: JSON.stringify({
            playerID: playerID

        }),
    }
);

const result = {}
if (response.status === 200){
  const msg = await response.json();
  console.log(msg);
  result.user = msg.user;
  result.status = 200;
}else{
  const msg = await response.text();
  console.log(msg);
  result.error = msg;
}
return result;
  
}

export const subtractTriviaCount = async (playerID) => {
  const response = await fetch(
    "http://localhost:5000/trivia/subtract-trivia-count/" + playerID,
    {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "auth-token": "jsonwebtoken",
        },
    }
);

const result = {}
if (response.status === 200){
  const msg = await response.json();
  console.log(msg);
  result.user = msg.user;
  result.status = 200;
}else{
  const msg = await response.text();
  console.log(msg);
  result.error = msg;
}
return result;
  
}

export const getTriviaCount = async (playerID) => {
  const url = "http://localhost:5000/trivia/get-trivia-count/" + playerID
  console.log("running get triviacount")
  const request = {
    method: "get",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    }
  }

  const result = {}

  const response = await fetch(url, request);

  result.status = response.status;

  if(result.status === 200){
      const json = await response.json()
      result.triviaCount = json
  } else {
      const msg = await response.text()
      result.error = msg
  }
  return result;
}

export const addTrivia = async (players) => {

    const url = "http://localhost:5000/trivia/addSession"
    const request = {
      method: "post",
      body: JSON.stringify(players),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      }
    }
  
    const result = {}
  
    const response = await fetch(url, request);
  
    result.status = response.status;

    if(result.status === 200){
        const json = await response.json()
        result.id = json.id
    } else {
        const msg = await response.text()
        result.error = msg
    }
  
    return result;
}

export const getTrivia = async (id) => {
    const url = "http://localhost:5000/trivia/" + id
  
    const request = {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      }
    }
  
    const result = {}
  
    const response = await fetch(url, request);
  
    result.status = response.status;

    if(result.status === 200){
        const json = await response.json()
        result.trivia = json.foundSession
    } else {
        const msg = await response.text()
        result.error = msg
    }
  
    return result;
}

export const incrementScore = async (sid, pid) => {
    const url = "http://localhost:5000/trivia/add-point";
  
    const request = {
      method: "post",
      body: JSON.stringify({sid: sid, pid: pid}),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      }
    }
  
    const result = {}
  
    const response = await fetch(url, request);
  
    result.status = response.status;
    const msg = await response.text()
    result.text = msg
  
    return result;
}

export const finishTrivia = async (sid, pid, total) => {
    const url = "http://localhost:5000/trivia/finish-trivia";
    const request = {
      method: "post",
      body: JSON.stringify({sid: sid, pid: pid}),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      }
    }
  
    const result = {}
  
    const response = await fetch(url, request);
    result.status = response.status;
    if(result.status === 200){
        const json = await response.json()
        console.log("json is", json)
        result.trivia = json.trivia
        result.currPlayer = json.currPlayer
        result.otherPlayer = json.otherPlayer
    } else {
        const msg = await response.text()
        result.error = msg
    }

    const currUser = await getUser(result.currPlayer.userId)
    if(result.otherPlayer == null){
      result.otherPlayer = result.currPlayer
    }
    await sendNotif({
        sender: pid,
        notifBody: currUser.user.username + " has scored " + result.currPlayer.totalScore + "/" + total + " in your trivia battle!",
        link: result.trivia, 
        recipient: result.otherPlayer.userId,
        type: "Info"
    })

    return result;
}