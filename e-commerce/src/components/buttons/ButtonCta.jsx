import React from 'react'

const ButtonCta = ({ addToCart, product, active }) => {
  return (
    <button
      onClick={() => addToCart(product)}
      className={` w-full md:w-[250px] py-2 lg:py-3  rounded-md  relative flex justify-center items-center text-white h-10 overflow-hidden outline outline-2 transition-all ease-in-out duration-500 bg-gradient-to-br shadow-xl
  ${
    active
      ? 'to-slate-900 from-green-600/70 outline-teal-900'
      : 'from-red-800 to-rose-600 outline-rose-900'
  }    `}
    >
      <span className={`${active ? '' : ' animate-txtAddToCart'}`}>
        Add to cart
      </span>
      <span
        className={`absolute ${active ? 'hidden' : 'inline animate-txtAdded'}`}
      >
        Remove from cart <i className='fa-solid fa-trash'></i>
      </span>
      <i
        className={`fa-solid fa-box absolute left-[49%] -top-5 ${
          active ? '' : 'animate-phoneBox lg:animate-laptopBox'
        }`}
      ></i>
      <i
        className={`fa-solid fa-cart-shopping text-xl absolute z-40 -left-7 lg:-left-[13%] bottom-1
${active ? '' : 'animate-phoneCart lg:animate-laptopCart'}`}
      ></i>
    </button>
  )
}

export default ButtonCta
