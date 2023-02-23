import MainContainer from '../components/containers/MainContainer'
import RightContainer from '../components/containers/RightContainer'
import LeftPanel from '../components/leftPanel/LeftPanel'

import signUpImg from '../assets/signUp.png'

const Login = () => {
  return (
    <MainContainer animation={false}>
      <LeftPanel
        title='No account yet?'
        subtitle='Register now and get access to your only chance of salvation against the horde of zombies!'
        imgTop={signUpImg}
        topImgOpt=' -top-10 w-[200px]'
        topBtnText='sign up now!'
        topBtnPath='/signUp'
        bottomCard={false}
      />
      <RightContainer overflowHidden={false} relative={false} gap={false}>
        sdsdk
      </RightContainer>
    </MainContainer>
  )
}

export default Login
