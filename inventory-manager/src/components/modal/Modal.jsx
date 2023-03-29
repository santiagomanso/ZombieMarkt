import { useEffect, useRef, useState } from 'react'
import ReactDom from 'react-dom'

import { useDebounce } from 'use-debounce'
import Product from '../Product/Product'
import FloatingMsg from '../floatingMsg/FloatingMsg'
import getProducts from '../../utils/getProducts'

const Modal = ({ active, setActive }) => {
  const [input, setInput] = useState('')
  const [debouncedText] = useDebounce(input, 1000)
  const [data, setData] = useState('')
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
    const detectKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActive(false)
      }
    }
    document.documentElement.addEventListener('keydown', detectKeyDown)

    //set data gets passed to the component to set the data after fetching
    if (debouncedText.length > 0) {
      getProducts(debouncedText, setData, setError)
    }
    //eslint-disable-next-line
  }, [debouncedText, input])

  if (!active) return ''
  else {
    return ReactDom.createPortal(
      <>
        <div
          className='absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-br from-black/95 via-slate-900/95 to-slate-900'
          onClick={() => setActive(false)}
        />
        <div className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-screen h-full lg:h-[80vh] lg:w-[70vw]'>
          <div
            className={`flex flex-col justify-start gap-5 lg:gap-y-10 bg-gray-100  w-full h-full rounded-md p-4 lg:px-8 lg:py-6  border-2 border-gray-700 relative`}
          >
            <button
              onClick={() => setActive(false)}
              className='absolute bottom-5 left-2'
            >
              <i className=' lg:hidden fa-solid fa-chevron-left text-5xl'></i>
            </button>
            <input
              type='text'
              ref={inputRef}
              placeholder='Search SKU / EAN / Name'
              className='p-7 md:text-lg sm:w-3/4 lg:w-full rounded-md outline outline-1 outline-gray-300 font-medium text-2xl h-14'
              onChange={(e) => setInput(e.target.value)}
            />
            <div>
              {data.length > 0 ? <span>Results {data.length}</span> : ''}
              <div
                className={`grid bg-white w-full h-5/6 outline outline-1 outline-gray-300 rounded ${
                  data.length > 0
                    ? 'grid-cols-1 lg:grid-cols-3 grid-rows-layout gap-5 p-7'
                    : 'grid-cols-1 place-items-center h-[80vh] lg:h-[50vh]'
                } outline outline-1 outline-gray-300 shadow-md`}
              >
                {error && (
                  <FloatingMsg
                    msg={error}
                    icon='fa-circle-exclamation'
                    opt='text-red-700 bg-rose-100 px-3 py-2 rounded outline outline-1 outline-red-500 top-[10%] left-[50%] lg:top-[11.6%] z-10 lg:left-[50%] -translate-x-[50%] flex flex-col lg:flex-row items-center lg:items-baseline gap-1 w-3/4  lg:w-auto'
                  />
                )}
                {msg && (
                  <FloatingMsg
                    msg='Product added'
                    icon='fa-solid fa-circle-check'
                    opt='text-green-700 bg-emerald-100 px-3 py-2 rounded outline outline-1 outline-green-500 top-[10%] left-[50%] lg:top-[11.6%] z-10 lg:left-[50%] -translate-x-[50%] flex flex-col lg:flex-row items-center lg:items-baseline gap-1 w-3/4  lg:w-auto'
                  />
                )}
                {data.length > 0 ? (
                  data.map((item, i) => {
                    return (
                      <Product
                        product={item}
                        index={i}
                        opt='h-[150px]'
                        key={item._id}
                        setError={setError}
                        setMsg={setMsg}
                        setActive={setActive}
                        setInput={setInput}
                      />
                    )
                  })
                ) : (
                  <p className='text-xl lg:text-3xl text-gray-500'>
                    Search or scan a product to start
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </>,
      document.getElementById('portal'),
    )
  }
}

export default Modal
