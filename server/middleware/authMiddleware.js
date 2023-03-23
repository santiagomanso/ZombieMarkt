import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

const authMiddleware = async (req, res, next) => {
  // console.log('req', req)
  console.log(req.headers.authorization)
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.SECRET)
      if (decoded) {
        req.user = await userModel
          .findById(decoded.sub)
          .select('-password')
          .exec()
        next() //calls next method
      } else {
        res.status(500).json({
          msg: 'Not authorized, token failed',
        })
      }
    } catch (error) {
      res.status(500).json({
        msg: 'Not authorized, token failed',
      })
    }
  } else {
    res.status(401).json({
      msg: 'Not authorized, no token',
    })
  }
}

export { authMiddleware }
