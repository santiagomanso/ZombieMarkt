import axios from 'axios'
import { useEffect, useState } from 'react'

const useFetch = (url) => {
  const [loading, setLoading] = useState('')
  const [data, setData] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async (url) => {
      setLoading(true)
      setTimeout(async () => {
        try {
          const { data } = await axios.get(url)
          if (data) setData(data)
          setLoading(false)
        } catch (error) {
          setError(error)
          setLoading(false)
        }
      }, 500)
    }

    fetchData(url)
  }, [url])

  return { loading, data, error }
}

export default useFetch
