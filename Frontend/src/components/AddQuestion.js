import React, { useContext } from "react"
import "./AddQuestion.css"
import AddOptions from "./AddOptions"
import { RxCross1 } from "react-icons/rx"
import QuizContext from "../Context/quizContext"
import { useLocation } from "react-router-dom"
import { FormContext } from "../Context/FormAllState"


const AddQuestion = (props) => {
  const location = useLocation()
  const context = useContext( location.pathname.includes("create-form") ? FormContext : QuizContext) 



  function handleChangeEvent(e) {
    const {name, value} = e.target
    context.quizQuestion[1]((prev)=>{
      return prev.map((ele, index)=>{ 
        if(index === props.id){
          if(value === "short-text" || value === "paragraph") return {...prev[index],option : [""], [name]:value}
          return {...prev[index], [name]:value}
        }
        else{
          return prev[index]
        }
       })
  })
  }
  function moreOptions() {
    let temp = context.quizQuestion[0]
    temp[props.id].option.push("")
    context.quizQuestion[1](temp)
    context.optionCount[1]((prev) => {
      return prev.map((ele, index)=>{ 
        if(index === props.id){
          return prev[index] + 1
        }
        else{
          return prev[index]
        }
       })
      })
  }
  
  function reduceQuestion(){
    context.quizQuestionInfo[1](context.quizQuestionInfo[0] - 1)
    context.quizQuestion[1]((prev) => {
      return prev.filter((value, index)=>{
        return props.id !== index
      })
    })
    context.optionCount[1]((prev)=>{
        return prev.filter((val, index)=>{
          return props.id !== index
        })
    })
    context.quizAsnwer[1]((prev)=>{
      return prev.filter((val, index)=>{
        return props.id !== index
      })
    })

  }

  return (
    <div className="each-question" >
      <div className="question-header" >
        <p>Question {props.id+1}</p>
        <select name="type" value={context.quizQuestion[0][props.id].type} onChange={handleChangeEvent}>
          <option value="mcq" >MCQ</option>
          <option value="msq" >MSQ</option>
          { location.pathname.includes("create-form") && <><option value="short-text" >Short Text</option>
          <option value="paragraph" >Paragraph</option> </> }
        </select>
        { !location.pathname.includes("create-form") && <div>
          <label htmlFor="associated-marks" >Points</label>
          <input className="associated-marks" name="point" value={context.quizQuestion[0][props.id].point} onChange={handleChangeEvent} type="text" />
        </div>}
      </div>
      <div className="question-options">
        <input placeholder="Question" name="question" value={context.quizQuestion[0][props.id].question} onChange={handleChangeEvent} required />
        <AddOptions questionIndex={props.id} optionNum={context.optionCount[0][props.id]} type={context.quizQuestion[0][props.id].type} />
        {(context.quizQuestion[0][props.id].type === "mcq" || context.quizQuestion[0][props.id].type === "msq") && <button type="button" onClick={moreOptions} >Add option</button>}
      </div>
      { props.id > 0 && <div className="remove-question" onClick={reduceQuestion} > <RxCross1/> </div>}
    </div>
  )
}

export default AddQuestion