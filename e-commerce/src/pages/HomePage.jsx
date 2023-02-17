import zombie from '../assets/zombie2.png'
import zombieCalculate from '../assets/zombieCalculate.png'
import groceries from '../assets/groceries.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const HomePage = () => {
  const navigate = useNavigate()
  const [animate, setAnimate] = useState('animate__animated animate__fadeIn')

  const handleNavigate = (path) => {
    setAnimate('animate__animated animate__fadeOut')
    setTimeout(() => {
      navigate(path)
    }, 800)
  }

  return (
    <section className={`${animate} lg:px-20 h-5/6 flex mt-5`}>
      <aside>
        <article className='zombieCard'>
          <img
            src={zombieCalculate}
            alt='zombie'
            className='absolute -top-24'
          />
          <div className='mt-40'>
            <h2 className='font-bold'>Calculate your food!</h2>
            <span className='text-start'>
              <p className='font-medium'>
                Need to know how much food you need to wait until the zombies
                are gone?
              </p>
              <div className='w-full flex justify-center mt-2'>
                <button onClick={() => handleNavigate('/calculator')}>
                  CALCULATOR
                </button>
              </div>
            </span>
          </div>
        </article>

        <article className='zombieCard'>
          <img src={zombie} alt='zombie' className='absolute -top-24' />
          <div className='mt-40'>
            <h2 className='font-bold'>Survivor's kit!</h2>
            <span className='text-start'>
              <p className='font-medium'>
                Everything you need to whitstand the infection
              </p>
              <div className='w-full flex justify-center mt-2'>
                <button onClick={() => handleNavigate('/survivor')}>
                  SURVIVE NOW!
                </button>
              </div>
            </span>
          </div>
        </article>
      </aside>
      <section className='containerRight'>
        <article className='flex'>
          <div className='p-10'>
            <h1 className='text-8xl font-bold'>ZombieMarkt groceries</h1>
            <p className='text-3xl mt-3'>
              Where prices are dropped{' '}
              <span className='font-medium text-3xl'>dead</span>
            </p>
            <p className='text-3xl mt-2'>
              Shop now and wait for our curriers to skip through the infected
              mobs
            </p>
            <button
              onClick={() => handleNavigate('/categories')}
              className='mainCta'
            >
              View groceries
            </button>
            <img
              src={groceries}
              alt='groceries'
              className='w-3/5 bottom-0 -right-0 absolute'
            />
          </div>
        </article>
      </section>
    </section>
  )
}

export default HomePage
