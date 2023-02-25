import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [errorContext, setErrorContext] = useState('')
  const [msg, setMsg] = useState('')

  const createUser = async (newUser) => {
    // console.log('newUser', newUser)
    try {
      const { data } = await axios.post(
        'http://localhost:5500/api/users/create',
        newUser,
      )
      console.log('data', data)
      setUser(data.user)
      setMsg(data.msg)
      saveTokenToLocalStorage(data.token)
    } catch (error) {
      setErrorContext(error)
      setErrorContext(error.response.data.msg)
      //FIXME - hacer error msg floating
    }
  }

  //NOTE logout
  const logOut = () => {
    setUser(null)
    window.localStorage.removeItem('token')
  }

  const saveTokenToLocalStorage = (token) => {
    if (!token) {
      return
    } else {
      window.localStorage.setItem('token', token)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setMsg('')
      setErrorContext('')
    }, 2500)
  }, [msg, errorContext])

  const data = {
    user,
    errorContext,
    msg,
    setUser,
    createUser,
    logOut,
  }

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>
}

export default UserProvider
