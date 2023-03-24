import { comparePasswords, passwordEncription } from '../utils/bcrypt.js'
import generateToken from '../utils/generateTokens.js'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import productModel from '../models/productModel.js'
import { randomImg } from '../utils/randomImg.js'
import moment from 'moment'

// @desc Create user
// @route POST /api/users
// @access Public
//FIXME - check if they alreay have googleId and send error saying to use OAUTH
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
        joined: moment().format('DD-MM-YYYY'),
      })
      // console.log('newUser', newUser)
      const savedUser = await newUser.save()
      if (savedUser) {
        const token = generateToken(savedUser._id)
        // console.log('token', token)

        //user object for response (no password/isAdmin) fields
        const user = {
          email: savedUser.email,
          image: savedUser.image,
          joined: savedUser.joined,
        }
        res.status(201).json({
          msg: 'User created successfully',
          user: user,
          token: token,
        })
      }
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Fatal Error',
    })
  }
}

// @desc set a new favorite product on a specific user and push user._id into product.favorites
// @route POST /api/users/newProduct/:_id
// @access Protected
export const newFavoriteProduct = async (req, res) => {
  const { _id } = req.params //product id
  const user = req.user

  // validate that the product exists, otherwise it could push an unexisting product
  // and break everything
  const product = await productModel.findOne({ _id: _id })

  // validate existingProduct
  if (!product) {
    return res.status(404).json({
      msg: 'Product not found',
    })
  }

  try {
    let updatedUser
    let updatedProduct

    // check if the product ID already exists in the favorites array of the USER
    const isFavorite = user.favorites.includes(_id)

    if (isFavorite) {
      // remove the product ID from the favorites array
      updatedUser = await userModel.findByIdAndUpdate(
        user._id,
        { $pull: { favorites: _id } },
        { new: true },
      )

      updatedProduct = await productModel.findByIdAndUpdate(
        _id,
        { $pull: { favorites: user._id } },
        { new: true },
      )

      res.status(200).json({
        msg: 'Favorite relationship deleted',
        userFavorites: updatedUser.favorites,
        productFavorites: updatedProduct.favorites,
      })
    } else {
      // add the product ID to the favorites array
      updatedUser = await userModel.findByIdAndUpdate(
        user._id,
        { $push: { favorites: _id } },
        { new: true },
      )
      const updatedProduct = await productModel.findByIdAndUpdate(
        _id,
        { $push: { favorites: user._id } },
        { new: true },
      )
      res.status(200).json({
        msg: 'Product added to favorites',
        user: updatedUser,
        product: updatedProduct,
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error updating favorites',
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
    const allUsers = await userModel
      .find({})
      .populate({
        path: 'orders',
        populate: { path: 'orderItems', populate: { path: 'category' } },
      })
      .populate({ path: 'favorites', model: 'product' })
      .select('-password')
      .exec()
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
    console.log(error)
    res.status(500).json({
      msg: 'Internal server error',
    })
  }
}

// @desc get the whole user profile (populated orders/favorites)
// @route GET /api/users/profile
// @access public
export const getUserProfile = async (req, res) => {
  try {
    //get all users but without password field
    const user = await userModel
      .findById(req.user._id)
      .populate({
        path: 'orders',
        populate: {
          path: 'orderItems',
          select: '_id name image category categoryName',
          populate: { path: 'category' },
        },
      })
      .populate({
        path: 'favorites',
        model: 'product',
        select: '_id name image category categoryName price',
        populate: {
          path: 'category',
        },
      })
      .exec()
    if (user) {
      res.status(200).json({
        user,
      })
      // console.log('user', user)
    } else {
      res.status(500).json({
        msg: 'there was an error fetching all',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Internal server error',
    })
  }
}
