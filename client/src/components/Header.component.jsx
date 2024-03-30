import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosConfig.js'
const Header = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const { currentUser } = useSelector((state) => state.user)

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm', searchTerm)
    const searcgQuery = urlParams.toString()
    navigate(`/search?${searcgQuery}`)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const searchTermFromUrl = urlParams.get('searchTerm', searchTerm)
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
    }
  }, [location.search])

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        {/* LOGO */}
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Eastside</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        {/* search */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-full flex items-center gap-2 justify-between"
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            className="bg-transparent w-24 sm:w-64 focus:outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-500" />
          </button>
        </form>

        {/* MENU */}
        <ul className="flex gap-4">
          <Link tp="/home">
            <li className="text-slate-700 hidden sm:inline hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="text-slate-700 hidden sm:inline hover:underline">
              About
            </li>
          </Link>
          <Link to={currentUser?.email ? '/profile' : '/sign-in'}>
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser?.avatar}
                title={currentUser?.username}
              />
            ) : (
              <li className="text-slate-700 hover:underline">Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  )
}

export default Header
