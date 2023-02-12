import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <nav className='bg-white p-5 sm:px-14 sm:py-12 flex justify-between items-center h-16 text-black relative shadow'>
      <Link
        to='/'
        className='bg-pink-600 py-1 sm:py-4 px-2 sm:px-7 text-white rounded-lg font-bold'
      >
        Home
      </Link>
      <h1 className='text-xl md:text-3xl font-bold'>inventory-manager</h1>
      <span className='bg-gray-500 py-1 sm:py-4  px-2 sm:px-7  text-white rounded-lg font-bold'>
        Logout
      </span>
    </nav>
  )
}

export default Navbar