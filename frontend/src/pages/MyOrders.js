import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { StoreContext } from '../context/StoreContext'

const MyOrders = () => {
  const { token, url } = useContext(StoreContext)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return
      const response = await axios.post(url + '/api/order/userorders', { userId: token })
      if (response.data.success) setOrders(response.data.data)
    }
    fetchOrders()
  }, [token])

  return (
    <div style={{ padding: '20px 30px' }}>
      <h2>My Orders</h2>
      {orders.length === 0
        ? <p>No orders yet!</p>
        : orders.map(order => (
            <div key={order._id} style={styles.card}>
              <p>🍕 <b>Order ID:</b> {order._id}</p>
              <p><b>Amount:</b> ₹{order.amount}</p>
              <p><b>Status:</b> <span style={styles.status}>{order.status}</span></p>
              <p><b>Date:</b> {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          ))
      }
    </div>
  )
}

const styles = {
  card: { border: '1px solid #eee', borderRadius: '10px', padding: '20px', marginBottom: '15px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  status: { background: '#ff6b35', color: 'white', padding: '3px 10px', borderRadius: '20px', fontSize: '14px' }
}

export default MyOrders