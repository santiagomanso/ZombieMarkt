import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
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
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'order',
      },
    ],
    // favorites:[]
    // joined date
    //money spent
    //ofertas particulares
    //array favoritos
  },
  {
    timestamps: true,
  },
)

const userModel = mongoose.model('user', userSchema)
export default userModel
