import axios from 'axios'
import { useContext, useEffect } from 'react'
import ReactDom from 'react-dom'
import getTokenFromStorage from '../../utils/getTokenFromStorage'
import { useNavigate } from 'react-router-dom'
import { LanguageContext } from '../../store/LanguageContext'

const Modal = ({ dataType, active, setActive, array, email, setFavorites }) => {
  const navigate = useNavigate()

  //extraction from context
  const { txt, language } = useContext(LanguageContext)

  useEffect(() => {
    const detectKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActive(!active)
      }
    }
    document.documentElement.addEventListener('keydown', detectKeyDown)

    console.log('array', array)
    // console.log('dataType', dataType)
    //eslint-disable-next-line
  }, [])

  const removeFavorite = async (_id) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/users/newFavoriteProduct/${_id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${getTokenFromStorage()}`,
          },
        },
      )

      const newArray = array.filter((item) => item._id !== _id)
      setFavorites(newArray)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = (_id) => {
    if (dataType === 'orders') return
    navigate(`/products/details/${_id}`)
  }

  if (!active) return ''
  else {
    return ReactDom.createPortal(
      <>
        <div
          className='absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-br from-black/95 via-black/80 to-slate-900/60'
          onClick={() => setActive(false)}
        />
        <div className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]  w-screen h-full lg:h-[80vh] lg:w-[50vw] z-50 rounded-md'>
          <section
            className={`bg-gradient-to-br from-amber-100  to-black  w-full h-full rounded-md  outline outline-4 outline-gray-700 relative z-50`}
          >
            <button
              className='absolute top-0 right-5 z-50'
              onClick={() => setActive(false)}
            >
              <i className='fa-solid fa-xmark text-7xl text-gray-800'></i>
            </button>
            <section
              className={`overflow-auto rounded duration-500 h-full gap-0 pt-20 px-3 lg:pt-12 lg:p-20`}
            >
              {array.length > 0 ? (
                array.map((item, index) => {
                  return (
                    <article
                      key={index}
                      className={`lg:mt-10 flex flex-col lg:flex-row lg:h-[200px] rounded-md outline outline-1 outline-stone-900 hover:shadow-xl hover:shadow-gray-700 transition-all ease-in-out duration-300 relative w-full opacity-90 hover:opacity-100 
                      ${
                        dataType === 'favorites'
                          ? 'cursor-pointer'
                          : 'cursor-default'
                      }
                      ${
                        index % 2 === 0
                          ? 'bg-gradient-to-tl from-slate-500/80 via-neutral-600/70 to-gray-900/80 '
                          : 'bg-gradient-to-br from-gray-800/80 to-slate-700/80'
                      }`}
                      onClick={
                        dataType === 'favorites'
                          ? () => handleClick(item._id)
                          : ''
                      }
                    >
                      <div className='w-full lg:w-1/5 flex items-center justify-center bg-gradient-to-tl from-gray-100/40 to-slate-800 p-2'>
                        {dataType === 'orders' ? (
                          <i className='fa-regular fa-folder-open text-8xl text-gray-200'></i>
                        ) : (
                          <img
                            src={item.image}
                            alt={item.name}
                            className='w-1/2 lg:h-full lg:w-full rounded-full object-scale-down'
                          />
                        )}
                      </div>

                      <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-10 p-5'>
                        <span className='lg:col-span-2 text-xl lg:text-2xl font-medium  text-gray-200'>
                          {dataType === 'orders' ? email : item.name}
                        </span>
                        <span className='text-xl lg:text-2xl font-medium text-gray-200'>
                          {dataType === 'orders'
                            ? item.createdAt
                            : `${txt.price}: $${item.price}`}
                        </span>
                        <span className='text-xl lg:text-2xl font-medium text-gray-200'>
                          {dataType === 'orders'
                            ? `${txt.products}: ${item.quantity}`
                            : `${txt.category}: ${item.category.name}`}
                        </span>
                        <span className='text-xl lg:text-2xl font-medium text-gray-200'>
                          {dataType === 'orders'
                            ? `${txt.orderPrice}: $${item.price}`
                            : ''}
                        </span>
                        {dataType === 'favorites' ? (
                          <button
                            onClick={() => removeFavorite(item._id)}
                            className='p-0 absolute top-3 right-5'
                          >
                            <i
                              className={
                                'col-span-1 text-5xl cursor-pointer fa-solid fa-heart text-orange-500'
                              }
                            ></i>
                          </button>
                        ) : (
                          ''
                        )}
                        <span className='text-xl lg:text-2xl font-medium text-gray-200'>
                          {dataType === 'orders' ? item.shippingAdress : ''}
                        </span>
                      </div>
                    </article>
                  )
                })
              ) : (
                <div className='flex items-center justify-center'>
                  <div className='flex flex-col items-center'>
                    <p className='text-7xl text-gray-800'>
                      {txt.youDontHaveAny}{' '}
                      {dataType === 'orders' ? txt.orders : txt.favourites}{' '}
                      {/* avoid yet when language is german, the word noch cannot be at the end */}
                      {language !== 'de' && txt.yet}
                    </p>
                    <i className='fa-solid fa-heart-crack text-8xl text-rose-700 mt-4'></i>
                  </div>
                </div>
              )}
            </section>
          </section>
        </div>
      </>,
      document.getElementById('portal'),
    )
  }
}

export default Modal
