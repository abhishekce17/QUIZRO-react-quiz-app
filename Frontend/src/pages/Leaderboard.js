import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import '../components/ResponseDetails.css'
import configurl from "../config.json"


const Leaderboard = () => {

    const [details, setDetails] = useState()
    const location = useLocation()
    async function fetchDetails() {
        const apiData = await fetch(`${configurl.baseURL}/api/quizoperations/leaderboardDetails`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ responseId: location.pathname.split("/")[4], quizId: location.pathname.split("/")[5] })
        })
        if (apiData.status === 200) {
            const responseDetails = await apiData.json()
            setDetails(responseDetails)
        }
    }

    useEffect(() => {
        fetchDetails()
    }, [])


    return (<div className='leader-board' >{details !== undefined &&
        <div >
            {details["personal info"] !== undefined
                && <div style={{ borderBottom: "1px solid #008037" }} className='pc-info' >
                    {Object.keys(details["personal info"]).map((pc, i) => {
                        return (
                            <p key={i} > {pc.charAt(0).toUpperCase() + pc.slice(1)} : {details["personal info"][pc]} </p>
                        )
                    })
                    }</div>
            }
            {details.Response.map((res, j) => {

                return <div key={j} >
                    {Object.keys(res).map((q, k) => {
                        return <div key={k} >
                            <p>Q{j + 1}. {q} </p>
                            <ul>
                                <li> {res[q]} </li>
                            </ul>
                        </div>
                    })}
                </div>
            })
            }
            <div>
                <p>Obtained Points : {details["Total Point"]} </p>
            </div>
            <div className='submition-time'>
                <label> submitted at : {new Date(details["submited at"]).toUTCString().slice(0, -7)}</label>
            </div>
        </div>
    }
    </div>
    )
}

export default Leaderboard