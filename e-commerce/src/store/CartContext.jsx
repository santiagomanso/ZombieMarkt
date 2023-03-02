import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import getTokenFromStorage from '../utils/getTokenFromStorage'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const getCartFromStorage = () => {
    if (window.localStorage.getItem('cart')) {
      return JSON.parse(window.localStorage.getItem('cart'))
    } else {
      return []
    }
  }

  //states
  const [cart, setCart] = useState(getCartFromStorage())

  //functions
  const setCartToStorage = () => {
    window.localStorage.setItem('cart', JSON.stringify(cart))
  }

  const placeOrder = async (user) => {
    const token = getTokenFromStorage()

    //NOTE headers
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const orderIds = []
    cart.map((item) => {
      return orderIds.push(item._id)
    })

    //NOTE body
    const body = {
      cart, //the whole array of products
      shippingAdress: 'Stephan str 60',
      price: 221,
      orderItems: orderIds, //array of _ids (only ids)
    }

    //NOTE axios post with URL, BODY and HEADERS
    const { data } = axios.post(
      'http://localhost:5500/api/orders/newOrder',
      body,
      headers,
    )
  }

  useEffect(() => {
    setCartToStorage()
  }, [cart])

  //provider object
  const data = {
    cart,
    setCart,
    placeOrder,
  }

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>
}
