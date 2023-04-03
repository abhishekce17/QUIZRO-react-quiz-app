import React from 'react'
import Sidebar from '../components/Sidebar'
import Dashboard from './Dashboard';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import CreateQuiz from './CreateQuiz';
import Error from './404';
import CreateForm from './CreateForm';
import { FormAllState } from '../Context/FormAllState';


const Quiztools = () => {
  return (
    localStorage.getItem("token") === null ? <Navigate to="/login" /> 
    :
    <main>
      <Sidebar />
      <FormAllState>
      <Routes>
        <Route exact path="dashboard/*" element={<Dashboard />} />
        <Route exact path="create-quiz" element={<CreateQuiz />} />
        <Route exact path="create-form" element={ <CreateForm />} />
        <Route path="*" element={ <Error/>} />
      </Routes>
      </FormAllState>
    </main>
  )
}

export default Quiztools