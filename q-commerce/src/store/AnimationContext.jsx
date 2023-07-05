import { createContext, useEffect, useState } from 'react'

export const AnimationContext = createContext()

const AnimationProvider = ({ children }) => {
  //NOTE when navigating with <Link> component from R-R-D the components that feed from this animations are mounted and using the fadeIn effect. but when setting animation to a fadeOut see useEffect below
  const [animation, setAnimation] = useState(
    'animate__animated animate__fadeIn',
  )

  //NOTE when setting the animation to a different animation (normally a fade out) the components that feed from the animation gets fade out, but there is a need to reset the animation back to show, hence, this useEffect that listens to changes in animation
  useEffect(() => {
    setTimeout(() => {
      setAnimation('animate__animated animate__fadeIn')
    }, 800)
  }, [animation])

  const data = {
    animation,
    setAnimation,
  }

  return (
    <AnimationContext.Provider value={data}>
      {children}
    </AnimationContext.Provider>
  )
}

export default AnimationProvider
