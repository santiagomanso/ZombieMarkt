import express from 'express'
import cors from 'cors'
import colors from 'colors'
import router from './routes/test.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const startServer = () => {
  app.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode | on port ${PORT}`
        .bgBrightGreen.italic.bold,
    ),
  )
}

const addMiddlewares = () => {
  app.use(express.json())
  app.use(
    express.urlencoded({
      extended: true,
    }),
  )
  const corsOption = {
    origin: 'http://localhost:3000',
    credentials: true,
  }
  app.use(cors(corsOption))
}

const loadRoutes = () => {
  app.use('/api', router)
}

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB)
    console.log(
      `Connection to MongoDB established on port: ${PORT}`.bgBrightGreen,
    )
  } catch (error) {
    console.log(
      `Error while trying to connect to MongoDB, error: ${error}`.bgBrightRed,
    )
  }
}

;(async function controller() {
  await connect()
  addMiddlewares()
  loadRoutes()
  startServer()
})()
