import { useEffect, useRef, useState } from 'react'
import ReactDom from 'react-dom'
import UseGetProducts from '../../hooks/UseGetProducts'
import { useDebounce } from 'use-debounce'
import Product from '../Product/Product'
import FloatingMsg from '../floatingMsg/FloatingMsg'

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
        setActive(!active)
      }
    }
    document.documentElement.addEventListener('keydown', detectKeyDown)

    if (debouncedText.length > 0) {
      UseGetProducts(debouncedText, setData, setError)
    }
  }, [debouncedText, input])

  if (!active) return ''
  else {
    return ReactDom.createPortal(
      <>
        <div
          className='absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-br from-black/95 via-slate-900/95 to-slate-900'
          onClick={() => setActive(!active)}
        />
        <div className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-screen h-full lg:h-[80vh] lg:w-[70vw]'>
          <div
            className={`flex flex-col justify-between bg-gray-100  w-full h-full rounded-md px-8 py-6  border-2 border-gray-700`}
          >
            <input
              type='text'
              ref={inputRef}
              placeholder='Search SKU / EAN / Name'
              className='p-7 md:text-lg sm:w-3/4 lg:w-full rounded-md outline outline-1 outline-gray-300 font-medium text-2xl h-14'
              onChange={(e) => setInput(e.target.value)}
            />
            {data.length > 0 ? <span>Results</span> : ''}
            <div
              className={`grid bg-white w-full h-5/6 outline outline-1 outline-gray-300 rounded ${
                data.length > 0
                  ? 'grid-cols-1 lg:grid-cols-3 grid-rows-layout gap-5 p-7'
                  : 'grid-cols-1 place-items-center '
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
                <p className='text-3xl text-gray-500'>
                  Search or scan a product to start
                </p>
              )}
            </div>
          </div>
        </div>
      </>,
      document.getElementById('portal'),
    )
  }
}

export default Modal
