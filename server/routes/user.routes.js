import epxress from 'express'
const router = epxress.Router()
import {
  updateUser,
  deleteUser,
  getUserListings,
  getUserDetailsById,
} from '../controllers/user.controller.js'
import { protect } from '../middleware/auth.middleware.js'

router.post('/update/:id', protect, updateUser)
router.delete('/delete/:id', protect, deleteUser)
router.get('/listings/:id', protect, getUserListings)
router.get('/:id', protect, getUserDetailsById)

export default router
