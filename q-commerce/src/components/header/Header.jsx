import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TypeWriterEffect from 'react-typewriter-effect'
import { CartContext } from '../../store/CartContext'
import { LanguageContext } from '../../store/LanguageContext'

const Header = ({ title, subtitle, typeWritter, height, goBack, opt }) => {
  const { txt, language } = useContext(LanguageContext)

  const { msg } = useContext(CartContext)

  const navigate = useNavigate()
  const [multiText, setMultiText] = useState(txt.typeWritter)
  const [key, setKey] = useState(0) // Key to force re-render

  useEffect(() => {
    setMultiText(txt.typeWritter)
    setKey((prevKey) => prevKey + 1) // Update the key value to force re-render
  }, [language, txt.typeWritter])

  return (
    <article
      className={`lg:self-start ${height ? height : ''} ${
        msg ? 'blur' : 'blur-none'
      }`}
    >
      <div
        className={`${
          opt ? opt : ''
        } flex items-center gap-5 w-screen md:w-auto`}
      >
        {goBack && (
          <i
            onClick={() => {
              setTimeout(() => {
                navigate(-1)
              }, 250)
            }}
            className='pl-3 cursor-pointer transition-all duration-150 active:translate-y-2 fa-solid fa-arrow-left text-gray-700 text-xl lg:text-6xl'
          ></i>
        )}
        <h1 className='lg:text-7xl font-bold capitalize'>{title}</h1>
      </div>
      {subtitle && (
        <span className={`${opt ? opt : ''} lg:text-3xl`}>{subtitle}</span>
      )}
      <div className='absolute hidden lg:block px-8'>
        {typeWritter && (
          <TypeWriterEffect
            key={key} // Key to force re-render
            textStyle={{
              fontFamily: 'Poppins',
              fontWeight: 500,
            }}
            cursorColor='#3F3D56'
            multiText={multiText}
            multiTextDelay={1000}
            typeSpeed={30}
            multiTextLoop
          />
        )}
      </div>
    </article>
  )
}

export default Header
