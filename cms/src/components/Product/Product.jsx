import { useContext, useState } from 'react'
import { ProductContext } from '../../context/ProductContext'

const Product = ({
  product,
  index,
  opt,
  setError,
  setMsg,
  setActive,
  setInput,
}) => {
  const { productFromContext, setProductFromContext } =
    useContext(ProductContext)

  const handleAdd = () => {
    setError('')
    setProductFromContext(product)
    setMsg('Product added to the list')
    setTimeout(() => {
      setMsg('')
      setActive(false)
    }, 1200)
  }

  return (
    <article
      className={`${opt} p-3 rounded bg-gradient-to-br outline outline-1 outline-stone-300
      from-white via-slate-200 to-stone-500/40 flex gap-5  shadow-lg cursor-pointer`}
      onDoubleClick={handleAdd}
    >
      <div className='w-28 h-28 place-self-center'>
        <img
          src={product.image}
          alt={product.name}
          className='h-full w-full object-cover'
        />
      </div>
      <div className='flex flex-col justify-start items-between w-full'>
        <div className='grid grid-cols-1 justify-between items-center'>
          <p className=''>{product.name}</p>
          <p>
            SKU: #<span className='font-medium'>{product.sku}</span>
          </p>
          <p>
            EAN: #<span className='font-semibold'>{product.ean}</span>
          </p>
        </div>
        <div className='grid grid-cols-3'>
          <span className='font-medium'>{product.category.name}</span>
          <p>
            Stock: #
            <span className='font-semibold'>{product.countInStock}</span>
          </p>
        </div>
      </div>
    </article>
  )
}

export default Product
