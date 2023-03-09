import { useContext } from 'react'
import { CartContext } from '../../store/CartContext'
import FloatingMsg from '../floatingMsg/FloatingMsg'
import LeftColumn from './LeftColumn'
import RightColumn from './RightColumn'

const CheckoutGrid = () => {
  const { msg } = useContext(CartContext)
  return (
    <section className={`grid grid-cols-1 md:grid-cols-2 w-full h-[88%]`}>
      {msg && (
        <FloatingMsg
          msg={msg}
          text='text-xl lg:text-7xl text-green-700'
          icon='fa-solid fa-file-circle-check text-xl lg:text-6xl text-green-700'
          opt=' bg-emerald-100 p-10 rounded outline outline-1 outline-green-500
           top-[10%] lg:top-[50%] lg:-translate-y-[50%] left-[50%] lg:left-[50%] z-10  -translate-x-[50%] flex flex-col lg:flex-row items-center lg:items-center gap-2 lg:gap-4 w-fit'
        />
      )}
      <LeftColumn />
      <RightColumn />
    </section>
  )
}

export default CheckoutGrid
