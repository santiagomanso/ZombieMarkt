import { Link } from 'react-router-dom'

const Category = ({ item }) => {
  return (
    <Link
      to={item.path}
      key={item.id}
      className='bg-gradient-to-tl to-amber-100/10 
  from-slate-900/80 outline outline-2 outline-amber-100/50 w-40 lg:w-56 h-40 rounded-2xl flex flex-col justify-center items-center relative group cursor-pointer'
    >
      <span className='absolute -top-16 group-hover:top-14 transition-all ease-in-out duration-300 scale-0 group-hover:scale-100 text-3xl lg:text-5xl font-zombie tracking-wider'>
        {item.name}
      </span>
      <div className='absolute top-[50%] group-hover:-top-5 transition-all ease-in-out  duration-350 -translate-y-[50%]  w-40  right-[50%] translate-x-[50%]'>
        <img src={item.image} alt='' className='w-40 h-40 object-scale-down ' />
      </div>
    </Link>
  )
}

export default Category
