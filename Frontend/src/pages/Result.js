import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../components/ResponseDetails.css'
import { correctAnser } from '../allData'
import { DemoQuizContext } from '../Context/DemoState'



const Result = () => {
    let totalPoint = 0
    const demoContext = useContext(DemoQuizContext)
    const [details, setDetails] = useState()
    let navigate = useNavigate()

    useEffect(() => {
        if (demoContext === undefined) {
            navigate("/demo")
        }
        else {
            setDetails({ Response: demoContext.correctAnswersEachOption[0], "personal info": demoContext.demoPersonalInfo[0] })
        }
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
            {correctAnser.map((res, j) => {
                if(details.Response[j] === res.answer){
                    totalPoint += Number(res.point)
                    {/* demoContext.totalPoint[1](prev =>  prev += res.point) */}
                }
                return <div key={j} >
                    <p>Q{j + 1}. {res.question} </p>
                    <ul>
                        <li> {details.Response[j]} { details.Response[j] !== res.answer ? ` ${ details.Response[j] === undefined ? "(Not answered)" :"(wrong)"} (correct : ${res.answer})` : ` (point : ${res.point})`} </li>
                    </ul>
                </div>
            })
            }
            <div>
                <p>Obtained Points : { totalPoint } </p>
            </div>
        </div>
    }
    </div>
    )
}
export default Result