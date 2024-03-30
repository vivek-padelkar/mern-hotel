import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home.page'
import SignIn from './pages/SignIn.page'
import SignUp from './pages/SignUp.page'
import About from './pages/About.page'
import Profile from './pages/Profile.page'
import PageNotFound from './pages/PageNotFound.page'
import CreateListing from './pages/CreateListing.page'
import Header from './components/Header.component'
import PrivateRoute from './components/PrivateRoute'
import UpdateListing from './pages/UpdateListing.page'
import Listing from './pages/Listing.page'
import Search from './pages/Search.page'

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
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </Route>
        <Route path="/listing/:listingId" element={<Listing />} />
        {/* <Route path="/search/:search" element={<Search />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
