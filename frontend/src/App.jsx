import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ClassicArt from './pages/ClassicArt'
import DigitalArt from './pages/DigitalArt'
import Shop from './pages/Shop'
import ArtworkDetail from './pages/ArtworkDetail'
import Contact from './pages/Contact'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/classic" element={<ClassicArt />} />
      <Route path="/digital" element={<DigitalArt />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/:id" element={<ArtworkDetail />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  )
}

export default App
