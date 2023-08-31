import Login from "./Login"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Task from "./Task"
import Profile from "./Profile"
import Home from "./Home"
import AddTask from "./AddTask"
import EditTask from "./EditTask"
import Start from "./Start"
import VisitorPage from "./VisitorPage"
import VisitorLogin from "./VisitorLogin"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="" element={<Home />}></Route>
          <Route path="/task" element={<Task />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/create" element={<AddTask />}></Route>
          <Route path="/taskEdit/:id" element={<EditTask />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/start" element={<Start />}></Route>
        <Route path="/visitorlogin" element={<VisitorLogin />}></Route>
        <Route path="/visitorpage/:id" element={<VisitorPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App