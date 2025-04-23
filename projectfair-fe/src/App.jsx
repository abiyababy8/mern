import { Routes, Route } from "react-router-dom"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import Project from "./pages/Project"
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/project' element={<Project />} />
      </Routes>
      <Footer />
    </>
  )
}
export default App
