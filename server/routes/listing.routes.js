import epxress from 'express'
const router = epxress.Router()
import {
  createListing,
  deleteListing,
  updateListing,
} from '../controllers/listing.controller.js'
import { protect } from '../middleware/auth.middleware.js'

router.post('/create', protect, createListing)
router.post('/update/:id', protect, updateListing)
router.delete('/delete/:id', protect, deleteListing)

export default router
