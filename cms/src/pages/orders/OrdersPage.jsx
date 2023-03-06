import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import FloatingMsg from '../../components/floatingMsg/FloatingMsg'
import Modal from '../../components/modal/Modal'
import EditProduct from '../../components/Product/EditProduct'
import { ProductContext } from '../../context/ProductContext'
import useFetch from '../../hooks/UseFetch'

const OrdersPage = () => {
  const [active, setActive] = useState(false) //modal logic
  const [enabled, setEnabled] = useState(false) //update button logic
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const [orders, setOrders] = useState([])
  const { productFromContext, setProductFromContext } =
    useContext(ProductContext)

  const handleChange = (e) => {
    setEnabled(true)
    setProductFromContext({
      ...productFromContext,
      [e.target.name]: e.target.value,
    })
  }

  const handleUpdate = async () => {
    if (!enabled) return
    const myHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    console.log('productFromContext', productFromContext)

    try {
      await axios.put(
        `http://localhost:5500/api/products/update/${productFromContext._id}`,
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
  const { data } = useFetch('http://localhost:5500/api/orders/all')

  useEffect(() => {
    setOrders(data.orders)
    // console.log('users', orders)

    return () => {}
  }, [data])

  return (
    <>
      {active ? <Modal active={active} setActive={setActive} /> : ''}
      {error && (
        <FloatingMsg
          msg={error}
          icon='fa-circle-exclamation'
          opt='text-red-700 bg-rose-100 px-3 py-2 rounded outline outline-1 outline-red-500 top-[10%] left-[50%] lg:top-[11.6%] z-10 lg:left-[50%] -translate-x-[50%] flex flex-col lg:flex-row items-center lg:items-baseline gap-1 w-3/4  lg:w-auto'
        />
      )}
      {msg && (
        <FloatingMsg
          msg='Update successfull'
          text='text-xl lg:text-7xl'
          icon='fa-solid fa-file-circle-check text-xl lg:text-6xl'
          opt='text-green-700 bg-emerald-100 px-3 py-2 lg:p-20 rounded outline outline-1 outline-green-500
           top-[10%] lg:top-[50%] lg:-translate-y-[50%] left-[50%] lg:left-[50%] z-10  -translate-x-[50%] flex flex-col lg:flex-row items-center lg:items-center gap-2 lg:gap-4 w-3/4 lg:w-auto'
        />
      )}
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

        <section
          className={`py-0  px-0 md:px-14 md:py-10 overflow-auto rounded  bg-white   grid duration-500 outline outline-1 outline-gray-300 shadow-md ${
            orders
              ? 'grid-cols-1 lg:grid-cols-2 mt-10 h-[700px] gap-20'
              : 'grid-cols-1 place-items-center mt-6 sm:mt-1 lg:mt-5 h-[500px]'
          } `}
        >
          {orders ? (
            orders.map((order, index) => {
              return (
                <div
                  key={index}
                  className={`flex h-[200px] rounded-sm outline outline-4 cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all ease-in-out duration-300 ${
                    index % 2 === 0
                      ? 'bg-gradient-to-tl from-slate-500/80 via-neutral-600/70 to-gray-900/80 outline-sky-900'
                      : 'bg-gradient-to-br from-rose-500/80 to-fuchsia-700/80 outline-violet-800'
                  }`}
                >
                  <div className='flex items-center p-2'>
                    <i className='fa-regular fa-folder-open text-6xl text-gray-200'></i>
                  </div>
                  <div className='grid grid-cols-2 gap-x-10 p-5'>
                    <span className='text-2xl font-medium text-gray-200'>
                      {order.user.email}
                    </span>
                    <span className='text-2xl font-medium text-gray-200'>
                      {new Date(order.createdAt).toLocaleString('en-GB')}
                    </span>
                    <span className='text-2xl font-medium text-gray-200'>
                      Items: {order.quantity}
                    </span>
                    <span className='text-2xl font-medium text-gray-200'>
                      ${order.price}
                    </span>
                  </div>
                </div>
              )
            })
          ) : (
            <p className='text-3xl text-gray-600'>
              Search or scan a product to start
            </p>
          )}
        </section>

        <div className='flex justify-center'>
          <input
            type='button'
            value='Check in'
            className={` bottom-4 fixed sm:hidden bg-slate-400 rounded-md cursor-pointer w-5/6 h-12                  
                text-white font-bold text-lg`}
          />
        </div>
      </main>
    </>
  )
}

export default OrdersPage
