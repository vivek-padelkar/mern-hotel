import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
      uninque: true,
    },
    email: {
      type: String,
      require: true,
      uninque: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
)

const User = mongoose.model('User', UserSchema)
export default User
