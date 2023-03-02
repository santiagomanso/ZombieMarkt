import userModel from '../models/userModel.js'
import { comparePasswords, passwordEncription } from '../utils/bcrypt.js'
import generateToken from '../utils/generateTokens.js'

//random Image
const randomImg = () => {
  const images = [
    'https://i.ibb.co/GQDXp1X/aksdasdj-default-user-profile-picture-zombie-style-fun-ux-no-ge-ad402b67-e1fd-482d-b429-a2601634eebe.png',
    'https://i.ibb.co/wSPJ6WQ/aksdasdj-default-user-profile-girl-zombie-style-c97e338c-dcf6-49e0-a180-111910131ef9-removebg-previe.png',
    'https://i.ibb.co/fFmx31R/basureando-user-profile-stock-picture-cartoon-zombie-style-16f3cc14-3057-4a55-8ee2-2d0fbd9c5538-remo.png',
    'https://i.ibb.co/2P7XwCp/basureando-user-profile-stock-picture-cartoon-zombie-style-77ddc483-8f05-4aa9-a8ea-c9e4ea39d16e-remo.png',
    'https://i.ibb.co/pJCC7ZX/basureando-user-profile-picture-cartoon-girl-zombie-style-80557016-2fac-4acc-a431-a7efae327e34-remov.png',
    'https://i.ibb.co/VwWtqKz/basureando-user-profile-picture-cartoon-girl-zombie-style-b46d0887-ac55-4aaf-9c9f-760ab37cb5ba-remov.png',
    'https://i.ibb.co/cNGdsQW/basureando-user-profile-picture-cartoon-girl-zombie-style-21ea525f-48a3-424d-8490-e140878f839e-remov.png',
  ]
  return images[Math.floor(Math.random() * images.length)]
}

// @desc Create user
// @route POST /api/users
// @access Public
export const createUser = async (req, res) => {
  const { email } = req.body
  // console.log('email', email)

  // REVIEW error - sending without email
  if (!email) {
    res.status(401).json({
      msg: 'Error - invalid email',
    })
    return
  }

  try {
    // checking existing user
    const existingUser = await userModel.findOne({ email: email })
    if (existingUser) {
      res.status(401).json({
        msg: 'error: email already in use',
      })
    } else {
      const newUser = new userModel({
        email: req.body.email,
        password: await passwordEncription(req.body.password), //NOTE bcrypt encription
        image: randomImg(),
      })
      console.log('newUser', newUser)
      const savedUser = await newUser.save()
      if (savedUser) {
        const token = generateToken(savedUser._id)
        // console.log('token', token)

        //user object for response (no password/isAdmin) fields
        const user = {
          email: savedUser.email,
          image: savedUser.image,
          joined: savedUser.createdAt,
        }
        res.status(201).json({
          msg: 'User created successfully',
          user: user,
          token: token,
        })
      }
    }
  } catch (error) {
    return res.status(500).json({
      msg: 'Fatal Error',
    })
  }
}

// @desc login user
// @route POST /api/users
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
    const existingUser = await userModel.findOne({ email: email })
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
        msg: 'there was an error fetching all',
      })
    }
  } catch (error) {
    res.status(500).json({
      msg: 'Internal server error',
    })
  }
}

// @desc get user Profile
// @route GET /api/users/profile
// @access public
export const getUserProfile = async (req, res) => {
  // console.log('req.user', req.user)
  res.status(200).json({
    user: req.user,
  })
  // try {
  //   //get all users but without password field
  //   const allUsers = await userModel.find({}).select('-password ')
  //   if (allUsers)
  //     res.status(200).json({
  //       users: allUsers,
  //     })
  //   else {
  //     res.status(500).json({
  //       msg: 'there was an error fetching all',
  //     })
  //   }
  // } catch (error) {
  //   res.status(500).json({
  //     msg: 'Internal server error',
  //   })
  // }
}
