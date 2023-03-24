import express from 'express'
import {
  getAllCategories,
  getCategoryByName,
} from '../controllers/categoriesController.js'
const categoriesRouter = express.Router()

categoriesRouter.get('/all', getAllCategories)
categoriesRouter.get('/:name', getCategoryByName)

export default categoriesRouter
