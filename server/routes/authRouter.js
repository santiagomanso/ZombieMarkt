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
//NOTE - session false object on routes otherwise session error
authRouter.get(
  '/google',
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
  }),
)

//NOTE - session false object on routes otherwise session error
authRouter.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  googleLogin,
)

authRouter.post('/login', login) //login email/password
authRouter.post('/loginWithToken', loginWithToken) //auto login when token

export default authRouter
