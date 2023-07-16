import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LanguageContext } from '../store/LanguageContext'

const RedirectMsg = () => {
  const navigate = useNavigate()
  const timerId = useRef()

  const [seconds, setSeconds] = useState(3)
  const [animation, setAnimation] = useState(
    'animate__animated animate__bounceIn',
  )

  const { txt } = useContext(LanguageContext)

  useEffect(() => {
    timerId.current = setInterval(() => {
      setSeconds((prev) => prev - 1)
    }, 1000)

    if (seconds === 0) {
      setAnimation('animate__animated animate__fadeOut')
      clearInterval(timerId.current)
      setTimeout(() => {
        navigate('/login')
      }, 1000)
    }

    return () => {
      clearInterval(timerId.current)
    }
    //eslint-disable-next-line
  }, [seconds])

  return (
    <section className='h-[86%] lg:h-[81%] flex justify-center items-center p-5 md:p-0'>
      <div
        className={`bg-amber-200 dark:bg-stone-800/60 p-5 lg:p-10 rounded flex justify-center items-center ${animation} outline-2 outline outline-amber-500 gap-2`}
      >
        <section className='flex flex-col gap-3'>
          <article className='flex gap-2 items-end lg:items-baseline'>
            <span className=' text-amber-800 dark:text-amber-500 text-2xl lg:text-5xl font-semibold'>
              {txt.youNeedToLoginFirst}
            </span>
            <i className='fa-solid fa-lock text-3xl lg:text-5xl text-amber-800 dark:text-amber-500'></i>
          </article>
          <article className=' md:text-2xl flex gap-2 items-center justify-center'>
            <span className='text-amber-800 dark:text-amber-500'>
              {txt.redirectingToLogin} {seconds} {txt.seconds}
            </span>
            <i className='fa-solid fa-circle-notch animate-spin text-amber-800 dark:text-amber-500 text-3xl'></i>
          </article>
        </section>
      </div>
    </section>
  )
}

export default RedirectMsg
