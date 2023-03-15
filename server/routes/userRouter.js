import express from 'express'
import {
  createUser,
  getAllUsers,
  getUserProfile,
  newFavoriteProduct,
} from '../controllers/userController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import customErrorHandler from '../middleware/customErrorHandler.js'

const userRouter = express.Router()

//POSTS
userRouter.post('/create', customErrorHandler, createUser) //new user

userRouter.post('/newFavoriteProduct/:_id', authMiddleware, newFavoriteProduct) //new user

//GETS
userRouter.get('/all', getAllUsers)
userRouter.get('/profile', authMiddleware, getUserProfile)

export default userRouter
