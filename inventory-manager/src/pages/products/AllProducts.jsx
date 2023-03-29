import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../context/ProductContext'
import useFetch from '../../hooks/UseFetch'
import { useNavigate } from 'react-router-dom'

const AllProducts = () => {
  const navigate = useNavigate()
  const [active, setActive] = useState(false) //modal logic
  const [enabled, setEnabled] = useState(false) //update button logic
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const [products, setProducts] = useState([])
  const { productFromContext, setProductFromContext } =
    useContext(ProductContext)

  const handleUpdate = async () => {
    if (!enabled) return
    const myHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    console.log('productFromContext', productFromContext)

    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/products/update/${productFromContext._id}`,
        productFromContext,
        { headers: myHeaders },
      )
      setMsg('Product updated')
      setTimeout(() => {
        setMsg('')
        setProductFromContext('')
        setEnabled(false)
      }, 2000)
    } catch (error) {
      setError(error)
      setEnabled(false)
    }
  }

  //TODO evaluate if the product has indeed change the values or not in order to enable update button
  const { data } = useFetch(
    `${process.env.REACT_APP_SERVER_URL}/api/products/all`,
  )

  useEffect(() => {
    setProducts(data.products)
    console.log('products', products)

    //eslint-disable-next-line
  }, [data])

  const handleClick = (product) => {
    setProductFromContext(product)
    setTimeout(() => {
      navigate('/update')
    }, 300)
  }

  const handleActive = (product) => {
    if (active === product) {
      setTimeout(() => {
        setActive(false)
      }, 500)
    } else {
      setActive(product)
    }
  }

  return (
    <main
      className={` ${
        msg || error ? 'blur-md  ' : 'blur-0 '
      } duration-500 flex flex-col justify-center p-4 lg:px-14`}
    >
      <section className='flex flex-col sm:flex-row mt-2 sm:mt-10 justify-between gap-3 w-full'>
        <button
          className='bg-gray-400 text-white cursor-pointer text-left md:text-lg font-semibold rounded-md
            p-4 w-full sm:w-60 '
        >
          Scan mode: ON
        </button>

        <input
          type='text'
          placeholder='Search an user'
          className='p-4 md:text-lg sm:w-3/4  outline outline-1 outline-gray-300 font-medium text-2xl'
          // onClick={() => setActive(!active)}
        />

        <button
          onClick={handleUpdate}
          className={` rounded-md hidden sm:block sm:w-56 lg:w-60 text-white font-bold text-lg md:text-lg duration-500 ease-out ${
            enabled
              ? 'active:translate-y-2 bg-gradient-to-br from-green-400 to-emerald-700 cursor-pointer'
              : 'active:translate-x-2 bg-gradient-to-br from-red-400 to-rose-700 cursor-not-allowed opacity-60 hover:opacity-100'
          }`}
          //   onClick={handlerSubmit}
        >
          {enabled ? 'Update product' : 'Not allowed X'}
        </button>
      </section>
      {products && (
        <span className='mt-5 text-xl text-slate-600 font-medium'>
          Products:{products.length}
        </span>
      )}
      <section
        className={`py-4 px-3 md:px-14 md:py-10 overflow-auto rounded  bg-white   grid duration-500 outline outline-1 outline-gray-300 shadow-md ${
          products
            ? 'grid-cols-1 lg:grid-cols-3 mt-1 h-[700px] gap-20'
            : 'grid-cols-1 place-items-center mt-6 sm:mt-1 lg:mt-5 h-[500px]'
        } `}
      >
        {products ? (
          products.map((product, index) => {
            return (
              <>
                {/* PHONES CARDS */}
                <article
                  key={product._id}
                  onClick={() => handleActive(product)}
                  className={`flex lg:hidden h-[200px] rounded-sm outline outline-4         
                  hover:shadow-2xl transition-all ease-in-out duration-300 relative 
                     ${
                       index % 2 === 0
                         ? 'bg-gradient-to-tl from-purple-500/80  to-slate-900/80 outline-sky-900'
                         : 'bg-gradient-to-br from-indigo-500/80 to-slate-800/80 outline-violet-800'
                     }`}
                >
                  {active === product ? (
                    <button
                      onClick={() => handleClick(product)}
                      className='absolute top-5 right-5  px-4 py-2 bg-gradient-to-bl from-neutral-700 to-slate-800 text-gray-100 uppercase font-bold active:translate-y-2 transition-all duration-300 cursor-pointer z-10'
                    >
                      edit now
                    </button>
                  ) : (
                    ''
                  )}
                  <div
                    className={`h-full w-1/3  ${
                      active === product ? 'blur' : 'blur-none'
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className='h-full object-scale-down'
                    />
                  </div>
                  <div
                    className={`grid grid-cols-2 gap-x-10 p-5 w-2/3  ${
                      active === product ? 'blur' : 'blur-none'
                    }`}
                  >
                    <span className='text-2xl font-medium text-white'>
                      {product.name}
                    </span>
                    <span className='text-2xl font-medium text-white'>
                      ${product.price}
                    </span>
                    <span className='text-2xl font-medium text-white'>
                      Comments: {product.comments.length}
                    </span>
                  </div>
                </article>

                {/* PC cards */}
                <article
                  onClick={() => setActive(product)}
                  onMouseLeave={() => setActive(false)}
                  key={index}
                  className={`hidden lg:flex h-[200px] rounded-sm outline outline-4 
                  hover:shadow-2xl transition-all ease-in-out duration-300 relative
                 
                   ${
                     index % 2 === 0
                       ? 'bg-gradient-to-tl from-purple-500/80  to-slate-900/80 outline-sky-900'
                       : 'bg-gradient-to-br from-indigo-500/80 to-slate-800/80 outline-violet-800'
                   }`}
                >
                  {active === product ? (
                    <button
                      onClick={() => handleClick(product)}
                      className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] px-4 py-2 bg-gradient-to-bl from-neutral-700 to-slate-800 text-gray-100 uppercase font-bold active:translate-y-2 transition-all duration-300 cursor-pointer z-10'
                    >
                      edit now
                    </button>
                  ) : (
                    ''
                  )}
                  <div
                    className={`h-full w-1/3  ${
                      active === product ? 'blur' : 'blur-none'
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className='h-full object-scale-down'
                    />
                  </div>
                  <div
                    className={`grid grid-cols-2 gap-x-10 p-5 w-2/3  ${
                      active === product ? 'blur' : 'blur-none'
                    }`}
                  >
                    <span className='text-2xl font-medium text-white'>
                      {product.name}
                    </span>
                    <span className='text-2xl font-medium text-white'>
                      ${product.price}
                    </span>
                    <span className='text-2xl font-medium text-white'>
                      Comments: {product.comments.length}
                    </span>
                  </div>
                </article>
              </>
            )
          })
        ) : (
          <p className='text-3xl text-gray-600'>
            Search or scan a product to start
          </p>
        )}
      </section>
    </main>
  )
}

export default AllProducts
