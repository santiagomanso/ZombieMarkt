import { useParams } from 'react-router-dom'
import MainContainer from '../components/containers/MainContainer'
import RightContainer from '../components/containers/RightContainer'
import Header from '../components/header/Header'
import LeftPanel from '../components/leftPanel/LeftPanel'
import Loading from '../components/loading/Loading'
import useFetch from '../hooks/useFetch'

const ProductDetail = () => {
  const { _id } = useParams()
  const { loading, data, error } = useFetch(
    `http://localhost:5500/api/products/detail/${_id}`,
  )
  return (
    <MainContainer>
      <LeftPanel />
      <RightContainer>
        {loading ? (
          <Loading />
        ) : data.product ? (
          <>
            <Header title={data.product.name} />
          </>
        ) : (
          ''
        )}
      </RightContainer>
    </MainContainer>
  )
}

export default ProductDetail
