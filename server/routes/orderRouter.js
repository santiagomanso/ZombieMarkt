import express from 'express'
import { createOrder } from '../controllers/orderController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const orderRouter = express.Router()

//NOTE create order
orderRouter.post('/newOrder', authMiddleware, createOrder)

export default orderRouter
