import express from 'express'
import {
  createUser,
  getAllUsers,
  login,
} from '../controllers/userController.js'
import customErrorHandler from '../middleware/customErrorHandler.js'

const userRouter = express.Router()

//CREATE USER
userRouter.post('/create', customErrorHandler, createUser)

//LOGIN
userRouter.post('/login', login)

//GET ALL USERS
userRouter.get('/all', getAllUsers)

export default userRouter
