import { useState } from 'react'

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
  }

  const createProduct = async () => {}

  return (
    <div className={` lg:flex lg:flex-col lg:justify-center px-0 lg:px-14`}>
      <div
        className={`bg-white via-slate-300 group py-0 sm:py-4 px-0 sm:px-4 overflow-auto rounded-lg  lg:h-[600px] lg:flex duration-500 outline outline-1 outline-gray-300 shadow-md grid placeis mt-5 lg:mt-20`}
      >
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
          <form
            className='grid grid-cols-1 lg:grid-cols-3 lg:gap-8'
            onSubmit={handleSubmit}
          >
            <div className='flex flex-col col-span-3 lg:col-span-1 w-full'>
              <label htmlFor='name'>Name</label>
              <input
                className='bg-gray-100 outline outline-1 outline-gray-300'
                type='text'
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
                name='stock'
                id='stock'
                onChange={handleChange}
              />
            </div>
            <div className='hidden lg:flex flex-col col-span-3 lg:col-span-1 w-full'>
              <label htmlFor='rating'>Initial Rating</label>
              <input
                className='bg-gray-100 outline outline-1 outline-gray-300'
                type='number'
                name='rating'
                id='rating'
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
                <option value='computer'>computer</option>
              </select>
            </div>
            <div className='flex mt-5 flex-col h-40  bg-blue-400 lg:h-[150px]  col-span-3 relative '>
              <label
                htmlFor='image'
                className='bg-gray-100 w-full h-full outline-2 outline-dashed outline-gray-300 cursor-pointer'
              >
                <span className='absolute top-[50%] lg:top-[25%] -translate-y-[50%]  left-[20%] lg:left-[50%] lg:-translate-x-[50%] lg:text-3xl text-gray-600'>
                  Upload picture or drag & drop
                </span>
              </label>
              <input
                className='hidden'
                type='file'
                name='image'
                id='image'
                accept='.jpg, .png, .jpeg'
                onChange={handleChange}
              />
              <i className='fa-solid fa-cloud-arrow-up text-gray-500 text-5xl absolute top-[73%] lg:top-[55%] -translate-y-[50%] left-[50%] -translate-x-[50%]'></i>
            </div>
            <div className='flex justify-center col-span-1 self-center'>
              <button
                type='submit'
                className={` hidden  sm:block bg-slate-400 rounded-md cursor-pointer    w-full h-12                  
                text-white font-bold text-lg`}
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className='flex justify-center'>
        <button
          type='button'
          className={` bottom-4 fixed sm:hidden bg-slate-400 rounded-md cursor-pointer w-5/6 h-12                  
                text-white font-bold text-lg`}
        >
          Create product
        </button>
      </div>
    </div>
  )
}

export default CreatePage
