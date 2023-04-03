// import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Authentication from './pages/Authentication';
import Register from './pages/Register';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Signup from './components/Signup';
import Quiztools from './pages/Quiztools';
import QuizAllState from './Context/quizAllState';
import Error from './pages/404';
import Demo from './pages/Demo';
import { DemoState } from './Context/DemoState';
import Responses from './components/Responses';
import Leaderboard from './pages/Leaderboard';
import Result from './pages/Result';

function App() {
  return (
    <>
    <QuizAllState>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Authentication />} />
          <Route exact path="/quiztools/*" element={<Quiztools />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/register/email-signup" element={<Signup />} />
          <Route exact path="/demo/*" element={ <DemoState> <Demo /> </DemoState> } />
          <Route exact path="/demo/Result" element={<DemoState> <Result /> </DemoState>} />
          <Route exact path="/attemp/quizro/*" element={ <Responses/> } />
          <Route exact path="/quiz/leaderboard/id/*" element={ <Leaderboard /> } />
          <Route path="*" element={ <Error/>} />
        </Routes>
      </Router>
    </QuizAllState>
    </>
  );
}

export default App;
