import bcryptjs from 'bcryptjs'
import userModel from '../models/userModel.js'
import { passwordEncription } from '../utils/bcrypt.js'

// @desc Create user
// @route POST /api/users
// @access Public
export const createUser = async (req, res) => {
  const { email } = req.body
  //   console.log('email', email)

  //   REVIEW error - sending without email
  if (email === undefined)
    return res.status(500).json({
      error: 'Invalid email',
    })

  try {
    // checking existing user
    const existingUser = await userModel.findOne({ email: email })
    if (existingUser) {
      res.status(501).json({
        error: 'error: email already in use',
      })
    } else {
      const newUser = new userModel({
        email: req.body.email,
        password: await passwordEncription(req.body.password),
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
