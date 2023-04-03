import React, { useEffect } from "react"
import { FcGoogle } from "react-icons/fc"
import { GrMail } from "react-icons/gr"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
import "./Register.css"

const Register = () => {
  let navigate = useNavigate()
  async function googleAuthenticat(e){
    e.preventDefault()
    window.open("https://quizro-quiz-backend.vercel.app/api/auth/google/callback","_self")
  }

	const getUser = async () => {
		try {
			const url = `https://quizro-quiz-backend.vercel.app/api/auth/login/success`;
			const apiData = await axios.get(url, { withCredentials: true });
		  if(apiData.status === 200){
        localStorage.setItem("token", apiData.data.userId)
        navigate("/quiztools/create-quiz")
      }
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		getUser();
	}, []);


  return (
    <div className="signup-methods">
      <div>
        <div className="icon-google">
          <Link tp="#" onClick={googleAuthenticat} ><p>Sign up with Google <span><FcGoogle /></span></p></Link>
        </div>
        {/* <div className="icon-Microsoft">
          <Link to="#" ><p>Sign up with Microsoft <span><FaMicrosoft style={{color:"#1363DF"}} /></span></p> </Link>
        </div> */}
        <p>or</p>
        <div className="signup-email">
          <Link to="email-signup" ><p>Sign up with email <span><GrMail /></span></p></Link>
        </div>
      </div>
    </div>
  )
}

export default Register