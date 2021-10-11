import { SERVER_ROOT,  DEFAULT_HEADER } from "../urls";
const Radar = require('../models/radar')

export const addFollower = async (body) => {

  const url = SERVER_ROOT + "/radar/addFollower"

  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(body),
    headers:  DEFAULT_HEADER(),
  });

  const result = {}

  const response = await fetch(request);
  if (response.status === 200){
    console.log('follower successfully added')
    result.status = response.status;
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;

}

export const getFollowers = async (req) => {

  const url = SERVER_ROOT + "/radar/getFollowers/" + req.user

  const request = new Request(url, {
    method: "get",
    headers:  DEFAULT_HEADER(),
  });

  const result = {}

  const response = await fetch(request);
  if (response.status === 200){
    const json = await response.json();
    result.status = response.status;
    result.followers = json.followers;
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}