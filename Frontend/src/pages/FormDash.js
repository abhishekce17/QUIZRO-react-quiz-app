import React, { useEffect, useState } from 'react'
import "./Dashboard.css"
import { BsThreeDotsVertical } from "react-icons/bs"
import { Link } from "react-router-dom"
// import {dataArrya} from "../allData"
import { GoPrimitiveDot } from "react-icons/go"


const FormDash = () => {

  const [userData, setUserData] = useState([])
  async function fetchData() {
    const apiData = await fetch('https://quizro-quiz-backend.vercel.app/api/quizoperations/getdataForm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      }
    })
    const data = await apiData.json()
    if (apiData.status === 200) {
      setUserData(data.quizData)
    }
    // else if (apiData.status === 401) {
    //   console.log("401")
    // }
  }
  useEffect(() => {
    fetchData()
  }, [])

  function showdotMenu(id) {
    document.querySelectorAll(".dot-menu").forEach((eachElement, index) => {
      if (id !== index) eachElement.setAttribute("class", "dot-menu")
      if (id === index) return eachElement.classList.toggle("active")
    })
  }
  function hidedotMenu(e, title, url) {
    navigator.share({
      title: title,
      url: url
    }).then(() => {
      e.target.offsetParent.className = "dot-menu"
    })
  }



  return (
    <>
      {<div className='formDash-container' >{
        userData.map((eachtData, index) => {
          return (
            <div key={index} className="quiz-info" >
              <div className="quiz-title" >
                <p><Link to={`${eachtData._id}/questions`} >{eachtData.Title.slice(0, 30)}.....</Link></p>
                <BsThreeDotsVertical onClick={() => { showdotMenu(index) }} />
                <div className="dot-menu">
                  {/* <div onClick={hidedotMenu} >Edit</div> */}
                  <div onClick={(e) => hidedotMenu(e, eachtData.Title, `https://quizro-quiz-backend.vercel.app/attemp/quizro/form/id/${eachtData._id}`)} >Share</div>
                </div>
              </div>
              <div className="quiz-ans-res" >
                <p>{eachtData["Form Questions"].length} Questions</p>
                <p>{eachtData["Response Count"] !== undefined ? eachtData["Response Count"] : 0} Responses</p>
              </div>
              <div className="quiz-status-timeline" >
                <p> <GoPrimitiveDot style={{ position: "relative", top: "3px", color: "red" }} /> {eachtData.QuizStatus ? "live" : "expired"}</p>
                <p>created at {new Date(eachtData["Created at"]).toUTCString().slice(0, -7)}</p>
              </div>
            </div>
          )
        })}
      </div>
      }
    </>
  )
}

export default FormDash