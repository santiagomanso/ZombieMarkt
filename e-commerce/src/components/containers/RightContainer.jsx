const RightContainer = ({ children, gap }) => {
  return (
    <section
      className={`flex gap-y-5 ${gap} overflow-auto flex-col items-center lg:bg-black/10 w-full h-full lg:px-10 rounded`}
    >
      {children}
    </section>
  )
}

export default RightContainer
