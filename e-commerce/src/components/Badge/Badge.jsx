import { useContext } from 'react'
import { CartContext } from '../../store/CartContext'

const Badge = ({ position }) => {
  const { cart } = useContext(CartContext)

  return (
    <span
      className={` ${position} text-sm text-white bg-red-500 rounded-full w-[25px] h-[25px] flex justify-center items-center`}
    >
      {cart.length}
    </span>
  )
}

export default Badge
