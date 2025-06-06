import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Homes"
import Navbar from "./components/Navbar"
import AuthPages from "./pages/Authpage"

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Auth" element={<AuthPages />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
