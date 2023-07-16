import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import zombie from '../../assets/zombie2.png'
import zombieCalculate from '../../assets/zombieCalculate.png'
import { AnimationContext } from '../../store/AnimationContext'
import { LanguageContext } from '../../store/LanguageContext'

const LeftPanel = ({
  imgTop,
  title,
  subtitle,
  topImgOpt,
  topBtnText,
  topBtnPath,
  bottomCard,
}) => {
  const { setAnimation } = useContext(AnimationContext)
  const { txt } = useContext(LanguageContext)

  const navigate = useNavigate()

  const handleNavigate = (path) => {
    setAnimation('animate__animated animate__fadeOut')
    setTimeout(() => {
      navigate(path)
    }, 800)
  }
  return (
    <aside
      className={`hidden bg-gray-800/20 w-[400px] h-full md:flex flex-col items-center px-2 lg:px-5 md:gap-y-24 lg:gap-20 py-10 justify-start md:justify-center ${
        bottomCard ? '' : ''
      }`}
    >
      <article
        className={`flex flex-col gap-5 items-center outline outline-4 outline-amber-100/50 relative bg-gradient-to-b from-slate-900 to-amber-100/70  rounded-md p-4  `}
      >
        <img
          src={imgTop || zombieCalculate}
          alt='zombie'
          className={`absolute md:-top-20  ${topImgOpt ? topImgOpt : ''}`}
        />
        <div className='mt-36 lg:mt-40'>
          <h2 className='font-bold'>{title ? title : txt.foodCalculator}</h2>
          <span className='text-start'>
            <p className='font-medium'>
              {subtitle ? subtitle : txt.foodPerGroup}
            </p>
            <div className='w-full flex justify-center mt-2 '>
              <button
                className='w-5/6 bg-gradient-to-br from-teal-700/20 to-indigo-900/40 font-bold text-slate-700 rounded  outline outline-2 outline-slate-500 self-center place-self-center uppercase'
                onClick={() => handleNavigate(topBtnPath || '/calculator')}
              >
                {topBtnText || 'comming soon'}
              </button>
            </div>
          </span>
        </div>
      </article>

      {bottomCard && (
        <article className='flex flex-col gap-5 items-center outline outline-4 outline-amber-100/50 relative bg-gradient-to-b from-slate-900 to-amber-100/70  rounded-md p-4 '>
          <img
            src={zombie}
            alt='zombie'
            className='absolute md:-top-20 lg:-top-24'
          />
          <div className='mt-36'>
            <h2 className='font-bold'>{txt.surivivorsKit}</h2>
            <span className='text-start'>
              <p className='font-medium'>{txt.everythingYouNeed}</p>
              <div className='w-full flex justify-center mt-0 '>
                <button
                  className='w-5/6 bg-gradient-to-br from-teal-700/20 to-indigo-900/40 font-bold text-slate-700 rounded  outline outline-2 outline-slate-500 self-center place-self-center uppercase'
                  // onClick={() => handleNavigate('/survivor')}
                >
                  {txt.comingSoon}
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
