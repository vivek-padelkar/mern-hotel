import epxress from 'express'
const router = epxress.Router()
import { login } from '../controllers/user.controller.js'

router.post('/login', login)

export default router
