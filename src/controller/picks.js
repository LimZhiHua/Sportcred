import { SERVER_ROOT,  DEFAULT_HEADER } from "../urls";
const fetch = require("node-fetch");


export const getRegularSeasonData = async () => {
  const url = SERVER_ROOT + "/picks/getRegularSeasonData"


  const result = {}

  const response = await fetch(url);
  if (response.status === 200) {
    result.status = 200
    let msg = await response.json()
    console.log(msg);
    if (msg.gamesByDate.length === 0) { // if the current db has no data for games by ate
      msg = await getGamesByDate();
    }
    // ADD:
    /////////////////////////////////////
    result.gamesByDate = msg.gamesByDate;
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
 * ONLY CALL THIS API WHEN THE gamesByDate schema does not have stored data i.e
 *  Run getRegularSeasonData Api and if it returns empty list then run getGamesByDate API
 */

export const getGamesByDate = async () => {
  const url = SERVER_ROOT + "/picks/getRegularSeasonData"
  console.log("running get games by date")
  const result = {}

  const response = await fetch(url);
  if (response.status === 200) {
    result.status = 200
    const msg = await response.json()
    // ADD:
    /////////////////////////////////////
    result.gamesByDate = msg.gamesByDate;
    ////////////////////////////////////
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}



export const getPicksData = async () => {
  //const url = "http://localhost:5000/picks/getPicksData"
  const url = SERVER_ROOT + "/picks/getPicksData"

  // const request = new Request(url, {
  //   method: "get",
  //   headers: {
  //     Accept: "application/json, text/plain, */*",
  //     "Content-Type": "application/json",
  //   }
  // });

  const result = {}

  const response = await fetch(url);
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
  //const url = "http://localhost:5000/picks/getAllPlayers"
  const url = SERVER_ROOT + "/picks/getAllPlayers"
  

  // const request = new Request(url, {
  //   method: "get",
  //   headers: {
  //     Accept: "application/json, text/plain, */*",
  //     "Content-Type": "application/json",
  //   }
  // });

  const result = {}

  const response = await fetch(url);
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

  const url = SERVER_ROOT + "/picks/preseasonTopics"

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

  const url = SERVER_ROOT + "/picks/regularSeasonTopics"

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

  const url = SERVER_ROOT + "/picks/playoffsTopics"

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

export const assignPick = async (userId, topicName, pick, year) => {
  const url = SERVER_ROOT + "/picks/assignPick/"

	const request = new Request(url, {
	  method: "post",
	  body: JSON.stringify({userId: userId, topicName: topicName, pick: pick, year:year}),
	  headers:  DEFAULT_HEADER(),
	});

	const result = {}

	const response = await fetch(request);
	result.status = response.status;

	return result;
}





export const getCurrentPick = async (userId, topicName, year) => {
	const url = SERVER_ROOT + "/picks/currentPick/"
	const request = new Request(url, {
	  method: "post",
	  body: JSON.stringify({userId: userId, topicName: topicName, year: year}),
	  headers:  DEFAULT_HEADER(),
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

export const getCurrentRegularPick = async (userId) => {
  console.log("gettinr regular picks for ", userId)
	const url = SERVER_ROOT + "/picks/getRegularPicksData/" + userId
	const request = new Request(url, {
	  method: "get",
	  headers:  DEFAULT_HEADER(),
	});

	const result = {}

	const response = await fetch(request);
	result.status = response.status;
  console.log("responded with ")
	if (response.status === 200) {
	  const msg = await response.json()
	  result.pick = msg;
	}

	return result;
}

export const assignRegularPick = async (userId, pick, matchID) => {
  console.log("assigning regular pick lol",matchID)
  const url = SERVER_ROOT + "/picks/assignRegularPick/"

	const request = new Request(url, {
	  method: "post",
	  body: JSON.stringify({userId: userId, pick: pick, matchID:matchID }),
	  headers:  DEFAULT_HEADER(),
	});

	const result = {}

	const response = await fetch(request);
	result.status = response.status;

	return result;
}
