import React, { useEffect } from "react"
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Questions from "../components/Questions"
import "./Quizdetails.css"
import Error from "./404"
import ResponseDetails from "../components/ResponseDetails"
import configUrl from "../config.json"

const Quizdetails = () => {
    const location = useLocation()
    let navigate = useNavigate()

    async function deleteData() {
        const apiData = await fetch(`${configUrl.baseURL}/api/quizoperations/deleteData`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify({ type: location.pathname.split("/")[3], quizId: location.pathname.split("/")[4] })
        })
        if (apiData.status === 200) {
            navigate("/quiztools/dashboard/" + location.pathname.split("/")[3])
        }
    }

    async function stopResponse() {
        const apiData = await fetch(`${configUrl.baseURL}/api/quizoperations/stopResponse`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify({ type: location.pathname.split("/")[3], quizId: location.pathname.split("/")[4] })
        })
        if (apiData.status === 200) {
            navigate(`${location.pathname.split("/")[4]}/questions`)
        }
    }

    useEffect(() => {
        document.querySelector(".topbar").childNodes.forEach((ele) => {
            ele.children[0].removeAttribute("id")
            if (ele.children[0].getAttribute("href") === location.pathname) {
                ele.children[0].setAttribute("id", "active")
            }
        })
    }, [])

    function handleTopbarClick(e) {
        document.querySelector(".topbar").childNodes.forEach((eachElement) => {
            eachElement.children[0].removeAttribute("id")
        })
        if (e.target.getAttribute("id") == undefined) return e.target.setAttribute("id", "active")
    }

    return (
        <div className="quiz-details" >
            <div className="topbar" onClick={handleTopbarClick} >
                <div><Link id="active" to={`${location.pathname.split("/")[4]}/questions`} >Questions</Link></div>
                <div><Link to={`${location.pathname.split("/")[4]}/responses`} >Responses</Link></div>
                <div><Link to={`${location.pathname.split("/")[4]}/quiz-setting`} >Setting</Link></div>
            </div>
            <div style={{ overflowY: "hidden" }} className="all-details">
                <Routes>
                    <Route path={`${location.pathname.split("/")[4]}/questions`} element={<Questions />} />
                    <Route path={`${location.pathname.split("/")[4]}/responses`} element={<ResponseDetails />} />
                    <Route path={`${location.pathname.split("/")[4]}/quiz-setting`} element={<div style={{ marginTop: "75px" }} className="quiz-details-setting" >
                        <ul>
                            <li onClick={stopResponse} >Stop recieving responses</li>
                            <li onClick={deleteData} style={{ "color": "red" }} >Delete</li>
                        </ul>
                    </div>} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </div>
        </div>
    )
}

export default Quizdetails