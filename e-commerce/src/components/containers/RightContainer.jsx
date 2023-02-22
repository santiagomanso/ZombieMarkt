const RightContainer = ({ children, gap, relative, overflowHidden }) => {
  return (
    <section
      className={` flex ${gap} overflow-auto flex-col items-center lg:bg-black/10 w-full h-full lg:px-10 rounded
      ${relative && 'relative'} ${overflowHidden && 'overflow-hidden'}`}
    >
      {children}
    </section>
  )
}

export default RightContainer
