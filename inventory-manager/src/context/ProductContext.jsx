import { createContext, useState } from 'react'

export const ProductContext = createContext()

const ProductContextProvider = ({ children }) => {
  const [productFromContext, setProductFromContext] = useState('')

  const data = {
    productFromContext,
    setProductFromContext,
  }

  return (
    <ProductContext.Provider value={data}>{children}</ProductContext.Provider>
  )
}

export default ProductContextProvider
