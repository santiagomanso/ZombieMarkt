import { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CartContext } from '../../store/CartContext'
import { RedirectContext } from '../../store/RedirectContext'
import { UserContext } from '../../store/UserContext'
import { setPathOnStorage } from '../../utils/localStoragePaths'
import Badge from '../Badge/Badge'
import Dropdown from '../dropdown/Dropdown'
import Footer from '../footer/Footer'

const Navbar = () => {
  const location = useLocation()
  const [active, setActive] = useState(true)
  const [splash, setSplash] = useState(false)
  const { cart } = useContext(CartContext)
  const { user, logOut } = useContext(UserContext)
  const { setPath } = useContext(RedirectContext)

  const handleClick = (path) => {
    if (!user) {
      setPath(path)
    } else {
      setPath('')
    }
  }

  const handleLogout = () => {
    setActive(!active)
    logOut()
  }

  useEffect(() => {
    if (location.pathname === '/') {
      setSplash(true)
    } else {
      setSplash(false)
    }
  }, [location])

  return (
    <>
      {/* Phones - Tablet */}
      <nav className={`${splash ? 'hidden' : ' lg:hidden'}`}>
        <button
          onClick={() => setActive(!active)}
          className='fixed top-3 right-5 z-10'
        >
          <i className='fa-solid fa-burger text-4xl text-amber-800 '></i>
          {cart.length > 0 && location.pathname !== '/cart' && (
            <Badge position='absolute -top-0 -right-0' />
          )}
        </button>

        <aside
          className={`absolute top-0 left-0 duration-300 transition-all ease-in-out
          bg-gradient-to-br from-black/95 to-stone-900/95 w-full h-full text-gray-200 p-3 z-20
          ${active ? '-translate-x-full' : 'translate-x-0'}`}
        >
          <button
            onClick={() => setActive(!active)}
            className='fixed top-3 right-5'
          >
            {cart.length > 0 && location.pathname !== '/cart' && (
              <Badge position='absolute -top-0 -right-0' />
            )}
            <i className='fa-solid fa-burger text-4xl text-amber-800'></i>
          </button>
          {user && (
            <div className='flex gap-2 items-center'>
              <div className='h-14 w-14 bg-gradient-to-br from-amber-100 to-slate-900 rounded-full border-2 border-stone-600'>
                <img
                  src={user.image}
                  alt={user.email}
                  className='rounded-full'
                />
              </div>
              <span>{user.email}</span>
            </div>
          )}
          <ul className='flex flex-col items-center gap-10'>
            <Link
              to='/home'
              onClick={() => setActive(!active)}
              className='text-2xl font-medium tracking-wider'
            >
              Home
            </Link>
            <Link
              to='/cart'
              onClick={() => {
                if (!user) {
                  setPathOnStorage('/cart')
                }
                setActive(!active)
              }}
              className='text-2xl font-medium tracking-wider relative'
            >
              cart
              {cart.length > 0 && location.pathname !== '/cart' && (
                <Badge position='absolute -top-2 -right-5' />
              )}
            </Link>
            <Link
              to='/profile'
              onClick={() => {
                if (!user) {
                  setPathOnStorage('/profile')
                }
                setActive(!active)
              }}
              className='text-2xl font-medium tracking-wider'
            >
              Profile
            </Link>
            {/* <Link
              onClick={() => setActive(!active)}
              className='text-2xl font-medium tracking-wider'
            >
              calculator
            </Link>

            <Link
              onClick={() => setActive(!active)}
              className='text-2xl font-medium tracking-wider'
            >
              survivor's kit
            </Link> */}
            {!user && (
              <Link
                to='/login'
                onClick={() => setActive(!active)}
                className='bg-gradient-to-br from-orange-400/70 to-amber-600/90 rounded px-5 py-1 flex gap-1 items-baseline outline outline-2 outline-orange-900/40 text-2xl'
              >
                login
              </Link>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className='bg-gradient-to-br from-red-400/70 to-rose-600/90 rounded px-5 py-1 flex gap-1 items-baseline outline outline-2 outline-orange-900/40 text-2xl'
              >
                logout
              </button>
            )}
          </ul>
          <Footer display='phone' />
        </aside>
      </nav>

      {/* PC */}
      <nav
        className={`${
          splash
            ? 'hidden'
            : 'hidden lg:flex justify-between bg-orange-100/20 py-5 items-center px-1 lg:px-20 shadow-md z-10'
        }`}
      >
        <Link to='/home' className='z-10'>
          <i className='fa-solid fa-burger text-orange-500 text-3xl'></i>
          <span className='text-3xl'>ZombieMarkt</span>
        </Link>
        <ul className='flex gap-10 items-center'>
          {!user && (
            <Link
              to='/login'
              className='bg-gradient-to-br from-orange-400/70 to-amber-600/90 rounded px-3 py-1 flex gap-1 items-baseline outline outline-2 outline-orange-900/40'
            >
              <i className='fa-solid fa-virus text-gray-200 text-xl'></i>
              <span className='text-gray-200'>Login</span>
            </Link>
          )}

          {user && (
            <Dropdown name={user.email} img={user.image} logout={logOut} />
          )}
          <Link
            to='/cart'
            className='relative'
            onClick={() => handleClick('/cart')}
          >
            <span>cart</span>
            {cart.length > 0 && <Badge position='absolute -top-4 -right-4' />}
            <i className='fa-solid fa-cart-shopping text-gray-700 text-xl'></i>
          </Link>
        </ul>
      </nav>
    </>
  )
}

export default Navbar
