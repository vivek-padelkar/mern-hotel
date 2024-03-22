import {
  signUpValidator,
  signInValidator,
} from '../validation/auth.validator.js'
import asyncHandler from 'express-async-handler'
import User from '../models/User.model.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/generateToken.js'

export const signUp = asyncHandler(async (req, res) => {
  signUpValidator(req.body)
  const { username, password, email } = req.body
  const userExists = await User.findOne({ email: email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  const hasPassword = bcrypt.hashSync(password, 10)
  const user = await User.create({ username, email, password: hasPassword })
  if (user) {
    const { password: pass, ...rest } = user._doc
    return res.status(200).json(rest)
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

export const signIn = asyncHandler(async (req, res) => {
  signInValidator(req.body)
  const { email, password } = req.body
  const userData = await User.findOne({ email: email })
  if (!userData) throw new Error('Invalid Email/ password combination !')

  const passwodMatch = bcrypt.compareSync(password, userData.password)
  if (!passwodMatch) throw new Error('Invalid Email/ password combination !')

  const { password: pass, ...rest } = userData._doc
  res
    .cookie('access-token', generateToken(userData._id), { httpOnly: true })
    .json(rest)
})

export const signInByGoogle = asyncHandler(async (req, res) => {
  const { email, name, photo } = req.body
  let response = {}
  let token = ''
  const user = await User.findOne({ email })
  if (user) {
    const { password: pass, ...rest } = user._doc
    token = generateToken(user._id)
    response = rest
  } else {
    const username =
      name.split(' ').join('').toLowerCase() +
      Math.random().toString(36).slice(-4)
    //generate 16 digit password
    //0.98565687N will pick last 8 charecter 8565687N
    const generatePassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8)
    const hashPassword = bcrypt.hashSync(generatePassword, 10)
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
      avatar: photo,
    })
    console.log('done')
    const { password: pass, ...rest } = newUser._doc
    token = generateToken(newUser._id)
    response = rest
  }
  response &&
    res
      .cookie('access-token', generateToken(token), { httpOnly: true })
      .json(response)
})
