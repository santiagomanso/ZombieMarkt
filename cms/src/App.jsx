import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppContainer from './components/container/AppContainer'
import Navbar from './components/navbar/Navbar'
import HomePage from './pages/homePage/HomePage'
import CreatePage from './pages/createPage/CreatePage'
import UpdatePage from './pages/updatePage/UpdatePage'
import ProductContextProvider from './context/ProductContext'
import Details from './pages/detailPage/Details'
import DeletePage from './pages/deletePage/DeletePage'
import UsersPage from './pages/users/UsersPage'
import AllProducts from './pages/products/AllProducts'
import OrdersPage from './pages/orders/OrdersPage'

const App = () => {
  return (
    <ProductContextProvider>
      <BrowserRouter>
        <AppContainer>
          <Navbar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/create' element={<CreatePage />} />
            <Route path='/update' element={<UpdatePage />} />
            <Route path='/details/:id' element={<Details />} />
            <Route path='/delete' element={<DeletePage />} />
            <Route path='/users' element={<UsersPage />} />
            <Route path='/products' element={<AllProducts />} />
            <Route path='/orders' element={<OrdersPage />} />
          </Routes>
        </AppContainer>
      </BrowserRouter>
    </ProductContextProvider>
  )
}
export default App
