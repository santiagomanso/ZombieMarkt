import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import zombie from '../../assets/zombie2.png'
import zombieCalculate from '../../assets/zombieCalculate.png'
import { AnimationContext } from '../../store/AnimationContext'

const LeftPanel = ({
  imgTop,
  imgBot,
  title,
  subtitle,
  topImgOpt,
  topBtnText,
  topBtnPath,
  bottomCard,
}) => {
  const { setAnimation } = useContext(AnimationContext)

  const navigate = useNavigate()

  const handleNavigate = (path) => {
    setAnimation('animate__animated animate__fadeOut')
    setTimeout(() => {
      navigate(path)
    }, 800)
  }
  return (
    <aside
      className={`hidden bg-gray-800/20 w-[400px] h-full lg:flex flex-col items-center px-2 lg:px-5 gap-20 py-20 ${
        bottomCard ? '' : 'justify-center'
      }`}
    >
      <article
        className={`flex flex-col gap-5 items-center outline outline-4 outline-amber-100/50 relative bg-gradient-to-b from-slate-900 to-amber-100/70  rounded-md p-4 h-[370px] `}
      >
        <img
          src={imgTop || zombieCalculate}
          alt='zombie'
          className={`absolute -top-24 ${topImgOpt && topImgOpt}`}
        />
        <div className='mt-40'>
          <h2 className='font-bold'>
            {title ? title : 'Calculate your food!'}
          </h2>
          <span className='text-start'>
            <p className='font-medium'>
              {subtitle
                ? subtitle
                : 'Need to know how much food you need to wait until the zombies are gone?'}
            </p>
            <div className='w-full flex justify-center mt-2'>
              <button
                className='w-5/6 bg-gradient-to-br from-teal-700/20 to-indigo-900/40 font-bold text-slate-700 rounded  outline outline-2 outline-slate-500 self-center place-self-center uppercase'
                onClick={() => handleNavigate(topBtnPath || '/calculator')}
              >
                {topBtnText || 'calculator'}
              </button>
            </div>
          </span>
        </div>
      </article>

      {bottomCard && (
        <article className='flex flex-col gap-5 items-center outline outline-4 outline-amber-100/50 relative bg-gradient-to-b from-slate-900 to-amber-100/70  rounded-md p-4 h-[370px]'>
          <img src={zombie} alt='zombie' className='absolute -top-24' />
          <div className='mt-40'>
            <h2 className='font-bold'>Survivor's kit!</h2>
            <span className='text-start'>
              <p className='font-medium'>
                Everything you need to whitstand the infection
              </p>
              <div className='w-full flex justify-center mt-2'>
                <button
                  className='w-5/6 bg-gradient-to-br from-teal-700/20 to-indigo-900/40 font-bold text-slate-700 rounded  outline outline-2 outline-slate-500 self-center place-self-center'
                  onClick={() => handleNavigate('/survivor')}
                >
                  SURVIVE NOW!
                </button>
              </div>
            </span>
          </div>
        </article>
      )}
    </aside>
  )
}

export default LeftPanel
