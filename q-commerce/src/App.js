import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppContainer from './components/containers/AppContainer'
import Navbar from './components/navbar/Navbar'
import ProductsPage from './pages/ProductsPage'
import HomePage from './pages/Home'
import Details from './pages/Details'
import { CartProvider } from './store/CartContext'
import Login from './pages/Login'
import AnimationProvider from './store/AnimationContext'
import Calculator from './pages/Calculator'
import SurvivalKits from './pages/SurvivalKits'
import SignUp from './pages/SignUp'
import UserProvider from './store/UserContext'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { RedirectProvider } from './store/RedirectContext'
import Footer from './components/footer/Footer'
import SplashScreen from './pages/SplashScreen'
import { LanguageProvider } from './store/LanguageContext'
const App = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <UserProvider>
          <CartProvider>
            <RedirectProvider>
              <AnimationProvider>
                <AppContainer>
                  <Navbar />
                  <Routes>
                    <Route path='/' element={<SplashScreen />} />
                    <Route path='/home' element={<HomePage />} />
                    <Route
                      path='/products/:category'
                      element={<ProductsPage />}
                    />
                    <Route
                      path='/products/details/:_id'
                      element={<Details />}
                    />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/calculator' element={<Calculator />} />
                    <Route path='/survivalKits' element={<SurvivalKits />} />
                    <Route
                      path='/profile'
                      element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path='/cart'
                      element={
                        <ProtectedRoute>
                          <Cart />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                  <Footer display='laptop' />
                </AppContainer>
              </AnimationProvider>
            </RedirectProvider>
          </CartProvider>
        </UserProvider>
      </LanguageProvider>
    </BrowserRouter>
  )
}
export default App
