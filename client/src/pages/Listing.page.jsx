import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosInstance from '../utils/axiosConfig'
import ImgLoading from '../../public/images/loading.gif'
import Carousel from '../components/Carousel.component'
import copy from 'copy-to-clipboard'

const Listing = () => {
  const url = location.href
  const params = useParams()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const listingId = params.listingId
  useEffect(() => {
    const fetchListingById = async () => {
      try {
        const { data } = await axiosInstance(`/listing/getlisting/${listingId}`)
        setListing(data)
        setLoading(false)
        console.log(listing)
      } catch (error) {
        toast.error(error.message || error)
        setLoading(false)
      }
    }
    fetchListingById()
  }, [params.listingId])

  const copyToClipboard = () => {
    // Text from the html element
    let copyText = textRef.current.value
    // Adding text value to clipboard using copy function
    let isCopy = copy(copyText)

    //Dispalying notification
    if (isCopy) {
      toast.success('Copied to Clipboard')
    }
  }
  return (
    <div className="relative">
      {loading ? (
        <img
          className="mt-20 w-20 h-20 mx-auto"
          src={ImgLoading}
          alt="loading"
        />
      ) : (
        listing && (
          <>
            <div className="relative">
              <Carousel arrImages={listing.imageUrls} className="z-10" />
              <img
                width="40"
                height="40"
                src="https://img.icons8.com/metro/26/forward-arrow.png"
                alt="forward-arrow"
                title="share property details"
                className="z-20 absolute top-5 right-10 opacity-50 bg-white rounded-full p-1 hover:opacity-100 text-black"
              />
            </div>
            <div className="w-1/2 mx-auto mt-3">
              <div className="flex flex-col items-start justify-start gap-2">
                <h1 className="font-semibold text-2xl">
                  {listing.name} - {listing.regularPrice} &#8377;
                </h1>

                <div className="flex gap-2">
                  <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/office/16/marker.png"
                    alt="marker"
                  />
                  <p className="text-sm">{listing.address}</p>
                </div>

                <h2 className="bg-red-800 text-white p-2 inline-block rounded-xl">
                  For {listing.type}
                </h2>

                <div>
                  <span className="font-semibold">Description: </span>
                  {listing.description} Lorem ipsum, dolor sit amet consectetur
                  adipisicing elit. Dolores molestiae voluptas iste minus
                  delectus cupiditate laudantium quaerat dolore rem animi velit,
                  neque illum numquam ullam laborum doloremque repudiandae odit
                  fugiat. Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Laudantium praesentium, in voluptatem cum autem ea
                  dolore sed voluptates aspernatur rerum, eligendi cumque eius
                  maxime blanditiis eum hic a velit dolor!
                </div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  )
}

export default Listing
