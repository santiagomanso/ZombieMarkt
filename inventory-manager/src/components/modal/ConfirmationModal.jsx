import { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'

const ConfirmationModal = ({
  activeConfirmation,
  setActiveConfirmation,
  productFromContext,
  setProductFromContext,
  setMsg,
  setError,
}) => {
  const [enable, setEnable] = useState(false)

  useEffect(() => {
    const detectKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveConfirmation(!activeConfirmation)
      }
    }
    document.documentElement.addEventListener('keydown', detectKeyDown)
  }, [])

  const handleChange = (e) => {
    if (e.target.value === productFromContext.name) {
      setEnable(true)
    } else {
      setEnable(false)
    }
  }

  const handleDelete = async (id) => {
    if (!enable) return
    try {
      await axios.delete(`http://localhost:5500/api/products/delete/${id}`)
      setMsg('Product was sucessfully deleted')
      setActiveConfirmation(false)
      setProductFromContext('')
    } catch (error) {}
  }

  if (!activeConfirmation) return ''
  else {
    return ReactDom.createPortal(
      <>
        <section
          className='absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-br from-black/95 via-slate-900/95 to-slate-900'
          onClick={() => setActiveConfirmation(!activeConfirmation)}
        />
        <div className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-20%] lg:-translate-y-[50%] w-screen h-full lg:h-auto lg:w-[600px] outline outline-3 outline-slate-600 rounded'>
          <article className='bg-gray-300 p-5'>
            <h1 className='lg:text-3xl font-medium text-gray-600'>
              Confirm Deletion
            </h1>

            <p className='mt-2 text-gray-800'>
              This action cannot be undone. This will permanently delete the
              product.. Are you sure you want to delete{' '}
              <span className='font-medium px-2 py-[0.15rem] outline outline-1 outline-gray-500 bg-gray-400 rounded text-gray-900'>
                {productFromContext.name}
              </span>{' '}
              ?
            </p>
            <p className='mt-3 text-gray-800'>
              Please type {productFromContext.name} to confirm.
            </p>
            <input
              type='text'
              name='inputConfirm'
              className='w-full bg-gray-200'
              onChange={handleChange}
            />
            <button
              className={`font-medium duration-300 flex items-center justify-center w-full p-2 rounded outline outline-1 outline-gray-300 mt-2 ${
                enable
                  ? 'bg-red-50 text-red-500 hover:bg-red-500 hover:text-white  opacity-100 active:translate-y-5'
                  : 'bg-slate-400 text-gray-700 opacity-70'
              }`}
              onClick={() => handleDelete(productFromContext._id)}
            >
              <span>I understand the consecuences, Delete this product.</span>
            </button>
          </article>
        </div>
      </>,
      document.getElementById('portal'),
    )
  }
}

export default ConfirmationModal
