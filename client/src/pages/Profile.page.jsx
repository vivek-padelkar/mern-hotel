import { useSelector } from 'react-redux'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { toast } from 'react-toastify'
import { app } from '../fireBase'
import PasswordCheckList from '../components/PasswordCheckList.component'
import { useEffect, useRef, useState } from 'react'

const Profile = () => {
  const fileRef = useRef()
  const { currentUser } = useSelector((state) => state.user)
  const [password, setPassword] = useState('')
  const [retypePassword, setRetypePassword] = useState('')
  const [isValidPassword, setIsValidPassword] = useState(false)
  const [file, setFile] = useState(undefined)
  const [filePercentage, setFilePercentage] = useState(0)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    if (file) {
      console.log('useeffect ran')
      handleFileUpload(file)
    }
  }, [file])

  console.log('i am working with' + JSON.stringify(formData))
  async function handleFileUpload(file) {
    try {
      console.log('inside file uploading')
      const storage = getStorage(app)
      const filename = new Date().getTime() + file.name
      const storegeRef = ref(storage, filename)
      const uploadTask = uploadBytesResumable(storegeRef, file)
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(progress)
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
      console.log(error)
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
      {/* <img src={LoadingGif} /> */}

      <h1 className="font-semibold text-center text-3xl mx-auto my-7">
        Profile
      </h1>
      <form className="flex flex-col gap-3">
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
          onChange={handleChange}
        />
        <input
          className="p-3 border rounded-lg"
          id="email"
          type="email"
          required
          placeholder="email"
          onChange={handleChange}
        />
        <input
          className="p-3 border rounded-lg"
          id="password"
          type="password"
          placeholder="username"
          onChange={handleChange}
        />
        <input
          className="p-3 border rounded-lg"
          id="retypepassword"
          type="password"
          required
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
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  )
}

export default Profile
