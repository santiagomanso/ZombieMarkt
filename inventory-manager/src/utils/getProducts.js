import axios from 'axios'
import { isStrOrNum } from './isStrOrNum'

const getProducts = (arg, setData, setError) => {
  const fetchData = async (url) => {
    const { data } = await axios.get(url)
    // console.log('data: ', data)
    setData(data)
  }

  if (isStrOrNum(arg) === 'string') {
    fetchData(`${process.env.REACT_APP_SERVER_URL}/api/products/name/${arg}`)
  } else {
    fetchData(`${process.env.REACT_APP_SERVER_URL}/api/products/ean/${arg}`)
  }
}

export default getProducts
