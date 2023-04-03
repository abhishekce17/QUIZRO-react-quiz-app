import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import "./formResponse.css"

const StartFormResponse = (props) => {
    const { quizData, responseId, thankYouMessage } = props
    const location = useLocation()
    // const demoContext = useContext(DemoQuizContext)
    const [correctOptions, setCorrectOptions] = useState({})
    const [msqOptions, setMSQCorrectOptions] = useState({})
    const [textAnswers, setTextAnswers] = useState({})

    function resetAnswers(type, questionId){
        if(type === "mcq"){
            setCorrectOptions((prev) => {
                return {...prev, [questionId] : undefined}
            })
        }
        else{
            setMSQCorrectOptions((prev)=>{
                return {...prev, [questionId] : undefined}
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

    function handleChangeEvent(e){
        const {name, value} = e.target
        setTextAnswers((prev)=>{
            return {...prev, [name] : value}
        })
    }

    async function handleSubmitEvent() {
        const submitInfo = await fetch("https://quizro-quiz-backend.vercel.app/api/submit/responses/submitAnswers", {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ responseId: responseId, quizAnswers : {...correctOptions, ...msqOptions, ...textAnswers} ,type: location.pathname.split("/")[3] })
        })
        if (submitInfo.status === 200) {
          thankYouMessage(true)
        }
      }

    return (
        <div className="demo-quiz-template" style={{ paddingTop: "80px" }} >
            <form onSubmit={ (e)=>{ e.preventDefault(); handleSubmitEvent() }} >
                <div className="questin-option-timer-box" >
                    <div className="question-answer-option" >
                        <div className="quiz-title-description">
                            <p>{quizData.Title}</p>
                            <p>{quizData.Description}</p>
                        </div>
                        <div>
                            {quizData["Form Questions"].map((value, index) => {
                                return <div key={index} id={index} className="each-question-option">
                                    <p> <span>Q{index + 1}. </span>{value.question}</p>
                                    {(value.type === "mcq" || value.type === "msq") ? 
                                    <div className="demo-quiz-options" >
                                        {value.option.map((option, id) => {
                                            return (<div key={option} className="each-option">
                                                {value.type === "mcq" ? <><div className={correctOptions[value._id] === option ? "active" : undefined} onClick={(e) => { toggleOptionSelect(e, value._id) }} data-value={option} ></div>
                                                    <p onClick={(e) => { toggleOptionSelect(e, value._id) }} data-value={option} style={{ cursor: "default" }}>{value.option[id]}</p></>
                                                    :
                                                    <><div className={(msqOptions[value._id] !== undefined && msqOptions[value._id].includes(option)) ? "active" : undefined} onClick={(e) => { toggleOptionSelect(e, value._id, "msq") }} data-value={option} ></div>
                                                        <p onClick={(e) => { toggleOptionSelect(e, value._id, "msq") }} data-value={option} style={{ cursor: "default" }}>{value.option[id]}</p>
                                                    </>

                                                }
                                            </div>)
                                        })}
                                        <button className="start-quiz-button" style={{fontSize : "1rem", width : "60px", height : "30px", marginTop : "10px"}} onClick={(e) => {e.preventDefault(); resetAnswers(value.type, value._id) }} >Reset</button>
                                    </div> :
                                        <div className="form-text-answer" >
                                            {
                                                value.type === "short-text"
                                                    ?
                                                    <input name={value._id} value={ textAnswers[value._id] || "" } onChange={handleChangeEvent} type="text" />
                                                    :
                                                    <textarea name={value._id} value={ textAnswers[value._id] || "" } onChange={handleChangeEvent} rows={10} />
                                            }

                                        </div>
                                    }
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

export default StartFormResponse