import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { StoreContext } from '../context/StoreContext'

const Home = () => {
  const [foodList, setFoodList] = useState([])
  const [category, setCategory] = useState('All')
  const { addToCart, cartItems, url } = useContext(StoreContext)

  const categories = ['All', 'Salad', 'Rolls', 'Deserts', 'Sandwich', 'Cake', 'Pure Veg', 'Pasta', 'Noodles']

  useEffect(() => {
    const fetchFood = async () => {
      const response = await axios.get(url + '/api/food/list')
      if (response.data.success) setFoodList(response.data.data)
    }
    fetchFood()
  }, [])

  const filtered = category === 'All' ? foodList : foodList.filter(f => f.category === category)

  return (
    <div style={{ padding: '20px 30px' }}>
      <div style={styles.hero}>
        <h1>Order your favourite food here</h1>
        <p>Choose from a diverse menu featuring a delectable array of dishes</p>
      </div>

      <h2>Explore our menu</h2>
      <div style={styles.categories}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}
            style={{ ...styles.catBtn, background: category === cat ? '#ff6b35' : '#f0f0f0', color: category === cat ? 'white' : 'black' }}>
            {cat}
          </button>
        ))}
      </div>

      <h2>Top dishes near you</h2>
      {filtered.length === 0
        ? <p>No food items found. Add some from the admin panel!</p>
        : <div style={styles.grid}>
            {filtered.map(item => (
              <div key={item._id} style={styles.card}>
                <img src={item.image} alt={item.name} style={styles.img} />
                <div style={styles.cardBody}>
                  <h3>{item.name}</h3>
                  <p style={styles.desc}>{item.description}</p>
                  <div style={styles.cardFooter}>
                    <span style={styles.price}>₹{item.price}</span>
                    <button onClick={() => addToCart(item._id)} style={styles.addBtn}>
                      {cartItems[item._id] ? `Added (${cartItems[item._id]})` : 'Add +'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
      }
    </div>
  )
}

const styles = {
  hero: { background: 'linear-gradient(to right, #ff6b35, #f7c59f)', padding: '40px', borderRadius: '10px', color: 'white', marginBottom: '30px' },
  categories: { display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' },
  catBtn: { padding: '8px 16px', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' },
  card: { border: '1px solid #eee', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  img: { width: '100%', height: '180px', objectFit: 'cover' },
  cardBody: { padding: '15px' },
  desc: { color: '#666', fontSize: '14px' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' },
  price: { fontWeight: 'bold', color: '#ff6b35', fontSize: '18px' },
  addBtn: { background: '#ff6b35', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '5px', cursor: 'pointer' }
}

export default Home