import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

const generateToken = (userId) => {
  const payload = { sub: userId }
  const options = {
    expiresIn: '30d',
    issuer: 'Zombie Markt',
  }

  const privateKey = process.env.SECRET
  const token = jwt.sign(payload, privateKey, options)
  return token
}

export default generateToken
