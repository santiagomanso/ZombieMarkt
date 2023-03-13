import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

app.use(
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://www.example.com/auth/google/callback',
      },
      function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          return cb(err, user)
        })
      },
    ),
  ),
)
