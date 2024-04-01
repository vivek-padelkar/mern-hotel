import React from 'react'

const About = () => {
  return (
    <div className="px-4 py-20 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-slate-800">
        About EastsideEstate
      </h1>
      <p className="mb-4 text-slate-700">
        we are dedicated to helping you find your dream home or investment
        property with ease and confidence. Whether you're a first-time buyer, a
        seasoned investor, or looking to sell your property, our platform offers
        comprehensive tools, resources, and expert guidance to meet your real
        estate needs.
      </p>
      <p>
        <span className="font-semibold mt-2">Our Mission: </span>
        <br />
        Our mission is to empower individuals and families to make informed
        decisions about buying or selling properties. We strive to provide a
        user-friendly experience, reliable information, and personalized support
        to ensure a smooth and successful real estate journey for every client.
      </p>
      <p className="mt-2">
        <span className="font-semibold">What we offer: </span>
        <br />
        <ol className=" text-gray-600">
          <li className="">
            <div>
              <h2 className="font-semibold">1: Extensive Property Listings:</h2>
              <p>
                Browse through a wide range of property listings, including
                residential homes, apartments, condos, commercial spaces, land,
                and more. Filter search results by location, price range,
                property type, amenities, and other criteria to find the perfect
                match for your needs.
              </p>
            </div>
          </li>
          <li className="mt-2">
            <div>
              <h2 className="font-semibold">2: Valuable Resources:</h2>
              <p>
                Explore valuable resources and tools to support your real estate
                journey. From mortgage calculators and affordability assessments
                to neighborhood guides and property valuation tools, we offer
                everything you need to navigate the market with confidence.
              </p>
            </div>
          </li>
        </ol>
      </p>
    </div>
  )
}

export default About
