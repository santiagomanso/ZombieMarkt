import express from 'express'
import { getAllCategories } from '../controllers/categoriesController.js'
const categoriesRouter = express.Router()

categoriesRouter.get('/all', getAllCategories)

export default categoriesRouter
