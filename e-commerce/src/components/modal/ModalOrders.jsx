import { useEffect } from 'react'
import ReactDom from 'react-dom'

const ModalOrders = ({ active, setActive, orders, email }) => {
  console.log('orders', orders)
  useEffect(() => {
    const detectKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActive(!active)
      }
    }
    document.documentElement.addEventListener('keydown', detectKeyDown)

    // console.log('orders', orders)
  }, [])

  if (!active) return ''
  else {
    return ReactDom.createPortal(
      <>
        <div
          className='absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-br from-black/95 via-black/80 to-slate-900/60'
          onClick={() => setActive(!active)}
        />
        <div className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-screen h-full lg:h-[80vh] lg:w-[70vw]  rounded-md'>
          <div
            className={`flex flex-col justify-between bg-gradient-to-br from-amber-100  to-slate-900  w-full h-full rounded-md  outline outline-4 outline-pink-700/80 relative`}
          >
            <button
              className='absolute top-0 right-5'
              onClick={() => setActive(false)}
            >
              <i className='fa-solid fa-xmark text-7xl text-gray-800'></i>
            </button>
            <section
              className={`overflow-auto rounded duration-500 grid grid-cols-1 lg:grid-cols-1 h-full gap-20 p-10`}
            >
              {orders.length > 0 ? (
                orders.map((order, index) => {
                  return (
                    <div
                      key={index}
                      className={`mt-10 flex h-[200px] rounded-md outline cursor-pointer hover:shadow-2xl transition-all ease-in-out duration-300 ${
                        index % 2 === 0
                          ? 'bg-gradient-to-tl from-slate-500/80 via-neutral-600/70 to-gray-900/80 outline-gray-700'
                          : 'bg-gradient-to-br from-gray-800/80 to-slate-700/80 outline-gray-400'
                      }`}
                    >
                      <div className='flex items-center p-2'>
                        <i className='fa-regular fa-folder-open text-6xl text-gray-200'></i>
                      </div>
                      <div className='grid grid-cols-2 gap-x-10 p-5'>
                        <span className='text-2xl font-medium text-gray-200'>
                          {email}
                        </span>
                        <span className='text-2xl font-medium text-gray-200'>
                          {order.createdAt}
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
                <div className='flex items-center justify-center'>
                  <div className='flex flex-col items-center'>
                    <p className='text-7xl text-gray-800'>
                      You dont have orders yet
                    </p>
                    <i className='fa-solid fa-heart-crack text-8xl text-rose-700'></i>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </>,
      document.getElementById('portal'),
    )
  }
}

export default ModalOrders
