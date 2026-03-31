import { Route, Routes } from 'react-router-dom'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import About from './pages/About'
import Certificates from './pages/Certificates'
import Contact from './pages/Contact'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Landing from './pages/Landing'
import Projects from './pages/Projects'

export default function App() {
  return (
    <>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<NotFound />} />

        {/* Main Page */}
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}
