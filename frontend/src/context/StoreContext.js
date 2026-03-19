import React, { createContext, useState } from 'react'

export const StoreContext = createContext(null)

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({})
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const url = 'http://localhost:4000'

  const addToCart = (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }))
  }

  const removeFromCart = (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: prev[itemId] - 1
    }))
  }

  const getTotalCartAmount = (foodList) => {
    let total = 0
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const item = foodList.find(f => f._id === itemId)
        if (item) total += item.price * cartItems[itemId]
      }
    }
    return total
  }

  const contextValue = {
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    url
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider