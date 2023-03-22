import { Link } from 'react-router-dom'
import Rating from '../rating/Rating'

const Item = ({
  item,
  itemContainerOpt,
  itemImg,
  redirectToDetail,
  shortName,
}) => {
  return (
    <Link
      to={redirectToDetail ? `/products/details/${item._id}` : item.path}
      key={item.id}
      className={`bg-gradient-to-tl to-amber-100/10 
      from-slate-900/80 outline outline-2 outline-amber-100/50   rounded-2xl flex      
        flex-col justify-center items-center relative  group cursor-pointer ${itemContainerOpt}`}
    >
      {/* NAME FOR LARGE SCREENS */}
      <span className='hidden lg:block text-center transition-all ease-in-out duration-300 scale-0 group-hover:scale-100 text-3xl lg:text-5xl font-zombie tracking-wider'>
        {item.name}
      </span>

      {/* NAME FOR SMALL SCREENS */}
      <span
        className={`text-3xl self-start pl-5 font-medium tracking-wider lg:hidden font-zombie ${
          shortName ? 'w-1/2' : ''
        }`}
      >
        {item.name}
      </span>
      {redirectToDetail && (
        <div className='transition-all ease-in-out duration-300 scale-0 group-hover:scale-100'>
          <Rating rating={item.rating} />
        </div>
      )}
      <div
        className={`absolute group-hover:-top-5 transition-all ease-in-out  duration-350 -translate-y-[50%] top-[50%] right-[25%] lg:right-[50%] translate-x-[50%] group-hover:rotate-[20deg]  `}
      >
        <img src={item.image} alt='' className={itemImg} />
      </div>
    </Link>
  )
}

export default Item
