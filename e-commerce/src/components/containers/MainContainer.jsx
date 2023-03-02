import { useContext } from 'react'
import { AnimationContext } from '../../store/AnimationContext'

const MainContainer = ({ children }) => {
  const { animation } = useContext(AnimationContext)
  return (
    <section
      className={`${animation} lg:p-0 lg:px-20 h-[100%] lg:h-[87%] flex gap-1 lg:mt-5`}
    >
      {children}
    </section>
  )
}

export default MainContainer
