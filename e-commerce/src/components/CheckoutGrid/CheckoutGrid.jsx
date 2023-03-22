import { useContext, useState } from 'react'
import { CartContext } from '../../store/CartContext'
import FloatingMsg from '../floatingMsg/FloatingMsg'
import ModalCheckout from '../modal/ModalCheckout'
import LeftColumn from './LeftColumn'
import RightColumn from './RightColumn'

const CheckoutGrid = () => {
  const { msg } = useContext(CartContext)

  //modal states
  const [active, setActive] = useState(false)

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
      <RightColumn hideOnPhones />{' '}
      {/* this component is hidden on phone-tablets */}
      <button
        onClick={() => setActive(!active)}
        className='lg:hidden fixed w-[300px] bottom-4 left-[50%] -translate-x-[50%] bg-gradient-to-br from-orange-400/70 to-amber-600/90 rounded font-bold uppercase  flex justify-around text-gray-200 tracking-wider'
      >
        <span>Checkout</span>
        <span>$434.12 </span>
      </button>
      {active && (
        <ModalCheckout active={active} setActive={setActive}>
          <RightColumn hideOnPhones={false} />
        </ModalCheckout>
      )}
    </section>
  )
}

export default CheckoutGrid
