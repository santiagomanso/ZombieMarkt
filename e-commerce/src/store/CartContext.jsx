import { createContext, useEffect, useState } from 'react'

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

  useEffect(() => {
    setCartToStorage()
  }, [cart])

  //provider object
  const data = {
    cart,
    setCart,
  }

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>
}
