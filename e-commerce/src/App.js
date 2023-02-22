import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppContainer from './components/containers/AppContainer'
import Navbar from './components/navbar/Navbar'
import ProductsPage from './pages/Products'
import HomePage from './pages/Home'
import Details from './pages/Details'
import { CartProvider } from './store/CartContext'
const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppContainer>
          <Navbar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/products/:category' element={<ProductsPage />} />
            <Route path='/products/details/:_id' element={<Details />} />
          </Routes>
        </AppContainer>
      </BrowserRouter>
    </CartProvider>
  )
}
export default App
