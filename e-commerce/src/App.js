import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppContainer from './components/containers/AppContainer'
import Navbar from './components/navbar/Navbar'
import Categories from './pages/Categories'
import HomePage from './pages/HomePage'
const App = () => {
  return (
    <BrowserRouter>
      <AppContainer>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/categories' element={<Categories />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  )
}
export default App
