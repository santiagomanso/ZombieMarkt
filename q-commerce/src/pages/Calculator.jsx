import MainContainer from '../components/containers/MainContainer'
import RightContainer from '../components/containers/RightContainer'
import LeftPanel from '../components/leftPanel/LeftPanel'

const Calculator = () => {
  return (
    <MainContainer>
      <LeftPanel />
      <RightContainer>CALCULATOR</RightContainer>
    </MainContainer>
  )
}

export default Calculator
