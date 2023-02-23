import userModel from '../models/userModel.js'
import { comparePasswords, passwordEncription } from '../utils/bcrypt.js'
import generateToken from '../utils/generateTokens.js'

// @desc Create user
// @route POST /api/users
// @access Public
export const createUser = async (req, res) => {
  const { email } = req.body
  // console.log('email', email)

  // REVIEW error - sending without email
  if (email === undefined)
    return res.status(500).json({
      error: 'error: invalid email',
    })

  try {
    // checking existing user
    const existingUser = await userModel.findOne({ email: email })
    if (existingUser) {
      res.status(401).json({
        error: 'error: email already in use',
      })
    } else {
      const newUser = new userModel({
        email: req.body.email,
        password: await passwordEncription(req.body.password), //NOTE bcrypt encription
      })
      const savedUser = await newUser.save()
      if (savedUser) {
        return res.status(200).json({
          msg: 'User created successfully',
        })
      }
    }
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error: ',
      error,
    })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({
      error: 'error: invalid username or password',
    })
    return
  }

  try {
    //check if there is a user with the email, if not return a msg and a 404 and RETURN
    const existingUser = await userModel.findOne({ email: email })
    if (!existingUser) {
      res.status(404).json({
        error: `error: email does not exist`,
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
        error: 'error: incorrect password',
      })
      return
    }

    //utility fn generate token
    const token = generateToken(existingUser._id)
    // console.log('token', token)

    //object to return when everything goes OK, (without sending password)
    const user = {
      email: existingUser.email,
      image: existingUser.image,
      joined: existingUser.createdAt,
    }

    res.status(200).json({
      msg: 'Successfully signed in',
      user: user,
      token,
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Fatal error',
    })
  }
}

// @desc get all user
// @route GET /api/users/all
// @access admin
export const getAllUsers = async (req, res) => {
  //   console.log('req', req)
  try {
    //get all users but without password field
    const allUsers = await userModel.find({}).select('-password ')
    if (allUsers)
      res.status(200).json({
        users: allUsers,
      })
    else {
      res.status(500).json({
        error: 'there was an error fetching all',
      })
    }
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
    })
  }
}
