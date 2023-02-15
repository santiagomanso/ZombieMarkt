import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppContainer from './components/container/AppContainer'
import Navbar from './components/navbar/Navbar'
import HomePage from './pages/homePage/HomePage'
import CreatePage from './pages/create/CreatePage'
import UpdatePage from './pages/update/UpdatePage'
import ProductContextProvider from './context/ProductContext'
import Details from './pages/detailPage/Details'
import DeletePage from './pages/deletePage/DeletePage'

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
            <Route path='/delete/' element={<DeletePage />} />
          </Routes>
        </AppContainer>
      </BrowserRouter>
    </ProductContextProvider>
  )
}
export default App
