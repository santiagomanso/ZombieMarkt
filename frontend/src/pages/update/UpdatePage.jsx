import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../../components/modal/Modal'
import Product from '../../components/Product/Product'
import { ProductContext } from '../../context/ProductContext'

const UpdatePage = () => {
  const [active, setActive] = useState(false)
  const [products, setProducts] = useState('')
  const [error, setError] = useState('')
  const { productList } = useContext(ProductContext)

  return (
    <>
      {active ? (
        <Modal
          active={active}
          setActive={setActive}
          setProducts={setProducts}
        />
      ) : (
        ''
      )}
      <div className={` flex flex-col justify-center px-4 lg:px-14`}>
        <div className='flex flex-col sm:flex-row mt-2 sm:mt-10 justify-between gap-3 w-full'>
          <button
            className='bg-gray-400 text-white cursor-pointer text-left md:text-lg font-semibold rounded-md
            p-4 w-full sm:w-60 '
          >
            Scan mode: ON
          </button>

          <input
            type='text'
            placeholder='Search SKU / EAN / Name'
            className='p-4 md:text-lg sm:w-3/4  outline outline-1 outline-gray-300 font-medium text-2xl'
            onClick={() => setActive(!active)}
          />

          <button
            className={` rounded-md hidden sm:block sm:w-56 lg:w-60 text-white font-bold text-lg md:text-lg duration-500 ease-out ${
              active
                ? 'active:translate-y-2 bg-gradient-to-br from-green-400 to-emerald-700 cursor-pointer'
                : 'active:translate-x-2 bg-gradient-to-br from-red-400 to-rose-700 cursor-not-allowed opacity-60 hover:opacity-100'
            }`}
            //   onClick={handlerSubmit}
          >
            {active ? 'Check in' : 'Not allowed X'}
          </button>
        </div>

        <p
          className={`text-xl duration-500 ${
            products.length > 0 ? 'opacity-100 mt-8' : 'opacity-0 mt-0'
          }`}
        >
          Results: {products.length}
        </p>

        <div
          className={`py-0 sm:py-4 px-0 sm:px-4 overflow-auto rounded  bg-white  h-[400px] lg:h-[600px]  grid duration-500 ${
            productList.length > 0
              ? 'grid-cols-1 lg:grid-cols-3 grid-rows-layout gap-5 mt-6 sm:mt-1 lg:mt-0'
              : 'grid-cols-1 place-items-center mt-6 sm:mt-1 lg:mt-5'
          } outline outline-1 outline-gray-300 shadow-md`}
        >
          {productList.length > 0 ? (
            productList.map(({ product }, i) => {
              return (
                <Link to={`/details/${product._id}`} key={product._id}>
                  <Product product={product} index={i} opt='h-[150px]' />
                </Link>
              )
            })
          ) : (
            <p className='text-3xl text-gray-600'>
              Search or scan a product to start
            </p>
          )}
        </div>

        <div className='flex justify-center'>
          <input
            type='button'
            value='Check in'
            className={` bottom-4 fixed sm:hidden bg-slate-400 rounded-md cursor-pointer w-5/6 h-12                  
                text-white font-bold text-lg`}
          />
        </div>
      </div>
    </>
  )
}

export default UpdatePage
