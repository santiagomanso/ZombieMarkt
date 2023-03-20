const RightContainer = ({
  children,
  gap,
  relative,
  overflowHidden,
  overflowAuto,
  justifyCenter,
  padding,
}) => {
  return (
    <section
      className={`flex flex-col items-center lg:bg-black/10 w-full h-full rounded
       ${padding ? padding : ''}
       ${gap ? gap : ''}
       ${relative ? 'relative' : ''}
       ${overflowHidden ? 'overflow-hidden' : ''}
       ${overflowAuto ? 'overflow-y-auto overflow-x-hidden' : ''}
       ${justifyCenter ? 'justify-center' : ''}
       `}
    >
      {children}
    </section>
  )
}

export default RightContainer
