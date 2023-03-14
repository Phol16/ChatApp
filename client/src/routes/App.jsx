import{Route, Routes} from 'react-router-dom'
import IntroLayout from '../layouts/IntroLayout'

function App() {
  return (
    <Routes>
      <Route path='/' element={<IntroLayout/>}/>
    </Routes>
  )
}

export default App
