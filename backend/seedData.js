const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Food = require('./models/foodModel')

dotenv.config()

const foods = [
  // Indian
  { name: 'Butter Chicken', description: 'Creamy tomato based chicken curry, a North Indian classic', price: 320, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400', category: 'Indian' },
  { name: 'Paneer Tikka', description: 'Grilled cottage cheese marinated in spiced yogurt', price: 280, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400', category: 'Indian' },
  { name: 'Dal Makhani', description: 'Slow cooked black lentils in rich buttery gravy', price: 220, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400', category: 'Indian' },
  { name: 'Palak Paneer', description: 'Fresh cottage cheese in smooth spinach gravy', price: 240, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', category: 'Curry' },

  // Biryani
  
  { name: 'Veg Biryani', description: 'Fragrant basmati rice with fresh vegetables and saffron', price: 280, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400', category: 'Biryani' },
  { name: 'Hyderabadi Biryani', description: 'Authentic Hyderabadi dum biryani with tender meat', price: 399, image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400', category: 'Biryani' },

  // Curry
  { name: 'Chicken Tikka Masala', description: 'Tender chicken in rich spiced tomato cream sauce', price: 340, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', category: 'Curry' },
  { name: 'Mutton Rogan Josh', description: 'Slow cooked mutton in Kashmiri spice gravy', price: 420, image: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=400', category: 'Curry' },

  // Rolls
  { name: 'Paneer Roll', description: 'Soft wheat roll stuffed with spiced paneer and veggies', price: 129, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400', category: 'Rolls' },
  { name: 'Chicken Kathi Roll', description: 'Flaky paratha filled with spiced chicken and onions', price: 149, image: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?w=400', category: 'Rolls' },

  // Dessert
  
  { name: 'Chocolate Cake', description: 'Rich layered chocolate cake with ganache frosting', price: 179, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', category: 'Dessert' },
  

  // Salad
  { name: 'Caesar Salad', description: 'Fresh romaine lettuce with caesar dressing and croutons', price: 149, image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400', category: 'Salad' },
  { name: 'Kachumber Salad', description: 'Fresh Indian salad with cucumber, tomato and onion', price: 99, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400', category: 'Salad' },

  // Sandwich
  { name: 'Veg Sandwich', description: 'Healthy grilled vegetable sandwich with cheese', price: 99, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400', category: 'Sandwich' },
  { name: 'Club Sandwich', description: 'Triple layered sandwich with chicken, egg and veggies', price: 149, image: 'https://images.unsplash.com/photo-1567234669003-dce7a7a88821?w=400', category: 'Sandwich' },

  // Pasta
  { name: 'Pasta Alfredo', description: 'Creamy white sauce pasta with parmesan cheese', price: 249, image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400', category: 'Pasta' },
  { name: 'Penne Arrabbiata', description: 'Spicy tomato sauce pasta with garlic and chili', price: 229, image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400', category: 'Pasta' },
]

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB ✅')
    await Food.deleteMany()
    await Food.insertMany(foods)
    console.log('✅ 20 food items added successfully!')
    process.exit()
  })
  .catch(err => console.log(err))