import React, { useContext } from "react"
import AddQuestion from "../components/AddQuestion"
import PersonalInfo from "../components/PersonalInfo"
import { VscDiffAdded } from "react-icons/vsc"
import "./CreateQuiz.css"
import { FormContext } from "../Context/FormAllState"
import { useNavigate } from "react-router-dom"
import configUrl from "../config.json"

const CreateForm = () => {
  const context = useContext(FormContext)
  let navigate = useNavigate()
  function toggleOption() {
    context.personalInfo.setPersonalInfoRequirement((prev) => {
      return { ...prev, status: !prev.status }
    })
  }
  async function createForm(e) {
    const quizData = {
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
        "Form Questions": context.quizQuestion[0]
      }
    }

    const apiData = await fetch(`${configUrl.baseURL}/api/quizoperations/createForm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
      body: JSON.stringify(quizData),
    })
    if (apiData.status === 200) {
      context.clearState()
      navigate("/quiztools/dashboard/forms")
    }

  }
  function addQuestion() {
    context.quizQuestionInfo[1](context.quizQuestionInfo[0] + 1)
    context.quizQuestion[1]((prev) => {
      return [...prev, { type: "mcq", question: "", option: [""] }]
    })
    context.optionCount[1]((prev) => [...prev, 1])
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



  return (
    <form className="create-section" method="post" onSubmit={(e) => {
      e.preventDefault()
      createForm()
    }} >
      <div className="personal-info" >
        <div className="status">
          <p>Personal Information </p>
          <div className={context.personalInfo.personalInfoRequirement.status ? "btn" : "btn active"} onClick={toggleOption} ></div>
        </div>
        {context.personalInfo.personalInfoRequirement.status && <PersonalInfo />}
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
        {/* <Link to={"preview/quiz_id"} target="_blank" >Preview</Link> */}
      </div>
    </form>
  )
}

export default CreateForm