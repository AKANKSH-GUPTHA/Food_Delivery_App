const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const authRoute = require('./routes/authRoute')
const foodRoute = require('./routes/foodRoute')
const orderRoute = require('./routes/orderRoute')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/images', express.static(path.join(__dirname, 'uploads')))

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected ✅'))
  .catch((err) => console.log('DB Error:', err))

// Routes
app.use('/api/auth', authRoute)
app.use('/api/food', foodRoute)
app.use('/api/order', orderRoute)

app.get('/', (req, res) => {
  res.send('Food Delivery API is running!')
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ✅`)
})