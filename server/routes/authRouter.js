import express from 'express'
import {
  googleLogin,
  login,
  loginWithToken,
} from '../controllers/authController.js'

const authRouter = express.Router()

//@desc GOOGLE endpoint (redirect to google) and get accessToken
//route POST /api/auth/google
authRouter.post('/google', googleLogin)
authRouter.post('/login', login) //login email/password
authRouter.post('/loginWithToken', loginWithToken) //auto login when token

export default authRouter
