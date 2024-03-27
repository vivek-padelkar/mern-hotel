import asyncHandler from 'express-async-handler'
import Listing from '../models/Listing.model.js'

export const createListing = asyncHandler(async (req, res) => {
  const listing = await Listing.create(req.body)
  res.json({ message: 'Data saved successfully!', listing })
})
