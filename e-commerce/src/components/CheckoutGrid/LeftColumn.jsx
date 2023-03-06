import React, { useContext } from 'react'
import { CartContext } from '../../store/CartContext'

const LeftColumn = () => {
  const handleClick = (operation, item) => {
    switch (operation) {
      case '+': {
        if (item.quantity === undefined || item.quantity < item.countInStock) {
          const updatedCart = [...cart]
          const itemIndex = updatedCart.findIndex(
            (cartItem) => cartItem._id === item._id,
          )
          const updatedItem = { ...updatedCart[itemIndex] }
          updatedItem.quantity = (updatedItem.quantity || 0) + 1
          updatedCart[itemIndex] = updatedItem
          setCart(updatedCart)
        }
        break
      }

      case '-': {
        if (item.quantity === undefined || item.quantity > 1) {
          const updatedCart = [...cart]
          const itemIndex = updatedCart.findIndex(
            (cartItem) => cartItem._id === item._id,
          )
          const updatedItem = { ...updatedCart[itemIndex] }
          updatedItem.quantity = (updatedItem.quantity || 0) - 1
          updatedCart[itemIndex] = updatedItem
          setCart(updatedCart)
        }
        break
      }

      default:
        break
    }
  }

  const { cart, setCart } = useContext(CartContext)
  return (
    <article className=' flex flex-col gap-7 overflow-auto p-2 pr-6'>
      {!cart.length > 0
        ? ''
        : cart.map((item) => {
            return (
              <div
                className='bg-gradient-to-b from-slate-900 h-1/4 flex rounded-lg border-[1px] outline outline-4 outline-amber-100/50 mt-6'
                key={item._id}
              >
                <div className='w-1/4 h-full to-slate-800 rounded-lg'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='w-full h-full object-scale-down rounded-lg -translate-y-[30px]'
                  />
                </div>
                <div>
                  <div className='flex justify-around w-full items-baseline px-2'>
                    <div className='w-2/3'>
                      <h2 className='text-gray-100 font-bold uppercase font-poppins tracking-widest text-2xl'>
                        {item.name}
                      </h2>
                    </div>
                    <div className='w-1/4'>
                      <span className='text-white font-medium'>
                        ${item.price}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <button onClick={() => handleClick('-', item)}>
                        <i className='text-xl fa-solid fa-minus text-white'></i>
                      </button>
                      <span className='bg-slate-100 font-bold px-2 py-1 rounded'>
                        {item.quantity}
                      </span>
                      <button onClick={() => handleClick('+', item)}>
                        <i className='text-xl fa-solid fa-plus text-white'></i>
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className='text-xl font-bold text-gray-100'>
                      Stock: {item.countInStock}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
    </article>
  )
}

export default LeftColumn
