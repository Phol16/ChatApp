import{Route, Routes} from 'react-router-dom'
import LoginLayout from '../layouts/LoginLayout'
import MainPageLayout from '../layouts/MainLayout'


function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginLayout/>}/>
      <Route path='/home' element={<MainPageLayout/>}/>
    </Routes>
  )
}

export default App
