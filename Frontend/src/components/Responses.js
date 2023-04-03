import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Error from '../pages/404'
import "../pages/demo.css"
import StartFormResponse from './StartFormResponse'
import StartQuiz from './StartQuiz'

const Responses = () => {
  const location = useLocation()
  let naviate = useNavigate()
  const [linkValidation, setLinkValidation] = useState(true)
  const [fetchedQuestion, setFetchedQuestions] = useState({})
  const [quizAttempt, setQuizAttempt] = useState(false)
  const [personalInfo, setPersonalInfo] = useState({})
  const [randomIndexes, setRandomIndexes] = useState({ randomIndex: [""], randomizeOptions: [""] })
  const [responseId, setResponseId] = useState("")
  const [thankYouMessage, setThankYouMessage] = useState(false)

  let max = 0
  function handleChange(e) {
    const { name, value } = e.target
    setPersonalInfo((prev) => {
      return { ...prev, [name]: value }
    })
  }

  async function startQuiz(e) {
    e.preventDefault()
    const submitInfo = await fetch("https://quizro-quiz-backend.vercel.app/api/submit/responses/submitPersonalInfo", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ QuizId: location.pathname.split("/")[5], "personal info": personalInfo, type: location.pathname.split("/")[3] })
    })
    if (submitInfo.status === 200) {
      const { responseId } = await submitInfo.json()
      setResponseId(responseId)
      setQuizAttempt(true)
    }
  }
  async function fetchQuizQuestions() {
    const url = location.pathname.split("/")[3] === "quiz" ? "https://quizro-quiz-backend.vercel.app/api/submit/responses/getQuizQestions" : "https://quizro-quiz-backend.vercel.app/api/submit/responses/getFormQestions"
    const fetchQuestions = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quizId: location.pathname.split("/")[5] })
    })
    if (fetchQuestions.status === 200) {
      const questionsData = await fetchQuestions.json()
      if (location.pathname.split("/")[3] === "quiz") {
        setRandomIndexes({ randomIndex: questionsData.randomIndex, randomizeOptions: questionsData.randomizeOptions })
      }
      setFetchedQuestions(location.pathname.split("/")[3] === "quiz" ? questionsData.quizData : questionsData.formQuestions)
    } else {
      setLinkValidation(false)
    }
  }
  useEffect(() => {
    fetchQuizQuestions()
  }, [])

  return (
    (location.pathname.split("/")[3] === "quiz" || location.pathname.split("/")[3] === "form") && linkValidation ?
      <div className="starting-quiz">{
        (fetchedQuestion !== undefined && fetchedQuestion.QuizStatus) ?
          <>
            {
              !quizAttempt
                ?
                <main>
                  <form action="#" onSubmit={startQuiz}>
                    <div className="demo-personal-info" >
                      <div className="quiz-title-description">
                        <p>{fetchedQuestion.Title}</p>
                        <p>{fetchedQuestion.Description}</p>
                      </div>
                      <div className="some-info" >
                        <p>Questions : {fetchedQuestion[location.pathname.split("/")[3] === "quiz" ? "Questions and MCQ/MSQ" : "Form Questions"].length}</p>
                        {location.pathname.split("/")[3] === "quiz" && <p>Total Points : {
                          fetchedQuestion["Questions and MCQ/MSQ"].map((value, index) => {
                            if (value.point !== "") {
                              max += Number(value.point)
                            }
                            else {
                              max += Number(fetchedQuestion["Quiz Setting Info"].defaultPoint)
                            }
                            return fetchedQuestion[location.pathname.split("/")[3] === "quiz" ? "Questions and MCQ/MSQ" : "Form Questions"].length === (index + 1) && max
                          })
                        }
                        </p>}
                        {location.pathname.split("/")[3] === "quiz" && fetchedQuestion["Quiz Setting Info"].quizTimer[0] && <> <p>Time : {`${fetchedQuestion["Quiz Setting Info"].quizTimer[1].hours} hours ${fetchedQuestion["Quiz Setting Info"].quizTimer[1].minute} minutes`} </p>
                          <strong>Note : Quiz will be submitted automatically once time is over</strong> </>
                        }
                      </div>
                      {fetchedQuestion["Required Information"].status &&
                        <div className="personal-info" >
                          {fetchedQuestion["Required Information"].infoFields.Name &&
                            <div>
                              <label htmlFor="name" >Name</label>
                              <input id="name" name="name" onChange={handleChange} value={personalInfo.name || ""} type="text" required />
                            </div>
                          }
                          {fetchedQuestion["Required Information"].infoFields.Email &&
                            <div>
                              <label htmlFor="email" >Email</label>
                              <input id="email" name="email" onChange={handleChange} type="email" value={personalInfo.email || ""} required />
                            </div>
                          }{fetchedQuestion["Required Information"].infoFields.extraFields.map((value, index) => {
                            return value !== "" && <div key={index} >
                              <label htmlFor={value}>{value}</label>
                              <input id={value} type="text" onChange={handleChange} name={value} value={personalInfo[value] || ""} required />
                            </div>
                          })}
                        </div>
                      }
                    </div>
                    <button style={{ marginTop: "40px" }} type="submit" className="start-quiz-button" >Start</button>
                  </form>
                </main>
                :
                <>{
                  location.pathname.split("/")[3] === "quiz"
                    ?
                    <> {!thankYouMessage ? <StartQuiz quizData={fetchedQuestion} thankYouMessage={setThankYouMessage} randomIndex={randomIndexes.randomIndex} randomizeOptions={randomIndexes.randomizeOptions} responseId={responseId} />
                      :
                      <div className='end-screen' >
                        <p>Thank You for Attempting This Quiz !</p>
                      </div>
                    }
                    </>
                    :
                    <>{!thankYouMessage ?
                      <StartFormResponse quizData={fetchedQuestion} thankYouMessage={setThankYouMessage} responseId={responseId} />
                      :
                      <div className='end-screen' >
                        <p>Thank You for filling This Form !</p>
                      </div>
                    }
                    </>
                }</>
            }
          </> :
          <Routes>
            <Route path="*" element={<Error />} />
          </Routes>
      }
      </div>
      :
      <Routes>
        <Route path="*" element={<Error />} />
      </Routes>
  )
}

export default Responses