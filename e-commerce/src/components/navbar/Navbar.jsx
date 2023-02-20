import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [active, setActive] = useState(true)

  return (
    <>
      {/* Phones - Tablet */}
      <nav className=' lg:hidden'>
        <button
          onClick={() => setActive(!active)}
          className='fixed top-3 right-5 z-10'
        >
          <i className='fa-solid fa-burger text-4xl text-amber-800'></i>
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
            <i className='fa-solid fa-burger text-4xl text-amber-800'></i>
          </button>
          <div className='flex flex-col'>
            <span>guest@guest.com</span>
            <i className='fa-solid fa-flag-usa'></i>
          </div>
          <ul className='flex flex-col items-center gap-10'>
            <Link>
              <span>Home</span>
            </Link>
            <Link>
              <span>calculator</span>
            </Link>
            <Link>
              <span>survivor's kit</span>
            </Link>
            <Link>
              <span>login</span>
            </Link>
            <Link>
              <span>cart</span>
            </Link>
          </ul>
        </aside>
      </nav>

      {/* PC */}
      <nav className='hidden lg:flex justify-between bg-orange-100/20 py-5 items-center px-1 lg:px-20 shadow-md'>
        <Link to='/'>
          <i className='fa-solid fa-burger text-amber-700 text-3xl'></i>
          <span className='text-3xl'>ZombieMarkt</span>
        </Link>
        <ul className='flex gap-10 items-center'>
          <Link
            to='/categories'
            className='bg-orange-300/50 hover:bg-amber-600/50 rounded px-3 py-1 flex gap-1 items-baseline'
          >
            <i className='fa-solid fa-virus text-gray-700 text-xl'></i>
            <span>shop now</span>
          </Link>
          <Link to='/login'>
            <span>login</span>
          </Link>
          <span>profile</span>
          <Link to='/cart'>
            <span>cart</span>
            <i className='fa-solid fa-cart-shopping text-gray-700 text-xl'></i>
          </Link>
        </ul>
      </nav>
    </>
  )
}

export default Navbar
