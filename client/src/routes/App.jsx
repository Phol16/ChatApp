import{Route, Routes} from 'react-router-dom'
import LoginLayout from '../layouts/LoginLayout'
import MainPage from '../pages/MainPage'


function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginLayout/>}/>
      <Route path='/home' element={<MainPage/>}/>
    </Routes>
  )
}

export default App
