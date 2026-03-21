import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import StoreContextProvider from './context/StoreContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import MyOrders from './pages/MyOrders'
import LoginPopup from './components/LoginPopup'

function App() {
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    fetch("https://food-delivery-app-s8rh.onrender.com/api/food/list")
      .catch(() => {});
  }, [])

  return (
    <StoreContextProvider>
      <Router>
        <ToastContainer />
        {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
      </Router>
    </StoreContextProvider>
  )
}

export default App