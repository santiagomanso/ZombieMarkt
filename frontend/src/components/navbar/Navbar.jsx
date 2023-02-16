import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [title, setTitle] = useState('')

  const location = useLocation()
  useEffect(() => {
    changeTitle()
  }, [location])

  const changeTitle = () => {
    switch (true) {
      case location.pathname === '/create': {
        return setTitle('create_product')
      }

      case location.pathname === '/update': {
        return setTitle('update_product')
      }

      case location.pathname === '/delete': {
        return setTitle('delete_product')
      }

      default:
        return setTitle('Inventory_Manager')
    }
  }

  console.log('location', location)
  return (
    <nav className='bg-white p-5 sm:px-14 sm:py-12 flex justify-between items-center h-16 text-black relative shadow'>
      <Link
        to='/'
        className='bg-pink-600 py-1 sm:py-4 px-2 sm:px-7 text-white rounded-lg font-bold'
      >
        Home
      </Link>
      <h1 className='text-xl md:text-3xl font-bold'>{title}</h1>
      <span className='bg-gray-500 py-1 sm:py-4  px-2 sm:px-7  text-white rounded-lg font-bold'>
        Logout
      </span>
    </nav>
  )
}

export default Navbar
