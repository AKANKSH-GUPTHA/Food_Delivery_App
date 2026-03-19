const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Food = require('./models/foodModel')

dotenv.config()

const foods = [
  { name: 'Margherita Pizza', description: 'Classic pizza with fresh tomato sauce and mozzarella cheese', price: 299, image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400', category: 'Pure Veg' },
  { name: 'Chicken Burger', description: 'Juicy grilled chicken burger with lettuce, tomato and mayo', price: 199, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', category: 'Rolls' },
  { name: 'Caesar Salad', description: 'Fresh romaine lettuce with caesar dressing and croutons', price: 149, image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400', category: 'Salad' },
  { name: 'Pasta Alfredo', description: 'Creamy white sauce pasta with parmesan cheese', price: 249, image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400', category: 'Pasta' },
  { name: 'Chocolate Cake', description: 'Rich layered chocolate cake with ganache frosting', price: 179, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', category: 'Cake' },
  { name: 'Veg Sandwich', description: 'Healthy grilled vegetable sandwich with cheese', price: 99, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400', category: 'Sandwich' },
  { name: 'Hakka Noodles', description: 'Stir fried noodles with fresh vegetables and soy sauce', price: 169, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400', category: 'Noodles' },
  { name: 'Paneer Roll', description: 'Soft wheat roll stuffed with spiced paneer and veggies', price: 129, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400', category: 'Rolls' },
  { name: 'Greek Salad', description: 'Fresh cucumber, tomatoes, olives and feta cheese', price: 169, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400', category: 'Salad' },
  { name: 'Chicken Pizza', description: 'Loaded chicken pizza with bell peppers and onions', price: 349, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400', category: 'Rolls' },
  { name: 'Strawberry Cake', description: 'Light sponge cake with fresh strawberries and cream', price: 199, image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400', category: 'Cake' },
  { name: 'Penne Arrabbiata', description: 'Spicy tomato sauce pasta with garlic and chili', price: 229, image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400', category: 'Pasta' },
  { name: 'Club Sandwich', description: 'Triple layered sandwich with chicken, egg and veggies', price: 149, image: 'https://images.unsplash.com/photo-1567234669003-dce7a7a88821?w=400', category: 'Sandwich' },
  { name: 'Veg Fried Rice', description: 'Wok tossed rice with fresh vegetables and soy sauce', price: 149, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400', category: 'Noodles' },
]

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB ✅')
    await Food.deleteMany()
    await Food.insertMany(foods)
    console.log('✅ 14 food items added successfully!')
    process.exit()
  })
  .catch(err => console.log(err))