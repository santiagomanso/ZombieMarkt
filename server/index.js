//configs
import express from 'express'
import colors from 'colors'

import session from 'express-session'
import cookieSession from 'cookie-session'
import connectDB from './config/connectDB.js'
import cloudinaryConfig from './config/cloudinary.js'
import './config/passport.js'
import cors from 'cors'
import dotenv from 'dotenv'
import passport from 'passport'

// Routers
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRouter.js'
import categoriesRouter from './routes/categoriesRouter.js'
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
    origin: '*',
  }
  app.use(cors(corsOption))
  app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [process.env.COOKIE_KEY],
    }),
  )

  app.use(passport.initialize())
  app.use(passport.session())

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
  app.use('/api/auth', authRouter)
  app.use('/api/products', productRouter)
  app.use('/api/categories', categoriesRouter)
  app.use('/api/users', userRouter)
  app.use('/api/orders', orderRouter)
}

;(async function controller() {
  loadRoutes()
  addMiddlewares()
  try {
    await connectDB()
  } catch (error) {
    console.log('error', error)
  }
  startServer()
})()

export default app
