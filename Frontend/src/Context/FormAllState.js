import React, { createContext, useState } from 'react'
const FormContext = createContext()

const FormAllState = (props) => {

  const [personalInfoRequirement, setPersonalInfoRequirement] = useState({
    status: true,
    infoFields: { Name: true, Email: true, extraFields: [] }
  })
  const [quizTitleDescription, setQuizTitleDescription] = useState({ quizTitle: "", quizDescription: "" })
  const [questionCount, setQuestionCount] = useState(1)
  const [extrafieldCount, setExtraFieldCount] = useState(0)
  const [quizQuestions, setQuizQuestions] = useState([{
    question: "",
    type: "mcq",
    option: [""]
  }])
  const [optionsCount, setOptionsCount] = useState([1])

  function clearAllState(){
    setPersonalInfoRequirement({
      status: true,
      infoFields: { Name: true, Email: true, extraFields: [] }
    })
    setQuizTitleDescription(
      { quizTitle: "", quizDescription: "" }
    )
    setQuestionCount(1)
    setExtraFieldCount(0)
    setQuizQuestions([{
      question: "",
      type: "mcq",
      option: [""]
    }])
    setOptionsCount([1])
  }


  const value = {
    personalInfo: { personalInfoRequirement: personalInfoRequirement, setPersonalInfoRequirement: setPersonalInfoRequirement },
    titleDescription: [quizTitleDescription, setQuizTitleDescription],
    quizQuestionInfo: [questionCount, setQuestionCount],
    extraFieldCount: [extrafieldCount, setExtraFieldCount],
    quizQuestion: [quizQuestions, setQuizQuestions],
    optionCount: [optionsCount, setOptionsCount],
    clearState: clearAllState

  }

  return (
    <FormContext.Provider value={value} >
      {props.children}
    </FormContext.Provider>
  )
}
export { FormContext, FormAllState }