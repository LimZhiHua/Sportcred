import { SERVER_ROOT,  DEFAULT_HEADER } from "../urls";
const option = require('../models/option')

export const getOption = async (optionId) => {

  const url = SERVER_ROOT + "/option/getOption/" + optionId;

  const result = {}

  const response = await fetch(url);
  if (response.status === 200){
    const json = await response.json();
    result.status = response.status;
    result.option = json.option;
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}
