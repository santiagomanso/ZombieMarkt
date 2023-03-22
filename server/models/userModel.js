import mongoose from 'mongoose'
import moment from 'moment'

const userSchema = mongoose.Schema({
  googleId: {
    type: String,
  },
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
  image: {
    type: String,
    required: false,
  },
  joined: {
    type: String,
    default: moment().format('DD-MM-YYYY'),
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'order',
    },
  ],
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'product',
    },
  ],
  // joined date
  //money spent
  //ofertas particulares
})

const userModel = mongoose.model('user', userSchema)
export default userModel
