import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ButtonCta from '../components/buttons/ButtonCta'
import MainContainer from '../components/containers/MainContainer'
import RightContainer from '../components/containers/RightContainer'
import Header from '../components/header/Header'
import LeftPanel from '../components/leftPanel/LeftPanel'
import Loading from '../components/loading/Loading'
import Rating from '../components/rating/Rating'
import useFetch from '../hooks/useFetch'
import { CartContext } from '../store/CartContext'

const ProductDetail = () => {
  const [active, setActive] = useState(true)
  const { _id } = useParams()
  const { cart, setCart } = useContext(CartContext)
  const { loading, data, error } = useFetch(
    `http://localhost:5500/api/products/detail/${_id}`,
  )
  const [product, setProduct] = useState(data)

  //function add to cart
  const addToCart = (item) => {
    setActive(!active)

    if (active) {
      setCart([...cart, item])
    } else {
      const newCart = cart.filter((item) => item._id !== product._id)
      setCart(newCart)
    }
  }

  const isProductOnCart = cart.find((item) => item._id === _id)

  //after fetching data set a state
  useEffect(() => {
    if (data) setProduct(data.product)
    if (isProductOnCart) setActive(false)
  }, [data, isProductOnCart])

  return (
    <MainContainer>
      <LeftPanel />
      <RightContainer relative gap='lg:gap-0'>
        {loading ? (
          <Loading />
        ) : product ? (
          <div className=' self-start h-full'>
            <Header title={product.name} typeWritter={false} height='h-[10%]' />
            <div className='self-start  h-[90%] p-2'>
              <div className='grid h-[14%] grid-cols-3 place-items-center  gap-5'>
                <span className='text-2xl  w-full text-center font-bold text-gray-700 '>
                  Price: ${product.price}
                </span>
                <Rating rating={product.rating} />

                <span className='text-2xl w-full font-bold text-gray-700'>
                  No. Reviews {product.numReviews}
                </span>

                <ButtonCta
                  active={active}
                  addToCart={addToCart}
                  product={product}
                />
                <i class='col-span-1 text-5xl cursor-pointer text-slate-700 fa-regular fa-heart'></i>
              </div>
              <section className=' outline outline-2 h-[50%] p-2 md:p-5 lg:p-10'>
                <div className='w-full relative'>
                  <i class='fa-solid fa-plus absolute top-[50%] -translate-y-[50%] left-3 text-lg'></i>
                  <input
                    type='text'
                    className='w-full px-8 text-lg'
                    placeholder='Place a comment'
                  />
                </div>
                <div className='bg-gray-400/20'>dssd</div>
              </section>
            </div>

            <div className='absolute bottom-5 right-10 h-2/3'>
              <img
                src={product.image}
                alt={product.name}
                className='transition-all ease-in-out duration-500 h-full hover:-rotate-12'
              />
            </div>
          </div>
        ) : (
          ''
        )}
      </RightContainer>
    </MainContainer>
  )
}

export default ProductDetail
