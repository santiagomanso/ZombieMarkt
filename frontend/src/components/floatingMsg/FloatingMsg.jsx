const FloatingMsg = ({ msg, opt, icon }) => {
  return (
    <div className={`absolute ${opt}`}>
      <span className='lg:text-2xl'>{msg}</span>
      <i className={`fa-solid ${icon} text-2xl`}></i>
    </div>
  )
}

export default FloatingMsg
