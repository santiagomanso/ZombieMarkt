const RightContainer = ({
  children,
  gap,
  relative,
  overflowHidden,
  overflowAuto,
  justifyCenter,
  lgPadding,
}) => {
  return (
    <section
      className={`flex flex-col items-center lg:bg-black/10 w-full h-full ${lgPadding} rounded
       ${gap ? gap : ''} ${relative ? 'relative' : ''}
       ${overflowHidden ? 'overflow-hidden' : ''}
       ${overflowAuto ? 'overflow-auto' : ''}
       ${justifyCenter && 'justify-center'}
       `}
    >
      {children}
    </section>
  )
}

export default RightContainer
