import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Header = () => {
  const { currentUser } = useSelector((state) => state.user)
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
        <form className="bg-slate-100 p-3 rounded-full flex items-center gap-2 justify-between">
          <input
            type="text"
            placeholder="Search...(eg: 1BHK aprtment)"
            className="bg-transparent w-24 sm:w-64 focus:outline-none"
          />
          <FaSearch className="text-slate-500" />
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
