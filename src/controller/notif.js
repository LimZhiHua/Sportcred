import { SERVER_ROOT,  DEFAULT_HEADER } from "../urls";
const fetch = require("node-fetch");

export const sendNotif = async (challenge) => {

  const url = SERVER_ROOT + "/notif/send-notif"

  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(challenge),
    headers:  DEFAULT_HEADER(),
  })

  const result = {}

  const response = await fetch(request);
  result.status = response.status;

  if (response.status !== 200){
    const msg = await response.text();
    result.error = msg;
  }

  return result;
}

export const getNotifs = async (user) => {
  const url = SERVER_ROOT + "/notif/get-notifs/" + user

  const request = new Request(url, {
    method: "get",
    headers:  DEFAULT_HEADER(),
  })

  const result = {}

  const response = await fetch(request);
  result.status = response.status;

  if (response.status === 200){
    const res = await response.json();
    result.notifs = res.notifs;
  }

  return result;
}