import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getPathFromStorage,
  removePathFromStorage,
} from '../utils/localStoragePaths'
import { UserContext } from './UserContext'

export const RedirectContext = createContext()

export const RedirectProvider = (props) => {
  const [path, setPath] = useState('')

  //extraction of user from userContext
  const { user } = useContext(UserContext)

  //navigate hook
  const navigate = useNavigate()
  const pathFromStorage = getPathFromStorage()

  useEffect(() => {
    //NOTE - The following functionallity works as follows: if a user clicks on what is a protected component, it will trigger a set path on localStorage i use localStorage because the redirect to google server on login oath removes all states from context because it unmounts the whole app This way we store the path on localStorage and after redirect we can still the path, detect it on useEffect and trigger a redirect where the user wanted to go in the first place, and then we remove the path to be ready for the next redirect if needed
    // console.log('test')
    // console.log('pathFromStorage', pathFromStorage)
    // console.log('user', user)
    if (pathFromStorage) {
      navigate(pathFromStorage)
      removePathFromStorage()
    }
  }, [])

  return (
    <RedirectContext.Provider value={{ path, setPath }}>
      {props.children}
    </RedirectContext.Provider>
  )
}
