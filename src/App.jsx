// src/App.jsx
import { Box } from '@mui/material'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Booking from './pages/Booking'
import Reviews from './pages/Reviews'
import Admin from './pages/Admin'
import LoginPage from './pages/LoginPage'


import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/admin/dashboard" element={<Admin />} />
        <Route path="/admin/login" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
