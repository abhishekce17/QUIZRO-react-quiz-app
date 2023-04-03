import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const Questions = () => {
  const location = useLocation()
  const [allQuizQuestions, setAllQuizQuestions] = useState({})
  let max = 0
  const uri = location.pathname.split("/")[3] === "quizes" ? "getQuizquestions" : "getFormquestions"
  async function fetchData(quizid) {
    const apiData = await fetch('https://quizro-quiz-backend.vercel.app/api/quizoperations/'+uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
      body: JSON.stringify({ quizId: quizid })
    })
    const data = await apiData.json()
    if (apiData.status === 200) {
      setAllQuizQuestions(data)
    }
    // else if (apiData.status === 401) {
    //   console.log("401")
    // }
  }


  useEffect(() => {
    fetchData(location.pathname.split("/")[4])
  }, [])

  return (
    <div style={{marginTop : "50px"}} className="questions-details" >
      {
        location.pathname.split("/")[3] === "quizes" 
        ?
        allQuizQuestions.quizData !== undefined  && <>
          <div className="timer-details" >
            <p>Expire date - {allQuizQuestions.quizData["Quiz Setting Info"].closingTime[0] && new Date(allQuizQuestions.quizData["Quiz Setting Info"].closingTime[1]).toUTCString().slice(0, -7)}</p>
            <p>Timer -  {allQuizQuestions.quizData["Quiz Setting Info"].quizTimer[0] && allQuizQuestions.quizData["Quiz Setting Info"].quizTimer[1].hours + " hour " + allQuizQuestions.quizData["Quiz Setting Info"].quizTimer[1].minute+" minute"}</p>
            <p>Total ponit : {
              allQuizQuestions.quizData["Questions and MCQ/MSQ"].map((value, index) => {
                if (value.point !== "") {
                  max += Number(value.point)
                }
                else {
                  max += Number(allQuizQuestions.quizData["Quiz Setting Info"].defaultPoint)
                }
                  return allQuizQuestions.quizData["Questions and MCQ/MSQ"].length === (index+1) && max
              })
            }</p>
            <p>{allQuizQuestions.quizData.QuizStatus ? "Receiving responses" : "Not receiving responses"}</p>
          </div>
          <div id="demo-quiz-title" > <h2> {allQuizQuestions.quizData.Title}</h2> </div>
          { allQuizQuestions.quizData.Description.length !== 0 && <div className="description" >
            <p> { allQuizQuestions.quizData.Description}</p>
          </div>}
          {
            allQuizQuestions.quizData["Required Information"].status &&
            <div className="fields" >
              <label>Personal Information</label>
              <p> {allQuizQuestions.quizData["Required Information"].infoFields.Name && "Name"} </p>
              <p>{allQuizQuestions.quizData["Required Information"].infoFields.Email && "Email"}</p>
              {
                allQuizQuestions.quizData["Required Information"].infoFields.extraFields.length !== 0
                &&
                allQuizQuestions.quizData["Required Information"].infoFields.extraFields.map((value, i) => {
                  return <p key={i} >{value}</p>
                })
              }
            </div>
          }
          <div className="quiz-questions" >
            <ol>
              {
                allQuizQuestions.quizData["Questions and MCQ/MSQ"].map((value, index) => {
                  return (<li key={index} >
                    <p style={{ display: "flex", justifyContent: "space-between" }} >{value.question} <span style={{ color: "#737373" }} >Point : {value.point !== "" ? value.point : allQuizQuestions.quizData[["Quiz Setting Info"]].defaultPoint}</span> </p>
                    <ul>
                      {value.option.map((option, j) => {
                        return <li key={j} >{option}</li>
                      })}
                    </ul>
                    <ul className="correct-answer" >
                       {allQuizQuestions.quizAnswers[0]["quiestion and answers"].filter((correctOption, k) => {
                        return correctOption.questionId === value._id
                      })[0].answer.map((value, l, arr) => <li key={l} >Correct answer  {arr.length !== 1 && l+1} : {value}</li>)}
                    </ul>
                  </li>)


                })
              }
            </ol>
          </div>
        </>
        :
        allQuizQuestions.quizData !== undefined  && <>
          <div className="timer-details" >
            <p>{allQuizQuestions.quizData.QuizStatus ? "Receiving responses" : "Not receiving responses"}</p>
          </div>
          <div id="demo-quiz-title" > 
          <label>Title</label>
          <h2> {allQuizQuestions.quizData.Title}</h2> </div>
          { allQuizQuestions.quizData.Description.length !== 0 && <div className="description" >
          <label style={{color : "#737373", fontSize : "17px"}} >Description</label>
            <p> { allQuizQuestions.quizData.Description}</p>
          </div>}
          {
            allQuizQuestions.quizData["Required Information"].status &&
            <div className="fields" >
              <label>Personal Information</label>
              <p> {allQuizQuestions.quizData["Required Information"].infoFields.Name && "Name"} </p>
              <p>{allQuizQuestions.quizData["Required Information"].infoFields.Email && "Email"}</p>
              {
                allQuizQuestions.quizData["Required Information"].infoFields.extraFields.length !== 0
                &&
                allQuizQuestions.quizData["Required Information"].infoFields.extraFields.map((value, i) => {
                  return <p key={i} >{value}</p>
                })
              }
            </div>
          }
          <div className="quiz-questions" >
            <ol>
              {
                allQuizQuestions.quizData["Form Questions"].map((value, index) => {
                  return (<li key={index} >
                    <p style={{ display: "flex", justifyContent: "space-between" }} >{value.question}</p>
                    <ul>
                    {
                      value.type === "mcq" || value.type === "msq" ? 
                      value.option.map((option, j) => {
                        return <li key={j} > <p>{option}</p></li>
                      })
                      :
                      <p style={{color:"#737373"}} >{value.type === "short-text" ? "Short text answer" : "Long paragraph answer"}</p>
                    }
                    </ul>
                  </li>)


                })
              }
            </ol>
          </div>
        </>
      }
    </div>
  )
}

export default Questions