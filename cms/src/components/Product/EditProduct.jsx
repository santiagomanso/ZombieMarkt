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
          {/* FIXME detect category / update category */}
          <label htmlFor='category'>Category</label>
          <select
            readOnly={true}
            className='bg-white outline outline-1 outline-gray-300'
            type='text'
            name='category'
            id='category'
            disabled
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
