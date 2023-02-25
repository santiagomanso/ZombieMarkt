import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

const Dropdown = ({ name, logout }) => {
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
        className={`fa-solid fa-chevron-down ${
          active ? 'rotate-180' : 'rotate-0'
        }`}
      ></i>

      <ul
        className={`absolute top-10 bg-slate-600/70 rounded w-48 flex gap-4 flex-col z-20 ${
          active ? 'scale-100' : 'scale-0'
        }`}
      >
        <li
          className='group p-2 flex gap-3 items-center'
          onClick={handleLogout}
        >
          <i className='fa-solid fa-power-off text-slate-600 group-hover:text-red-600 rotate-180 group-hover:rotate-0 scale-0  group-hover:scale-150 duration-500'></i>
          <span className=' text-gray-100'>logout</span>
        </li>
        <Link className='group p-2 flex gap-3 items-center '>
          <i className='fa-solid fa-circle-user text-slate-600 group-hover:text-red-600 rotate-180 group-hover:rotate-0 scale-0  group-hover:scale-150 duration-500'></i>
          <span className=' text-gray-100'>Profile</span>
        </Link>
      </ul>
    </div>
  )
}

export default Dropdown
