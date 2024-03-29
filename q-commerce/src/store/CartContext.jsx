import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import getTokenFromStorage from '../utils/getTokenFromStorage'
import { LanguageContext } from './LanguageContext'

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
  const [shippingAdress, setShippingAdress] = useState('')

  //extraction from context
  const { txt } = useContext(LanguageContext)

  //functions
  const setCartToStorage = () => {
    window.localStorage.setItem('cart', JSON.stringify(cart))
  }

  //NOTE - PLACE ORDER
  const placeOrder = async (total) => {
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
      shippingAdress: shippingAdress,
      price: total,
      orderItems: orderIds, //array of _ids (only ids)
    }

    //NOTE axios post with URL, BODY and HEADERS
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/orders/newOrder`,
      body,
      headers,
    )

    console.log('data', data)

    if (data) {
      setCart([])
      setMsg(txt.orderPlaced)
      setTimeout(() => {
        navigate('/home')
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
    shippingAdress,
    setError,
    setCart,
    placeOrder,
    setShippingAdress,
  }

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>
}
