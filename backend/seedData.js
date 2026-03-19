const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Food = require('./models/foodModel')

dotenv.config()

const foods = [
  { name: 'Margherita Pizza', description: 'Classic pizza with tomato sauce and cheese', price: 299, image: 'pizza.jpg', category: 'Pure Veg' },
  { name: 'Chicken Burger', description: 'Juicy chicken burger with lettuce and mayo', price: 199, image: 'burger.jpg', category: 'Rolls' },
  { name: 'Caesar Salad', description: 'Fresh salad with caesar dressing', price: 149, image: 'salad.jpg', category: 'Salad' },
  { name: 'Pasta Alfredo', description: 'Creamy white sauce pasta', price: 249, image: 'pasta.jpg', category: 'Pasta' },
  { name: 'Chocolate Cake', description: 'Rich chocolate layered cake', price: 179, image: 'cake.jpg', category: 'Cake' },
  { name: 'Veg Sandwich', description: 'Healthy vegetable sandwich', price: 99, image: 'sandwich.jpg', category: 'Sandwich' },
  { name: 'Noodles', description: 'Stir fried noodles with vegetables', price: 169, image: 'noodles.jpg', category: 'Noodles' },
  { name: 'Paneer Roll', description: 'Soft roll stuffed with paneer', price: 129, image: 'roll.jpg', category: 'Rolls' },
]

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB ✅')
    await Food.deleteMany()
    await Food.insertMany(foods)
    console.log('Food data added successfully! ✅')
    process.exit()
  })
  .catch(err => console.log(err))