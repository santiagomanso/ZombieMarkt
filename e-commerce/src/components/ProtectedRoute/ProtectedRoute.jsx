import { useContext } from 'react'
import { UserContext } from '../../store/UserContext'
import RedirectMsg from '../../pages/RedirectMsg'
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext)

  if (!user) {
    return <RedirectMsg />
  } else return children
}

export default ProtectedRoute
