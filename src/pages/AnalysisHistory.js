import React, {useEffect, useState}from "react";
import FloatingSection from "../customComponents/FloatingSection";
import {DefaultButton} from "../customComponents/buttons/Buttons";
import { useHistory } from "react-router-dom";
import { getQuestions, getResponse, getVotes } from "../controller/analysis";
import AnalysisResponseVote from "../customComponents/analysisResponseVote";
import {useAuth0} from "@auth0/auth0-react"


const AnalysisHistory = () => {
     const { user } = useAuth0();
     const userID = user.sub.split("|")[1]

    const [questionList, setQuestionList] = useState([])
    // each question will have one response associated with it (or just null)
    // Associate _id of the question to _id of the response.
    const [responseDict, setResponseDict] = useState({})
    // we need the list of all our questions
    const setup = async () => {
      const questList = (await getQuestions()).questionsArray
      setQuestionList(questList)
      console.log("--------------question list is--------------", questList)


      // for each of our questions, we need to link the questionID with a response
      let tempDict = {}
      // we also want to link each of our response IDs with an array of votes received
      let tempVoteValues = {}
      await  Promise.all(questList.map( async (question) => {
        try{
          // this is the user's response, so there will only ever be one for each question
          const response = (await getResponse(question._id, userID))
          if(response.status === 200){
            tempDict[question._id] = response.responseArray
          }
        }catch(err){
          console.log("error getting responses",err)
        }
        return ""
      }))
      console.log("temp dict is", tempDict)
      //console.log("temp vote vals is", tempVoteValues)
      setResponseDict(tempDict)
      //setResponseScore(tempVoteValues)

    }



    // get the list of questions
  useEffect(() => {
    setup()
  }, []);

  
    // reusing the AnalysisResponseVote component, except with fixed values.
    // I get the responseID, then use the 
    if(questionList.length > 0 && Object.keys(responseDict).length> 0 ){
      return (
        <FloatingSection>
            <h1>Past Questions</h1>
            <br></br>
            {
              questionList.map( question => {
                return(       <div>
                <AnalysisResponseVote fixed={true} question={question.question} response={responseDict[question._id]}></AnalysisResponseVote>
                </div>         

                  ) 
              })
            }
            <br></br>
            <br></br>

        </FloatingSection>
    )}else{
      return (
        <FloatingSection>

        </FloatingSection>
      )
    }
    }

export default AnalysisHistory;