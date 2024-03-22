import express from 'express'
import {
  signUp,
  signIn,
  signInByGoogle,
} from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/sign-up', signUp)
router.post('/sign-in', signIn)
router.post('/google', signInByGoogle)
export default router
