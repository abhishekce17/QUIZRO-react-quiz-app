import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./signup.css"

const Signup = () => {
  let navigate = useNavigate()
  const [signCredential, setSignupCredential] = useState({
    "first name": "",
    "last name": "",
    email: "",
    password: ""
  })
  const [check, setCheck] = useState({ check: "", status: true })
  function handleChange(e) {
    const { name, value } = e.target
    if (name == "check") return setCheck({ ...check, [name]: value })
    setSignupCredential({ ...signCredential, [name]: value })
  }

  function formEvent(e) {
    e.preventDefault()
    if (check.check == signCredential.password) handleEvent()
    setCheck({ ...check, status: check.check == signCredential.password })
  }

  async function handleEvent() {
    console.log(signCredential)
    const apiData = await fetch('https://quizro-quiz-backend.vercel.app/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signCredential),
    })
    const response = await apiData.json()
    if (apiData.status === 200) {
      localStorage.setItem("token", response.authToken)
      navigate("/quiztools/create-quiz")
    }

  }


  return (
    <>
      <form method="POST" className="form" onSubmit={formEvent} >
        <div>
          {!check.status && <div className="alert" > password doesn't match </div>}
          <div className="emailSignup">
            <div className="name-section" >
              <input type="text" name="first name" value={signCredential["first name"]} placeholder="First name" onChange={handleChange} required />
              <input type="text" name="last name" value={signCredential["last name"]} placeholder="Last name" onChange={handleChange} required />
            </div>
            <input type="email" name="email" value={signCredential.email} placeholder="email" onChange={handleChange} required />
            <div className="password-section">
              <input type="password" name="check" value={check.check} placeholder="password" onChange={handleChange} required />
              <input type="password" name="password" value={signCredential.password} placeholder="confirm password" onChange={handleChange} required />
            </div>
          </div>
          <button className="signup" type="submit"  >Get Started</button>
          <center>
            <p>Already have account, <Link to="/login">login here</Link> </p>
          </center>
        </div>
      </form>
    </>
  )
}

export default Signup