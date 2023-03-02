import orderModel from '../models/orderModel.js'
import productModel from '../models/productModel.js'

//@desc  Create new order
//@route POST /api/orders
//@acess Private
export const createOrder = async (req, res) => {
  const { price, orderItems, shippingAdress, cart } = req.body

  // console.log('cart', cart)

  if (!orderItems || orderItems.length < 1) {
    res.status(400).json({
      msg: 'Error - invalid order',
    })
  } else {
    cart.map(async (item) => {
      // console.log('item', item)
      await productModel.findByIdAndUpdate(
        { _id: item._id },
        // { $set: item.countInStock - item.quantity }, //FIXME -
        { $set: { countInStock: item.countInStock - item.quantity } },
        { new: true },
      )
      console.log('item.countInStock', item.countInStock)
    })
    //   try {
    //     const order = new orderModel({
    //       user: req.user._id, //NOTE user from authMiddleware
    //       shippingAdress: shippingAdress,
    //       quantity: orderItems.length, //NOTE quantity does not arrive from body
    //       price: price,
    //       orderItems: orderItems,
    //     })

    //     const savedOrder = await order.save()
    //     res.status(201).json({
    //       msg: 'Order created successfully',
    //       order: savedOrder,
    //     })
    //   } catch (error) {
    //     res.status(500).json({
    //       msg: 'Error while creating the oder',
    //       error,
    //     })
    //   }
    // }
  }
}
