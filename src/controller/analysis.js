import { SERVER_ROOT,  DEFAULT_HEADER } from "../urls";

const fetch = require("node-fetch");

// TODO: not done!
export const addQuestion = async (players) => {

  const url = SERVER_ROOT + "/analysis/addQuestion"
  const request = {
    method: "post",
    body: "",
    headers:  DEFAULT_HEADER(),
  }

  const result = {}

  const response = await fetch(url, request);

  result.status = response.status;

  if(result.status === 200){
      const json = await response.json()
  } else {
      const msg = await response.text()
      result.error = msg
  }

  return result;
}