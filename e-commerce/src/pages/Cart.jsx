import React from 'react'
import CheckoutGrid from '../components/CheckoutGrid/CheckoutGrid'
import MainContainer from '../components/containers/MainContainer'
import RightContainer from '../components/containers/RightContainer'
import Header from '../components/header/Header'
import LeftPanel from '../components/leftPanel/LeftPanel'

const Cart = () => {
  return (
    <MainContainer>
      <LeftPanel bottomCard />
      <RightContainer
        justifyCenter={false}
        relative={false}
        overflowHidden={false}
        lgPadding='lg:p-5'
      >
        <Header
          title='Checkout Page'
          subtitle='Edit your amounts and hit checkout before the the zombie wave'
        />
        <CheckoutGrid />
      </RightContainer>
    </MainContainer>
  )
}

export default Cart
