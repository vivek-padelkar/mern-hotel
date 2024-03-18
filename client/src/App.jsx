import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.page'
import SignIn from './pages/SignIn.page'
import SignUp from './pages/SignUp.page'
import About from './pages/About.page'
import Profile from './pages/Profile.page'
import PageNotFound from './pages/PageNotFound.page'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
