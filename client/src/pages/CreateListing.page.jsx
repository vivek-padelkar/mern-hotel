import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { app } from '../fireBase'

const CreateListing = () => {
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    imageUrls: [],
  })

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

  console.log('uploading' + uploading)
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          {/* name   */}
          <input
            id="name"
            type="text"
            placeholder="name"
            className="border p-3 rounded-lg"
            maxLength={62}
            minLength={10}
            required
          />
          {/* description */}
          <textarea
            id="description"
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            required
          />
          {/* address */}
          <input
            id="address"
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
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
                  <input type="checkbox" id="sale" className="w-5" />
                  <img
                    className="w-6 h-"
                    src="https://img.icons8.com/wired/64/sale.png"
                    alt="sale"
                  />
                  <p className="ml-1">Sale</p>
                </div>
                {/* rent checkbox */}
                <div className="flex items-center gap-1">
                  <input type="checkbox" id="sale" className="w-5" />
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
                  <input type="checkbox" id="sale" className="w-5" />
                  <img
                    className="w-6 h-6"
                    src="https://img.icons8.com/ios/50/parking.png"
                    alt="parking"
                  />
                  <span>Parking Spot</span>
                </div>
                {/* Fursnished checkbox */}
                <div className="flex items-center gap-1">
                  <input type="checkbox" id="sale" className="w-5" />
                  <img
                    className="w-6 h-6"
                    src="https://img.icons8.com/serif/32/experimental-armchair-serif.png"
                    alt="Fursnished"
                  />
                  <span>Fursnished</span>
                </div>
                {/* Offer checkbox */}
                <div className="flex items-center gap-1">
                  <input type="checkbox" id="sale" className="w-5" />
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
                {/* bed */}
                <div className="flex items-center gap-2">
                  <input
                    className="border border-gray-300 rounded-lg"
                    type="Number"
                    id="bedrooms"
                    min={1}
                    max={10}
                    required
                  />
                  <img
                    className="w-6 h-6"
                    src="https://img.icons8.com/ios/50/bed.png"
                    alt="sale"
                  />
                  <p>Beds</p>
                </div>
                {/* baths */}
                <div className="flex items-center gap-2">
                  <input
                    className="border border-gray-300 rounded-lg"
                    type="Number"
                    id="bedrooms"
                    min={1}
                    max={10}
                    required
                  />
                  <img
                    className="w-6 h-6"
                    src="https://img.icons8.com/pastel-glyph/64/shower-and-tub--v2.png"
                    alt="shower-and-tub--v2"
                  />
                  <p>Bath's</p>
                </div>
                {/* Regular price */}
                <div className="flex items-center gap-2">
                  <input
                    className="border border-gray-300 rounded-lg"
                    type="Number"
                    id="bedrooms"
                    min={1}
                    max={10}
                    required
                  />
                  <img
                    className="w-6 h-6"
                    src="https://img.icons8.com/ios/50/price-tag--v1.png"
                    alt="price-tag--v1"
                  />
                  <div className="flex flex-col">
                    <p>Regular price</p>
                    <p className="text-sm">(&#8377; per month)</p>
                  </div>
                </div>
                {/* Discounted Price */}
                <div className="flex items-center gap-2">
                  <input
                    className="border border-gray-300 rounded-lg"
                    type="Number"
                    id="bedrooms"
                    min={1}
                    max={10}
                    required
                  />
                  <img
                    className="w-6 h-6"
                    src="https://img.icons8.com/ios/50/discount--v1.png"
                    alt="Offer"
                  />
                  <div className="flex flex-col">
                    <p>Discounted price</p>
                    <p className="text-sm">(&#8377; per month)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
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
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create listing
          </button>
        </div>
      </form>
    </main>
  )
}

export default CreateListing
