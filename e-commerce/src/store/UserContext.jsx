import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState('')
  const [error, setError] = useState('')

  const createUser = async (newUser) => {
    // console.log('newUser', newUser)
    try {
      const { data } = await axios.post(
        'http://localhost:5500/api/users/create',
        newUser,
      )
      console.log('data', data)
      setUser(data)
    } catch ({ response }) {
      console.log(response.data.error)
      setError(response.data.error)
    }
  }

  const data = {
    user,
    error,
    setUser,
    createUser,
    setError,
  }

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>
}

export default UserProvider
