import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()

  //states
  const [cart, setCart] = useState(getCartFromStorage())
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')

  //functions
  const setCartToStorage = () => {
    window.localStorage.setItem('cart', JSON.stringify(cart))
  }

  //NOTE - PLACE ORDER
  const placeOrder = async (price) => {
    const token = getTokenFromStorage()
    //headers
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
      price: price,
      orderItems: orderIds, //array of _ids (only ids)
    }

    //NOTE axios post with URL, BODY and HEADERS
    const { data } = await axios.post(
      '${process.env.REACT_APP_SERVER_URL}/api/orders/newOrder',
      body,
      headers,
    )

    console.log('data', data)

    if (data) {
      setCart([])
      setMsg('Order placed')
      setTimeout(() => {
        navigate('/')
        setMsg('')
      }, 2000)
    } else {
      setError('Fatal Error')
      setTimeout(() => {
        setError('')
      }, 2000)
    }
  }

  useEffect(() => {
    setCartToStorage()
    //eslint-disable-next-line
  }, [cart])

  //provider object
  const data = {
    cart,
    msg,
    error,
    setCart,
    placeOrder,
  }

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>
}
