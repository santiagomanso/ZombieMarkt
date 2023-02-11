import axios from 'axios'
import { isStrOrNum } from '../utils/isStrOrNum'

const UseGetProducts = (arg, setData, setError) => {
  const fetchData = async (url) => {
    const { data } = await axios.get(url)
    // console.log('data: ', data)
    setData(data)
  }

  if (isStrOrNum(arg) === 'string') {
    fetchData(`http://localhost:5500/api/products/name/${arg}`)
  } else {
    fetchData(`http://localhost:5500/api/products/ean/${arg}`)
  }
}

export default UseGetProducts
