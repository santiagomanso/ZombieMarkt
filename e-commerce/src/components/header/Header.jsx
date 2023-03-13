import { useContext } from 'react'
import TypeWriterEffect from 'react-typewriter-effect'
import { CartContext } from '../../store/CartContext'
const Header = ({ title, subtitle, typeWritter, height }) => {
  const { msg } = useContext(CartContext)
  return (
    <article
      className={`lg:self-start ${height && height} ${
        msg ? 'blur' : 'blur-none'
      }`}
    >
      <h1 className='lg:text-7xl font-bold capitalize'>{title}</h1>
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
