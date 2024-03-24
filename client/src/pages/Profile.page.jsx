import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { toast } from 'react-toastify'
import { app } from '../fireBase'
import PasswordCheckList from '../components/PasswordCheckList.component'
import {
  updateUserSuccess,
  updateUserFailure,
  updateUserStart,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutStart,
  signOutFailure,
  signOutSuccess,
} from '../redux/user/userSlice'
import axiosInstance from '../utils/axiosConfig'
import PopUp from '../components/PopUp.component'

const Profile = () => {
  const fileRef = useRef()
  const refPassword = useRef()
  const dispatch = useDispatch()
  const { currentUser, loading } = useSelector((state) => state.user)
  const [password, setPassword] = useState('')
  const [retypePassword, setRetypePassword] = useState('')
  const [isValidPassword, setIsValidPassword] = useState(false)
  const [file, setFile] = useState(undefined)
  const [filePercentage, setFilePercentage] = useState(0)
  const [formData, setFormData] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file])

  async function handleFileUpload(file) {
    try {
      const storage = getStorage(app)
      const filename = new Date().getTime() + file.name
      const storegeRef = ref(storage, filename)
      const uploadTask = uploadBytesResumable(storegeRef, file)
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePercentage(Math.round(progress))
      })
      await uploadTask
      const downloadURL = await getDownloadURL(storegeRef)
      toast.success('Profile picture updated successfully!')
      // Use the download URL as needed (e.g., update form data)
      setFormData({
        ...formData,
        avatar: downloadURL,
      })
    } catch (error) {
      toast.error('Somthing went wrong, image must be < 2mb !' + error.message)
    }
  }

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
      dispatch(updateUserStart())
      if (formData.password && !isValidPassword) {
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
        `/user/update/${currentUser._id}`,
        formData,
        AXIOS_HEADER
      )
      dispatch(updateUserSuccess(data))
      toast.success('User updated successfully! ')
    } catch (error) {
      dispatch(updateUserFailure())
      toast.error(error?.response?.data?.message || error)
    }
  }

  const handleYes = async (e) => {
    try {
      setIsModalOpen(false)
      e.preventDefault()
      dispatch(deleteUserStart())
      const AXIOS_HEADER = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      delete formData.retypePassword
      const { data } = await axiosInstance.delete(
        `/user/delete/${currentUser._id}`,
        formData,
        AXIOS_HEADER
      )
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure())
      toast.error(error?.response?.data?.message || error)
    }
  }

  const handleNo = () => {
    // Handle no action
    setIsModalOpen(false)
  }

  const handleLogOut = async () => {
    try {
      console.log('i am logoout')
      dispatch(signOutStart())
      const { data } = await axiosInstance.post(`/auth/sign-out`)
      dispatch(signOutSuccess())
    } catch (error) {
      dispatch(signOutFailure())
      toast.error(error?.response?.data?.message || error)
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto relative">
      <PopUp />
      <h1 className="font-semibold text-center text-3xl mx-auto my-7">
        Profile
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          hidden
          type="file"
          id="input"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          accept="image/jpeg, image/png, image/jpeg"
        />
        <img
          className="rounded-full h-24 w-24 cursor-pointer object-cover self-center mt-2"
          src={formData?.avatar || currentUser.avatar}
          alt={currentUser.username}
          onClick={() => fileRef.current.click()}
        />
        {filePercentage > 0 && filePercentage < 100 ? (
          <p className="text-center">Uploading..{filePercentage}%</p>
        ) : null}
        <input
          className="p-3 border rounded-lg"
          id="username"
          type="text"
          required
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />

        <input
          className="p-3 border rounded-lg"
          id="email"
          type="email"
          required
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />

        <input
          className="p-3 border rounded-lg"
          id="password"
          type="password"
          placeholder="password "
          onChange={handleChange}
        />

        <input
          className="p-3 border rounded-lg"
          id="retypePassword"
          type="password"
          placeholder="retype-password"
          onChange={handleChange}
        />

        <PasswordCheckList
          password={password}
          retypePassword={retypePassword}
          setIsValidPassword={setIsValidPassword}
        />
        <button
          className="bg-slate-700 text-white p-3 
        rounded-lg hover:opacity-95 disabled:opacity-80
        uppercase"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span
          className="text-red-700 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          Delete Account?
        </span>
        <PopUp
          isOpen={isModalOpen}
          message="Do you really want to delete your account?"
          onYes={handleYes}
          onNo={handleNo}
        />
        <span className="text-red-700 cursor-pointer" onClick={handleLogOut}>
          Sign out
        </span>
      </div>
    </div>
  )
}

export default Profile
