import React, { useRef, useState } from 'react'
import PasswordCheckList from '../components/PasswordCheckList.component'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosInstance from '../utils/axiosConfig'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({})
  const [password, setPassword] = useState('')
  const [retypePassword, setRetypePassword] = useState('')
  const [isValidPassword, setIsValidPassword] = useState(false)
  const refPassword = useRef()

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
      setLoading(true)
      if (!isValidPassword) {
        toast.error('Please check the password!')
        refPassword.current.focus()
        return
      }
      const AXIOS_HEADER = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      delete formData.retypePassword
      const { data } = await axiosInstance.post(
        '/auth/sign-up',
        formData,
        AXIOS_HEADER
      )
      setLoading(false)
      toast.success('User register successfully! ')
      navigate('/sign-in')
    } catch (error) {
      setLoading(false)
      toast.error(error?.response?.data?.message || error)
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign up</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 justify-center"
      >
        <input
          type="text"
          id="username"
          className="border p-3 rounded-lg"
          placeholder="username"
          onChange={handleChange}
          required
        />
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
          ref={refPassword}
          required
        />

        <input
          type="password"
          id="retypePassword"
          className="border p-3 rounded-lg"
          placeholder="retype-password"
          value={retypePassword}
          onChange={handleChange}
          required
        />

        <div>
          <PasswordCheckList
            password={password}
            retypePassword={retypePassword}
            setIsValidPassword={setIsValidPassword}
          />
        </div>

        <button
          className="bg-slate-700 text-white p-3 
        rounded-lg hover:opacity-95 disabled:opacity-80"
          disabled={loading}
        >
          {loading ? `Loading...` : `Sign up`}
        </button>
      </form>

      <div className="my-2">
        <p>
          Have an account ? {` `}
          <Link to="/sign-in" className="hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp
