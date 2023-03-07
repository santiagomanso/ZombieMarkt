import express from 'express'
import {
  createUser,
  getAllUsers,
  getUserProfile,
  login,
  loginWithToken,
} from '../controllers/userController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import customErrorHandler from '../middleware/customErrorHandler.js'

const userRouter = express.Router()

//CREATE USER
userRouter.post('/create', customErrorHandler, createUser)

//LOGIN
userRouter.post('/login', login)

//LOGIN WITH TOKEN
userRouter.post('/loginWithToken', loginWithToken)

//GET ALL USERS
userRouter.get('/all', getAllUsers)

//GET USER PROFILE
userRouter.get('/profile', authMiddleware, getUserProfile)

export default userRouter
