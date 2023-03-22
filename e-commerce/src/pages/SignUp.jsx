import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainContainer from '../components/containers/MainContainer'
import RightContainer from '../components/containers/RightContainer'
import FloatingMsg from '../components/floatingMsg/FloatingMsg'
import Header from '../components/header/Header'
import LeftPanel from '../components/leftPanel/LeftPanel'
import { AnimationContext } from '../store/AnimationContext'
import { UserContext } from '../store/UserContext'

const SignUp = () => {
  //context states extractions
  const { createUser, msg, errorContext, user } = useContext(UserContext)
  const { setAnimation } = useContext(AnimationContext)

  //component states
  const [error, setError] = useState('')
  const [newUser, setNewUser] = useState(null)
  const [active, setActive] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    validateInputs(newUser) //NOTE after validating this function firesUp the createUser
  }

  const validateInputs = (object) => {
    switch (true) {
      case object === null: {
        setError('ERROR - Complete all fields')
        setActive(false)
        console.log('objeto nulo')
        break
      }

      case !object.email || !object.password: {
        setError('ERROR - Complete all fields')
        setActive(false)
        console.log('campos vacios')
        break
      }

      case object.email && object.password: {
        console.log('TODO OK')
        return setActive(true)
      }

      //submit to userContext and trigger create user function only when everything goes ok
      default: {
        createUser(object)
        break
      }
    }
  }

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    })
  }

  const redirectTo = (link) => {
    setAnimation('animate__animated animate__fadeOut')
    setTimeout(() => {
      navigate(link)
    }, 850)
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user])

  return (
    <MainContainer>
      <LeftPanel />
      <RightContainer gap='gap-5 lg:gap-10' relative>
        <Header
          opt='px-3 mt-7 lg:px-0 lg:mt-0'
          title='Sign up'
          subtitle="The undead can't shop here, but you can. Sign in now!"
        />
        {msg && (
          <FloatingMsg
            icon='fa-solid fa-circle-check text-green-800'
            msg={msg}
            opt='bg-green-200 px-4 py-3 rounded '
            text='text-green-800 font-medium'
          />
        )}
        {errorContext && (
          <FloatingMsg
            icon='fa-solid fa-triangle-exclamation text-red-900'
            msg={errorContext}
            opt='bg-rose-300 px-4 py-3 rounded '
            text='text-red-900 font-medium'
          />
        )}
        <div className=' w-full max-w-3xl md:h-auto  md:min-w-auto  flex rounded-2xl  md:p-5 shadow-xl lg:shadow-gray-900'>
          {/* form container */}
          <div className='w-full px-5 md:px-10 flex flex-col justify-center'>
            <span
              onClick={() => redirectTo('/login')}
              className='mt-2 text-gray-700 p-0 w-[300px] font-bold  select-none cursor-pointer'
            >
              Already a survivor? Click here
            </span>
            <form className='flex flex-col gap-4 mt-5' onSubmit={handleSubmit}>
              <label className='flex flex-col relative'>
                <span className='text-gray-800 font-medium capitalize flex gap-1'>
                  Email
                  <span className='hidden md:inline text-red-900 font-bold'>
                    {error && error}
                  </span>
                </span>
                <span className='md:hidden text-red-500 font-bold'>
                  {error}
                </span>
                <input
                  onClick={() => setError(null)}
                  onChange={handleChange}
                  className={`  p-2 mb-2 rounded-lg  focus:border-blue-500  transition duration-200`}
                  type='email'
                  placeholder='Enter your email'
                  name='email'
                />
              </label>

              <label className='flex flex-col'>
                <span className='text-gray-800 font-medium'>Password</span>
                <div className='relative'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='22'
                    height='22'
                    fill='lightgray'
                    className='bi bi-eye absolute top-1/2 right-3 -translate-y-1/2'
                    viewBox='0 0 16 16'
                  >
                    <path d='M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z' />
                    <path d='M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z' />
                  </svg>
                  <input
                    onClick={() => setError(null)}
                    onChange={handleChange}
                    className='w-full bg-white p-2 rounded-lg border-2 border-opacity-50 outline-none focus:border-blue-500  transition duration-200'
                    type='password'
                    name='password'
                    id=''
                    placeholder='Enter your password'
                  />
                </div>
              </label>

              <button className='select-none mt-7 w-full shadow-md bg-gradient-to-br  text-white rounded-lg py-2 flex justify-center items-center gap-2 border font-semibold  hover:scale-105 duration-300'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='22'
                  height='22'
                  fill='currentColor'
                  className='bi bi-person-fill-add'
                  viewBox='0 0 16 16'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5a.5.5 0 0 0-1 0v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1Z'
                  />
                  <path d='M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z' />
                </svg>
                <span className=''>Join the living (or undead) now!</span>
              </button>
            </form>
          </div>
        </div>
      </RightContainer>
    </MainContainer>
  )
}

export default SignUp
