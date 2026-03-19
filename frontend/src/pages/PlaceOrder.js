import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { StoreContext } from '../context/StoreContext'

const PlaceOrder = () => {
  const { cartItems, token, url, getTotalCartAmount } = useContext(StoreContext)
const [foodList, setFoodList] = useState([])
useEffect(async () => {
  const response = await axios.get(url + '/api/food/list')
  if (response.data.success) setFoodList(response.data.data)
}, [])
  const navigate = useNavigate()
  const [data, setData] = useState({
    firstName: '', lastName: '', email: '',
    street: '', city: '', state: '', zipcode: '', phone: ''
  })

  const onChangeHandler = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const placeOrder = async (e) => {
    e.preventDefault()
    if (!token) {
      toast.error('Please login first!')
      return
    }
    try {
      const orderData = {
        userId: token,
        items: cartItems,
        amount: getTotalCartAmount(foodList) + 40,
        address: data
      }
      const response = await axios.post(url + '/api/order/place', orderData)
      if (response.data.success) {
        toast.success('Order placed successfully!')
        navigate('/myorders')
      }
    } catch (error) {
      toast.error('Something went wrong!')
    }
  }

  return (
    <div style={{ padding: '20px 30px' }}>
      <h2>Place Order</h2>
      <form onSubmit={placeOrder} style={styles.form}>
        <h3>Delivery Information</h3>
        <div style={styles.row}>
          <input style={styles.input} name='firstName' placeholder='First name' onChange={onChangeHandler} required />
          <input style={styles.input} name='lastName' placeholder='Last name' onChange={onChangeHandler} required />
        </div>
        <input style={styles.input} name='email' type='email' placeholder='Email' onChange={onChangeHandler} required />
        <input style={styles.input} name='street' placeholder='Street' onChange={onChangeHandler} required />
        <div style={styles.row}>
          <input style={styles.input} name='city' placeholder='City' onChange={onChangeHandler} required />
          <input style={styles.input} name='state' placeholder='State' onChange={onChangeHandler} required />
        </div>
        <div style={styles.row}>
          <input style={styles.input} name='zipcode' placeholder='Zipcode' onChange={onChangeHandler} required />
          <input style={styles.input} name='phone' placeholder='Phone' onChange={onChangeHandler} required />
        </div>
        <button type='submit' style={styles.btn}>Place Order</button>
      </form>
    </div>
  )
}

const styles = {
  form: { maxWidth: '500px' },
  row: { display: 'flex', gap: '10px' },
  input: { width: '100%', padding: '10px', margin: '8px 0', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' },
  btn: { background: '#ff6b35', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', width: '100%', marginTop: '10px' }
}

export default PlaceOrder