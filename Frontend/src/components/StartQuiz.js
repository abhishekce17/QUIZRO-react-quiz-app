import React, { useEffect, useState } from 'react'
import { FiAlertCircle } from "react-icons/fi"
import { useLocation, useNavigate } from 'react-router-dom'


const StartQuiz = (props) => {
  const location = useLocation()
  let navigate = useNavigate()
  const { quizData, randomIndex, responseId, randomizeOptions } = props
  // const demoContext = useContext(DemoQuizContext)
  const [QuizTimer, setQuizTimer] = useState({ ...quizData["Quiz Setting Info"].quizTimer[1], seconds: 0 })
  const [correctOptions, setCorrectOptions] = useState({})
  const [msqOptions, setMSQCorrectOptions] = useState({})

  function resetAnswers(type, questionId) {
    if (type === "mcq") {
      setCorrectOptions((prev) => {
        return { ...prev, [questionId]: undefined }
      })
    }
    else {
      setMSQCorrectOptions((prev) => {
        return { ...prev, [questionId]: undefined }
      })
    }
  }

  function toggleOptionSelect(e, questionId, type) {
    if (type === "msq") {
      setMSQCorrectOptions((prev) => {
        return { ...prev, [questionId]: prev[questionId] === undefined ? [e.target.dataset.value] : [...prev[questionId], e.target.dataset.value] }
      })
    } else {
      setCorrectOptions((prev) => {
        return { ...prev, [questionId]: e.target.dataset.value }
      })
    }
  }

  useEffect(() => {
    if (quizData["Quiz Setting Info"] !== undefined && quizData["Quiz Setting Info"].quizTimer[0]) {
      const timer = setInterval(() => {
        setQuizTimer((prev) => {
          let hours = Number(prev.hours)
          let minutes = Number(prev.minute)
          let seconds = Number(prev.seconds)
          if (hours === 0 && minutes === 0 && seconds === 0) {
            clearInterval(timer)
            handleSubmitEvent()
            return { hours : 0 ,minute : 0, seconds : 0 }
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
        if( Number(QuizTimer.hours) === 0 &&  Number(QuizTimer.minute) === 0 && Number(QuizTimer.seconds) === 0){
          handleSubmitEvent()
        }
      }, 1000);
      return () => clearInterval(timer)
    }
  }, [QuizTimer])

  async function handleSubmitEvent() {
    const submitInfo = await fetch("https://quizro-quiz-backend.vercel.app/api/submit/responses/submitAnswers", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ responseId: responseId, quizAnswers: { ...correctOptions, ...msqOptions }, type: location.pathname.split("/")[3], quizId: location.pathname.split("/")[5] })
    })
    if (submitInfo.status === 302) {
      navigate("/quiz/leaderboard/id/" + responseId + "/" + location.pathname.split("/")[5])
    }
    else if (submitInfo.status === 200) {
      props.thankYouMessage(true)
    }
  }
  return (
    <div className="demo-quiz-template" style={{ paddingTop: "80px" }} >
      <form onSubmit={(e) => { e.preventDefault(); handleSubmitEvent() }} >
        <div className="questin-option-timer-box" >
          {quizData["Quiz Setting Info"].quizTimer[0] &&
            <div className="timer" >
              <p><span>{QuizTimer.hours}</span>:<span>{QuizTimer.minute}</span>:<span>{QuizTimer.seconds}</span><span id="alert-sign" ><FiAlertCircle /></span></p>
            </div>
          }
          <div className="question-answer-option" >
            <div className="quiz-title-description">
              <p>{quizData.Title}</p>
              <p>{quizData.Description}</p>
            </div>
            <div>
              {quizData["Questions and MCQ/MSQ"].map((value, index) => {
                return <div key={index} id={index} className="each-question-option">
                  <p> <span>Q{index + 1}. </span>{quizData["Questions and MCQ/MSQ"][randomIndex[index]].question}</p>
                  <div className="demo-quiz-options" >
                    {quizData["Questions and MCQ/MSQ"][randomIndex[index]].option.map((option, id) => {
                      return (<div key={option} className="each-option">
                        {quizData["Questions and MCQ/MSQ"][randomIndex[index]].type === "mcq" ? <><div className={correctOptions[quizData["Questions and MCQ/MSQ"][randomIndex[index]]._id] === option ? "active" : undefined} onClick={(e) => { toggleOptionSelect(e, quizData["Questions and MCQ/MSQ"][randomIndex[index]]._id) }} data-value={option} ></div>
                          <p onClick={(e) => { toggleOptionSelect(e, quizData["Questions and MCQ/MSQ"][randomIndex[index]]._id) }} data-value={option} style={{ cursor: "default" }}>{option}</p></>
                          :
                          <><div className={(msqOptions[quizData["Questions and MCQ/MSQ"][randomIndex[index]]._id] !== undefined && msqOptions[quizData["Questions and MCQ/MSQ"][randomIndex[index]]._id].includes(option)) ? "active" : undefined} onClick={(e) => { toggleOptionSelect(e, quizData["Questions and MCQ/MSQ"][randomIndex[index]]._id, "msq") }} data-value={option} ></div>
                            <p onClick={(e) => { toggleOptionSelect(e, quizData["Questions and MCQ/MSQ"][randomIndex[index]]._id, "msq") }} data-value={option} style={{ cursor: "default" }}>{option}</p>
                          </>
                        }
                      </div>)
                    })}
                    <button className="start-quiz-button" style={{ fontSize: "1rem", width: "60px", height: "30px", marginTop: "10px" }} onClick={(e) => { e.preventDefault(); resetAnswers(quizData["Questions and MCQ/MSQ"][randomIndex[index]].type, quizData["Questions and MCQ/MSQ"][randomIndex[index]]._id) }} >Reset</button>
                  </div>
                </div>
              })}
            </div>
          </div>
        </div>
        <button type="submit" style={{ marginTop: "50px" }} className="start-quiz-button" >Submit</button>
      </form>
    </div>

  )
}

export default StartQuiz