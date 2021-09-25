import { SERVER_ROOT } from "../urls";
const Preseason = require('../models/preseason')
const PickTopic = require('../models/pickTopic')
const Pick = require('../models/pick')

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

export const assignPick = async (userId, topicId, pick) => {
	const url = SERVER_ROOT + "/picks/assignPick/"

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
	const url = SERVER_ROOT + "/picks/currentPick/"

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