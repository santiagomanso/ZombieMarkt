import { useParams } from 'react-router-dom'
import LeftPanel from '../components/leftPanel/LeftPanel'
import Header from '../components/header/Header'
import MainContainer from '../components/containers/MainContainer'
import RightContainer from '../components/containers/RightContainer'
import useFetch from '../hooks/useFetch'
import ItemList from '../components/lists/ItemList'
import Loading from '../components/loading/Loading'
import { useContext, useEffect, useState } from 'react'
import { LanguageContext } from '../store/LanguageContext'

const ProductsPage = () => {
  const { category } = useParams()
  const [products, setProducts] = useState([])

  //extraction from context
  const { txt } = useContext(LanguageContext)

  const url = `${process.env.REACT_APP_SERVER_URL}/api/products/category/${category}`

  const { loading, data } = useFetch(url)

  //function to switch the name of the category
  const checkName = (category) => {
    switch (true) {
      case category === 'beverages':
        return txt.beverages

      case category === 'snacks':
        return txt.snacks
      case category === 'hygiene':
        return txt.hygiene
      case category === 'meat':
        return txt.meat
      case category === 'pasta':
        return txt.pasta
      case category === 'fruits':
        return txt.fruits
      case category === 'vegetables':
        return txt.vegetables
      case category === 'breakfast':
        return txt.breakfast

      default:
        return ''
    }
  }

  useEffect(() => {
    if (data) setProducts(data.products)
  }, [data])

  return (
    <MainContainer>
      <LeftPanel bottomCard />

      <RightContainer gap='gap-5 lg:gap-20' padding='p-5 lg:p-10' overflowAuto>
        <Header
          title={checkName(category)}
          typeWritter={false}
          goBack
          opt='pl-3 lg:pl-0 lg:pt-3'
        />
        {loading ? (
          <Loading />
        ) : products.length > 0 ? (
          <>
            <ItemList
              array={products}
              shortName
              gridOpt='grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-y-10 lg:gap-y-10 gap-x-5 lg:gap-x-10 w-full'
              itemContainerOpt='lg:w-[340px] h-64 w-full'
              itemImg='w-56 h-56 object-scale-down'
              redirectToDetail
            />

            <img
              src={products[0].category.image}
              alt={products[0].category.name}
              className='hidden lg:block absolute bottom-0 right-3'
            />
          </>
        ) : (
          <article className='flex flex-col items-center gap-2'>
            <span className='text-xl lg:text-3xl'>
              {txt.noProducts}
              <span className='font-bold text-xl lg:text-3xl'>
                {checkName(category)}
              </span>
            </span>
            <a
              href={`${process.env.REACT_APP_INVENTORY_MANAGER}/create/${category}`}
              target='_blank'
              rel='noreferrer'
              className='text-lg lg:text-3xl bg-gradient-to-br from-orange-400/70 to-amber-600/90 rounded flex gap-1 items-baseline outline outline-2 outline-orange-900/40  
              px-4 text-center lg:px-6 lg:py-4 text-gray-200'
            >
              {txt.clickMeToReStock}
            </a>
          </article>
        )}
      </RightContainer>
    </MainContainer>
  )
}

export default ProductsPage
