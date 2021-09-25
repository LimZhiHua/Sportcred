import { SERVER_ROOT } from "../urls";
const Vote = require('../models/vote')

export const getVote = async (voteId) => {

  const url = SERVER_ROOT + "/vote/getVote/" + voteId;

  const result = {}

  const response = await fetch(url);
  if (response.status === 200){
    const json = await response.json();
    result.status = response.status;
    result.vote = json.vote;
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}
