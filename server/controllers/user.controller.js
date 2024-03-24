import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import User from '../models/User.model.js'

export const updateUser = asyncHandler(async (req, res) => {
  if (req.user.id !== req.params.id)
    throw Error('You can only update your own account !')
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10)
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        avatar: req.body.avatar,
      },
    },
    { new: true }
  )

  const { password, ...rest } = updatedUser._doc
  res.json(rest)
})

export const deleteUser = asyncHandler(async (req, res) => {
  if (req.user.id !== req.params.id)
    throw Error('You can only Delete your own account !')
  await User.findByIdAndDelete(req.params.id)
  res.clearCookie('access-token')
  res.json('User has been deleted successfully !')
})
