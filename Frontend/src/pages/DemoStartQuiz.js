import React, { useContext, useEffect, useState } from "react"
import { DemoQuizContext } from "../Context/DemoState"
import { DemoData, randomIndex  } from "../allData"
import { FiAlertCircle } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

const DemoStartQuiz = () => {
  const demoContext = useContext(DemoQuizContext)
  const [demoQuizTimer, setDemoQuizTimer] = useState({ ...DemoData.quizSettingInfo.quizTimer[1], seconds: 0 })
  let navigate = useNavigate()

  useEffect(() => {

    if (DemoData.quizSettingInfo.quizTimer[0]) {
      // if (Number(demoQuizTimer.hours) === 0 && Number(demoQuizTimer.minute) === 0 && Number(demoQuizTimer.seconds)) {
      //   navigate("/demo/Result")
      // }
      const timer = setInterval(() => {
        setDemoQuizTimer((prev) => {
          let hours = Number(prev.hours)
          let minutes = Number(prev.minute)
          let seconds = Number(prev.seconds)
          if (hours === 0 && minutes === 0 && seconds === 0) {
            clearInterval(timer)
            return { hours: 0, minute: 0, seconds: 0 }
          }
          else if (hours !== 0 && minutes === 0 && seconds === 0) {
            return { hours: hours - 1, minute: "59", seconds: "59" }
          }
          else if (minutes !== 0 && prev.seconds === 0) {
            return { ...prev, minute: minutes - 1, seconds: "59" }
          }
          else {
            return { ...prev, seconds: seconds - 1 }
          }
        })
        if (Number(demoQuizTimer.hours) === 0 && Number(demoQuizTimer.minute) === 0 && Number(demoQuizTimer.seconds) === 0) {
        navigate("/demo/Result")
      }
      }, 1000);
      return () => clearInterval(timer)
    }

  }, [demoQuizTimer])

  function handleSubmitEvent() {
    navigate("/demo/Result")
  }

  function toggleOptionSelect(e, index) {
    demoContext.correctAnswersEachOption[1]((prev) => {
      return { ...prev, [index]: e.target.dataset.value }
    })
  }

  return (
    <div className="demo-quiz-template" >
      <form onSubmit={handleSubmitEvent} >
        <div className="questin-option-timer-box" >
          {DemoData.quizSettingInfo.quizTimer[0] &&
            <div className="timer" >
              <p><span>{demoQuizTimer.hours}</span>:<span>{demoQuizTimer.minute}</span>:<span>{demoQuizTimer.seconds}</span><span id="alert-sign" ><FiAlertCircle /></span></p>
            </div>
          }
          <div className="question-answer-option" >
            <div className="quiz-title-description">
              <p>{DemoData.titleDescription.quizTitle}</p>
              <p>{DemoData.titleDescription.quizDescription}</p>
            </div>
            <div>
              {DemoData.quizQuestion.map((value, index) => {
                return <div key={index} id={index} className="each-question-option">
                  <p> <span>Q{index + 1}. </span>{DemoData.quizQuestion[randomIndex[index]].question}</p>
                  <div className="demo-quiz-options" >
                    {DemoData.quizQuestion[randomIndex[index]].option.map((option, id) => {
                      return (<div key={option} className="each-option">
                        <div className={demoContext.correctAnswersEachOption[0][randomIndex[index]] === option ? "active" : undefined} onClick={(e) => { toggleOptionSelect(e, randomIndex[index]) }} data-value={option} ></div>
                        <p onClick={(e) => { toggleOptionSelect(e, randomIndex[index]) }} data-value={option} style={{ cursor: "default" }}>{DemoData.quizQuestion[randomIndex[index]].option[id]}</p>
                      </div>)
                    })}
                  </div>
                </div>
              })}
            </div>
          </div>
        </div>
        <button type="submit" className="start-quiz-button" >Submit</button>
      </form>
    </div>
  )
}

export default DemoStartQuiz