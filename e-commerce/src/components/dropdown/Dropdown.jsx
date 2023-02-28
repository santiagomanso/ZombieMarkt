import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

const Dropdown = ({ name, logout, img }) => {
  const [active, setActive] = useState(false)
  const menuRef = useRef()

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setActive(false)
      }
    }

    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

  const handleLogout = () => {
    // setPath('')
    logout()
  }

  return (
    <div
      ref={menuRef}
      onClick={() => setActive(!active)}
      className='relative bg-gray-600/10 px-4 py-1 rounded cursor-pointer flex items-center gap-2'
    >
      <span>{name}</span>
      <i
        className={`fa-solid fa-chevron-down transition-all ease-in-out duration-500 ${
          active ? '-rotate-180' : 'rotate-0'
        }`}
      ></i>

      <ul
        className={`absolute transition-all ease-in-out duration-150  bg-black/30 rounded w-full left-0 p-2 grid grid-cols-1  z-20 ${
          active ? ' top-10' : 'scale-0 -top-10'
        }`}
      >
        <Link
          to='/profile'
          className='group p-4 w-full hover:bg-black/60 flex gap-3 items-center '
        >
          <div className='w-1/2'>
            <img src={img} alt={name} className='w-16' />
          </div>
          <span className='w-5/6 text-gray-100 text-2xl font-thin tracking-wider'>
            Profile
          </span>
        </Link>
        <li
          className='group p-4 w-full hover:bg-black/60 flex gap-3 items-center'
          onClick={handleLogout}
        >
          <i className='fa-solid pl-4 py-3 w-1/2 fa-power-off text-red-700 text-4xl duration-500'></i>
          <span className='w-5/6 text-gray-100 text-2xl font-light'>
            Sign out
          </span>
        </li>
      </ul>
    </div>
  )
}

export default Dropdown
