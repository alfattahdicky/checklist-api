import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import HomeChecklist from "./components/Checklist/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Dashboard from "./components/Checklist/Dashboard";
import DetailItem from "./components/Checklist/DetailItem";

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
        <Route path="/checklist" element={<HomeChecklist />}/>
        <Route path="/checklist/:id" element={<HomeChecklist />}/>
        <Route path={`/checklist/:checklistid/item`} element={<DetailItem />}/>
        <Route path={`/checklist/:checklistid/item/:checklistitemid`} element={<DetailItem />}/> 
        <Route path={`/checklist/:checklistid/item/rename/:checklistitemid`} element={<DetailItem />}/> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
