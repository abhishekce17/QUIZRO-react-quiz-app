import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { BsChevronDown } from 'react-icons/bs'
import './ResponseDetails.css'

const ResponseDetails = () => {
    const [details, setDetails] = useState()
    const location = useLocation()
    async function fetchDetails() {
        const apiData = await fetch("https://quizro-quiz-backend.vercel.app/api/quizoperations/getResponseDetails", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")

            },
            body: JSON.stringify({ type: location.pathname.split("/")[3], quizId: location.pathname.split("/")[4] })
        })
        if (apiData.status === 200) {
            const responseDetails = await apiData.json()
            setDetails(responseDetails)
        }
    }

    useEffect(() => {
        fetchDetails()
    }, [])

    function expandDetails(e) {
        e.target.classList.toggle("active")
        e.target.nextSibling.classList.toggle("active")
    }

    return (<>
        {
            details !== undefined
            &&
            <div className="response-page" >
                {details.map((val, index) => {
                    return (
                        <div key={index} className='each-response' >
                            <div className='identifier' onClick={expandDetails} >
                                <p> {(val["personal info"] && val["personal info"].name) || "response " + (index + 1)} </p>
                                <BsChevronDown />
                            </div>
                            <div className='details' >
                                {val["personal info"] !== undefined
                                    && <div style={{ borderBottom: "1px solid #008037" }} className='pc-info' >
                                        {Object.keys(val["personal info"]).map((pc, i) => {
                                            return (
                                                <p key={i} > {pc.charAt(0).toUpperCase() + pc.slice(1)} : {val["personal info"][pc]} </p>
                                            )
                                        })
                                        }</div>
                                }
                                {val.Response.map((res, j) => {

                                    return <div key={j} className='each-question' >
                                        {Object.keys(res).map((q, k) => {
                                            return <div key={k} >
                                                <p>Q{j+1}. {q} </p>
                                                <ul>
                                                    <li> {res[q]} </li>
                                                </ul>
                                            </div>
                                        })}
                                    </div>
                                })
                                }
                                <div>
                                    <p>Obtained Points : {val["Total Point"] } </p>
                                </div>
                                <div className='submition-time'>
                                    <label> submitted at : {new Date(val["submited at"]).toUTCString().slice(0, -7)}</label>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div >
        }
    </>
    )
}

export default ResponseDetails