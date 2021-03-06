import { SERVER_ROOT,  DEFAULT_HEADER } from "../urls";
const Debate = require('../models/debate')

export const getDebate = async (debateId) => {

  const url = SERVER_ROOT + "/debate/getDebate/" + debateId;

  const result = {}

  const response = await fetch(url);
  if (response.status === 200){
    const json = await response.json();
    result.status = response.status;
    result.debate = json.debate;
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}

export const getOptions = async (debateId) => {

  const url = SERVER_ROOT + "/debate/getAllOptions/" + debateId + "/";

  const result = {}

  const response = await fetch(url);
  if (response.status === 200){
    const json = await response.json();
    result.status = response.status;
    result.options = json.options;
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}

export const getOptionNames = async (debateId) => {

  const url = SERVER_ROOT + "/debate/getAllOptionNames/" + debateId + "/";

  const result = {}

  const response = await fetch(url);
  if (response.status === 200){
    const json = await response.json();
    result.status = response.status;
    result.options = json.options;
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}

export const getOptionVotes = async (debateId, optionId) => {

  const url = SERVER_ROOT + "/debate/optionVotes/" + debateId + "/" + optionId;

  const result = {}

  const response = await fetch(url);
  if (response.status === 200){
    const json = await response.json();
    result.status = response.status;
    result.votes = json.votes;
    console.log(result.votes)
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}

export const addDebate = async (body) => {

  const url = SERVER_ROOT + "/debate/addDebate";

  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(body),
    headers:  DEFAULT_HEADER(),
  });

  const result = {}

  const response = await fetch(request);
  result.status = response.status;

  if (response.status === 200){
    console.log('debate successfully added')
    const res = await response.json();
    result.debateId = res.id;
  } else {
    const msg = await response.text();
    result.error = msg;
  }

  return result;

}

export const addVote = async (body) => {

  const url = SERVER_ROOT + "/debate/addVote";

  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(body),
    headers:  DEFAULT_HEADER(),
  });

  const result = {}

  const response = await fetch(request);
  if (response.status === 200){
    console.log('vote successfully added')
    result.status = response.status;
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;

}

export const addOption = async (body) => {

  const url = SERVER_ROOT + "/debate/addOption";

  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(body),
    headers:  DEFAULT_HEADER(),
  });

  const result = {}

  const response = await fetch(request);
  if (response.status === 200){
    console.log('option successfully added')
    result.status = response.status;
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;

}

export const getAllDebates = async () => {
  const url = SERVER_ROOT + "/debate/"

  const request = new Request(url, {
    method: "get",
  });

  const result = {}

  const response = await fetch(request);
  if (response.status === 200){
    result.status = 200;
    const msg = await response.json();
    result.allDebates = msg.allDebates;
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}
