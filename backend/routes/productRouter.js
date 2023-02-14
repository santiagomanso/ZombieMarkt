import express from 'express'
import {
  getAllProducts,
  getProductsByEAN,
  getProductsByName,
  postImage,
  postNewProduct,
  updateProduct,
} from '../controllers/productController.js'
import { multerUpload } from '../middleware/mullter.js'

const productRouter = express.Router()

//NOTE GET
productRouter.get('/all', getAllProducts)
productRouter.get('/name/:name', getProductsByName)
productRouter.get('/ean/:ean', getProductsByEAN)

//NOTE POST
productRouter.post('/create', postNewProduct)
productRouter.post('/uploadImage', multerUpload.single('image'), postImage)

//NOTE PUT
productRouter.put('/update/:_id', updateProduct)

export default productRouter
