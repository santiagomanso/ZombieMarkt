import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../store/CartContext'
import { LanguageContext } from '../../store/LanguageContext'

const LeftColumn = () => {
  //extraction from context
  const { msg } = useContext(CartContext)
  const { txt } = useContext(LanguageContext)

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

  const handleRemove = (item) => {
    const newCart = cart.filter((cartItem) => cartItem._id !== item._id)
    console.log('newCart', newCart)
    setCart(newCart)
  }

  useEffect(() => {
    //NOTE - add property quantity to EVERY item of the cart, only when there are items inside
    if (cart.length > 0) {
      const updatedCart = cart.map((item) => {
        if (item.quantity === undefined) {
          return { ...item, quantity: 1 }
        } else {
          return item
        }
      })
      setCart(updatedCart)
    }
    //eslint-disable-next-line
  }, [])

  const { cart, setCart, error } = useContext(CartContext)
  return (
    <article
      className={` ${
        error | msg ? 'blur-xl' : 'blur-none'
      } flex flex-col gap-7 overflow-auto px-2 mb-10 mt-5 lg:mt-2 lg:mb-0 pr-6`}
    >
      {!cart.length > 0 ? (
        <div className={`${msg | error ? 'blur-xl' : 'blur-none'}`}>
          <h2>{txt.thereAreNoProducts}</h2>
          <Link
            to='/home'
            className='bg-gradient-to-br w-fit from-orange-400/70 to-amber-600/90 rounded px-3 py-1 flex gap-1 items-baseline outline outline-2 outline-orange-900/40'
          >
            <i className='fa-solid fa-virus text-gray-200 text-xl'></i>
            <span className='text-gray-200'>{txt.shopNow}</span>
          </Link>
        </div>
      ) : (
        cart.map((item) => {
          return (
            <div
              className='bg-gradient-to-b from-slate-900 min-h-[150px] lg:min-h-[200px] flex rounded-lg border-[1px] outline outline-4 outline-amber-100/50 mt-6'
              key={item._id}
            >
              <div className='w-1/4 h-full to-slate-800 rounded-lg p-4'>
                <img
                  src={item.image}
                  alt={item.name}
                  className='w-full h-full lg:max-w-[100px] object-scale-down rounded-lg lg:-translate-y-[30px]'
                />
              </div>
              <div className='w-3/4 relative'>
                <div className='grid grid-cols-1 lg:grid-cols-4 w-full'>
                  <div className='lg:col-span-3'>
                    <h2 className='text-gray-100 font-bold uppercase font-poppins tracking-widest text-xl lg:text-2xl'>
                      {item.name}
                    </h2>
                  </div>
                  <div className='col-span-2 flex items-center justify-start lg:justify-between gap-1 lg:gap-20 w-full'>
                    <span className='text-white capitalize font-medium'>
                      {txt.price} ${item.price}
                    </span>
                    <span className='lg:col-span-4 lg:text-xl font-bold text-gray-100'>
                      {txt.stock}: {item.countInStock}
                    </span>

                    <div className='-translate-y-3 lg:translate-y-0 flex justify-center gap-2 items-center'>
                      <button onClick={() => handleClick('-', item)}>
                        <i className='text-xl text-orange-400 fa-solid fa-minus'></i>
                      </button>
                      <span className='bg-slate-100 font-bold px-2 py-1 rounded'>
                        {item.quantity}
                      </span>
                      <button onClick={() => handleClick('+', item)}>
                        <i className='text-xl text-orange-400 fa-solid fa-plus'></i>
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(item)}
                  className='absolute right-2 lg:top-0 bottom-2 md:bottom-5 lg:bottom-[75%] duration-200 hover:scale-125 p-0'
                >
                  <i className='fa-solid fa-trash text-gray-200 text-2xl '></i>
                </button>
              </div>
            </div>
          )
        })
      )}
    </article>
  )
}

export default LeftColumn
