const EditProduct = ({ product, handleChange }) => {
  return (
    <article className='bg-gradient-to-tl from-gray-200 w-full outline outline-3 outline-red-500 rounded flex '>
      <div className='w-1/3 h-full bg-gradient-to-tl from-slate-400 p-10'>
        <img
          src={product.image}
          alt={product.name}
          className='w-full h-full object-scale-down rounded max-h-[500px]'
        />
      </div>
      <div className='w-2/3 grid grid-cols-3  p-10 place-content-center gap-20'>
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
          <label htmlFor='countInStock'>Stock</label>
          <input
            onChange={handleChange}
            type='number'
            name='countInStock'
            className='outline outline-1 outline-gray-300'
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
            onChange={handleChange}
            className='bg-white outline outline-1 outline-gray-300'
            type='text'
            name='category'
            id='category'
            // onChange={handleChange}
          >
            <option value={product.category}>{product.category}</option>
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
        <div className='flex mt-5 flex-col h-40  lg:h-[200px]  col-span-3 relative rounded z-0'>
          <label
            htmlFor='image'
            className='bg-white w-full h-full outline-2 outline-dashed outline-gray-300 cursor-pointer rounded'
          >
            <span className='absolute top-[50%] lg:top-[25%] -translate-y-[50%]  left-[20%] lg:left-[50%] lg:-translate-x-[50%] lg:text-3xl text-gray-600'>
              Upload picture or drag & drop
            </span>
          </label>
          <input
            onChange={handleChange}
            className='hidden'
            type='file'
            name='image'
            id='image'
            accept='.jpg, .png, .jpeg'
          />
          <i className='fa-solid fa-cloud-arrow-up text-gray-500 text-5xl absolute top-[73%] lg:top-[55%] -translate-y-[50%] left-[50%] -translate-x-[50%]'></i>
        </div>
      </div>
    </article>
  )
}

export default EditProduct
