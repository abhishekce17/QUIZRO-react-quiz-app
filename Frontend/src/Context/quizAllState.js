import React, { useState } from 'react'
import QuizContext from './quizContext'

const QuizAllState = (props) => {
  const [personalInfoRequirement, setPersonalInfoRequirement] = useState({
    status: true,
    infoFields: { Name: true, Email: true, extraFields: [] }
  })
  const [hamburgerStatus, setHamburgerStatus] = useState(false)
  const [quizSettingInfo, setquizSettingInfo] = useState({
    randomizeQuestionsAndOptions: true,
    showCorrectAnswer: true,
    showLeaderboard: true,
    showToatalEachPoints: true,
    defaultPoint: "",
    closingTime: [true, ""],
    quizTimer: [true, { hours: '', minute: '' }]
  })
  const [quizTitleDescription, setQuizTitleDescription] = useState({ quizTitle: "", quizDescription: "" })
  const [questionCount, setQuestionCount] = useState(1)
  const [extrafieldCount, setExtraFieldCount] = useState(0)
  const [quizQuestions, setQuizQuestions] = useState([{
    question: "",
    type: "mcq",
    point: "",
    option: [""]
  }])
  const [optionsCount, setOptionsCount] = useState([1])
  const [answers, setAnswers] = useState([{questionId: "",question : "",answer : [] }])

  function clearAllState(){
    setPersonalInfoRequirement({
      status: true,
      infoFields: { Name: true, Email: true, extraFields: [] }
    })
    setquizSettingInfo(
      {
        randomizeQuestionsAndOptions: true,
        showCorrectAnswer: true,
        showIncorrectMissedQuestions: true,
        showLeaderboard: true,
        showToatalEachPoints: true,
        defaultPoint: "",
        closingTime: [true, ""],
        quizTimer: [true, { hours: '', minute: '' }]
      }
    )
    setQuizTitleDescription(
      { quizTitle: "", quizDescription: "" }
    )
    setQuestionCount(1)
    setExtraFieldCount(0)
    setQuizQuestions([{
      question: "",
      type: "mcq",
      point: "",
      option: [""]
    }])
    setOptionsCount([1])
    setAnswers([{questionId: "",question : "",answer : [] }])
  }


  const value = {
    personalInfo: { personalInfoRequirement: personalInfoRequirement, setPersonalInfoRequirement: setPersonalInfoRequirement },
    quizSettingInfo: [quizSettingInfo, setquizSettingInfo],
    titleDescription: [quizTitleDescription, setQuizTitleDescription],
    quizQuestionInfo: [questionCount, setQuestionCount],
    extraFieldCount: [extrafieldCount, setExtraFieldCount],
    quizQuestion: [quizQuestions, setQuizQuestions],
    optionCount: [optionsCount, setOptionsCount],
    quizAsnwer : [answers, setAnswers],
    clearState : clearAllState,
    hamburgerStatus :[hamburgerStatus, setHamburgerStatus]
  }

  return (
    <QuizContext.Provider value={value} >
      {props.children}
    </QuizContext.Provider>
  )
}
export default QuizAllState