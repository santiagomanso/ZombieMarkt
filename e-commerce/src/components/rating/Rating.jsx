const Rating = ({ rating }) => {
  return (
    <div className='text-2xl flex gap-1 rounded w-full justify-center py-1'>
      <i
        className={`${
          rating >= 1
            ? 'fa-solid fa-star text-yellow-700'
            : rating >= 0.5
            ? 'fas fa-star-half-alt text-yellow-700'
            : 'far fa-star text-yellow-700'
        }`}
      ></i>
      <i
        className={`${
          rating >= 2
            ? 'fa-solid fa-star text-yellow-700'
            : rating >= 1.5
            ? 'fas fa-star-half-alt text-yellow-700'
            : 'far fa-star text-yellow-700'
        }`}
      ></i>
      <i
        className={`${
          rating >= 3
            ? 'fa-solid fa-star text-yellow-700'
            : rating >= 2.5
            ? 'fas fa-star-half-alt text-yellow-700'
            : 'far fa-star text-yellow-700'
        }`}
      ></i>
      <i
        className={`${
          rating >= 4
            ? 'fa-solid fa-star text-yellow-700'
            : rating >= 3.5
            ? 'fas fa-star-half-alt text-yellow-700'
            : 'far fa-star text-yellow-700'
        }`}
      ></i>
      <i
        className={`${
          rating >= 5
            ? 'fa-solid fa-star text-yellow-700'
            : rating >= 4.5
            ? 'fas fa-star-half-alt text-yellow-700'
            : 'far fa-star text-yellow-700'
        }`}
      ></i>
    </div>
  )
}

export default Rating
