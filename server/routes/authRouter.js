import express from 'express'
import {
  googleLogin,
  login,
  loginWithToken,
} from '../controllers/authController.js'
import passport from 'passport'

const authRouter = express.Router()

//@desc GOOGLE endpoint (redirect to google) and get accessToken
//route GET /api/auth/google
authRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
)

authRouter.get('/google/callback', passport.authenticate('google'), googleLogin)

authRouter.post('/login', login) //login email/password
authRouter.post('/loginWithToken', loginWithToken) //auto login when token

export default authRouter
