import epxress from 'express'
const router = epxress.Router()
import { createListing } from '../controllers/listing.controller.js'
import { protect } from '../middleware/auth.middleware.js'

router.post('/create', protect, createListing)

export default router
