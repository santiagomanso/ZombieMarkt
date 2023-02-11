import express from 'express'
import {
  getAllProducts,
  getProductsByEAN,
  getProductsByName,
} from '../controllers/productController.js'

const productRouter = express.Router()
productRouter.get('/all', getAllProducts)
productRouter.get('/name/:name', getProductsByName)
productRouter.get('/ean/:ean', getProductsByEAN)

export default productRouter
