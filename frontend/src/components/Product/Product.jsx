const Product = ({ product, index }) => {
  const randomBg = () => {
    const bg = [
      'to-fuchsia-300/40',
      'to-stone-300/40',
      'to-green-300/40',
      'to-stone-300/40',
      'to-blue-300/40',
      'to-indigo-300/40',
      'to-red-300/40',
      'to-orange-300/40',
    ]
    return bg[Math.floor(Math.random() * bg.length)]
  }

  return (
    <article
      className={` h-[150px] p-3 rounded bg-gradient-to-br from-white ${randomBg()} flex gap-5 outline outline-1 outline-gray-300 shadow-lg`}
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
          <span className='font-medium'>{product.category}</span>
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
