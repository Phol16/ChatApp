import{Route, Routes} from 'react-router-dom'
import LoginLayout from '../layouts/LoginLayout'


function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginLayout/>}/>
    </Routes>
  )
}

export default App
