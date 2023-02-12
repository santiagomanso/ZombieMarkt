import { buttonsData } from '../../data/buttonsData'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()
  return (
    <main className='ml-0 sm:ml-36 mr-0 sm:mr-36 flex flex-col sm:flex-row justify-center items-center flex-wrap'>
      {buttonsData.map((button) => {
        return (
          <section
            key={button.id}
            className='m-2 sm:m-4 h-16 sm:h-64 w-64 bg-stone-200 rounded-md'
          >
            <button
              onClick={() => navigate(button.path)}
              className='font-bold text-xl h-full w-full'
            >
              {button.title}
            </button>
          </section>
        )
      })}
    </main>
  )
}
export default HomePage
