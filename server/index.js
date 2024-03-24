import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDb } from './db/dbConfig.js'
import userRoute from './routes/user.routes.js'
import authRoute from './routes/auth.routes.js'
import {
  errorHandler,
  routeNotFound,
} from './middleware/routeNotFound.middleware.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5003
const BASE_PATH = process.env.BASE_PATH

connectDb()

app.use(
  cors({
    origin: 'http://localhost:5173', // Update with your client's origin
    credentials: true,
  })
)

app.use(express.json())
app.use(cookieParser())

app.use(`${BASE_PATH}/user`, userRoute)
app.use(`${BASE_PATH}/auth`, authRoute)

app.use(routeNotFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log('Server is runnin on port: ' + PORT)
})
