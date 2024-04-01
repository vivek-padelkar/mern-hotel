import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosConfig'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import DataNotFound from '../../public/images/noData.png'
import Card from '../components/Card.component'

const Search = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [listing, setListing] = useState([])
  const [showmore, setShowMore] = useState(false)
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  })

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    const typeFromUrl = urlParams.get('type')
    const parkingFromUrl = urlParams.get('parking')
    const furnishedFromUrl = urlParams.get('furnished')
    const offerFromUrl = urlParams.get('offer')
    const sortFromUrl = urlParams.get('sort')
    const orderFromUrl = urlParams.get('order')

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      })
    }

    const fetchListing = async () => {
      try {
        setLoading(true)
        setShowMore(false)
        const searchQuery = urlParams.toString()
        const { data } = await axiosInstance.get(`/listing/get?${searchQuery}`)
        if (data.length > 8) {
          setShowMore(true)
        }
        setListing(data)
        setLoading(false)
      } catch (error) {
        toast.error(error.message || error)
        setLoading(false)
        setShowMore(false)
      }
    }

    fetchListing()
  }, [location.search])

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'sale' ||
      e.target.id === 'rent'
    ) {
      setSidebarData({ ...sidebarData, type: e.target.id })
    }

    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value })
    }
    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSidebarData({
        ...sidebarData,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      })
    }
    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at'
      const order = e.target.value.split('_')[1] || 'desc'
      setSidebarData({ ...sidebarData, sort, order })
    }
  }

  const onShowMoreClick = async () => {
    toast.success('called')
    const numberOfListing = listing.length
    const startIndex = numberOfListing
    const urlParams = new URLSearchParams(location.search)
    urlParams.set('startIndex', startIndex)
    const searchQuery = urlParams.toString()
    const data = await axiosInstance.get(`/listing/get?${searchQuery}`)
    console.log(data)
    if (data.length < 8) {
      setShowMore(false)
    }
    setListing([...listing, ...data])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams()
    urlParams.set('searchTerm', sidebarData.searchTerm)
    urlParams.set('type', sidebarData.type)
    urlParams.set('parking', sidebarData.parking)
    urlParams.set('furnished', sidebarData.furnished)
    urlParams.set('offer', sidebarData.offer)
    urlParams.set('sort', sidebarData.sort)
    urlParams.set('order', sidebarData.order)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* searchterm */}
          <div>
            <input
              type="text"
              className="border rounded-lg p-3 w-full"
              id="searchTerm"
              placeholder="Enter Locality / Project / Society"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          {/* rent sale checkboxes */}
          <div className="flex gap-2 flex-wrap">
            <label className="font-semibold">Type:</label>
            {/* all */}
            <div className="flex gap-2">
              <input
                className="w-5"
                type="checkbox"
                id="all"
                onChange={handleChange}
                checked={sidebarData.type === 'all'}
              />
              <span>Rent & Sale</span>
            </div>
            {/* rent */}
            <div className="flex gap-2">
              <input
                className="w-5"
                type="checkbox"
                id="rent"
                onChange={handleChange}
                checked={sidebarData.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            {/* sale */}
            <div className="flex gap-2">
              <input
                className="w-5"
                type="checkbox"
                id="sale"
                onChange={handleChange}
                checked={sidebarData.type === 'sale'}
              />
              <span>Sale</span>
            </div>
            {/* offer */}
            <div className="flex gap-2">
              <input
                className="w-5"
                type="checkbox"
                id="offer"
                onChange={handleChange}
                checked={sidebarData.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          {/* Aminities */}
          <div className="flex gap-2 flex-wrap">
            <label className="font-semibold">Aminities:</label>
            <div className="flex gap-2">
              <input
                className="w-5"
                type="checkbox"
                id="parking"
                onChange={handleChange}
                checked={sidebarData.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                className="w-5"
                type="checkbox"
                id="furnished"
                onChange={handleChange}
                checked={sidebarData.furnished}
              />
              <span>furnished</span>
            </div>
          </div>

          {/* sort/order */}
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              className="border rounded-lg p-3"
              id="sort_order"
              onChange={handleChange}
              defaultValue={'created_at_desc'}
            >
              <option value={'regularPrice_desc'}>Price high to low</option>
              <option value={'regularPrice_asc'}>Price low to high</option>
              <option value={'createdAt_desc'}>Latest</option>
              <option value={'createdAt_asc'}>Oldest</option>
            </select>
          </div>

          {/* button */}
          <button className="bg-slate-700 text-white rounded-lg  uppercase p-3 hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 mt-5 text-slate-700">
          Listing Result:{' '}
        </h1>
        {!loading && listing.length === 0 && (
          <div>
            <p className="text-center text-3xl mt-10 font-semibold">
              OOPS, Data not found !
            </p>
            <img className="mx-auto" src={DataNotFound} alt="" />
          </div>
        )}
        <div className="flex gap-4 p-3 flex-wrap">
          {loading && <p>loading</p>}
          {!loading &&
            listing.map((list) => <Card key={list._id} listing={list} />)}
        </div>

        {showmore && (
          <button
            className="block mx-auto mt-4 text-green-700 hover:underline"
            onClick={onShowMoreClick}
          >
            Show more
          </button>
        )}
      </div>
    </div>
  )
}

export default Search
