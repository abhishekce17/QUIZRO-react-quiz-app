import React, { createContext, useState } from 'react'

const DemoQuizContext = createContext()

const DemoState = (props) => {

const [correctOptions, setCorrectOptions] = useState({})
const [demoPersonalInfo, setDemoPersonalInfo] = useState({})
const [totalPoint, setTotalPoint] = useState(0)

const value = {
  correctAnswersEachOption : [correctOptions, setCorrectOptions],
  demoPersonalInfo : [demoPersonalInfo, setDemoPersonalInfo],
  totalPoint : [totalPoint, setTotalPoint]
}

  return (
    <DemoQuizContext.Provider value={value} >
      {props.children}
    </DemoQuizContext.Provider>
  )
}
export {DemoQuizContext, DemoState}