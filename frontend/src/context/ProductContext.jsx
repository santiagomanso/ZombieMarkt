import { createContext, useState } from 'react'

export const ProductContext = createContext()

const ProductContextProvider = ({ children }) => {
  const [productList, setProductList] = useState([])

  const data = {
    productList,
    setProductList,
  }

  return (
    <ProductContext.Provider value={data}>{children}</ProductContext.Provider>
  )
}

export default ProductContextProvider
