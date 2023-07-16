const Footer = ({ display }) => {
  return (
    <a
      href='https://github.com/santiagomanso'
      target='_blank'
      rel='noreferrer'
      className={`fixed bottom-6 w-full lg:bottom-3 lg:w-auto left-[50%] -translate-x-[50%] flex justify-center items-baseline gap-2 pt-2 ${
        display === 'laptop'
          ? 'hidden lg:block'
          : 'fixed left-[50%] -translate-x-[50%] lg:hidden'
      }`}
    >
      <i className='fa-brands fa-github lg:text-lg  text-gray-300'></i>
      <span className='lg:text-lg  text-gray-300'>
        {' '}
        by Santiago Manso Castro
      </span>
    </a>
  )
}

export default Footer
