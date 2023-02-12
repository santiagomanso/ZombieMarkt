import express from 'express'
import {
  getAllProducts,
  getProductsByEAN,
  getProductsByName,
  postNewProduct,
} from '../controllers/productController.js'

const productRouter = express.Router()

//NOTE GET
productRouter.get('/all', getAllProducts)
productRouter.get('/name/:name', getProductsByName)
productRouter.get('/ean/:ean', getProductsByEAN)

//NOTE POST
productRouter.post('/create', postNewProduct)

export default productRouter
