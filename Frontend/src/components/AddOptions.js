import React, { useContext, useState } from "react"
import { RxCross2 } from "react-icons/rx"
import { useLocation } from "react-router-dom"
import { FormContext } from "../Context/FormAllState"
import QuizContext from "../Context/quizContext"

const AddOptions = (props) => {
  const location = useLocation()
  const context = useContext(location.pathname.includes("create-form") ? FormContext : QuizContext)
  const [msqAnsCount, setMsqAnsCount] = useState(1)
  function handleMSQ(e) {
    setMsqAnsCount(e.target.value)
  }
  function setOptionsValue(e, optionIndex) {
    context.quizQuestion[1]((prev) => {
      return prev.map((ele, index) => {
        if (props.questionIndex === index) {
          prev[index].option[optionIndex] = e.target.value
          return prev[index]
        }
        else {
          return prev[index]
        }
      })
    })
  }

  function reduceOption(optionIndex) {
    context.quizQuestion[1]((prev) => {
      return prev.map((ele, index) => {
        if (props.questionIndex === index) {
          return {
            ...prev[index], option: prev[index].option.filter((value, j) => {
              return j !== optionIndex
            })
          }
        }
        else return prev[index]
      })
    })
    context.optionCount[1]((prev) => {
      return prev.map((ele, index) => {
        if (index === props.questionIndex) {
          return prev[index] - 1
        }
        else {
          return prev[index]
        }
      })
    })
  }
  function handleChange(e) {
    let questionIndex = props.questionIndex
    context.quizAsnwer[1]((prev) => {
      prev[questionIndex] = { question: context.quizQuestion[0][questionIndex].question, answer: [context.quizQuestion[0][questionIndex].option[e.target.value]] }
      return prev
    })
  }
  function handleMSQAnswer(e) {
    let questionIndex = props.questionIndex
    context.quizAsnwer[1]((prev) => {
      prev[questionIndex].answer[e.target.id] = (context.quizQuestion[0][questionIndex].option[e.target.value])
      prev[questionIndex] = { question: context.quizQuestion[0][questionIndex].question , answer : prev[questionIndex].answer}
      return prev
    })
  }

  return (
    <>
      {
        (props.type === "mcq" || props.type === "msq") ?
          <div className="options">
            <ul>
              {[...Array(props.optionNum)].map((value, index) => {
                return <li key={index} ><input type="text" onChange={(e) => { setOptionsValue(e, index) }} value={context.quizQuestion[0][props.questionIndex].option[index]} placeholder={`option ${index + 1}`} required /> {index > 0 && <RxCross2 onClick={() => { reduceOption(index) }} />}</li>
              })}
            </ul>
            {!location.pathname.includes("create-form") && <div className="correct-ans" >
              {(props.type === "mcq") ?
                <>
                  <span>Correct option</span>
                  <select style={{ "marginLeft": "5px" }} onChange={handleChange} required>
                        <option defaultValue={true}>--answer--</option>
                    {[...Array(props.optionNum)].map((value, index) => {
                      return <option key={index} value={index} >Option {index + 1}</option>
                    })}
                  </select>
                </>
                :
                <>
                  <span>Correct answers</span>
                  <input style={{ "marginLeft": "5px" }} type="number" onChange={handleMSQ} name="msq-ans-count" value={msqAnsCount} maxLength={1} max={props.optionNum} min={1} />
                  {[...Array(Number(msqAnsCount))].map((value, index) => {
                    return <div key={index} ><span>Correct option {index + 1}</span>
                      <select style={{ "marginLeft": "5px" }} id={index} onChange={handleMSQAnswer}>
                            <option defaultValue={true} >--answer--</option>
                        {[...Array(props.optionNum)].map((value, index) => {
                          return <option key={index} value={index} >Option {index + 1}</option>
                        })}
                      </select>
                    </div>
                  })}
                </>
              }
            </div>}
          </div>
          :
          <>
            {
              <p className="text-answer" >{(props.type === "short-text") ? "Short answer text" : "Long answer text"}</p>
            }
          </>
      }
    </>
  )
}

export default AddOptions