import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainContainer from '../components/containers/MainContainer'
import RightContainer from '../components/containers/RightContainer'
import FloatingMsg from '../components/floatingMsg/FloatingMsg'
import Header from '../components/header/Header'
import LeftPanel from '../components/leftPanel/LeftPanel'
import { AnimationContext } from '../store/AnimationContext'
import { UserContext } from '../store/UserContext'

import signUpImg from '../assets/signUp.png'
import { RedirectContext } from '../store/RedirectContext'
import { guestAccounts } from '../utils/guestsAccounts'
import { LanguageContext } from '../store/LanguageContext'

const Login = () => {
  //context states extractions
  const { loginUser, msg, errorContext, user, loginGoogle } =
    useContext(UserContext)
  const { setAnimation } = useContext(AnimationContext)
  const { path } = useContext(RedirectContext)
  const { txt, language } = useContext(LanguageContext)

  //hooks

  const navigate = useNavigate()

  //component states
  const [error, setError] = useState('')
  const [newUser, setNewUser] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    validateInputs(newUser) //NOTE after validating this function firesUp the loginUser
  }

  const validateInputs = (object) => {
    switch (true) {
      case object === null && language === 'en': {
        setError('ERROR - Complete all fields')
        // console.log('null object')
        break
      }

      case object === null && language === 'es': {
        setError('ERROR - Completar todos los campos')
        // console.log('null object')
        break
      }

      case object === null && language === 'de': {
        setError('Fehler - Vervollständigen aller Felder')
        // console.log('null object')
        break
      }

      //when one input is empty but the other has data, based on language

      //english
      case (!object.email || !object.password) && language === 'en': {
        setError('ERROR - Complete all fields')

        break
      }

      //spanish
      case (!object.email || !object.password) && language === 'es': {
        setError('ERROR - Complete todos los campos')

        break
      }

      //german
      case (!object.email || !object.password) && language === 'de': {
        setError('Fehler - Alle Felder ausfüllen')

        break
      }

      //submit to userContext and trigger login function only when everything goes ok it then query the API and switch the message response from the API (by default the API message comes in english, but to further translation there is another switch on the userContext)
      default: {
        loginUser(object)
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
    setTimeout(() => {
      //redirects when successfull login to home page
      if (user) {
        if (path) {
          navigate(path, { replace: true }) // reditection to attempted navigation after successful login
        } else {
          navigate('/home', { replace: true }) // redirection to home screen
        }
      }
    }, 1500) //this setTimeout controls the time to show the msg and then redirect user
    //eslint-disable-next-line
  }, [user])

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleGuest = () => {
    loginUser(guestAccounts())
  }

  return (
    <MainContainer>
      <LeftPanel
        title={txt.noAccountYet}
        subtitle={txt.registerNowText}
        imgTop={signUpImg}
        topImgOpt=' lg:-top-8 w-[200px]'
        topBtnText={txt.registerNow}
        topBtnPath='/signUp'
        bottomCard={false}
      />
      <RightContainer gap='gap-5 lg:gap-10' relative>
        <Header
          opt='px-5 lg:px-0 mt-4 lg:mt-0'
          title={txt.login}
          subtitle={txt.loginCredentials}
        />
        {msg && (
          <FloatingMsg
            icon='fa-solid fa-circle-check text-green-800'
            msg={msg}
            opt='bg-green-200 px-4 py-3 rounded '
            text='text-green-800 font-medium'
          />
        )}
        {(errorContext || error) && (
          <FloatingMsg
            icon='fa-solid fa-triangle-exclamation text-xl text-gray-200'
            msg={error || errorContext}
            opt='bg-red-500 px-4 py-3 rounded '
            text='text-gray-200 font-medium'
          />
        )}
        <section
          className={` w-full lg:w-auto flex items-start lg:items-center justify-center`}
        >
          <div className='flex rounded-md  md:p-5 shadow-2xl items-stretch   md:h-auto w-full'>
            {/* form container */}
            <div className='w-full md:w-[45%] p-5 md:px-10 flex flex-col justify-center'>
              <h2 className='font-bold text-slate-700 select-none'>
                {txt.login}
              </h2>

              <form className='flex flex-col gap-2 mt-4 relative'>
                <label className='flex flex-col'>
                  <span>{txt.email}</span>
                  <input
                    className='p-2 rounded-lg border-2 border-opacity-50 outline-none focus:border-blue-500  transition duration-200'
                    type='email'
                    placeholder={txt.emailPlaceHolder}
                    name='email'
                    onChange={handleChange}
                    onClick={() => setError(null)}
                  />
                  {/* <h3 className='absolute -top-3 right-0 text-red-500 px-3 py-1 font-semibold rounded-lg mt-1 animate-bounce'>
                    {error ? error : ''}
                  </h3> */}
                </label>

                <label>
                  <span>{txt.password}</span>
                  <div className='relative'>
                    <svg
                      onClick={handleShowPassword}
                      xmlns='http://www.w3.org/2000/svg'
                      width='28'
                      height='28'
                      fill='lightgray'
                      className='bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer hover:scale-125 duration-300'
                      viewBox='0 0 16 16'
                    >
                      <path d='M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z' />
                      <path d='M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z' />
                    </svg>
                    <input
                      className='w-full bg-white p-2 rounded-lg border-2 border-opacity-50 outline-none focus:border-blue-500  transition duration-200'
                      type={`${showPassword ? 'text' : 'password'}`}
                      name='password'
                      placeholder={txt.passwordPlaceHolder}
                      onClick={() => setError(null)}
                      onChange={handleChange}
                    />
                  </div>
                </label>

                <div className='flex items-stretch justify-between mt-4'>
                  <button
                    type='button'
                    onClick={(e) => handleGuest(e)}
                    className='w-[45%] shadow-md text-gray-200 rounded-lg py-2 flex justify-center bg-gradient-to-br from-orange-400/70 to-amber-600/90   items-center gap-1 border font-semibold hover:scale-105 duration-300'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='25'
                      height='25'
                      fill='currentColor'
                      className='bi bi-person-badge'
                      viewBox='0 0 16 16'
                    >
                      <path d='M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
                      <path d='M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z' />
                    </svg>
                    <span>{txt.useGuestAccount}</span>
                  </button>
                  <button
                    type='submit'
                    onClick={handleSubmit}
                    className='w-[45%] shadow-md bg-gradient-to-br from-gray-400/20 to-slate-700/70 text-gray-200 tracking-wider py-2 rounded-md font-bold hover:scale-105 duration-300 border'
                  >
                    {txt.loginNow}
                  </button>
                </div>
              </form>
              <div className='mt-8 grid grid-cols-3 items-center'>
                <hr className='border-gray-400' />
                <p className='text-center text-gray-300'>or</p>
                <hr className='border-gray-400' />
              </div>

              {process.env.NODE_ENV === 'development' && (
                <button
                  onClick={loginGoogle}
                  className='shadow-md bg-white w-full rounded-lg py-2 mt-5 flex justify-center items-center gap-2 border border-gray-400 text-gray-500 font-semibold hover:scale-105 duration-300'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 48 48'
                    width='25px'
                  >
                    <path
                      fill='#FFC107'
                      d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
                    />
                    <path
                      fill='#FF3D00'
                      d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
                    />
                    <path
                      fill='#4CAF50'
                      d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
                    />
                    <path
                      fill='#1976D2'
                      d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
                    />
                  </svg>
                  Login with Google
                </button>
              )}
              <div className='flex justify-between items-center mt-4 '>
                <p
                  onClick={() => redirectTo('/signup')}
                  className='select-none cursor-pointer hover:scale-110 duration-500 text-gray-300'
                >
                  {txt.signUp}
                </p>
              </div>
            </div>

            {/* Image Container */}
            <div className='w-[55%] overflow-hidden hidden md:block'>
              <img
                src='https://cdn.discordapp.com/attachments/990816806581198869/1079356374426853376/basureando_dark_wooden_desk_with_a_login_form_and_a_big_lock_lo_7e7c5045-1dc2-4f85-889f-cf5795f5620d.png'
                alt='login'
                className='rounded w-[1000px] outline outline-2 outline-slate-600 h-[500px] object-cover z-0'
              />
            </div>
          </div>
        </section>
      </RightContainer>
    </MainContainer>
  )
}

export default Login
