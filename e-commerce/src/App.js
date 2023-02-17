import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainContainer from './components/containers/MainContainer'
import Navbar from './components/navbar/Navbar'
import HomePage from './pages/HomePage'
const App = () => {
  return (
    <BrowserRouter>
      <MainContainer>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </MainContainer>
    </BrowserRouter>
  )
}
export default App
