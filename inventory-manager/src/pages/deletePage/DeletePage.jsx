import { useContext, useEffect, useState } from 'react'
import FloatingMsg from '../../components/floatingMsg/FloatingMsg'
import ConfirmationModal from '../../components/modal/ConfirmationModal'
import Modal from '../../components/modal/Modal'
import DeleteProduct from '../../components/Product/DeleteProduct'
import { ProductContext } from '../../context/ProductContext'

const DeletePage = () => {
  const [active, setActive] = useState(false) //modal logic
  const [activeConfirmation, setActiveConfirmation] = useState(false) //modal confirmation logic
  //eslint-disable-next-line
  const [enabled, setEnabled] = useState(false) //button logic
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const { productFromContext, setProductFromContext } =
    useContext(ProductContext)

  const handleChange = (e) => {
    setEnabled(true)
    setProductFromContext({
      ...productFromContext,
      [e.target.name]: e.target.value,
    })
  }

  const handleDelete = async () => {
    if (!productFromContext) return
    setActiveConfirmation(true)
  }

  useEffect(() => {
    if (msg || error) {
      setTimeout(() => {
        setMsg('')
        setError('')
      }, 2000)
    }
  }, [msg, error])

  //TODO evaluate if the product has indeed change the values or not in order to enable update button

  return (
    <>
      {active ? <Modal active={active} setActive={setActive} /> : ''}
      {activeConfirmation ? (
        <ConfirmationModal
          activeConfirmation={activeConfirmation}
          setActiveConfirmation={setActiveConfirmation}
          productFromContext={productFromContext}
          setProductFromContext={setProductFromContext}
          setMsg={setMsg}
          setError={setError}
        />
      ) : (
        ''
      )}
      {error && (
        <FloatingMsg
          msg={error}
          icon='fa-circle-exclamation'
          opt='text-red-700 bg-rose-100 px-3 py-2 rounded outline outline-1 outline-red-500 top-[10%] left-[50%] lg:top-[11.6%] z-10 lg:left-[50%] -translate-x-[50%] flex flex-col lg:flex-row items-center lg:items-baseline gap-1 w-3/4  lg:w-auto'
        />
      )}
      {msg && (
        <FloatingMsg
          msg={msg}
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
            placeholder='Search SKU / EAN / Name'
            className='p-4 md:text-lg sm:w-3/4  outline outline-1 outline-gray-300 font-medium text-2xl'
            onClick={() => setActive(!active)}
          />

          <button
            onClick={handleDelete}
            className={` rounded-md hidden sm:flex gap-1 justify-center items-center sm:w-56 lg:w-60 text-white font-bold text-lg md:text-xl duration-500 ease-out active:translate-x-2 bg-gradient-to-br from-red-500 to-rose-900 cursor-pointer hover:opacity-100
            }`}
            //   onClick={handlerSubmit}
          >
            <span>Delete</span>
            <i className='fa-solid fa-trash'></i>
          </button>
        </section>

        <section
          className={`py-0  px-0 sm:p-0 overflow-auto rounded  bg-white   grid duration-500 outline outline-1 outline-gray-300 shadow-md ${
            productFromContext
              ? 'grid-cols-1 lg:grid-cols-1 mt-10'
              : 'grid-cols-1 place-items-center mt-6 sm:mt-1 lg:mt-5 h-[500px]'
          } `}
        >
          {productFromContext ? (
            <DeleteProduct
              product={productFromContext}
              handleChange={handleChange}
            />
          ) : (
            <p className='px-2 lg:px-0 text-xl lg:text-3xl text-gray-600'>
              Search or scan a product to start
            </p>
          )}
        </section>

        <div className='flex justify-center'>
          <button
            onClick={handleDelete}
            className={` bottom-4 fixed sm:hidden bg-slate-400 rounded-md cursor-pointer w-5/6 h-12 bg-gradient-to-br from-red-500 to-rose-900                 
                text-white font-bold text-lg`}
          >
            Delete
          </button>
        </div>
      </main>
    </>
  )
}

export default DeletePage
