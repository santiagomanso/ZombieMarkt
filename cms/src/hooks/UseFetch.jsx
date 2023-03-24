import axios from 'axios'
import { useEffect, useState } from 'react'

const UseFetch = (url) => {
  const [loading, setLoading] = useState('')
  const [data, setData] = useState('')
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    const fetchData = async (url) => {
      setLoading(true)
      setTimeout(async () => {
        try {
          const { data } = await axios.get(url)
          if (data) {
            // console.log('data', data)
            setData(data)
            setMsg('Data fetched succesfully')
          }
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

//FIXME - research custom fetch hook apollo react}
//FIXME . https://www.apollographql.com/docs/react/api/react/hooks#uselazyquery
export default UseFetch
