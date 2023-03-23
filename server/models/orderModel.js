import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  shippingAdress: {
    type: String,
    required: true,
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'product',
    },
  ],
  createdAt: {
    type: String,
  },
})

const orderModel = mongoose.model('order', orderSchema)

export default orderModel
