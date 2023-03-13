import express from 'express'
import cors from 'cors'
import colors from 'colors'
import dotenv from 'dotenv'
import productRouter from './routes/productRouter.js'
import connectDB from './config/connectDB.js'
import cloudinaryConfig from './config/cloudinary.js'
import categoriesRouter from './routes/categoriesRouter.js'
import userRouter from './routes/userRouter.js'
import orderRouter from './routes/orderRouter.js'
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
  const corsOption = {
    origin: 'http://localhost:3000',
    credentials: true,
  }
  // app.use(cors(corsOption))
  app.use(cors())
  app.use(express.json())
  app.use(
    express.urlencoded({
      extended: true,
    }),
  )

  cloudinaryConfig()
}

const loadRoutes = () => {
  app.use('/api/products', productRouter)
  app.use('/api/categories', categoriesRouter)
  app.use('/api/users', userRouter)
  app.use('/api/orders', orderRouter)
}

;(async function controller() {
  await connectDB()
  addMiddlewares()
  loadRoutes()
  startServer()
})()
