import express from 'express'
import {
  createUser,
  getAllUsers,
  getUserProfile,
  login,
  loginWithToken,
  newFavoriteProduct,
} from '../controllers/userController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import customErrorHandler from '../middleware/customErrorHandler.js'

const userRouter = express.Router()

//POSTS
userRouter.post('/create', customErrorHandler, createUser) //new user
userRouter.post('/login', login) //login email/password
userRouter.post('/loginWithToken', loginWithToken) //auto login when token
userRouter.post('/newFavoriteProduct/:_id', authMiddleware, newFavoriteProduct) //new user

//GETS
userRouter.get('/all', getAllUsers)
userRouter.get('/profile', authMiddleware, getUserProfile)

export default userRouter
