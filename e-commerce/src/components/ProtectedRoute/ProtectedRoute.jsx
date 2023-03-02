import { useContext } from 'react'
import { UserContext } from '../../store/UserContext'
import { Navigate } from 'react-router-dom'
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext)

  if (!user) {
    return <Navigate to='/login' />
  } else return children
}

export default ProtectedRoute
