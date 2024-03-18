import { Console } from 'console'
import express from 'express'

const app = express()
const PORT = 5002 || 5003

app.listen(PORT, () => {
  console.log('Server is runnin on port: ' + PORT)
})
