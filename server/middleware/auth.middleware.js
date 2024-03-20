import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/User.model.js'

const protect = asyncHandler(async (req, res, next) => {
  let token = ''
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decode = jwt.verify(token, process.env.JWT_SECRET)
      //return all user related data excluding password
      req.user = await User.findById(decode.id).select('-password')
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authroized, token failed')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not authorize')
  }
})
export { protect }
