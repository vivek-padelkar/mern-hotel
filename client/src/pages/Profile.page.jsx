import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getDownloadURL,
  getStorage,
  list,
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
import { Link } from 'react-router-dom'

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
  const [listing, setListing] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState(false)
  const [idToDelete, setIdToDelete] = useState('')

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

  async function showListing() {
    try {
      const { data } = await axiosInstance.get(
        `/user/listings/${currentUser._id}`
      )
      setListing(data)
    } catch (error) {
      toast.error(error.message || message)
    }
  }

  const onYes = async () => {
    try {
      setIsOpen(false)
      if (!idToDelete) toast.error('Id not found to delete the listing')
      const { data } = await axiosInstance.delete(
        `/listing/delete/${idToDelete}`
      )
      toast.success(data.message)
      setListing((prev) => prev.filter((listing) => listing._id !== idToDelete))
      setIdToDelete('')
    } catch (error) {
      toast.error('Error while deleting the Listing')
    }
  }

  const onNo = () => {
    setIsOpen(false)
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
      <button
        className="mt-2 bg-green-700 text-white p-3
      rounded-lg uppercase text-center hover:opacity-95 w-full  "
      >
        <Link to="/create-listing">Create Listing</Link>
      </button>
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
      {/* SHOW LISTING */}
      <button
        className="text-green-700 text-center w-full mt-2 hover:underline opacity-95"
        onClick={showListing}
      >
        Show listing
      </button>
      {listing && listing.length > 0 && (
        <div className="my-7">
          <h1 className="text-center uppercase font-semibold mt-2">
            Your Listings
          </h1>
          {listing.map((list) => (
            <div className="p-2" key={list._id}>
              <div
                className="p-3 mt-2 mb-2 flex flex-col border rounded-lg 
            sm:flex-row justify-between items-center"
              >
                <div className="flex flex-col justify-center items-center gap-2 sm:flex-row">
                  <Link to={`/listing/${list._id}`}>
                    <img
                      className="w-full h-full object-contain rounded-lg sm:w-20 h-20"
                      src={list.imageUrls[0]}
                      alt={list.name}
                    />
                  </Link>
                  <Link
                    className="text-slate-700  font-semibold uppercase hover:underline truncate "
                    to={`/listing/${list._id}`}
                  >
                    <p>{list.name}</p>
                  </Link>
                </div>
                {/* delete or edit listing */}
                <div className="flex sm: flex-row gap-7 mt-2">
                  <button
                    className="text-red-700 uppercase hover:underline"
                    onClick={() => {
                      setIsOpen(true)
                      setMessage(`Do you really want to delete "${list.name}"?`)
                      setIdToDelete(list._id)
                    }}
                  >
                    Delete
                  </button>
                  <button className="text-green-700 uppercase hover:underline">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <PopUp isOpen={isOpen} message={message} onNo={onNo} onYes={onYes} />
    </div>
  )
}

export default Profile
