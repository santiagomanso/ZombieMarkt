import React from 'react'

const MainContainer = ({ children, animation }) => {
  return (
    <section
      className={`${animation} lg:p-0 lg:px-20 h-[100%] lg:h-5/6 flex gap-1 lg:mt-5`}
    >
      {children}
    </section>
  )
}

export default MainContainer