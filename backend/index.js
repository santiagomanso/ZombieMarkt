import express from 'express'
import cors from 'cors'
import colors from 'colors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import productRouter from './routes/productRouter.js'
import connectDB from './config/connectDB.js'
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
  app.use('/api/products', productRouter)
}

;(async function controller() {
  await connectDB()
  addMiddlewares()
  loadRoutes()
  startServer()
})()
