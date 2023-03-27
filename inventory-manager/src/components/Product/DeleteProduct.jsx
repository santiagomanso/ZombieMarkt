import React from 'react'

const DeleteProduct = ({ product, handleChange }) => {
  return (
    <article className='bg-gradient-to-tl from-gray-200 w-full outline outline-3 outline-red-500 rounded flex '>
      <div className='w-1/3 h-full bg-gradient-to-tl from-slate-400 p-10'>
        <img
          src={product.image}
          alt={product.name}
          className='w-full h-full object-scale-down rounded max-h-[500px]'
        />
      </div>
      <div className='w-2/3 grid grid-cols-3  p-10 place-content-center gap-20 bg-white'>
        <div className='flex flex-col'>
          <label className='text-gray-600 font-medium' htmlFor='name'>
            Name
          </label>
          <span className='outline outline-1 outline-gray-300 lg:text-2xl p-3 bg-slate-400 rounded-md text-white font-semibold'>
            {product.name}
          </span>
        </div>
        <div className='flex flex-col'>
          <label className='text-gray-600 font-medium' htmlFor='sku'>
            Sku
          </label>
          <span className='outline outline-1 outline-gray-300 lg:text-2xl p-3 bg-slate-400 rounded-md text-white font-semibold'>
            {product.sku}
          </span>
        </div>
        <div className='flex flex-col'>
          <label className='text-gray-600 font-medium' htmlFor='ean'>
            Ean
          </label>
          <span className='outline outline-1 outline-gray-300 lg:text-2xl p-3 bg-slate-400 rounded-md text-white font-semibold'>
            {product.ean}
          </span>
        </div>
        <div className='flex flex-col'>
          <label className='text-gray-600 font-medium' htmlFor='countInStock'>
            Stock
          </label>
          <span className='outline outline-1 outline-gray-300 lg:text-2xl p-3 bg-slate-400 rounded-md text-white font-semibold'>
            {product.countInStock}
          </span>
        </div>
        <div className='flex flex-col lg:col-span-1 w-full'>
          <label className='text-gray-600 font-medium' htmlFor='price'>
            Price
          </label>
          <span className='outline outline-1 outline-gray-300 lg:text-2xl p-3 bg-slate-400 rounded-md text-white font-semibold'>
            ${product.price}
          </span>
        </div>
        <div className='flex flex-col'>
          <label className='text-gray-600 font-medium' htmlFor='category'>
            Category
          </label>
          <span className='outline outline-1 outline-gray-300 lg:text-2xl p-3 bg-slate-400 rounded-md text-white font-semibold'>
            {product.category.name}
          </span>
        </div>
      </div>
    </article>
  )
}

export default DeleteProduct
