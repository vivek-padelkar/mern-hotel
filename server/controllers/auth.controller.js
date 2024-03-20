import { signUpValidator } from '../validation/auth.validator.js'
import asyncHandler from 'express-async-handler'
import User from '../models/User.model.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/generateToken.js'

export const signUp = asyncHandler(async (req, res) => {
  await signUpValidator(req.body)
  const { username, password, email } = req.body
  const userExists = await User.findOne({ email: email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  const hasPassword = bcrypt.hashSync(password, 10)
  const user = await User.create({ username, email, password: hasPassword })
  if (user) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})
