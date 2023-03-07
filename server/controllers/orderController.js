import orderModel from '../models/orderModel.js'
import productModel from '../models/productModel.js'
import userModel from '../models/userModel.js'

//@desc  fetch all orders
//@route POST /api/all
//@acess Private
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate({ path: 'user', select: ['-password', '-orders'] })
      .exec()
    if (!orders) {
      res.status(404).json({
        msg: 'There are no orders yet',
      })
    } else {
      res.status(200).json({
        orders,
      })
    }
  } catch (error) {
    res.status(500).json({
      msg: "Couldn't fetch orders",
    })
  }
}

//@desc  Create new order, update stocks, and push a new order to the user
//@route POST /api/orders/newOrder
//@acess Private
export const createOrder = async (req, res) => {
  const { price, orderItems, shippingAdress, cart } = req.body
  // console.log('cart', cart)
  if (!orderItems || orderItems.length < 1) {
    res.status(400).json({
      msg: 'Error - invalid order',
    })
  } else {
    try {
      //UPDATE STOCKS
      cart.map(async (item) => {
        // console.log('item', item)
        await productModel.findByIdAndUpdate(
          { _id: item._id },
          { $set: { countInStock: item.countInStock - item.quantity } },
          { new: true },
        )
      })

      //CREATE NEW ORDER
      const order = new orderModel({
        user: req.user._id, //NOTE user from authMiddleware
        shippingAdress: shippingAdress,
        quantity: orderItems.length, //NOTE quantity does not arrive from body
        price: price,
        orderItems: orderItems,
      })

      //PUSH ORDER TO EXISTING USER
      await userModel.findByIdAndUpdate(
        req.user._id,
        { $push: { orders: order._id } },
        { new: true },
      )

      const savedOrder = await order.save()
      res.status(201).json({
        msg: 'Order created successfully',
        order: savedOrder,
      })
    } catch (error) {
      console.log('error', error)
      res.status(500).json({
        msg: 'Error while creating the oder',
        error,
      })
    }
  }
}
