import axios from 'axios'
import { useEffect, useState } from 'react'

const usePost = (url, object) => {
  const [loading, setLoading] = useState('')
  const [data, setData] = useState('')
  const [error, setError] = useState('')

  console.log('url', url)
  console.log('object', object)

  //   useEffect(() => {
  //     const fetchData = async (url) => {
  //       setLoading(true)
  //       setTimeout(async () => {
  //         try {
  //           const { data } = await axios.get(url)
  //           if (data) setData(data)
  //           setLoading(false)
  //         } catch (error) {
  //           setError(error)
  //           setLoading(false)
  //         }
  //       }, 500)
  //     }

  //     fetchData(url)
  //   }, [url])

  return { loading, data, error }
}

export default usePost
