import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import LeftPanel from '../components/leftPanel/LeftPanel'
import Header from '../components/header/Header'
import RightContainer from '../components/containers/RightContainer'
import MainContainer from '../components/containers/MainContainer'
import ItemList from '../components/lists/ItemList'
import useFetch from '../hooks/useFetch'
import Loading from '../components/loading/Loading'
import { AnimationContext } from '../store/AnimationContext'

const HomePage = () => {
  const navigate = useNavigate()
  const { setAnimation } = useContext(AnimationContext)

  const { loading, data, error } = useFetch(
    'http://localhost:5500/api/categories/all',
  )
  // console.log('data.categories', data.categories)

  return (
    <MainContainer>
      <LeftPanel
        topImgOpt=''
        topBtnText='calculator'
        topBtnPath='/calculator'
        bottomCard={true}
      />

      <RightContainer gap='lg:gap-32' lgPadding='lg:p-10'>
        <Header
          title='ZombieMarkt Groceries'
          subtitle='Where prices are dropped dead'
          typeWritter
        />
        {loading ? (
          <Loading />
        ) : (
          data.categories && (
            <div className='mt-5 lg:m-0'>
              <ItemList
                array={data.categories}
                gridOpt='grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-5 md:gap-x-20 lg:gap-y-20 lg:gap-x-40'
                itemContainerOpt='lg:w-56 h-40'
                itemImg='w-40 h-40 object-scale-down'
                redirectToDetail={false}
              />
            </div>
          )
        )}
      </RightContainer>
    </MainContainer>
  )
}

export default HomePage
