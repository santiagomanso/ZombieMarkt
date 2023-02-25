import { useState } from 'react'

const FloatingMsg = ({ msg, opt, icon, text }) => {
  const [animation, setAnimation] = useState('')

  setTimeout(() => {
    setAnimation('top-[10%]')
  }, 200)

  return (
    <div
      className={`duration-500 top-0 transition-all ease-in-out absolute ${opt} flex gap-1 ${animation} items-center z-20 `}
    >
      <span className={`${text}`}>{msg}</span>
      <i className={`${icon}`}></i>
    </div>
  )
}

export default FloatingMsg
