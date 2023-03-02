import { useContext } from 'react'
import { CartContext } from '../../store/CartContext'
import { UserContext } from '../../store/UserContext'

const RightColumn = () => {
  const { cart, placeOrder } = useContext(CartContext)
  const { user } = useContext(UserContext)

  const calculateSemitotals = () => {
    let result = 0
    result = cart.map((item) => {
      return (result = result + Math.floor(item.price))
    })
    return result //FIXME - this should be rounded and * 100
  }

  return (
    <article className=''>
      <div
        className={`w-full overflow-auto bg-gradient-to-b from-slate-700/40 rounded-lg  to-slate-800  lg:h-full outline-2 outline outline-slate-400 lg:outline-none duration-300`}
      >
        <div className='flex flex-col  dark:bg-transparent p-4 rounded h-full'>
          <div className='bg-gray-800 dark:bg-gray-700/50 py-3 px-4 rounded w-full flex justify-between items-center'>
            <h2 className='text-gray-200'>Checkout</h2>
            <i className='fa-solid fa-wallet text-gray-200 text-2xl'></i>
          </div>
          <span className='text-start text-gray-100'>
            Get ready to break the bank, because your cart is loaded with items
            that will cost you a pretty penny count!.
          </span>

          <h2 className='mt-5 font-semibold text-gray-100 uppercase'>
            Order Summary
          </h2>
          <div className='flex flex-col gap-y-3 divide-y-2 divide-gray-400 bg-white/80 dark:bg-gray-700/50 p-4 rounded'>
            <span className='flex justify-between'>
              <span>Quantity</span>
              <span>{cart.length}</span>
            </span>
            <span className='flex justify-between'>
              <span>
                Smitotal
                {cart.length > 1 ? 's' : ''}
              </span>
              <span>$ {calculateSemitotals()}</span>
            </span>
            <span className='flex justify-between'>
              <span>Discounts</span>
              <span>30%</span>
            </span>
            <span className='font-semibold text-xl flex justify-between'>
              <span>Total</span>
              <span>$ 12314123</span>
            </span>
          </div>

          <h2 className='mt-10 font-semibold text-gray-100 uppercase'>
            Shipping Adress
          </h2>
          <div className='flex flex-col gap-y-3 divide-y-2 divide-gray-400 bg-white/80 dark:bg-gray-700/50 p-4 rounded'>
            <span className='flex justify-between'>
              <span>Customer</span>
              <span>{user.email}</span>
            </span>
            <span className='flex justify-between'>
              <span>Smitotal</span>
              <span>$ 123144</span>
            </span>
            <span className='flex justify-between'>
              <span>Discounts</span>
              <span>30%</span>
            </span>
            <span className='font-semibold text-xl flex justify-between'>
              <span>Total</span>
              <span>$ 12314123</span>
            </span>
          </div>
          <button
            onClick={() => placeOrder(user)}
            className='bg-gradient-to-br from-slate-500 to-gray-700 rounded mt-24 text-gray-200 font-bold'
          >
            CHECKOUT NOW
          </button>
        </div>
      </div>
    </article>
  )
}

export default RightColumn
