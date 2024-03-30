import epxress from 'express'
const router = epxress.Router()
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
} from '../controllers/listing.controller.js'
import { protect } from '../middleware/auth.middleware.js'

router.post('/create', protect, createListing)
router.post('/update/:id', protect, updateListing)
router.delete('/delete/:id', protect, deleteListing)
router.get('/getlisting/:id', getListing)
router.get('/get', getListings)

export default router
