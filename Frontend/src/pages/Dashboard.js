import React, { useEffect } from "react"
import "./Dashboard.css"
import { Link, Route, Routes, useLocation } from "react-router-dom"
// import {dataArrya} from "../allData"
import Error from "./404"
import Quizdetails from "./Quizdetails"
import QuizDash from "./QuizDash"
import FormDash from "./FormDash"

const Dashboard = () => {
  const topbarStyle = {
    position: "absolute",
    width: "100%"
  }
  const location = useLocation()
  useEffect(() => {
    if (document.querySelector(".topbar") !== null) {
      document.querySelector(".topbar").childNodes.forEach((ele) => {
        ele.children[0].removeAttribute("id")
        if (ele.children[0].getAttribute("href") === location.pathname) {
          ele.children[0].setAttribute("id", "active")
        }
      })
    }
  }, [location])
  function handleTopbarClick(e) {
    document.querySelector(".topbar").childNodes.forEach((eachElement) => {
      eachElement.children[0].removeAttribute("id")
    })
    if (e.target.getAttribute("id") == undefined) return e.target.setAttribute("id", "active")
  }
  return (<>
    {/* return (localStorage.getItem("token") === null ? <Navigate to="/login" /> : <> */}
    <div className="dashboard-container" >
        {(location.pathname.split("/").length === 4) &&
          <div className="topbar" onClick={handleTopbarClick} style={topbarStyle} >
            <div><Link to={"quizes"} >Quizes</Link></div>
            <div><Link to={"forms"} >Forms</Link></div>
          </div>
        }
      <div className="dashboard" >
        <Routes>
          <Route exact path="/quizes" element={
            <>
              <QuizDash />
            </>
          } />
          <Route exact path="/forms" element={

            <>
              <FormDash />
            </>
          } />
          <Route path="/:id/*" element={<Quizdetails />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  </>
  )
}

export default Dashboard