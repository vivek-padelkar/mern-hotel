import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosInstance from '../utils/axiosConfig'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInSucess, signInError } from '../redux/user/userSlice'

const SignIn = () => {
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.user)
  const [formData, setFormData] = useState({})
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e) => {
    if (e.target.id === 'password') setPassword(e.target.value)
    if (e.target.id === 'retypePassword') setRetypePassword(e.target.value)
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      dispatch(signInStart())
      const AXIOS_HEADER = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axiosInstance.post(
        '/auth/sign-in',
        formData,
        AXIOS_HEADER
      )
      dispatch(signInSucess(data))
      toast.success('Logged in successfully! ')
      navigate('/')
    } catch (error) {
      dispatch(signInError())
      toast.error(error?.response?.data?.message || error)
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign in</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 justify-center"
      >
        <input
          type="email"
          id="email"
          className="border p-3 rounded-lg"
          placeholder="your@mail.com"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          id="password"
          className="border p-3 rounded-lg"
          placeholder="password"
          value={password}
          onChange={handleChange}
          required
        />

        <button
          className="bg-slate-700 text-white p-3 
        rounded-lg hover:opacity-95 disabled:opacity-80"
          disabled={loading}
        >
          {loading ? `Loading...` : `Sign in`}
        </button>
      </form>

      <div className="my-2">
        <p>
          Dont Have an account ? {` `}
          <Link to="/sign-up" className="hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn
