import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    username: {
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
    avatar: {
      type: String,
      default:
        'https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg',
    },
  },
  { timestamps: true }
)

const User = mongoose.model('User', UserSchema)
export default User
