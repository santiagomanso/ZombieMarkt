import axios from 'axios'
import cookies from 'js-cookie'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import getTokenFromStorage from '../utils/getTokenFromStorage'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [errorContext, setErrorContext] = useState('')
  const [msg, setMsg] = useState('')

  //NOTE create user
  const createUser = async (newUser) => {
    // console.log('newUser', newUser)
    try {
      const { data } = await axios.post(
        'http://localhost:5500/api/users/create',
        newUser,
      )
      // console.log('data', data)
      setUser(data.user)
      setMsg(data.msg)
      saveTokenToLocalStorage(data.token)
    } catch (error) {
      setErrorContext(error)
      setErrorContext(error.response.data.msg)
      //FIXME - hacer error msg floating
    }
  }

  //NOTE - login
  const loginUser = async (userObj) => {
    // console.log('userObj', userObj)
    try {
      const { data } = await axios.post(
        'http://localhost:5500/api/auth/login',
        userObj,
      )
      // console.log('data.user', data.user)
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
    window.localStorage.removeItem('token')
    cookies.remove('token')
    setUser(null)
  }

  //NOTE google oauth can't use RRD to redirect outside of localhost so window.location
  const loginGoogle = () => {
    window.location.href = 'http://localhost:5500/api/auth/google'
  }

  //NOTE login with token
  const loginWithToken = async (token) => {
    try {
      const { data } = await axios.post(
        'http://localhost:5500/api/auth/loginWithToken',
        { token },
      )
      // console.log('data.user', data.user)
      setUser(data.user)
      setMsg(data.msg)
    } catch (error) {
      setErrorContext(error)
      setErrorContext(error.response.data.msg)
      //FIXME - hacer error msg floating
    }
  }
  const saveTokenToLocalStorage = (token) => {
    if (!token) {
      return
    } else {
      window.localStorage.removeItem('token')
      window.localStorage.setItem('token', token)
    }
  }

  //NOTE - to detect user on component mount
  useEffect(() => {
    const token = getTokenFromStorage()
    if (token) {
      loginWithToken(token)
    }
  }, [])

  //NOTE - To clean the msgs
  useEffect(() => {
    setTimeout(() => {
      setMsg('')
      setErrorContext('')
    }, 3500)
  }, [msg, errorContext])

  const data = {
    user,
    errorContext,
    msg,
    loginGoogle,
    setUser,
    createUser,
    loginUser,
    logOut,
  }

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>
}

export default UserProvider
