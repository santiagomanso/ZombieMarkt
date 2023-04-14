import { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const AppContainer = ({ children }) => {
  const location = useLocation()
  const [splash, setSplash] = useState(false)
  useEffect(() => {
    if (location.pathname === '/') {
      setSplash(true)
    } else {
      setSplash(false)
    }
  }, [location])

  return (
    <div
      className={`app-container h-screen ${
        splash
          ? 'bg-gradient-to-br from-stone-900 to-gray-900 overflow-hidden'
          : 'bg-gradient-to-br from-amber-100 to-slate-900'
      }`}
    >
      {children}
    </div>
  )
}

export default AppContainer
