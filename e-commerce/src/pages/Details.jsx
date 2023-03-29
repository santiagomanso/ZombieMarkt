import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ButtonCta from '../components/buttons/ButtonCta'
import MainContainer from '../components/containers/MainContainer'
import RightContainer from '../components/containers/RightContainer'
import FloatingMsg from '../components/floatingMsg/FloatingMsg'
import Header from '../components/header/Header'
import LeftPanel from '../components/leftPanel/LeftPanel'
import Loading from '../components/loading/Loading'
import Rating from '../components/rating/Rating'
import useFetch from '../hooks/useFetch'
import { CartContext } from '../store/CartContext'
import { UserContext } from '../store/UserContext'
import getTokenFromStorage from '../utils/getTokenFromStorage'

const ProductDetail = () => {
  //params extraction
  const { _id } = useParams()

  //state for adding to cart functionallity
  const [active, setActive] = useState(true)

  //extraction from context
  const { cart, setCart } = useContext(CartContext)
  const { user } = useContext(UserContext)

  //error/confirmation msgs
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')

  //custom hook for fetching
  const { loading, data } = useFetch(
    `http://localhost:5500/api/products/detail/${_id}`,
  )

  //MAIN STATE PRODUCT
  const [product, setProduct] = useState(data)

  //By having comments on a state i can re-render the grid with the new comment
  const [inputComment, setInputComment] = useState({})
  const [commentsArray, setCommentsArray] = useState([])
  const [favoritesArray, setFavoritesArray] = useState('')
  const [isFavorite, setIsFavorite] = useState(false)

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

  //NOTE spread object when onChange
  const handleChangeInput = (e) => {
    setInputComment({
      ...inputComment,
      user: {
        id: user._id,
        email: user.email,
        image: user.image,
      },
      [e.target.name]: e.target.value,
    })
  }

  //NOTE POST NEW COMMENT
  const submitComment = async (e) => {
    // FIXME click icon not working 8/3
    if (e.key === 'Enter') {
      if (!user) {
        setError('Login first')
        setTimeout(() => {
          setError('')
        }, 2500)
      } else {
        console.log('inputComment', inputComment)

        //headers
        const headers = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenFromStorage()}`,
          },
        }

        const body = {
          comment: inputComment.comment,
        }

        try {
          const { data } = await axios.post(
            `http://localhost:5500/api/products/newComment/${_id}`,
            body,
            headers,
          )
          console.log('data', data)
          setMsg('Comment added')
          setInputComment('')
          setCommentsArray([...commentsArray, inputComment])
          setTimeout(() => {
            setMsg('')
          }, 2500)
        } catch (error) {
          setMsg('')
          setInputComment('')
          setError(error.response.data.msg)
          setTimeout(() => {
            setError('')
          }, 2500)
          console.log('error.response.data.msg', error.response.data.msg)
        }
      }
    }
  }

  //FIXME - user comment on right side

  const handleFavorite = async () => {
    if (!user) {
      setError('Login first')
      setIsFavorite(false)
      setTimeout(() => {
        setError('')
      }, 2000)
    } else {
      try {
        const { data } = await axios.post(
          `http://localhost:5500/api/users/newFavoriteProduct/${_id}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${getTokenFromStorage()}`,
            },
          },
        )
        //after click re-render icon based on boolean state
        if (data.msg === 'Product added to favorites') {
          setIsFavorite(true)
        } else {
          setIsFavorite(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const checkFavorite = () => {
    console.log('favoritesArray', favoritesArray)
    favoritesArray.map((item) => {
      if (item._id === user._id) {
        return setIsFavorite(true)
      } else {
        return setIsFavorite(false)
      }
    })
  }

  //after fetching data set states
  useEffect(() => {
    if (data) {
      setProduct(data.product)

      //set comments and favorites array to internal states for re-renderOnUpdates
      setCommentsArray(data.product.comments)
      setFavoritesArray(product.favorites)
    }

    //if there is something on favorites array check if this user has favorited
    if (favoritesArray) {
      checkFavorite()
    }

    if (isProductOnCart) setActive(false)
    //eslint-disable-next-line
  }, [data, isProductOnCart, favoritesArray])

  return (
    <MainContainer>
      <LeftPanel bottomCard />
      <RightContainer relative gap='lg:gap-0' padding='pt-5 pb-10 lg:p-10'>
        {msg && (
          <FloatingMsg
            msg={msg}
            text='text-xl lg:text-7xl text-green-700'
            icon='fa-solid fa-file-circle-check text-xl lg:text-6xl text-green-700'
            opt=' bg-emerald-100 p-10 rounded outline outline-1 outline-green-500
           top-[10%] lg:top-[50%] lg:-translate-y-[50%] left-[50%] lg:left-[50%] z-10  -translate-x-[50%] flex flex-col lg:flex-row items-center lg:items-center gap-2 lg:gap-4 w-fit'
          />
        )}
        {error && (
          <FloatingMsg
            msg={error}
            text='text-xl lg:text-7xl text-red-700'
            icon='fa-solid fa-triangle-exclamation text-7xl text-red-700'
            opt='bg-rose-100 p-10 rounded outline outline-1 outline-red-500 top-[10%] left-[50%] lg:top-[50%] z-10 lg:left-[50%] -translate-x-[50%] flex flex-col lg:flex-row items-center lg:items-baseline gap-1 w-3/4  lg:w-auto'
          />
        )}
        {loading ? (
          <Loading />
        ) : product ? (
          <div
            className={`self-start h-full ${
              error || msg ? 'blur-lg' : 'blur-0'
            }`}
          >
            <Header
              title={product.name}
              typeWritter={false}
              height='lg:h-[10%]'
              goBack
            />
            <div className='self-start h-[90%] p-2'>
              <div className=' grid h-[14%] grid-cols-3 place-items-center  gap-5'>
                <span className='lg:text-2xl  w-full text-center font-bold text-gray-700 '>
                  Price: ${product.price}
                </span>
                <Rating rating={product.rating} />

                <span className='lg:text-2xl w-full font-bold text-gray-700'>
                  No. Reviews {product.numReviews}
                </span>

                <div className='col-span-2 w-full'>
                  <ButtonCta
                    active={active}
                    addToCart={addToCart}
                    product={product}
                  />
                </div>
                <button className='p-0' onClick={() => handleFavorite(product)}>
                  <i
                    className={`col-span-1 text-3xl lg:text-5xl cursor-pointer 
                    ${
                      isFavorite
                        ? 'fa-solid fa-heart text-red-700'
                        : 'fa-regular fa-heart text-slate-700'
                    }`}
                  ></i>
                </button>
              </div>
              <section className='mt-2 h-[85%]'>
                <div className='w-full relative'>
                  <i
                    name='sendIcon'
                    onClick={submitComment}
                    className='fa-solid fa-paper-plane text-gray-700 absolute top-[50%] -translate-y-[50%] right-3 text-xl'
                  ></i>
                  <input
                    onKeyDown={submitComment}
                    onChange={handleChangeInput}
                    value={inputComment.comment || ''}
                    name='comment'
                    type='text'
                    className='w-full px-8 text-lg bg-white/20 text-slate-800 font-medium
                    placeholder-slate-800  outline outline-1 outline-gray-700/30'
                    placeholder='Place a comment'
                  />
                </div>
                <div className='mt-2 bg-gradient-to-b from-slate-900/50 to-amber-100/30 rounded-lg p-5 h-[97%] flex flex-col gap-2 border-4 border-amber-100/50 justify-start overflow-auto'>
                  {commentsArray.length > 0 ? (
                    commentsArray.map((comment, index) => {
                      return (
                        <div
                          key={index}
                          className={`flex gap-2 items-center ${
                            index % 2 === 0
                              ? 'self-end flex-row-reverse items-center'
                              : ''
                          }`}
                        >
                          <div className='bg-gradient-to-br from-slate-700 to-pink-500 via-gray-800 border-2 border-gray-200 rounded-full p-2'>
                            <img
                              src={comment.user.image}
                              alt={comment.user.email}
                              className='h-10 w-10 lg:h-20 lg:w-20 rounded-full object-scale-down'
                            />
                          </div>
                          <div className='flex flex-col'>
                            <span className='font-bold'>
                              {comment.user.email}
                            </span>
                            <span className='text-gray-800'>
                              {comment.comment}
                            </span>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div
                      className={`flex gap-2 h-full items-center self-center`}
                    >
                      <div className='bg-gradient-to-br from-slate-700 to-emerald-500 via-gray-800 border-2 border-gray-200 rounded-full lg:p-2'>
                        <img
                          src='https://i.ibb.co/Vqx2StJ/basureando-laptop-open-with-a-zombie-logo-cartoon-zombie-style-ffc8c64e-859d-4623-82ce-157f87ffd060.png'
                          alt='system'
                          className='h-24 w-24 lg:h-32 lg:w-32 rounded-full object-scale-down'
                        />
                      </div>
                      <div className='flex flex-col'>
                        <span className='font-bold text-2xl lg:text-3xl'>
                          ZombieMarkt
                        </span>
                        <span className='text-lg lg:text-xl'>
                          There are no comments yet
                        </span>
                        <span className='text-lg lg:text-xl'>
                          Be the first to comment!
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>

            <div className='hidden lg:block absolute top-[50%] -translate-y-[50%] right-0 translate-x-full h-3/4'>
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
