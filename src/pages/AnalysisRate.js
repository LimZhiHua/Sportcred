import FloatingSection from "../customComponents/FloatingSection";
import {BasicTextArea} from "../customComponents/inputFields/inputFields";
import {DefaultButton} from "../customComponents/buttons/Buttons"
import Card from "../customComponents/card/Card";
import SliderComponent from "../customComponents/slider/SliderComponent";
import { getResponses, getDailyQuestion, addVote } from "../controller/analysis";
import React, { useState, useEffect }  from "react";
import {useAuth0} from "@auth0/auth0-react"
import AnalysisResponseVote from "../customComponents/analysisResponseVote"


const AnalysisRate = () => {

  const [responses, setResponses] = useState([])
  const [questionID, setQuestionID] = useState(null)
  const [todaysQuestion, setTodaysQuestion] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const { user } = useAuth0();
  const userID = user.sub.split("|")[1]

  // I need to store the values of each of the responses. This will be done as a dictionary
  // key is questionID, value is the vote/score
  // When i submit, i create an analysis vote.
  const [scoreList, setScoreList] = useState({})

  const setup = async () =>{
    const dailyQuestion = (await getDailyQuestion(userID)).foundPost
    setQuestionID(dailyQuestion.questionId)
    setTodaysQuestion(dailyQuestion.question)
    const responseList = (await getResponses(dailyQuestion.questionId)).responseArray
    setResponses(responseList)
    // generate the score list. Default is 50
    console.log("response list is", responseList)
  }

  const saveScore = (questionID, value) => {
    setScoreList(prevList => ({...prevList, [questionID]: value}))
  }

  const submit = async () => {
    if(!submitted){
      // Go through each item in scoreList and run add vote on it
      let success = true
      try{
        for( let key in scoreList){
          let response = await addVote(key, userID, scoreList[key] )
          if(response.status !== 200){
            success = false
          }
        }
      }catch(err){
        window.alert("an error occured saving your scores")
      }
      if(success){
        window.alert("Successfully saved your scores!")
        setSubmitted(true)
      }else{
        window.alert("an error occured saving one or more of your scores.")
      }
    }else{
      window.alert("you have already submitted your daily response!")
    }
    
  }

  useEffect(() => {
    setup()
}, []);

  return (
    
      <FloatingSection>
        <h1>Today's Question:</h1>
        <h1>{todaysQuestion}</h1>
        <br></br>
        {
          responses.map(response => {
            if(response.userId !== userID){
              return <AnalysisResponseVote key={"responseBox" + response._id}response={response} saveScore = {saveScore}></AnalysisResponseVote>
            }else{
              return <div key={response._id}></div>
            }
          })
        }
        <DefaultButton key={"submitButton"}onClick={submit} style={{ 'backgroundColor': "#FF652F"}}label= {"SUBMIT"} />

      </FloatingSection>
    
  )
}


export default AnalysisRate;