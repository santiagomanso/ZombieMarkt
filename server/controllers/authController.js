import { comparePasswords, passwordEncription } from '../utils/bcrypt.js'
import generateToken from '../utils/generateTokens.js'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import productModel from '../models/productModel.js'

// @desc GOOGLE signIn (redirect from googleServers)
// @route POST callback
// @access Public
export const googleLogin = async (req, res) => {
  if (req.user) {
    const user = await userModel
      .findById(req.user.id)
      .select('-password -orders -favorites -googleId')
    const token = generateToken(req.user._id)
    req.session.user = user // Set the session user data
    req.session.token = token // Set the session token data
    res.cookie('token', token)
    res.redirect(`http://localhost:3000`)

    // res.redirect(`http://localhost:3000?token=${token}`)
  } else {
    res.json({
      msg: 'there is no current user',
    })
  }
}

export const currentUser = async (req, res) => {
  // console.log('req.user', req.user)
  // console.log('req.session', req.session)
  res.status(200).json({
    user: req.user,
    token: req.session.token,
    shouldCloseWindow: true,
  })
}

// @desc login user (no populates orders/favorites)
// @route POST /api/auth/
// @access Public
export const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({
      msg: 'error: invalid username or password',
    })
    return
  }

  try {
    //check if there is a user with the email, if not return a msg and a 404 and RETURN
    const existingUser = await userModel
      .findOne({ email: email })
      .select('-orders -favorites')
      .exec()
    if (!existingUser) {
      res.status(404).json({
        msg: `error: email does not exist`,
      })
      return
    }

    //compare password
    const correctPassword = await comparePasswords(
      password,
      existingUser.password,
    )
    if (!correctPassword) {
      res.status(401).json({
        msg: 'error: incorrect password',
      })
      return
    }

    //FIXME - unselect password
    const resUser = await userModel
      .findOne({ email: email })
      .select('-orders -favorites -password')
      .exec()

    //utility fn generate token
    const token = generateToken(existingUser._id)
    // console.log('token', token)
    res.status(200).json({
      msg: 'Successfully signed in',
      user: resUser,
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Fatal error',
    })
  }
}

// @desc auto login user when token (no populates orders/favorites)
// @route POST /api/auth/
// @access Protected
export const loginWithToken = async (req, res) => {
  const { token } = req.body
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET)
      const user = await userModel
        .findById(decoded.sub)
        .select('-password -orders -favorites')
        .exec()
      if (user) {
        res.status(200).json({
          //FIXME - unselect password
          user,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}
