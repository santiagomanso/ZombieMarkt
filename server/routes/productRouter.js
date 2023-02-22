import express from 'express'
import {
  deleteProduct,
  getAllProducts,
  getProductsByCategory,
  getProductsByEAN,
  getProductById,
  getProductsByName,
  postNewProduct,
  updateProduct,
} from '../controllers/productController.js'
import { multerUpload } from '../middleware/mullter.js'

const productRouter = express.Router()

//NOTE GET
productRouter.get('/all', getAllProducts)
productRouter.get('/name/:name', getProductsByName)
productRouter.get('/ean/:ean', getProductsByEAN)
productRouter.get('/category/:category', getProductsByCategory)
productRouter.get('/detail/:_id', getProductById)

//NOTE POST
productRouter.post('/create', multerUpload.single('image'), postNewProduct)

//NOTE PUT
productRouter.put('/update/:_id', multerUpload.single('image'), updateProduct)

//NOTE DELETE
productRouter.delete('/delete/:_id', deleteProduct)

export default productRouter
