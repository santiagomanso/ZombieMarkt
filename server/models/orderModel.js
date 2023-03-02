import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
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
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'product',
        },
      },
    ],
  },
  { timestamps: true },
)

const orderModel = mongoose.model('order', orderSchema)

export default orderModel
