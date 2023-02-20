import TypeWriterEffect from 'react-typewriter-effect'
const Header = ({ handleNavigate, button, title, subtitle, typeWritter }) => {
  return (
    <article className='lg:self-start lg:p-10'>
      <h1 className='lg:text-8xl font-bold capitalize'>{title}</h1>
      <p className='lg:text-3xl mt-3'>{subtitle}</p>
      <div className='absolute'>
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
      {button ? (
        <button
          onClick={() => handleNavigate('/categories')}
          className='hidden md:block mt-10 bg-gradient-to-br from-gray-500 to-slate-900 rounded outline outline-2 outline-gray-400  text-gray-200 font-medium px-10  lg:text-3xl'
        >
          View groceries
        </button>
      ) : (
        ''
      )}
    </article>
  )
}

export default Header
