import { Link } from 'react-router-dom'

const Item = ({ item, itemContainerOpt, itemImg, redirectToDetail }) => {
  return (
    <Link
      to={redirectToDetail ? `/products/details/${item._id}` : item.path}
      key={item.id}
      className={`bg-gradient-to-tl to-amber-100/10 
      from-slate-900/80 outline outline-2 outline-amber-100/50   rounded-2xl flex      
        flex-col justify-center items-center relative group cursor-pointer ${itemContainerOpt}`}
    >
      <span className='text-center transition-all ease-in-out duration-300 scale-0 group-hover:scale-100 text-3xl lg:text-5xl font-zombie tracking-wider'>
        {item.name}
      </span>
      <div className='absolute top-[50%] group-hover:-top-5 transition-all ease-in-out  duration-350 -translate-y-[50%]  w-40  right-[50%] translate-x-[50%] group-hover:rotate-[20deg]'>
        <img src={item.image} alt='' className={itemImg} />
      </div>
    </Link>
  )
}

export default Item
