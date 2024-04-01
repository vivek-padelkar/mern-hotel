import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ key, listing }) => {
  return (
    <div
      key={key}
      className="mb-4 bg-white shadow-md hover:shadow-lg 
      transition-all duration-300 overflow-hidden rounded-lg w-full sm:w-[260px]"
    >
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt={listing.name}
          className="h-[320px] sm:h-[150px] w-full object-cover 
          hover:scale-105 transition-all duration-300"
        />
        <div className="p-3 flex flex-col gap-2">
          {/* name */}
          <p className="text-lg font-semibold text-slate-700 truncate">
            {listing.name}
          </p>
          {/* address */}
          <div>
            <div className="flex gap-2 mt-2 items-start">
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/office/16/marker.png"
                alt="marker"
              />
              <p className="text-sm text-gray-600 truncate">
                {listing.address}
              </p>
            </div>
          </div>
          {/* decription */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          {/* price */}
          <p className="text-slate-500 mt-2 font-semibold">
            {listing.offer ? listing.discountedPrice : listing.regularPrice}{' '}
            &#8377;
            {listing.type === 'rent' && ' per month'}
          </p>
          <div className="flex gap-6 mt-2 font-semibold text-xs text-slate-700">
            <div className="flex justify-center items-center gap-2">
              <img
                className="w-6 h-6"
                src="https://img.icons8.com/ios/50/bed.png"
                alt="sale"
              />
              <p>{listing.bedrooms} Bed's</p>
            </div>

            {/* BATHROOMS */}
            <div className="flex justify-center items-center gap-2">
              <img
                className="w-6 h-6"
                src="https://img.icons8.com/pastel-glyph/64/shower-and-tub--v2.png"
                alt="shower-and-tub--v2"
              />
              <p>{listing.bedrooms} Bathroom's</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Card
