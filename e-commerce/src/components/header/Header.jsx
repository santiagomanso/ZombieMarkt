import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import TypeWriterEffect from 'react-typewriter-effect'
import { CartContext } from '../../store/CartContext'
const Header = ({ title, subtitle, typeWritter, height, goBack }) => {
  const { msg } = useContext(CartContext)
  const navigate = useNavigate()
  return (
    <article
      className={`lg:self-start ${height && height} ${
        msg ? 'blur' : 'blur-none'
      }`}
    >
      <div
        className={`flex items-center gap-5 w-screen md:w-auto ${
          goBack ? 'px-5' : ''
        }`}
      >
        {goBack && (
          <i
            onClick={() => {
              setTimeout(() => {
                navigate(-1)
              }, 250)
            }}
            className='cursor-pointer transition-all duration-150 active:translate-y-2 fa-solid fa-arrow-left text-gray-700 text-xl lg:text-6xl'
          ></i>
        )}
        <h1 className='lg:text-7xl font-bold capitalize'>{title}</h1>
      </div>
      {subtitle && <span className='lg:text-3xl'>{subtitle}</span>}
      <div className='absolute hidden lg:block'>
        {typeWritter && (
          <TypeWriterEffect
            textStyle={{
              fontFamily: 'Poppins',
              fontWeight: 500,
            }}
            cursorColor='#3F3D56'
            multiText={[
              "Grocery shopping so easy, it's like you've come back to life",
              'No brains required for our easy shopping experience',
              'Stock up before the apocalypse with our unbeatable prices',
              "Our service is to die for...literally, don't forget to tip your driver",
              'The only thing scarier than the zombie apocalypse is running out of toilet paper - stock up now',
            ]}
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
