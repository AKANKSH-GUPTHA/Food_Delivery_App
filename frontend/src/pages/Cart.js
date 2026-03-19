import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'

const Cart = () => {
  const { cartItems, removeFromCart, addToCart, getTotalCartAmount, url } = useContext(StoreContext)
  const [foodList, setFoodList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFood = async () => {
      const response = await axios.get(url + '/api/food/list')
      if (response.data.success) setFoodList(response.data.data)
    }
    fetchFood()
  }, [])

  const cartFood = foodList.filter(f => cartItems[f._id] > 0)
  const total = getTotalCartAmount(foodList)

  return (
    <div style={{ padding: '20px 30px' }}>
      <h2>Your Cart</h2>
      {cartFood.length === 0
        ? <p>Your cart is empty!</p>
        : <>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartFood.map(item => (
                  <tr key={item._id}>
                    <td><img src={`${url}/images/${item.image}`} alt={item.name} style={styles.img} /></td>
                    <td>{item.name}</td>
                    <td>₹{item.price}</td>
                    <td>
                      <button onClick={() => removeFromCart(item._id)} style={styles.qtyBtn}>-</button>
                      {cartItems[item._id]}
                      <button onClick={() => addToCart(item._id)} style={styles.qtyBtn}>+</button>
                    </td>
                    <td>₹{item.price * cartItems[item._id]}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={styles.summary}>
              <h3>Cart Summary</h3>
              <p>Subtotal: ₹{total}</p>
              <p>Delivery: ₹40</p>
              <h3>Total: ₹{total + 40}</h3>
              <button onClick={() => navigate('/order')} style={styles.btn}>
                Proceed to Checkout
              </button>
            </div>
          </>
      }
    </div>
  )
}

const styles = {
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: '20px' },
  img: { width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' },
  qtyBtn: { background: '#ff6b35', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '3px', cursor: 'pointer', margin: '0 5px' },
  summary: { background: '#f9f9f9', padding: '20px', borderRadius: '10px', maxWidth: '300px' },
  btn: { background: '#ff6b35', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }
}

export default Cart