import axios from 'axios'
import { useState } from 'react'

const EditProduct = ({ product, handleChange, stockOpt, labelOpt }) => {
  const [categories, setCategories] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFetch = async () => {
    if (!categories) {
      setLoading(true)
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/categories/all`,
        )
        if (data.categories) setCategories(data.categories)
        setTimeout(() => {
          setLoading(false)
        }, 500)
      } catch (error) {
        console.log('error', error)
      }
    }
  }

  return (
    <article className='bg-gradient-to-tl from-gray-200 w-full outline outline-3 outline-red-500 rounded flex flex-col lg:flex-row'>
      <div className='lg:w-1/3 h-1/4 lg:h-full bg-gradient-to-tl from-slate-400 p-10'>
        <img
          src={product.image}
          alt={product.name}
          className='w-full h-full object-scale-down rounded max-h-[500px]'
        />
      </div>
      <div className='w-full lg:w-2/3 grid grid-cols-1 px-5 py-5 lg:grid-cols-3  lg:p-10 place-content-center gap-5 lg:gap-20'>
        <div className='flex flex-col'>
          <label htmlFor='name'>Name</label>
          <input
            onChange={handleChange}
            className='outline outline-1 outline-gray-300'
            type='text'
            name='name'
            value={product.name}
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='sku'>Sku</label>
          <input
            onChange={handleChange}
            className='outline outline-1 outline-gray-300'
            type='number'
            name='sku'
            value={product.sku}
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='ean'>Ean</label>
          <input
            onChange={handleChange}
            className='outline outline-1 outline-gray-300'
            type='number'
            name='ean'
            value={product.ean}
          />
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor='countInStock'
            className={`${labelOpt ? labelOpt : ''}`}
          >
            Stock
          </label>
          <input
            onChange={handleChange}
            type='number'
            name='countInStock'
            className={`${
              stockOpt ? stockOpt : 'outline outline-1 outline-gray-300'
            }`}
            value={product.countInStock}
          />
        </div>
        <div className='flex flex-col lg:col-span-1 w-full'>
          <label htmlFor='price'>Price</label>
          <input
            onChange={handleChange}
            className='outline outline-1 outline-gray-300'
            type='number'
            name='price'
            id='price'
            value={product.price}
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='category'>Category</label>
          <select
            readOnly={true}
            className='bg-white outline outline-1 outline-gray-300'
            type='text'
            name='category'
            id='category'
            onChange={handleChange}
            onClick={handleFetch}
          >
            <option value=''>{product?.category.name}</option>
            {!loading && categories ? (
              categories.map((item) => {
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
            ) : (
              <option value='loading'>Loading . . .</option>
            )}
          </select>
        </div>
        <div className='flex flex-col lg:col-span-1 w-full'>
          <label htmlFor='shelf'>Shelf</label>
          <input
            onChange={handleChange}
            className='outline outline-1 outline-gray-300'
            type='text'
            name='shelf'
            id='shelf'
            value={product.shelf}
          />
        </div>
        <div className='flex flex-col lg:col-span-1 w-full'>
          <label htmlFor='backstock'>Backstock</label>
          <input
            onChange={handleChange}
            className='outline outline-1 outline-gray-300'
            type='text'
            name='backstock'
            id='backstock'
            value={product.backstock}
          />
        </div>
        <div className='flex flex-col lg:col-span-1 w-full'>
          <label htmlFor='image'>Image</label>
          <input
            onChange={handleChange}
            className='outline outline-1 outline-gray-300'
            type='text'
            name='image'
            id='image'
            value={product.image}
          />
        </div>
      </div>
    </article>
  )
}

export default EditProduct
