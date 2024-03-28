import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../fireBase'
import axiosInstance from '../utils/axiosConfig'

const UpdateListing = () => {
  const params = useParams()
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountedPrice: 0,
    imageUrls: [],
    offer: false,
    parking: false,
    furnished: false,
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user)

  const listingId = params.listingId

  useEffect(() => {
    const fetchListingById = async () => {
      try {
        const { data } = await axiosInstance(`/listing/getlisting/${listingId}`)
        setFormData(data)
      } catch (error) {
        toast.error(error.message || error)
      }
    }
    fetchListingById()
  }, [])

  function handleImageSubmit() {
    try {
      if (files.length === 0)
        throw Error('Please select atleast 1 image to upload !')
      if (files.length > 6)
        throw Error('You can only upload upto 6 images per listing !')
      const promises = []
      console.log('i am uploading before' + uploading)
      console.log('i am uploading' + uploading)
      for (let i = 0; i <= files.length - 1; i++) {
        promises.push(storeImage(files[i]))
      }
      Promise.all(promises).then((urls) => {
        setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) })
        setUploading(false)
      })
    } catch (error) {
      setUploading(false)
      toast.error(error.message || error)
    }
  }

  async function storeImage(file) {
    try {
      setUploading(true)
      return new Promise(async (resolve, reject) => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + file.name
        const storegeRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storegeRef, file)
        uploadTask.on('state_changed', (snapshot) => {
          console.log(snapshot)
        })
        await uploadTask
        const downloadURL = getDownloadURL(storegeRef)
        resolve(downloadURL)
      }).catch((error) => {
        toast.error(error.message || error)
      })
    } catch (error) {
      toast.error(error.message || error)
    }
  }

  function handleRemoveImage(index) {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    })
  }

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      })
    }
    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      })
    }
    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value })
    }
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if (formData.imageUrls.length === 0)
        throw Error('Please select atleast 1 image to upload !')
      if (formData.discountedPrice > formData.regularPrice === 0)
        throw Error('Dicounted Price cannot be greater than Regular price !')
      setLoading(true)
      const AXIOS_HEADER = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axiosInstance.post(
        `/listing/update/${listingId}`,
        { ...formData, userRef: currentUser._id },
        AXIOS_HEADER
      )

      toast.success('Your Listing Updated successfully !')
      setLoading(false)
      navigate(`/listing/${data.listing._id}`)
    } catch (error) {
      toast.error(error.message || error)
    }
  }

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Update Listing
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row md:flex-row gap-6"
      >
        <div className="flex flex-col gap-4 flex-1">
          {/* name   */}
          <input
            id="name"
            type="text"
            placeholder="name"
            className="border p-3 rounded-lg"
            maxLength={62}
            minLength={10}
            onChange={handleChange}
            value={formData.name}
            required
          />
          {/* description */}
          <textarea
            id="description"
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            onChange={handleChange}
            value={formData.description}
            required
          />
          {/* address */}
          <input
            id="address"
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            onChange={handleChange}
            value={formData.address}
            required
          />

          {/* specification */}
          <div className="flex flex-col gap-4">
            {/* sell or rent */}
            <div className="flex flex-col">
              <h1 className="mb-2 font-semibold">What's your plan?</h1>
              <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                {/* sale checkbox */}
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id="sale"
                    className="w-5"
                    onChange={handleChange}
                    checked={formData.type === 'sale'}
                  />
                  <img
                    className="w-6 h-"
                    src="https://img.icons8.com/wired/64/sale.png"
                    alt="sale"
                  />
                  <p className="ml-1">Sale</p>
                </div>
                {/* rent checkbox */}
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id="rent"
                    className="w-5"
                    onChange={handleChange}
                    checked={formData.type === 'rent'}
                  />
                  <img
                    className="w-6 h-6"
                    src="https://img.icons8.com/ios/50/sell-property--v1.png"
                    alt="rent"
                  />
                  <span>Rent</span>
                </div>
              </div>
            </div>

            {/* amenities */}
            <div className="flex flex-col">
              <h1 className="mb-2 font-semibold">Amenities:</h1>
              <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                {/* parking checkbox */}
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id="parking"
                    className="w-5"
                    onChange={handleChange}
                    checked={formData.parking}
                  />
                  <img
                    className="w-6 h-6"
                    src="https://img.icons8.com/ios/50/parking.png"
                    alt="parking"
                  />
                  <span>Parking Spot</span>
                </div>
                {/* Fursnished checkbox */}
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id="furnished"
                    className="w-5"
                    onChange={handleChange}
                    checked={formData.furnished}
                  />
                  <img
                    className="w-6 h-6"
                    src="https://img.icons8.com/serif/32/experimental-armchair-serif.png"
                    alt="furnished"
                  />
                  <span>Fursnished</span>
                </div>
                {/* Offer checkbox */}
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id="offer"
                    className="w-5"
                    onChange={handleChange}
                    checked={formData.offer}
                  />
                  <img
                    className="w-6 h-6"
                    src="https://img.icons8.com/ios/50/discount--v1.png"
                    alt="Offer"
                  />
                  <span>Offer</span>
                </div>
              </div>
            </div>

            {/* Specification */}
            <div>
              <h1 className="mb-2 font-semibold">Specification:</h1>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {/* bedrooms */}
                <div className="flex items-center gap-2">
                  <input
                    className="p-1 border border-gray-300 rounded-lg"
                    type="Number"
                    id="bedrooms"
                    min={1}
                    max={10}
                    onChange={handleChange}
                    value={formData.bedrooms}
                    required
                  />
                  <img
                    className="w-6 h-6"
                    src="https://img.icons8.com/ios/50/bed.png"
                    alt="sale"
                  />
                  <p>Beds</p>
                </div>
                {/* bathrooms */}
                <div className="flex items-center gap-2">
                  <input
                    className="p-1 border border-gray-300 rounded-lg "
                    type="Number"
                    id="bathrooms"
                    min={1}
                    max={10}
                    required
                    onChange={handleChange}
                    value={formData.bathrooms}
                  />
                  <img
                    className="w-6 h-6"
                    src="https://img.icons8.com/pastel-glyph/64/shower-and-tub--v2.png"
                    alt="shower-and-tub--v2"
                  />
                  <p>Bath's</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          {/* Price Details */}
          <div>
            <h1 className="mb-2 font-semibold">Price:</h1>
            <div className="flex flex-col">
              {/* Regular price */}
              <div className="">
                <div className="flex gap-2">
                  <img
                    className="w-6 h-6"
                    src="https://img.icons8.com/ios/50/price-tag--v1.png"
                    alt="price-tag--v1"
                  />
                  <p>
                    Regular price{' '}
                    <span className="text-sm">(&#8377; per month)</span>
                  </p>
                </div>
                <input
                  className="p-1 border border-gray-300 rounded-lg w-36 mt-2"
                  type="Number"
                  id="regularPrice"
                  min={1}
                  onChange={handleChange}
                  value={formData.regularPrice}
                  required
                />
              </div>
              {/* Discounted Price */}
              {formData.offer && (
                <div className="mt-4">
                  <div className="flex gap-2">
                    <img
                      className="w-6 h-6"
                      src="https://img.icons8.com/ios/50/discount--v1.png"
                      alt="discounted price"
                    />
                    <p>
                      Dicounted price{' '}
                      <span className="text-sm">(&#8377; per month)</span>
                    </p>
                  </div>

                  <input
                    className="p-1 border border-gray-300 rounded-lg mt-2 w-36"
                    type="Number"
                    id="discountedPrice"
                    min={1}
                    required
                    onChange={handleChange}
                    value={formData.discountedPrice}
                  />
                </div>
              )}
            </div>
          </div>

          {/* image upload functionality */}
          <p className="font-semibold">Images:</p>
          <span className="font-normal text-gray-600 ml-2">
            The first image will be the cover (max 6)
          </span>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded-full"
              type="file"
              id="images"
              accept='accept="image/jpeg, image/png, image/jpeg'
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              type="button"
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-40"
              onClick={handleImageSubmit}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>

          {/* delete image functionality */}
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((imgPath, index) => (
              <div
                className="flex justify-between p-3 bordeer items-center"
                key={imgPath}
              >
                <img
                  src={imgPath}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  className="flex gap-1 text-red-700 p-3 rounded-xl hover:opacity-75"
                  onClick={(e) => handleRemoveImage(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6  text-red-700"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            ))}
          {/* final form submit to create listing */}
          <button
            disabled={loading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            Update listing
          </button>
        </div>
      </form>
    </main>
  )
}

export default UpdateListing
