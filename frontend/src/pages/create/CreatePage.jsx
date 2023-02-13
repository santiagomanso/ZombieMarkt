import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import FloatingMsg from '../../components/floatingMsg/FloatingMsg'

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState('')
  const [response, setResponse] = useState('')
  const [error, setError] = useState('')
  const nameRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    createProduct()
  }

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    nameRef.current.focus() //NOTE - auto focus name on component mount ;)
    //NOTE - reset error on tablets/phones due to insuficient space
    if (window.innerWidth <= 1024 && error.length > 1) {
      setTimeout(() => {
        setError('')
      }, 4500)
    }
  }, [error])

  const createProduct = async () => {
    const myHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    const data = {
      name: newProduct.name,
      sku: newProduct.sku,
      ean: newProduct.ean,
      countInStock: newProduct.countInStock,
      image: newProduct.image,
      category: newProduct.category,
    }

    try {
      const res = await axios.post(
        'http://localhost:5500/api/products/create',
        data,
        { headers: myHeaders },
      )

      setResponse(res.data)
    } catch (error) {
      console.log(error.response.data.message) //REVIEW - i dont like this way of axios
      setError(error.response.data.message)
    }
  }

  return (
    <main className={` lg:flex lg:flex-col lg:justify-center px-0 lg:px-14`}>
      <section
        className={`bg-white via-slate-300 group py-0 sm:py-4 px-0 sm:px-4 rounded-lg  lg:h-[600px] lg:flex duration-500 outline outline-1 outline-gray-300 shadow-md grid placeis mt-5 lg:mt-20 relative`}
      >
        {error ? (
          <FloatingMsg
            msg={error}
            icon='fa-circle-exclamation'
            opt='text-red-700 bg-rose-100 px-3 py-2 rounded outline outline-1 outline-red-500 top-[10%] left-[50%] lg:top-[10%] z-10 lg:left-[18%] -translate-x-[50%] flex flex-col lg:flex-row items-center lg:items-baseline gap-1 w-3/4  lg:w-auto'
          />
        ) : error.length === 0 ? (
          ''
        ) : (
          <FloatingMsg
            msg='product created successfully'
            icon='fa-circle-check'
            opt='text-green-700 bg-emerald-100 px-3 py-2 rounded outline outline-1 outline-green-500 top-[10%] left-[50%] lg:top-[10%] z-10 lg:left-[18%] -translate-x-[50%] flex flex-col lg:flex-row items-center lg:items-baseline gap-1 w-3/4  lg:w-auto'
          />
        )}
        <div className='hidden lg:flex group w-1/3  flex-col gap-y-3 justify-center items-center'>
          <span className='group-hover:rotate-0 duration-700 text-5xl -rotate-3 text-gray-600 font-semibold'>
            Create Product
          </span>
          <p className='text-2xl text-gray-600 font-serif'>
            Fill out the form and hit Create!
          </p>
          <i className='fa-solid fa-square-plus text-6xl -rotate-[45deg] group-hover:rotate-0 duration-1000 text-gray-500'></i>
        </div>
        <div className='lg:h-full lg:w-2/3 p-2 lg:p-7'>
          <article
            className='grid grid-cols-1 lg:grid-cols-3 lg:gap-8'
            onSubmit={handleSubmit}
          >
            <div className='flex flex-col col-span-3 lg:col-span-1 w-full'>
              <label htmlFor='name'>Name</label>
              <input
                className='bg-gray-100 outline outline-1 outline-gray-300'
                type='text'
                ref={nameRef}
                name='name'
                id='name'
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-col col-span-3 lg:col-span-1 w-full'>
              <label htmlFor='ean'>Ean</label>
              <input
                className='bg-gray-100 outline outline-1 outline-gray-300'
                type='number'
                name='ean'
                id='ean'
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-col col-span-3 lg:col-span-1 w-full'>
              <label htmlFor='sku'>Sku</label>
              <input
                className='bg-gray-100 outline outline-1 outline-gray-300'
                type='number'
                name='sku'
                id='sku'
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-col col-span-3 lg:col-span-1 w-full'>
              <label htmlFor='stock'>Stock</label>
              <input
                className='bg-gray-100 outline outline-1 outline-gray-300'
                type='number'
                name='countInStock'
                id='stock'
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-col col-span-3 lg:col-span-1 w-full'>
              <label htmlFor='category'>category</label>
              <select
                className='bg-gray-100 outline outline-1 outline-gray-300'
                type='number'
                name='category'
                id='category'
                onChange={handleChange}
              >
                <option value='choose'>choose</option>
                <option value='bevergages'>bevergages</option>
                <option value='snacks'>snacks</option>
                <option value='fruits'>fruits</option>
                <option value='vegetables'>vegetables</option>
                <option value='household'>household</option>
                <option value='breakfast'>breakfast</option>
                <option value='meat'>meat</option>
                <option value='sweet'>sweet</option>
                <option value='icecream'>icecream</option>
                <option value='books'>books</option>
                <option value='hygiene'>hygiene</option>
              </select>
            </div>
            <div className='flex flex-col col-span-3 lg:col-span-1 w-full'>
              <label htmlFor='image'>Image</label>
              <input
                className='bg-gray-100 outline outline-1 outline-gray-300'
                type='text'
                name='image'
                id='image'
                onChange={handleChange}
              />
            </div>
            <div className='flex mt-5 flex-col h-40  bg-blue-400 lg:h-[150px]  col-span-3 relative rounded z-0'>
              <label
                htmlFor='imageFile'
                className='bg-gray-100 w-full h-full outline-2 outline-dashed outline-gray-300 cursor-pointer rounded'
              >
                <span className='absolute top-[50%] lg:top-[25%] -translate-y-[50%]  left-[20%] lg:left-[50%] lg:-translate-x-[50%] lg:text-3xl text-gray-600'>
                  Upload picture or drag & drop
                </span>
              </label>
              <input
                className='hidden'
                type='file'
                name='imageFile'
                id='imageFile'
                accept='.jpg, .png, .jpeg'
                onChange={handleChange}
              />
              <i className='fa-solid fa-cloud-arrow-up text-gray-500 text-5xl absolute top-[73%] lg:top-[55%] -translate-y-[50%] left-[50%] -translate-x-[50%]'></i>
            </div>
            <div className='flex justify-center col-span-1 self-center'>
              <button
                onClick={handleSubmit}
                type='button'
                className={` hidden  sm:block bg-gray-500/90 rounded-md cursor-pointer    w-full h-12                  
                text-white font-bold text-lg`}
              >
                Create Product
              </button>
            </div>
          </article>
        </div>
      </section>

      <div className='flex justify-center'>
        <button
          onClick={handleSubmit}
          type='button'
          className={` bottom-4 fixed sm:hidden bg-slate-400 rounded-md cursor-pointer w-5/6 h-12                  
                text-white font-bold text-lg`}
        >
          Create product
        </button>
      </div>
    </main>
  )
}

export default CreatePage
