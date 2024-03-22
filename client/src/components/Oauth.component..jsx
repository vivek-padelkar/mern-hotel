import { toast } from 'react-toastify'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../fireBase.js'
import { useDispatch } from 'react-redux'
import { signInSucess } from '../redux/user/userSlice'
import axiosInstance from '../utils/axiosConfig.js'
import { useNavigate } from 'react-router-dom'

const Oauth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)
      const AXIOS_HEADER = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const requestBody = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      }
      const { data } = await axiosInstance.post(
        '/auth/google',
        requestBody,
        AXIOS_HEADER
      )
      dispatch(signInSucess(data))
      navigate('/')
    } catch (error) {
      toast.error('Error occured while fetching the data')
    }
  }
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2 bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
      onClick={handleGoogleClick}
    >
      Sign in with google
      <h2 className="font-bold">G</h2>
    </button>
  )
}

export default Oauth
