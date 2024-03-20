import mongoose from 'mongoose'
export async function connectDb() {
  try {
    const MONGOURI = process.env.MONGOURI
    await mongoose.connect(MONGOURI)
    console.log('Mongo DB connected')
  } catch (error) {
    throw Error(error.message)
  }
}
