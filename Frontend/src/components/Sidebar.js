import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import "./Sidebar.css"
import { useContext } from 'react'
import QuizContext from '../Context/quizContext'

const Sidebar = () => {
    const quizContext = useContext(QuizContext)
    const location = useLocation()
    useEffect(()=>{
        document.querySelectorAll(".side-options").forEach((eachElement) => {
            eachElement.children[0].removeAttribute("id")
            if(location.pathname.includes(eachElement.children[0].getAttribute("href"))){
                eachElement.children[0].setAttribute("id", "selected")
            }
        })
        if(location.pathname.includes("quiztools/dashboard/forms")){
            document.querySelectorAll(".side-options")[0].children[0].setAttribute("id", "selected")
        }
    },[location.pathname])
    function handleEvent(e) {
        quizContext.hamburgerStatus[1](false)
        document.querySelectorAll(".side-options").forEach((eachElement) => {
            eachElement.children[0].removeAttribute("id")
        })
        if (e.target.getAttribute("id") == undefined) return e.target.setAttribute("id", "selected")
    }

    return (
        <div className={ quizContext.hamburgerStatus[0] ? "sidebar active" : "sidebar" }>
            <ul onClick={handleEvent} >
                <li className="side-options" ><Link to="dashboard/quizes" >Dashboard</Link></li>
                <li className="side-options" ><Link to="create-quiz" >Create Quiz</Link></li>
                <li className="side-options" ><Link to="create-form" >Create Form</Link></li>
            </ul>
        </div>
    )
}

export default Sidebar