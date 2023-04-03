import React, { useContext} from "react"
import { RxCross2 } from "react-icons/rx"
import { useLocation } from "react-router-dom"
import { FormContext } from "../Context/FormAllState"
import QuizContext from "../Context/quizContext"

const PersonalInfo = () => {
  const location = useLocation()
  const context = useContext( location.pathname.includes("create-form") ? FormContext : QuizContext) 
  function toggleOption(e) {
    const { name } = e.target.dataset
    context.personalInfo.setPersonalInfoRequirement((prev) => {
      return { ...prev, infoFields: { ...prev.infoFields, [name]: !prev.infoFields[name] } }
    })
  }

  function handleChange(e, index) {
    context.personalInfo.setPersonalInfoRequirement((prev) => {
      prev.infoFields.extraFields[index] = e.target.value
      return { ...prev, infoFields: { ...prev.infoFields, extraFields: prev.infoFields.extraFields } }
    })
  }
  function addExtraField() {
    context.extraFieldCount[1](context.extraFieldCount[0] + 1)
  }
  function removeField(index) {
    context.extraFieldCount[1](context.extraFieldCount[0] - 1)
    context.personalInfo.setPersonalInfoRequirement((prev) => {
      return {
        ...prev, infoFields: {
          ...prev.infoFields, extraFields: prev.infoFields.extraFields.filter((value, i) => {
            return i !== index && value
          })
        }
      }
    })
  }
  return (
    <div className="all-info" >
      <div>
        <p>Name</p><div onClick={toggleOption} data-name="Name" className={context.personalInfo.personalInfoRequirement.infoFields.Name ? "info-toggle" : "info-toggle active"} ></div>
      </div>
      <div>
        <p>Email</p><div onClick={toggleOption} data-name="Email" className={context.personalInfo.personalInfoRequirement.infoFields.Email ? "info-toggle" : "info-toggle active"} ></div>
      </div>
      {
        [...Array(context.extraFieldCount[0])].map((value, index) => {
          return <div className="extra-field" key={index} >
            <input type="text" placeholder={`Field ${index + 1}`} value={context.personalInfo.personalInfoRequirement.infoFields.extraFields[index]} onChange={(e) => { handleChange(e, index) }} required />
            <RxCross2 onClick={() => { removeField(index) }} />
          </div>
        })
      }
      <button type="button" onClick={addExtraField} >Add field</button>
    </div>
  )
}

export default PersonalInfo