import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Dashboard from "./components/Checklist/Dashboard"

function App() {

  return (
    <BrowserRouter>
      <nav>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </nav>
      <Routes>
        <Route path="/register" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Home />}/>
        <Route path="/checklist" 
        element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
