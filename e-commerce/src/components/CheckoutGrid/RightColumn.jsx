import { useContext } from 'react'
import { CartContext } from '../../store/CartContext'
import { UserContext } from '../../store/UserContext'
import FloatingMsg from '../floatingMsg/FloatingMsg'

const RightColumn = ({
  hideOnPhones,
  setActive,
  calculateQty,
  calculateSemitotals,
}) => {
  const { cart, placeOrder, msg, error } = useContext(CartContext)
  const { user } = useContext(UserContext)

  return (
    <article
      className={`${
        hideOnPhones ? 'hidden lg:block' : 'block lg:hidden'
      }  bg-gree-400 ${msg && !setActive ? 'blur' : 'blur-noneS'}`}
    >
      {error && (
        <FloatingMsg
          msg={error}
          text='text-4xl lg:text-7xl text-red-700'
          icon='fa-solid fa-triangle-exclamation text-6xl lg:text-6xl text-red-700'
          opt=' bg-red-200 p-10 rounded outline outline-1 outline-red-500
         top-[25%] lg:top-[50%] lg:-translate-y-[50%] left-[50%] lg:left-[50%] z-10  -translate-x-[50%] flex flex-col lg:flex-row items-center lg:items-center gap-2 lg:gap-4 w-5/6'
        />
      )}

      {msg && setActive && (
        <FloatingMsg
          msg={msg}
          text='text-4xl lg:text-7xl text-green-700'
          icon='fa-solid fa-file-circle-check text-6xl lg:text-6xl text-green-700'
          opt=' bg-emerald-100 p-10 rounded outline outline-1 outline-green-500
           top-[25%] lg:top-[50%] lg:-translate-y-[50%] left-[50%] lg:left-[50%] z-10  -translate-x-[50%] flex flex-col lg:flex-row items-center lg:items-center gap-2 lg:gap-4 w-5/6'
        />
      )}
      {cart.length > 0 ? (
        <div
          className={`${
            (msg || error) && setActive ? 'blur' : 'blur-noneS'
          } w-full bg-gradient-to-b  from-slate-600 rounded-none lg:rounded-md to-slate-800  lg:h-full outline-2 outline outline-slate-400 lg:outline-none duration-300 h-screen`}
        >
          <div className='flex flex-col  dark:bg-transparent p-4 rounded h-full relative'>
            <div className='bg-gray-800 dark:bg-gray-700/50 py-3 px-4 rounded w-full flex justify-between items-center'>
              <h2 className='text-gray-200'>Checkout</h2>
              {setActive ? (
                <i
                  onClick={() => setActive(false)}
                  className='fa-regular fa-rectangle-xmark text-gray-200 text-3xl'
                ></i>
              ) : (
                <i className='fa-solid fa-wallet text-gray-200 text-2xl'></i>
              )}
            </div>
            <span className='text-start text-gray-100'>
              Get ready to break the bank, because your cart is loaded with
              items that will cost you a pretty penny count!.
            </span>

            <h2 className='mt-5 font-semibold text-gray-100 uppercase'>
              Order Summary
            </h2>
            <div className='flex flex-col gap-y-3 divide-y-2 divide-gray-400 bg-white/80 dark:bg-gray-700/50 p-4 rounded'>
              <span className='flex justify-between'>
                <span>Quantity</span>
                <span>{calculateQty()}</span>
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
            <div className='flex flex-col gap-y-3 divide-y-2 divide-gray-400 bg-white/80 dark:bg-gray-700/50 p-4 rounded '>
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
              onClick={() => {
                placeOrder(calculateSemitotals())
                setTimeout(() => {
                  // setActive(false)
                }, 2000)
              }}
              className='absolute bottom-2 lg:bottom-4 left-[50%] -translate-x-[50%] w-full lg:w-3/4 bg-gradient-to-br from-slate-500 to-gray-700 rounded text-gray-200 font-bold'
            >
              PLACE ORDER NOW !
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </article>
  )
}

export default RightColumn
