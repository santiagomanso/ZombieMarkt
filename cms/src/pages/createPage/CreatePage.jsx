import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import FloatingMsg from '../../components/floatingMsg/FloatingMsg'
import useFetch from '../../hooks/UseFetch'
import { useParams } from 'react-router-dom'

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState('')
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const [enabled, setEnabled] = useState(false)
  const [categories, setCategories] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('beverages')

  //select
  const nameRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    createProduct()
  }

  const { data } = useFetch('http://localhost:5500/api/categories/all')

  const handleChange = (e) => {
    console.log('selectedCategory', selectedCategory)
    const category = categories.find((item) => {
      return item.name === selectedCategory
    })
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
      category: category?._id,
    })
    // console.log('newProduct', newProduct)
  }

  const handleCategoryName = (e) => {
    // console.log('e.target', e)
    setSelectedCategory(e.target.value)
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    validate()
    if (data) setCategories(data.categories)
    // console.log('categories', categories)
  }, [data])

  const validate = () => {
    //FIXME - validation
    // if (
    //   !newProduct.name ||
    //   !newProduct.ean ||
    //   !newProduct.sku ||
    //   !newProduct.countInStock ||
    //   !newProduct.category ||
    //   !newProduct.price ||
    //   !newProduct.image
    // ) {
    //   setEnabled(false)
    // } else {
    //   setEnabled(true)
    // }
    return setEnabled(true)
  }

  const createProduct = async (e) => {
    if (!enabled) {
      return
    } else {
      console.log('newProduct', newProduct)

      const formdata = new FormData()
      formdata.append('name', newProduct.name)
      formdata.append('sku', newProduct.sku)
      formdata.append('ean', newProduct.ean)
      formdata.append('categoryName', newProduct.categoryName)
      formdata.append('category', newProduct.category)
      formdata.append('price', newProduct.price)
      formdata.append('image', newProduct.image)
      formdata.append('countInStock', newProduct.countInStock)
      formdata.append('shelf', newProduct.shelf)
      formdata.append('backstock', newProduct.backstock)

      const requestOptions = {
        method: 'POST',
        body: formdata,
      }

      try {
        const response = await fetch(
          'http://localhost:5500/api/products/create',
          requestOptions,
        )

        console.log('response', response)

        setMsg('Product created successfully')
        setTimeout(() => {
          setMsg('')
          setNewProduct({
            name: '',
            ean: '',
            sku: '',
            countInStock: '',
            category: '',
            price: '',
          })
        }, 2000)
      } catch (error) {
        console.log('fail') //REVIEW - i dont like this way of axios
        setError('fail')
        setTimeout(() => {
          setError('')
        }, 2000)
      }
    }
  }

  return (
    <>
      {error && (
        <FloatingMsg
          msg={error}
          text='text-xl lg:text-7xl'
          icon='fa-solid fa-triangle-exclamation text-7xl'
          opt='text-red-700 bg-rose-100 px-3 py-2 rounded outline outline-1 outline-red-500 top-[10%] left-[50%] lg:top-[50%] z-10 lg:left-[50%] -translate-x-[50%] flex flex-col lg:flex-row items-center lg:items-baseline gap-1 w-3/4  lg:w-auto'
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
        className={`lg:flex lg:flex-col lg:justify-center px-0 lg:px-14 duration-200 ${
          msg || error ? 'blur-md  ' : 'blur-0 '
        }`}
      >
        <section
          className={`bg-white via-slate-300 group py-0 sm:py-4 px-0 sm:px-4 rounded-lg  lg:h-[600px] lg:flex duration-500 outline outline-1 outline-gray-300 shadow-md grid placeis mt-5 lg:mt-20 relative `}
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
                  ref={nameRef}
                  value={newProduct.name || ''}
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
                  value={newProduct.ean || ''}
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
                  value={newProduct.sku || ''}
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
                  value={newProduct.countInStock || ''}
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
                  value={selectedCategory}
                  name='categoryName'
                  id='category'
                  onChange={handleCategoryName}
                >
                  {categories.length > 0
                    ? categories.map((item) => {
                        return (
                          <option
                            value={item.name}
                            key={item._id}
                            data-productid={item._id}
                          >
                            {item.name}
                          </option>
                        )
                      })
                    : ''}
                </select>
              </div>
              <div className='flex flex-col col-span-3 lg:col-span-1 w-full'>
                <label htmlFor='price'>Price</label>
                <input
                  className='bg-gray-100 outline outline-1 outline-gray-300'
                  type='number'
                  value={newProduct.price || ''}
                  name='price'
                  id='price'
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-col col-span-3 lg:col-span-1 w-full'>
                <label htmlFor='image'>Image</label>
                <input
                  className='bg-gray-100 outline outline-1 outline-gray-300'
                  type='text'
                  value={newProduct.image || ''}
                  name='image'
                  id='image'
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-col col-span-3 lg:col-span-1 w-full'>
                <label htmlFor='shelf'>Shelf</label>
                <input
                  className='bg-gray-100 outline outline-1 outline-gray-300'
                  type='text'
                  value={newProduct.shelf || ''}
                  name='shelf'
                  id='shelf'
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-col col-span-3 lg:col-span-1 w-full'>
                <label htmlFor='backstock'>backstock</label>
                <input
                  className='bg-gray-100 outline outline-1 outline-gray-300'
                  type='text'
                  value={newProduct.backstock || ''}
                  name='backstock'
                  id='backstock'
                  onChange={handleChange}
                />
              </div>
              {/* <div className='flex mt-5 flex-col h-40  bg-blue-400 lg:h-[150px]  col-span-3 relative rounded z-0'>
                <label
                  htmlFor='image'
                  className='bg-gray-100 w-full h-full outline-2 outline-dashed outline-gray-300 cursor-pointer rounded'
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
              </div> */}
              <div className='flex justify-center col-span-3 self-center'>
                <button
                  onClick={handleSubmit}
                  type='button'
                  className={`font-medium duration-500 ease-in flex items-center justify-center w-full p-2 rounded outline outline-1 outline-gray-300 mt-2 ${
                    enabled
                      ? 'bg-teal-600 text-white block  opacity-100 active:translate-y-5 scale-100'
                      : 'bg-slate-400 text-gray-700 hidden'
                  }`}
                >
                  Create Product
                </button>
              </div>
            </form>
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
    </>
  )
}

export default CreatePage
