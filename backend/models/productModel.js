import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
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
  category: {
    type: String,
    required: true,
  },
})

const productModel = mongoose.model('product', productSchema)

export default productModel
