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

      <RightContainer gap='lg:gap-32'>
        <Header
          title='ZombieMarkt Groceries'
          subtitle='Where prices are dropped dead'
          typeWritter
        />
        {loading ? (
          <Loading />
        ) : (
          data.categories && (
            <ItemList
              array={data.categories}
              gridOpt='grid-cols-2  lg:grid-cols-4 gap-y-10 lg:gap-y-20 gap-x-5 lg:gap-x-40'
              itemContainerOpt='lg:w-56 h-40'
              itemImg='w-40 h-40 object-scale-down'
              redirectToDetail={false}
            />
          )
        )}
      </RightContainer>
    </MainContainer>
  )
}

export default HomePage
