import epxress from 'express'
const router = epxress.Router()
import {
  updateUser,
  deleteUser,
  getUserListings,
} from '../controllers/user.controller.js'
import { protect } from '../middleware/auth.middleware.js'

router.post('/update/:id', protect, updateUser)
router.delete('/delete/:id', protect, deleteUser)
router.get('/listings/:id', protect, getUserListings)

export default router
