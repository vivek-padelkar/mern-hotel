import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import axiosInstance from '../utils/axiosConfig'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Contact = ({ listing, setIsContact }) => {
  const [landlord, setLandlord] = useState(null)
  const [message, setMessage] = useState('')
  useEffect(() => {
    try {
      const fetchLandlord = async () => {
        const { data } = await axiosInstance.get(`/user/${listing.userRef}`)
        setLandlord(data)
      }
      fetchLandlord()
    } catch (error) {
      toast.error(error.message || error)
    }
  }, [listing.userRef])

  const handleOnChange = (e) => {
    setMessage(e.target.value)
  }
  return (
    <>
      {message}
      {landlord && (
        <div className="flex flex-col gap-2 w-full mt-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{' '}
            for{' '}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            placeholder="Enter your message here !"
            className="w-full border rounded-lg p-3"
            rows={2}
            onChange={handleOnChange}
          />
          <div className="flex gap-2">
            <Link
              className="mt-2 bg-slate-700 text-white text-center 
            p-3 uppercase rounded-lg hover:opacity-95"
              to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            >
              Send Message
            </Link>
            <button
              className="mt-2 bg-red-700 text-white text-center 
            p-3 uppercase rounded-lg hover:opacity-95"
              onClick={() => setIsContact(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Contact
