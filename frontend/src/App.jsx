import Login from "./Login"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./Dashboard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App