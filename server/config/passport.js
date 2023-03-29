import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import dotenv from 'dotenv'
import userModel from '../models/userModel.js'
import { passwordEncription } from '../utils/bcrypt.js'
dotenv.config()

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await userModel
    .findById(id)
    .select('-password -orders -favorites')
  done(null, user)
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await userModel
        .findOne({ googleId: profile.id })
        .select('-password -orders -favorites')
      if (existingUser) {
        //log in with existing user
        // console.log('existingUser', existingUser)
        done(null, existingUser)
      } else {
        // NEW USER, save it to db
        const newUser = await new userModel({
          googleId: profile.id,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
          password: await passwordEncription(':P'), //encrypt password with bcrypt
        })

        const savedUser = await newUser.save()
        done(null, savedUser)
        // console.log('savedUser', savedUser)
      }
    },
  ),
)
