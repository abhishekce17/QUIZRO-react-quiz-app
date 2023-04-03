import React from "react"
import { Link } from "react-router-dom"
import "./home.css"

const Home = () => {
  
  return (
    <div className="main">
      <div className="main-section">
        <div className="hero-section" >
          <img src="/assest/images/heroimg.png" alt="home-section" />
        </div>
        <div className="signup-section" >
          <div className="quote" >
            <p>Create QUIZ within few simple steps</p>
            <div className="btns" >
              <Link  to={"quiztools/create-quiz"} >CREATE QUIZ</Link>
              <Link  to={"demo"} >DEMO</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="features-section">
      </div>
    </div>
  )
}

export default Home