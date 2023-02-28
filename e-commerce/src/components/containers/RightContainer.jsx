const RightContainer = ({
  children,
  gap,
  relative,
  overflowHidden,
  justifyCenter,
}) => {
  return (
    <section
      className={`flex flex-col items-center lg:bg-black/10 w-full h-full lg:px-10 rounded
       ${gap ? gap : ''} ${relative ? 'relative' : ''}
       ${overflowHidden ? 'overflow-hidden' : ''}
       ${justifyCenter && 'justify-center'}
       `}
    >
      {children}
    </section>
  )
}

export default RightContainer
