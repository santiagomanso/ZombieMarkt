import React, { useContext } from 'react'
import MainContainer from '../components/containers/MainContainer'
import RightContainer from '../components/containers/RightContainer'
import Header from '../components/header/Header'
import LeftPanel from '../components/leftPanel/LeftPanel'
import { CartContext } from '../store/CartContext'

const Cart = () => {
  const { cart } = useContext(CartContext)

  const handleChange = (e) => {}

  return (
    <MainContainer>
      <LeftPanel bottomCard />
      <RightContainer
        justifyCenter={false}
        relative={false}
        overflowHidden={false}
      >
        <Header
          title='Checkout Page'
          subtitle='Edit your amounts and hit checkout before the the zombie wave'
        />
        <section className='grid grid-cols-1 md:grid-cols-2 w-full bg-red-200/80 h-[85%]'>
          <article className='bg-blue-400/80 flex flex-col gap-5 overflow-auto'>
            {!cart.length > 0
              ? ''
              : cart.map((item) => {
                  return (
                    <div className='bg-gray-700/20 h-1/6 flex'>
                      <div className='w-1/4 h-full bg-yellow-500'>
                        <img
                          src={item.image}
                          alt={item.name}
                          className='w-full h-full object-scale-down'
                        />
                      </div>
                      <div className='grid grid-cols-3 w-full items-baseline'>
                        <h2>{item.name}</h2>
                        <span>${item.price}</span>
                        <div className='flex items-center gap-2'>
                          <button>
                            <i className='text-xl fa-solid fa-plus'></i>
                          </button>
                          <p>1</p>
                          <button>
                            <i className='text-xl fa-solid fa-minus'></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
          </article>
          <article className='bg-green-400'>left</article>
        </section>
      </RightContainer>
    </MainContainer>
  )
}

export default Cart
