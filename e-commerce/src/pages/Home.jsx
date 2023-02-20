import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import LeftPanel from '../components/leftPanel/LeftPanel'
import Header from '../components/header/Header'
import RightContainer from '../components/containers/RightContainer'
import MainContainer from '../components/containers/MainContainer'
import ItemList from '../components/lists/ItemList'
import useFetch from '../hooks/useFetch'
import Loading from '../components/loading/Loading'

const HomePage = () => {
  const navigate = useNavigate()
  const [animate, setAnimate] = useState('animate__animated animate__fadeIn')

  const { loading, data, error } = useFetch(
    'http://localhost:5500/api/categories/all',
  )
  // console.log('data.categories', data.categories)

  const handleNavigate = (path) => {
    setAnimate('animate__animated animate__fadeOut')
    setTimeout(() => {
      navigate(path)
    }, 800)
  }

  return (
    <MainContainer animation={animate}>
      <LeftPanel />

      <RightContainer gap='lg:gap-32'>
        <Header
          handleNavigate={handleNavigate}
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
            />
          )
        )}
      </RightContainer>
    </MainContainer>
  )
}

export default HomePage
