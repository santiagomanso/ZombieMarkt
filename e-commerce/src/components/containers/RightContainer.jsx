const RightContainer = ({
  children,
  gap,
  relative,
  overflowHidden,
  justifyCenter,
  lgPadding,
}) => {
  return (
    <section
      className={`flex flex-col items-center lg:bg-black/10 w-full h-full ${lgPadding} rounded
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
