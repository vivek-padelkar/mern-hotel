import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className="pageNotFoundContainer relative">
      <div className="mpageNotFoundContainer-message-container absolute flex flex-col justify-center items-center gap-4">
        <h1 className="text-9xl text-customColor">404</h1>
        <h1 className="text-4xl text-customColor">
          Whoops! This page lost in the woods
        </h1>
        <Link to="/" className="text-white">
          Back to home
        </Link>
      </div>
    </div>
  )
}

export default PageNotFound
