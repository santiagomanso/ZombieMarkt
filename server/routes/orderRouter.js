import express from 'express'
import { createOrder, getAllOrders } from '../controllers/orderController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const orderRouter = express.Router()

//NOTE create order
orderRouter.post('/newOrder', authMiddleware, createOrder)

//NOTE - Get all orders
orderRouter.get('/all', getAllOrders)

export default orderRouter
