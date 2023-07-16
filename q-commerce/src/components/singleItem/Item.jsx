import { Link } from 'react-router-dom'
import Rating from '../rating/Rating'
import { useContext } from 'react'
import { LanguageContext } from '../../store/LanguageContext'

const Item = ({
  item,
  itemContainerOpt,
  itemImg,
  redirectToDetail,
  shortName,
}) => {
  const { txt, language } = useContext(LanguageContext)

  //function to check which path the <Link> component should use
  const checkPath = () => {
    switch (true) {
      case redirectToDetail && item.countInStock > 0:
        return `/products/details/${item._id}`

      case redirectToDetail === false: {
        return item.path
      }

      case item.countInStock === 0: {
        return `${process.env.REACT_APP_INVENTORY_MANAGER}/update/${item._id}`
      }

      default:
        return ''
    }
  }

  //function to check if it should open in a new tab or not
  const checkTarget = () => {
    switch (true) {
      case redirectToDetail && item.countInStock > 0:
        return '_self'

      case item.countInStock === 0: {
        return '_blank'
      }

      default:
        return ''
    }
  }

  //function to check if the item name is from a category and return object with language name, later the names
  const checkName = () => {
    switch (true) {
      case item.name === 'beverages':
        return txt.beverages

      case item.name === 'snacks':
        return txt.snacks
      case item.name === 'hygiene':
        return txt.hygiene
      case item.name === 'meat':
        return txt.meat
      case item.name === 'pasta':
        return txt.pasta
      case item.name === 'fruits':
        return txt.fruits
      case item.name === 'vegetables':
        return txt.vegetables
      case item.name === 'breakfast':
        return txt.breakfast

      default:
        return item.name //the default would be the the product name when this component gets called from productsPage it will return the full item.name example: coca cola 1lt, pepsi cola 333ml
    }
  }

  return (
    <Link
      // to={redirectToDetail ? `/products/details/${item._id}` : item.path}
      to={checkPath()}
      target={checkTarget()}
      key={item.id}
      className={`bg-gradient-to-tl to-amber-100/10 
      from-slate-900/80 outline outline-2 outline-amber-100/50   rounded-2xl flex      
        flex-col justify-center items-center relative  group ${
          item.countInStock > 0 || item.path ? 'cursor-pointer' : 'cursor-cell'
        } ${itemContainerOpt}`}
    >
      {/* NAME FOR LARGE SCREENS */}
      <span
        className={`hidden lg:block text-center transition-all ease-in-out duration-300 scale-0
         ${
           item.countInStock === 0 ? '' : 'group-hover:scale-100'
         } text-3xl lg:text-5xl font-zombie tracking-wider`}
      >
        {checkName()}
      </span>

      {/* NAME FOR SMALL SCREENS */}
      <span
        className={`text-3xl self-start pl-5 font-medium tracking-wider lg:hidden font-zombie ${
          shortName ? 'w-1/2' : ''
        }`}
      >
        {checkName()}
      </span>
      {item.countInStock === 0 && (
        <span className='font-semibold z-10 bg-gradient-to-br from-amber-200 to-yellow-200 px-5 py-2 rounded absolute top-0 -right-8 rotate-12 text-yellow-700 outline outline-2 outline-yellow-700 uppercase'>
          {txt.clickMeToReStock}
        </span>
      )}
      {redirectToDetail && (
        <div
          className={`transition-all ease-in-out duration-300 ${
            item.countInStock === 0 ? '' : 'group-hover:scale-100'
          } scale-0 `}
        >
          <Rating rating={item.rating} />
        </div>
      )}
      <div
        className={`absolute ${
          item.countInStock === 0
            ? ''
            : 'group-hover:-top-5 group-hover:rotate-[20deg]'
        }  transition-all ease-in-out  duration-350 -translate-y-[50%] top-[50%] right-[25%] lg:right-[50%] translate-x-[50%]   `}
      >
        <img
          src={item.image}
          alt=''
          className={`${itemImg} ${item.countInStock === 0 ? 'grayscale' : ''}`}
        />
      </div>
    </Link>
  )
}

export default Item
