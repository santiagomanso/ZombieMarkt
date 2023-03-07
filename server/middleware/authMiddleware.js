import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

const authMiddleware = async (req, res, next) => {
  // console.log('req.headers', req.headers)
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.SECRET)

      //insert field into req
      req.user = await userModel.findById(decoded.sub).select('-password')
      next()
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
