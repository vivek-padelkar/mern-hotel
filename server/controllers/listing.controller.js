import asyncHandler from 'express-async-handler'
import Listing from '../models/Listing.model.js'

export const createListing = asyncHandler(async (req, res) => {
  const listing = await Listing.create(req.body)
  res.json({ message: 'Data saved successfully!', listing })
})

export const deleteListing = asyncHandler(async (req, res) => {
  // console.log(req.params.id)
  const listing = await Listing.findById(req.params.id)
  if (!listing) throw Error('Listing not found !')
  if (req.user.id !== listing.userRef)
    throw Error('You can only delete your own listing !')
  await Listing.findByIdAndDelete(req.params.id)
  res.json({ message: 'Listing deleted successfully!' })
})

export const updateListing = asyncHandler(async (req, res) => {
  // console.log(req.params.id)
  const listing = await Listing.findById(req.params.id)
  if (!listing) throw Error('Listing not found !')
  if (req.user.id !== listing.userRef)
    throw Error('You can only delete your own listing !')
  const updatedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.json({ listing: updatedListing })
})

export const getListing = asyncHandler(async (req, res) => {
  // console.log(req.params.id)
  const listing = await Listing.findById(req.params.id)
  if (!listing) throw Error('Listing not found !')
  res.json(listing)
})

export const getListings = asyncHandler(async (req, res) => {

  const limit = Number(req.query.limit) || 9
  const startIndex = Number(req.query.startIndex) || 0
  // for offer
  let offer = req.query.offer
  if (offer === undefined || offer === false) {
    offer = { $in: [false, undefined] }
  }
  // for furnished
  let furnished = req.query.furnished
  if (furnished === undefined || furnished === false) {
    furnished = { $in: [false, undefined] }
  }
  // for parking
  let parking = req.query.parking
  if (parking === undefined || parking === false) {
    parking = { $in: [false, undefined] }
  }
  //for type
  let type = req.query.type
  if (type === undefined || type === 'all') {
    type = { $in: ['sale', 'rent'] }
  }

  const searchTerm = req.query.searchTerm || ''
  const sort = req.query.sort || 'createdAt'
  const order = req.query.order || 'desc'

  const listings = await Listing.find({
    name: { $regex: searchTerm, $options: 'i' }, //1 means irrespective of case
    offer,
    furnished,
    parking,
    type,
  })
    .sort({ [sort]: order })
    .limit(limit)
    .skip(startIndex)

  res.json(listings)
})
