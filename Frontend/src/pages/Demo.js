import React, { useContext } from "react"
import { DemoData} from "../allData"
import "./demo.css"
import { Route, Routes, useNavigate } from "react-router-dom"
import DemoStartQuiz from "./DemoStartQuiz"
import Error from "./404"
import { DemoQuizContext } from "../Context/DemoState"

const Demo = () => {
  const demoContext = useContext(DemoQuizContext)
  const navigate = useNavigate()
  function handleChangeEvenet(e){
    const {name, value} = e.target
    demoContext.demoPersonalInfo[1]((prev)=>{
      return {...prev, [name] : value}
    })
  }

  function changeLoc(e) { 
    e.preventDefault()
    navigate("/demo/start-quiz")
   }

  return (
    <div className="starting-quiz">
      <main>
        <Routes>
          <Route exact path="/" element={
            <form action="#" onSubmit={changeLoc} >
              <div className="demo-personal-info" >
                <div className="quiz-title-description">
                  <p>{DemoData.titleDescription.quizTitle}</p>
                  <p>{DemoData.titleDescription.quizDescription}</p>
                </div>
                <div className="some-info" >
                  <p>Questions : {DemoData.quizQuestion.length}</p>
                  <p>Total Points : {DemoData.totalPoints }</p>
                  {DemoData.quizSettingInfo.quizTimer[0] && <p>Time : {`${DemoData.quizSettingInfo.quizTimer[1].hours} hours ${DemoData.quizSettingInfo.quizTimer[1].minute} minutes`} </p>}
                  <strong>Note : Quiz will be submitted automatically once timer is done</strong>
                </div>
                {DemoData.personalInfoRequirement.status &&
                  <div className="personal-info" >
                    {DemoData.personalInfoRequirement.infoField.Name &&
                      <div>
                        <label htmlFor="name" >Name</label>
                        <input id="name" name="name" type="text" value={demoContext.demoPersonalInfo[0].name || ""} onChange={handleChangeEvenet} required />
                      </div>
                    }
                    {DemoData.personalInfoRequirement.infoField.Email &&
                      <div>
                        <label htmlFor="email" >Email</label>
                        <input id="email" name="email" type="email" value={demoContext.demoPersonalInfo[0].email || ""} onChange={handleChangeEvenet} required />
                      </div>
                    }{DemoData.personalInfoRequirement.infoField.extraField.map((value, index) => {
                      return value !== "" && <div key={index} >
                        <label htmlFor={value}>{value}</label>
                        <input id={value} type="text" name={value} value={demoContext.demoPersonalInfo[0][value] || ""} onChange={handleChangeEvenet} required />
                      </div>
                    })}
                  </div>
                }
              </div>
              <button type="submit" className="start-quiz-button" >Start</button>
            </form>
          } />
          <Route exact path="start-quiz/*" element={<DemoStartQuiz />} />
          <Route exact path="*" element={<Error />} />
        </Routes>
      </main>
    </div>
  )
}

export default Demo