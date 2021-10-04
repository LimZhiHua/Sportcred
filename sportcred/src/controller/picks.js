const Preseason = require('../models/preseason')
const PickTopic = require('../models/pickTopic')
const Picks = require('../models/picks')
const fetch = require("node-fetch");

export const getPicksData = async () => {
  const url = "http://localhost:5000/picks/getPicksData"

  const request = new Request(url, {
    method: "get",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    }
  });

  const result = {}

  const response = await fetch(request);
  if (response.status === 200) {
    result.status = 200
    let msg = await response.json()
    console.log(msg);
    if (msg.playersByTeams.length === 0) { // if the current db has no data for players by teams
      msg = await getAllPlayers();
    }
    // ADD:
    /////////////////////////////////////
    result.playersByTeams = msg.playersByTeams;
    ////////////////////////////////////
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}


/**
 * 
 * ONLY CALL THIS API WHEN THE playersByTeams schema does not have stored data i.e
 *  Run getPicksData Api and if it returns empty list then run getAllPlayers API
 */

export const getAllPlayers = async () => {
  console.log("calling fantsay api");
  const url = "http://localhost:5000/picks/getAllPlayers"

  const request = new Request(url, {
    method: "get",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    }
  });

  const result = {}

  const response = await fetch(request);
  if (response.status === 200) {
    result.status = 200
    const msg = await response.json()
    // ADD:
    /////////////////////////////////////
    result.playersByTeam = msg.playersByTeam;
    ////////////////////////////////////
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}

export const getPreseasonTopics = async () => {

  const url = "http://localhost:5000/picks/preseasonTopics"

  const result = {}

  const response = await fetch(url);
  if (response.status === 200){
    const json = await response.json();
    result.status = response.status;
    result.topics = json
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}

export const getRegularSeasonTopics = async () => {

  const url = "http://localhost:5000/picks/regularSeasonTopics"

  const result = {}

  const response = await fetch(url);
  if (response.status === 200){
    const json = await response.json();
    result.status = response.status;
    result.topics = json
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}

export const getPlayoffsTopics = async () => {

  const url = "http://localhost:5000/picks/playoffsTopics"

  const result = {}

  const response = await fetch(url);
  if (response.status === 200){
    const json = await response.json();
    result.status = response.status;
    result.topics = json
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}

export const assignPick = async (userId, topicId, pick) => {
	const url = "http://localhost:5000/picks/assignPick/"

	const request = new Request(url, {
	  method: "post",
	  body: JSON.stringify({userId: userId, topicId: topicId, pick: pick}),
	  headers: {
	    Accept: "application/json, text/plain, */*",
	    "Content-Type": "application/json",
	  }
	});

	const result = {}

	const response = await fetch(request);
	result.status = response.status;

	return result;
}

export const getCurrentPick = async (userId, topicId) => {
	const url = "http://localhost:5000/picks/currentPick/"

	const request = new Request(url, {
	  method: "post",
	  body: JSON.stringify({userId: userId, topicId: topicId}),
	  headers: {
	    Accept: "application/json, text/plain, */*",
	    "Content-Type": "application/json",
	  }
	});

	const result = {}

	const response = await fetch(request);
	result.status = response.status;

	if (response.status === 200) {
	  const msg = await response.json()
	  result.pick = msg;
	}

	return result;

}