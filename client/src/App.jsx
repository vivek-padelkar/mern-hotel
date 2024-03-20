import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.page'
import SignIn from './pages/SignIn.page'
import SignUp from './pages/SignUp.page'
import About from './pages/About.page'
import Profile from './pages/Profile.page'
import PageNotFound from './pages/PageNotFound.page'
import Header from './components/Header.component'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="light"
      />
      <Header />
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
