import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosInstance from '../utils/axiosConfig'
import ImgLoading from '../../public/images/loading.gif'
import Carousel from '../components/Carousel.component'
import { useSelector } from 'react-redux'
import Contact from '../components/Contact.page'

const Listing = () => {
  const params = useParams()
  const { currentUser } = useSelector((state) => state.user)
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isContact, setIsContact] = useState(false)
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

  function copy() {
    const el = document.createElement('input')
    el.value = window.location.href
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    toast.success('Copied !')
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
                className="z-20 cursor-pointer absolute top-5 right-10 opacity-50 bg-white rounded-full p-1 hover:opacity-100 text-black"
                onClick={copy}
              />
            </div>
            <div className="w-[80%] mx-auto mt-8">
              <div className="flex flex-col items-start justify-start gap-3">
                {/* SALE OR RENT */}
                <h2
                  className={
                    'bg-' +
                    (listing.type === 'rent' ? 'red-800' : 'green-800') +
                    ' text-white p-2 inline-block rounded-xl'
                  }
                >
                  For {listing.type}
                </h2>
                <h1 className="font-semibold text-3xl">{listing.name}</h1>
                {/* PRICE */}
                <div className="font-semibold">
                  {listing.discountedPrice > 0 ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 text-red-600  line-through">
                        <h1>Regular price:</h1>
                        <h1 className="font-semibold">
                          {listing.regularPrice} &#8377;{' '}
                          {listing.type === 'rent' ? 'per month' : null}
                        </h1>
                      </div>
                      <div className="flex gap-2 text-green-800">
                        <h1>Discounted price:</h1>
                        <h1 className="font-semibold">
                          {listing.discountedPrice} &#8377;{' '}
                          {listing.type === 'rent' ? 'per month' : null}
                        </h1>
                      </div>
                    </div>
                  ) : (
                    <h1>
                      Price: {listing.regularPrice} &#8377;{' '}
                      {listing.type === 'rent' ? 'per month' : null}
                    </h1>
                  )}
                </div>
                {/* ADDRESS */}
                <div className="flex gap-2 mt-4">
                  <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/office/16/marker.png"
                    alt="marker"
                  />
                  <p className="text-sm">{listing.address}</p>
                </div>
                {/* Apartment specification */}
                <div>
                  <div className="mt-2 flex gap-4 justify-center items-center">
                    {/* BEDROOMS */}
                    <div className="flex flex-col justify-center items-center gap-1 border rounded-lg p-2">
                      <img
                        className="w-6 h-6"
                        src="https://img.icons8.com/ios/50/bed.png"
                        alt="sale"
                      />
                      <p>{listing.bedrooms} Bed's</p>
                    </div>

                    {/* BATHROOMS */}
                    <div className="flex flex-col justify-center items-center gap-1 border rounded-lg p-2">
                      <img
                        className="w-6 h-6"
                        src="https://img.icons8.com/pastel-glyph/64/shower-and-tub--v2.png"
                        alt="shower-and-tub--v2"
                      />
                      <p>{listing.bedrooms} Bathroom's</p>
                    </div>
                  </div>
                </div>
                {/* DESCRIPTION */}
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
                {/* AMINITES */}
                {listing.furnished || listing.parking ? (
                  <div>
                    <h1 className="font-semibold">Amenities:</h1>
                    <div className="mt-2 flex gap-4 justify-center items-center">
                      {/* parking checkbox */}
                      {listing.parking && (
                        <div className="flex flex-col justify-center items-center gap-1 border rounded-lg p-2">
                          <img
                            className="w-6 h-6"
                            src="https://img.icons8.com/ios/50/parking.png"
                            alt="parking"
                          />
                          <span>Parking Spot</span>
                        </div>
                      )}

                      {/* Fursnished checkbox */}
                      {listing.furnished && (
                        <div className="flex flex-col justify-center items-center gap-1 border rounded-lg p-2">
                          <img
                            className="w-6 h-6"
                            src="https://img.icons8.com/serif/32/experimental-armchair-serif.png"
                            alt="furnished"
                          />
                          <span>Fursnished</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : null}
                {currentUser &&
                  listing.userRef !== currentUser._id &&
                  !isContact && (
                    <div className="w-full">
                      <button
                        className="p-3 bg-slate-700 w-full text-white rounded-xl uppercase hover:opacity-95"
                        onClick={(e) => setIsContact(true)}
                      >
                        Contact landlord
                      </button>
                    </div>
                  )}
                {isContact && (
                  <Contact listing={listing} setIsContact={setIsContact} />
                )}
              </div>
            </div>
          </>
        )
      )}
    </div>
  )
}

export default Listing
