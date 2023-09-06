import React, { useEffect, useState } from "react"
import { BiShow, BiHide } from "react-icons/bi"
import { FcGoogle } from "react-icons/fc"
// import { FaMicrosoft } from "react-icons/fa"
import axios from "axios";
import "./Authentication.css"
import { Link, Navigate, useNavigate } from "react-router-dom"
import Loading from "../components/Loading";

const Authentication = () => {
  const [showStatus, setShowStatus] = useState(true)
  const [isLoading, setLoader] = useState(false);
  const [credential, setCredential] = useState({ email: "", password: "" })
  const [invalidCredentials, setInvalidCredentials] = useState(false)
  let navigate = useNavigate()
  function handleClick() {
    setShowStatus(!showStatus)
  }
  // async function googleAuthenticat(e) {
  //   e.preventDefault()
  //   window.open("https://quizro-quiz-backend.vercel.app/api/auth/google/callback", "_self")
  // }

  const getUser = async () => {
    try {
      const url = `https://quizro-quiz-backend.vercel.app/api/auth/login/success`;
      const apiData = await axios.get(url, { withCredentials: true });
      if (apiData.status === 200) {
        localStorage.setItem("token", apiData.data.userId)
        navigate("/quiztools/create-quiz")
      }

    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   getUser()
  // }, [])

  async function authenticat(e) {
    e.preventDefault()
    setLoader(true)
    const apiData = await fetch('https://quizro-quiz-backend.vercel.app/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credential),
    })
    const response = await apiData.json()
    if (apiData.status === 200) {
      localStorage.setItem("token", response.authToken)
      navigate("/quiztools/create-quiz")
    }
    else if (apiData.status === 500) {
      setLoader(false)
      setInvalidCredentials(true)
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setCredential((prev) => {
      return { ...prev, [name]: value }
    })
  }

  return (
    localStorage.getItem("token") !== null ? <Navigate to="/quiztools/create-quiz" /> :
      <div className="auth-block" >

        {isLoading ? <Loading /> :

          <form method="POST" onSubmit={authenticat} >
            {invalidCredentials && <center>
              <p style={{ color: "red", fontSize: "1.2rem" }} >email or password is invalid</p>
            </center>}
            <div className="email-auth">
              <input type="email" value={credential.email} name="email" onChange={handleChange} placeholder="email" required />
              <div className="password-show-toggle">
                <input type={showStatus ? "password" : "text"} name="password" value={credential.password} onChange={handleChange} placeholder="password" required />
                <div className="toggle-btn" onClick={handleClick} >
                  {showStatus ? <BiHide /> : <BiShow />}
                </div>
              </div>
              <button type="submit" >Login</button>
            </div>
            {/* <hr style={{ width: "100%" }} /> */}
            {/* <div className="social-auth"> */}
            {/* <div className="social-method" > */}
            {/* <div onClick={googleAuthenticat} style={{ cursor: "pointer" }} className="icons"><FcGoogle /> Sign in with google </div> */}
            {/* <div onClick={() => { handleAuth("microsoft") }} className="icons" ><FaMicrosoft style={{ color: "#1363DF" }} /> Sign wint microsoft </div> */}
            {/* </div> */}
            {/* </div> */}
            <center>
              <p>don't have account, <Link to="/register/email-signup">create here</Link> </p>
            </center>
          </form>
        }
      </div>
  )
}

export default Authentication