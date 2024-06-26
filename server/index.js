import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import { connectDb } from './db/dbConfig.js'
import userRoute from './routes/user.routes.js'
import authRoute from './routes/auth.routes.js'
import listingRoute from './routes/listing.routes.js'
import {
  errorHandler,
  routeNotFound,
} from './middleware/routeNotFound.middleware.js'

dotenv.config()
const app = express()
const PORT = 5002
const BASE_PATH = process.env.BASE_PATH

connectDb()

app.use(
  cors({
    origin: 'https://eastside-estate.onrender.com/', // Update with your client's origin
    credentials: true,
  })
)
const __dirname = path.resolve()

app.use(express.json())
app.use(cookieParser())

app.use(`${BASE_PATH}/auth`, authRoute)
app.use(`${BASE_PATH}/user`, userRoute)
app.use(`${BASE_PATH}/listing`, listingRoute)

app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
)
app.use(routeNotFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log('testing comment added')
  console.log('Server is runnin on port: ' + PORT)
})
