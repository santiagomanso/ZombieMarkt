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
        padding='lg:p-5'
      >
        <Header
          opt='px-5 lg:px-0 mt-1 lg:mt-0'
          title='Checkout Page'
          subtitle='Edit your amounts and hit checkout'
        />
        <CheckoutGrid />
      </RightContainer>
    </MainContainer>
  )
}

export default Cart
