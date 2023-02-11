import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppContainer from './components/container/AppContainer'
import Navbar from './components/navbar/Navbar'
import HomePage from './pages/homePage/HomePage'
import Inbound from './pages/inbound/Inbound'

const App = () => {
  return (
    <BrowserRouter>
      <AppContainer>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/inbound' element={<Inbound />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  )
}
export default App
