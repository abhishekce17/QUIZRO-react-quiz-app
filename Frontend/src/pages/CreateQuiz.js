import React, { useContext } from "react"
import AddQuestion from "../components/AddQuestion"
import PersonalInfo from "../components/PersonalInfo"
import { VscDiffAdded } from "react-icons/vsc"
import "./CreateQuiz.css"
import QuizContext from "../Context/quizContext"
import { Navigate, useNavigate } from 'react-router-dom'
import configUrl from "../config.json"

const CreateQuiz = () => {
  const context = useContext(QuizContext)
  let navigate = useNavigate()
  function toggleOption() {
    context.personalInfo.setPersonalInfoRequirement((prev) => {
      return { ...prev, status: !prev.status }
    })
  }
  async function createQuiz(e) {
    const quizDATA = {
      "quizData": {
        "userId": "",
        "Title": context.titleDescription[0].quizTitle,
        "Description": context.titleDescription[0].quizDescription,
        "Required Information": {
          "status": context.personalInfo.personalInfoRequirement.status,
          "infoFields": {
            "Name": context.personalInfo.personalInfoRequirement.infoFields.Name,
            "Email": context.personalInfo.personalInfoRequirement.infoFields.Email,
            "extraFields": context.personalInfo.personalInfoRequirement.infoFields.extraFields
          }
        },
        "Quiz Setting Info": {
          "randomizeQuestionsAndOptions": context.quizSettingInfo[0].randomizeQuestionsAndOptions,
          "showCorrectAnswer": context.quizSettingInfo[0].showCorrectAnswer,
          "showLeaderboard": context.quizSettingInfo[0].showLeaderboard,
          "showToatalEachPoints": context.quizSettingInfo[0].showToatalEachPoints,
          "defaultPoint": context.quizSettingInfo[0].defaultPoint,
          "closingTime": context.quizSettingInfo[0].closingTime,
          "quizTimer": context.quizSettingInfo[0].quizTimer
        },
        "Questions and MCQ/MSQ": context.quizQuestion[0]
      },
      // "Created at": new Date(),
      "answerData": context.quizAsnwer[0],
    }

    const apiData = await fetch(`${configUrl.baseURL}/api/quizoperations/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
      body: JSON.stringify(quizDATA),
    })
    if (apiData.status === 200) {
      context.clearState()
      navigate("/quiztools/dashboard/quizes")
    }


  }
  function addQuestion() {
    context.quizQuestionInfo[1](context.quizQuestionInfo[0] + 1)
    context.quizQuestion[1]((prev) => {
      return [...prev, { type: "mcq", point: "", question: "", option: [""] }]
    })
    context.optionCount[1]((prev) => [...prev, 1])
    let temp = context.quizAsnwer[0]
    temp.push({ questionId: "", question: "", answer: [] })
    context.quizAsnwer[1](temp)
  }


  function timerValue(e) {
    const { name, value } = e.target
    if (e.target.name === "closingTime") return context.quizSettingInfo[1]({ ...context.quizSettingInfo[0], [name]: [context.quizSettingInfo[0][name][0], value] })
    const { unit } = e.target.dataset
    context.quizSettingInfo[1]({ ...context.quizSettingInfo[0], [name]: [context.quizSettingInfo[0][name][0], { ...context.quizSettingInfo[0][name][1], [unit]: value }] })
  }

  function randomizeOptions(e) {
    const { name } = e.target.dataset
    if (name === "quizDescription" || name === "quizTitle") {
      return context.titleDescription[1]({ ...context.titleDescription[0], [name]: e.target.value })
    }
    else if (name === "quizTimer" || name === "closingTime") return context.quizSettingInfo[1]({ ...context.quizSettingInfo[0], [name]: [!context.quizSettingInfo[0][name][0], context.quizSettingInfo[0][name][1]] })
    else if (name === "defaultPoint") {
      const { value } = e.target
      return context.quizSettingInfo[1]({ ...context.quizSettingInfo[0], [name]: value })
    }
    context.quizSettingInfo[1]({ ...context.quizSettingInfo[0], [name]: !context.quizSettingInfo[0][name] })
  }



  return (localStorage.getItem("token") === null ? <Navigate to="/login" /> :
    <form className="create-section" method="post" onSubmit={(e) => {
      e.preventDefault()
      createQuiz()
    }} >
      <div className="personal-info" >
        <div className="status">
          <p>Personal Information </p>
          <div className={context.personalInfo.personalInfoRequirement.status ? "btn" : "btn active"} onClick={toggleOption} ></div>
        </div>
        {context.personalInfo.personalInfoRequirement.status && <PersonalInfo />}
      </div>
      <div className="randomize" >
        <div>
          <label>Randomize Questions</label>
          <div className={context.quizSettingInfo[0].randomizeQuestionsAndOptions ? "btn" : "btn active"} data-name="randomizeQuestionsAndOptions" onClick={randomizeOptions} ></div>
        </div>
        <div>
          <label>Respondents can see Leaderboard in the end</label>
          <div className={context.quizSettingInfo[0].showLeaderboard ? "btn" : "btn active"} data-name="showLeaderboard" onClick={randomizeOptions} ></div>
        </div>
        {context.quizSettingInfo[0].showLeaderboard &&
          <>
            <div>
              <label>Respondents can see total points and points received for each question</label>
              <div className={context.quizSettingInfo[0].showToatalEachPoints ? "btn" : "btn active"} data-name="showToatalEachPoints" onClick={randomizeOptions} ></div>
            </div>
            <div>
              <label>Respondents can see correct answers after grades are released</label>
              <div className={context.quizSettingInfo[0].showCorrectAnswer ? "btn" : "btn active"} data-name="showCorrectAnswer" onClick={randomizeOptions} ></div>
            </div>
          </>
        }
        <div className="timer" >
          <label>Quiz closing time</label>
          {context.quizSettingInfo[0].closingTime[0] && <input style={{ "width": "250px" }} name="closingTime" value={context.quizSettingInfo[0].closingTime[1]} type="datetime-local" onChange={timerValue} required />}
          <div className={context.quizSettingInfo[0].closingTime[0] ? "btn" : "btn active"} data-name="closingTime" onClick={randomizeOptions} ></div>
        </div>
        <div className="timer" >
          <label>Set Timer for quiz</label>
          {context.quizSettingInfo[0].quizTimer[0] && <div style={{ "justifyContent": "left", "border": "none", "margin": "0px" }} >
            <div style={{ "border": "none", "margin": "0px", "marginRight": "15px" }}>
              <label>Hours</label>
              <input style={{ "marginLeft": "10px" }} name="quizTimer" value={context.quizSettingInfo[0].quizTimer[1].hours} onChange={timerValue} data-unit="hours" type="number" min="0" required />
            </div>
            <div style={{ "margin": "0px", "border": "none" }}>
              <label>Minute</label>
              <input style={{ "marginLeft": "10px" }} name="quizTimer" value={context.quizSettingInfo[0].quizTimer[1].minute} onChange={timerValue} data-unit="minute" type="number" min="0" max="60" required />
            </div>
          </div>}
          <div className={context.quizSettingInfo[0].quizTimer[0] ? "btn" : "btn active"} data-name="quizTimer" onClick={randomizeOptions} ></div>
        </div>
        <div>
          <label>Default point values for every new question </label>
          <input type="text" value={context.quizSettingInfo[0].defaultPoint} onChange={randomizeOptions} data-name="defaultPoint" required />
        </div>
      </div>
      <div className="quiz-desc" >
        <label htmlFor="desc" >Description (optional)</label>
        <textarea data-name="quizDescription" onChange={randomizeOptions} value={context.titleDescription[0].quizDescription} rows={10} id="desc" type="text" />
      </div>
      <div className="quiz-title" >
        <label htmlFor="title" >Title</label>
        <input type="text" data-name="quizTitle" onChange={randomizeOptions} value={context.titleDescription[0].quizTitle} id="title" required />
      </div>
      <div className="question-section" >
        {[...Array(context.quizQuestionInfo[0])].map((value, index) => {
          return <AddQuestion id={index} key={index} />
        })}
        <div>
          <VscDiffAdded className="add-Question" onClick={addQuestion} />
        </div>
      </div>
      <div className="submit-reset-btn" >
        <button type="reset" >Reset</button>
        <button type="submit" >Create</button>
      </div>
    </form>
  )
}

export default CreateQuiz