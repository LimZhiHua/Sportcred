import { SERVER_ROOT,  DEFAULT_HEADER } from "../urls";
const SurveyQuestion = require('../models/surveyQuestion')

export const submitSurvey = async (body) => {

  const url = SERVER_ROOT + "/survey/new"

  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(body),
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

export const newSurveyQuestionAnswer = (question, answer) => {
  return {
    question: question,
    answer: answer
  };
}