import React from 'react'
import MainContainer from '../components/containers/MainContainer'
import splash from '../assets/logo.png'
import { Link } from 'react-router-dom'

const SplashScreen = () => {
  return (
    <MainContainer>
      <article className='h-screen lg:h-auto absolute top-[50%] -translate-y-[50%] md:left-[50%] md:-translate-x-[50%] flex flex-col items-center md:justify-center lg:max-w-lg z-10 bg-gradient-to-tl from-amber-100 w-full lg:w-auto to-slate-800 p-5 lg:p-10 rounded-md border-2 border-amber-200/20'>
        <h1 className='pt-10 lg:pt-0 font-zombie tracking-widest -rotate-3 text-slate-900 text-5xl'>
          Zombiemarkt!
        </h1>
        <img src={splash} alt='' />
        <p className='font-poppins text-gray-900 font-bold font-yellow-800'>
          Humanity is on the edge of extinction, zombies roam free. This is the
          last remaining Online shop, our drivers are skilled enough to
          neutralize them zombies. Stack-up now!.
        </p>
        <Link
          to='/home'
          className='mt-5 px-5 py-2 bg-gradient-to-br from-orange-400/70 to-amber-600/90 font-medium tracking-wider text-gray-200 rounded outline outline-2 outline-orange-900/40 self-center place-self-center uppercase'
        >
          Enter Shop
        </Link>
      </article>
    </MainContainer>
  )
}

export default SplashScreen
