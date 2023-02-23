import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import LeftPanel from '../components/leftPanel/LeftPanel'
import Header from '../components/header/Header'
import MainContainer from '../components/containers/MainContainer'
import RightContainer from '../components/containers/RightContainer'
import useFetch from '../hooks/useFetch'
import ItemList from '../components/lists/ItemList'
import Loading from '../components/loading/Loading'

const ProductsPage = () => {
  const { category } = useParams()
  const navigate = useNavigate()

  const url = `http://localhost:5500/api/products/category/${category}`

  const { loading, data, error } = useFetch(url)

  return (
    <MainContainer>
      <LeftPanel bottomCard />

      <RightContainer gap='lg:gap-20'>
        <Header title={category} typeWritter={false} />
        {loading ? (
          <Loading />
        ) : (
          data.products && (
            <>
              <ItemList
                array={data.products}
                gridOpt='grid-cols-2  lg:grid-cols-3 gap-y-10 lg:gap-y-10 gap-x-5 lg:gap-x-10'
                itemContainerOpt='lg:w-[340px] h-64'
                itemImg='w-56 h-56 object-scale-down'
                redirectToDetail
              />

              <img
                src={data.products[0].category.image}
                alt={data.products[0].category.name}
                className='absolute bottom-0 right-3'
              />
            </>
          )
        )}
      </RightContainer>
    </MainContainer>
  )
}

export default ProductsPage
