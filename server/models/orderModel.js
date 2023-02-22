import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  orderItems: [
    {
      name: { type: String, required: true },
      image: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'product',
      },
    },
  ],
  sku: {
    type: Number,
    required: true,
  },
  ean: {
    type: Number,
    required: true,
    unique: true,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
    default: randomPrice(),
  },
  rating: {
    type: Number,
    required: false,
    default: 3,
  },
  numReviews: {
    type: Number,
    required: false,
    default: 0,
  },
  image: {
    type: String,
    required: false,
    default: 'https://app.advaiet.com/item_dfile/default_product.png',
  },
  categoryName: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true,
  },
  shelf: {
    type: String,
    required: false,
    default: randomShelf(),
  },
  backstock: {
    type: String,
    required: false,
    default: randomShelf(),
  },
  //array usuarios que likearon
})

const productModel = mongoose.model('product', orderSchema)

export default productModel
