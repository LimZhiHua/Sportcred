import { SERVER_ROOT,  DEFAULT_HEADER } from "../urls";
import { sendNotif } from "./notif";
import { getUser } from "./user";
import {useAuth0} from "@auth0/auth0-react"
import React,{userState} from 'react'; // import useState

const fetch = require("node-fetch");



export const resetTriviaCount = async (playerID, token) => {
  const response = await fetch(
    SERVER_ROOT + "/trivia/reset-trivia-count",
    {
        method: "POST",
        headers:  DEFAULT_HEADER(),
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

export const SubtractTriviaCount =  async (playerID) => {
  try{
    const response = await fetch(
      SERVER_ROOT + "/trivia/subtract-trivia-count/" + playerID,
      {
          method: "POST",
          headers:  DEFAULT_HEADER(),
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
  } catch(error){
    console.log(error)
  }
 
  
}

export const getTriviaCount = async (playerID, token) => {
  const url = SERVER_ROOT + "/trivia/get-trivia-count/" + playerID
  const result = {}

  try{
    const request = {
      method: "get",
      headers:  DEFAULT_HEADER(),
    }
  
  
    const response = await fetch(url, request);
    result.status = response.status;
    if(result.status === 200){
      const json = await response.json()
      result.triviaCount = json
  } else {
      const msg = await response.text()
      result.error = msg
  }
  }catch(error){
      result.error = error
  }

 
  return result;
}

export const addTrivia = async (players) => {

    const url = SERVER_ROOT + "/trivia/addSession"
    const request = {
      method: "post",
      body: JSON.stringify(players),
      headers:  DEFAULT_HEADER(),
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
    const url = SERVER_ROOT + "/trivia/" + id
  
    const request = {
      method: "get",
      headers:  DEFAULT_HEADER(),
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
    const url = SERVER_ROOT + "/trivia/add-point";
  
    const request = {
      method: "post",
      body: JSON.stringify({sid: sid, pid: pid}),
      headers:  DEFAULT_HEADER(),
    }
  
    const result = {}
  
    const response = await fetch(url, request);
  
    result.status = response.status;
    const msg = await response.text()
    result.text = msg
  
    return result;
}

export const finishTrivia = async (sid, pid, total) => {
    const url = SERVER_ROOT + "/trivia/finish-trivia";
    const request = {
      method: "post",
      body: JSON.stringify({sid: sid, pid: pid}),
      headers:  DEFAULT_HEADER(),
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

    const currUser = await getUser(result.playerID)
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