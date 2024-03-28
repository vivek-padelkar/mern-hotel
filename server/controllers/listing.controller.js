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
