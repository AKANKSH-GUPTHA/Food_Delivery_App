import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { StoreContext } from '../context/StoreContext'

const Home = () => {
  const [foodList, setFoodList] = useState([])
  const [category, setCategory] = useState('All')
  const [hoveredCard, setHoveredCard] = useState(null)
  const { addToCart, cartItems, url } = useContext(StoreContext)

  const categories = ['All', 'Indian', 'Biryani', 'Curry', 'Salad', 'Dessert', 'Sandwich', 'Pasta', 'Rolls']

  useEffect(() => {
    const fetchFood = async () => {
      const response = await axios.get(url + '/api/food/list')
      if (response.data.success) setFoodList(response.data.data)
    }
    fetchFood()
  }, [])

  const filtered = category === 'All' ? foodList : foodList.filter(f => f.category === category)

  return (
    <div style={{ padding: '0', background: '#FFF8F0', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* Hero Section */}
      <div className="hero-section" style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>🌶️ Authentic Indian Flavours</div>
          <h1 className="hero-title" style={styles.heroTitle}>
            Order Your <span style={styles.heroHighlight}>Favourite</span>
            <br />Food Here
          </h1>
          <p className="hero-subtitle" style={styles.heroSubtitle}>
            Choose from a diverse menu featuring authentic Indian dishes,
            delivered fresh to your doorstep
          </p>
          <div style={styles.heroStats}>
            <div style={styles.stat}><b>50+</b><span>Dishes</span></div>
            <div style={styles.statDivider} />
            <div style={styles.stat}><b>30min</b><span>Delivery</span></div>
            <div style={styles.statDivider} />
            <div style={styles.stat}><b>4.8★</b><span>Rating</span></div>
          </div>
        </div>
        <div className="hero-emoji" style={styles.heroImage}>🍛</div>
        <div style={styles.heroCircle1} />
        <div style={styles.heroCircle2} />
      </div>

      <div className="main-padding" style={{ padding: '30px 40px' }}>
        {/* Categories */}
        <h2 style={styles.sectionTitle}>Explore our menu</h2>
        <div className="categories-container" style={styles.categories}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              style={{
                ...styles.catBtn,
                background: category === cat
                  ? 'linear-gradient(135deg, #6C3483, #9B59B6)'
                  : 'white',
                color: category === cat ? 'white' : '#6C3483',
                border: category === cat ? 'none' : '2px solid #6C3483',
                transform: category === cat ? 'scale(1.05)' : 'scale(1)',
                boxShadow: category === cat ? '0 4px 15px rgba(108,52,131,0.3)' : 'none',
                flexShrink: 0,
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Food Grid */}
        <h2 style={styles.sectionTitle}>Top dishes near you</h2>
        {filtered.length === 0
          ? <p style={{ color: '#888', fontSize: '16px' }}>No food items in this category!</p>
          : <div className="food-grid" style={styles.grid}>
              {filtered.map(item => (
                <div key={item._id}
                  style={{
                    ...styles.card,
                    transform: hoveredCard === item._id
                      ? 'translateY(-12px) scale(1.02)'
                      : 'translateY(0) scale(1)',
                    boxShadow: hoveredCard === item._id
                      ? '0 20px 40px rgba(108,52,131,0.25)'
                      : '0 4px 15px rgba(0,0,0,0.08)',
                  }}
                  onMouseEnter={() => setHoveredCard(item._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div style={styles.imgWrapper}>
                    <img src={item.image} alt={item.name} style={styles.img} />
                    <div style={styles.categoryTag}>{item.category}</div>
                  </div>
                  <div style={styles.cardBody}>
                    <h3 style={styles.foodName}>{item.name}</h3>
                    <p style={styles.desc}>{item.description}</p>
                    <div style={styles.cardFooter}>
                      <span style={styles.price}>₹{item.price}</span>
                      <button
                        onClick={() => addToCart(item._id)}
                        style={{
                          ...styles.addBtn,
                          background: cartItems[item._id]
                            ? 'linear-gradient(135deg, #27AE60, #2ECC71)'
                            : 'linear-gradient(135deg, #E74C3C, #C0392B)',
                        }}>
                        {cartItems[item._id] ? `✓ (${cartItems[item._id]})` : '+ Add'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        }
      </div>
    </div>
  )
}

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #6C3483 0%, #9B59B6 50%, #F39C12 100%)',
    padding: '60px 40px',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '350px',
  },
  heroContent: { position: 'relative', zIndex: 2, maxWidth: '600px' },
  heroBadge: {
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    padding: '8px 20px',
    borderRadius: '25px',
    fontSize: '14px',
    fontWeight: '600',
    display: 'inline-block',
    marginBottom: '20px',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: '800',
    color: 'white',
    lineHeight: '1.2',
    marginBottom: '15px',
  },
  heroHighlight: {
    color: '#F9E79F',
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '30px',
  },
  heroStats: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    alignItems: 'center',
  },
  statDivider: {
    width: '1px',
    height: '30px',
    background: 'rgba(255,255,255,0.3)',
  },
  heroImage: {
    fontSize: '120px',
    position: 'relative',
    zIndex: 2,
  },
  heroCircle1: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.05)',
    top: '-100px',
    right: '200px',
  },
  heroCircle2: {
    position: 'absolute',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.08)',
    bottom: '-50px',
    left: '300px',
  },
  sectionTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#6C3483',
    marginBottom: '20px',
    borderLeft: '4px solid #F39C12',
    paddingLeft: '15px',
  },
  categories: {
    display: 'flex',
    gap: '12px',
    overflowX: 'auto',
    paddingBottom: '10px',
    marginBottom: '30px',
    scrollbarWidth: 'none',
  },
  catBtn: {
    padding: '10px 22px',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '25px',
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  imgWrapper: { position: 'relative' },
  img: { width: '100%', height: '200px', objectFit: 'cover' },
  categoryTag: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    background: 'linear-gradient(135deg, #6C3483, #9B59B6)',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '15px',
    fontSize: '12px',
    fontWeight: '600',
  },
  cardBody: { padding: '18px' },
  foodName: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: '8px',
  },
  desc: { color: '#7F8C8D', fontSize: '13px', lineHeight: '1.5', marginBottom: '15px' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontWeight: '800', color: '#C0392B', fontSize: '20px' },
  addBtn: {
    color: 'white',
    border: 'none',
    padding: '10px 14px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '13px',
    transition: 'all 0.3s ease',
  },
}

export default Home