import express from 'express'
import {
  currentUser,
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
    scope: ['profile', 'email'],
  }),
)

//NOTE - session false object on routes otherwise session error
authRouter.get('/google/callback', passport.authenticate('google'), googleLogin)

authRouter.post('/login', login) //login email/password
authRouter.post('/loginWithToken', loginWithToken) //auto login when token

authRouter.get('/currentUser', currentUser)

export default authRouter
