import React from "react"
import "./navbar.css"
import { RiLightbulbFlashLine, RiLoginBoxLine, RiLogoutBoxRLine } from "react-icons/ri"
import { Link, useLocation } from "react-router-dom"
import { IoMdMenu } from 'react-icons/io'
import { VscChromeClose } from 'react-icons/vsc'
import { useContext } from "react"
import QuizContext from "../Context/quizContext"

const Navbar = () => {
  const quizContext = useContext(QuizContext)
  const location = useLocation()
  function showMenu(){
    quizContext.hamburgerStatus[1](prev=>!prev)
  }
  function logOut(e) {
    e.preventDefault()
    localStorage.removeItem("token")
    window.open(`https://quizro-quiz-backend.vercel.app/api/auth/logout`, "_self")
  }

  return (
    <nav>
      <Link className="left-align" to={"/"} >
        <div className="logo-icon" >
          { location.pathname.includes("quiztools")  && <>{quizContext.hamburgerStatus[0] ? <VscChromeClose onClick={(e)=>{e.preventDefault(); showMenu()}} className="bar-icon" style={{ color: "#fff", marginRight : "10px" }} /> : <IoMdMenu className="bar-icon" onClick={(e)=>{e.preventDefault(); showMenu()}} style={{ color: "#fff", marginRight : "10px" }} />} </> }
          <RiLightbulbFlashLine />
        </div>
        <h1>QUIZRO</h1>
      </Link>
      {localStorage.getItem("token") !== null
        ?
        <>
          <Link className="right-align" to={""} onClick={logOut} >
            <p>logout</p>
            <div className="login-icon" >
              <RiLogoutBoxRLine />
            </div>
          </Link>
        </>
        :
        <>
          <Link className="right-align" to={"/login"} >
            <p>login</p>
            <div className="login-icon" >
              <RiLoginBoxLine />
            </div>
          </Link>
        </>
      }
    </nav>
  )
}

export default Navbar