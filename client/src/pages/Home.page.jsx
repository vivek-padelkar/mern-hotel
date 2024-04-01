import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../utils/axiosConfig'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import Card from '../components/Card.component'

const Home = () => {
  SwiperCore.use(Navigation)
  const [offerListing, setOfferListing] = useState([])
  const [saleListing, setSaleListing] = useState([])
  const [rentListing, setRentListing] = useState([])

  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/listing/get?offer=true&limit=4`
        )
        setOfferListing(data)
        await fetchRentListings()
      } catch (error) {
        console.log(error)
      }
    }
    fetchOfferListing()

    const fetchRentListings = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/listing/get?type=rent&limit=4`
        )
        setRentListing(data)
        await fetchSaletListings()
      } catch (error) {
        console.log(error)
      }
    }

    const fetchSaletListings = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/listing/get?type=sale&limit=4`
        )
        setSaleListing(data)
      } catch (error) {
        console.log(error)
      }
    }
  }, [])

  return (
    <div>
      {/* top part */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl sm:text-6xl">
          Find your Next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          EastsideEstate is the best place to find next perfect place to live
          <br />
          We have wide range of propertiesfor you to choose from
        </div>
        <Link
          className="text-blue-800 font-bold text-xs sm:text-sm hover:underline"
          to="/search"
        >
          Lets Start now...
        </Link>
      </div>
      {/* swipper */}
      {console.log(offerListing)}
      {console.log(offerListing.length)}
      <Swiper navigation>
        {offerListing &&
          offerListing.length > 0 &&
          offerListing.map((list) => (
            <SwiperSlide>
              <div
                className="h-[500px]"
                key={list._id}
                style={{
                  background: `url(${list.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      {/* listings */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {/* offer listing */}
        {offerListing && offerListing.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={`/search?offer=true`}
              >
                Show more offer
              </Link>
            </div>

            <div className="flex flex-wrap gap-4">
              {offerListing.map((list) => (
                <Card key={list._id} listing={list} />
              ))}
            </div>
          </div>
        )}

        {/* sale listing */}
        {saleListing && saleListing.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for Sales
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={`/search?type=sale`}
              >
                Show more places for sale
              </Link>
            </div>

            <div className="flex flex-wrap gap-4">
              {saleListing.map((list) => (
                <Card key={list._id} listing={list} />
              ))}
            </div>
          </div>
        )}

        {/* rent listing */}
        {rentListing && rentListing.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for Rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={`/search?type=rent`}
              >
                Show more places for rent
              </Link>
            </div>

            <div className="flex flex-wrap gap-4">
              {rentListing.map((list) => (
                <Card key={list._id} listing={list} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
