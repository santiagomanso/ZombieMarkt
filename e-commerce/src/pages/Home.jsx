import LeftPanel from '../components/leftPanel/LeftPanel'
import Header from '../components/header/Header'
import RightContainer from '../components/containers/RightContainer'
import MainContainer from '../components/containers/MainContainer'
import ItemList from '../components/lists/ItemList'
import useFetch from '../hooks/useFetch'
import Loading from '../components/loading/Loading'
import { useParams } from 'react-router-dom'

const HomePage = () => {
  const { loading, data } = useFetch(
    `${process.env.REACT_APP_SERVER_URL}/api/categories/all`,
  )

  return (
    <MainContainer>
      <LeftPanel
        topImgOpt=''
        topBtnText='coming soon!'
        topBtnPath='/calculator'
        bottomCard
      />

      <RightContainer gap='gap-5 lg:gap-32' padding='p-5 lg:p-0' overflowAuto>
        <Header
          title='ZombieMarkt Groceries'
          subtitle='Where prices are dropped dead'
          typeWritter
          opt='px-5 lg:py-5 lg:px-8  mt-0 lg:mt-0'
        />
        {loading ? (
          <Loading />
        ) : (
          data.categories && (
            <div className='lg:m-0 w-full lg:w-5/6'>
              <ItemList
                array={data.categories}
                gridOpt='grid-cols-1 lg:grid-cols-4 gap-y-10 gap-x-5 md:gap-x-20 lg:gap-y-10 lg:gap-x-10 p-0 lg:p-0'
                itemContainerOpt='w-full h-[150px]  lg:w-[270px] lg:h-[200px] '
                itemImg='w-32 h-32  lg:w-48 lg:h-48 object-scale-down'
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
