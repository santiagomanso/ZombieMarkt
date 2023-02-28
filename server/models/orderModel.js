import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  orderItems: [
    {
      products: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'product',
      },
    },
  ],
})

const productModel = mongoose.model('product', orderSchema)

export default productModel
