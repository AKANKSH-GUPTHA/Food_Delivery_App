const express = require('express')
const router = express.Router()
const Order = require('../models/orderModel')
const User = require('../models/userModel')

// Place order
router.post('/place', async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body
    const order = new Order({ userId, items, amount, address })
    await order.save()
    res.json({ success: true, message: 'Order placed!' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
})

// Get user orders
router.post('/userorders', async (req, res) => {
  try {
    const { userId } = req.body
    const orders = await Order.find({ userId })
    res.json({ success: true, data: orders })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
})

// Update order status
router.post('/status', async (req, res) => {
  try {
    const { orderId, status } = req.body
    await Order.findByIdAndUpdate(orderId, { status })
    res.json({ success: true, message: 'Status updated!' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
})

// Get all orders (admin)
router.get('/list', async (req, res) => {
  try {
    const orders = await Order.find()
    res.json({ success: true, data: orders })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
})

module.exports = router