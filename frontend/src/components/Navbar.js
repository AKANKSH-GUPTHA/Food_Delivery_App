import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'

const Navbar = ({ setShowLogin }) => {
  const { token, setToken, cartItems } = useContext(StoreContext)
  const navigate = useNavigate()

  const totalItems = Object.values(cartItems).reduce((a, b) => a + b, 0)

  const logout = () => {
    setToken('')
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>🍕 FoodApp</h2>
      <div style={styles.links}>
        <Link to='/' style={styles.link}>Home</Link>
        <Link to='/cart' style={styles.link}>
          Cart {totalItems > 0 && <span style={styles.badge}>{totalItems}</span>}
        </Link>
        {token
          ? <>
              <Link to='/myorders' style={styles.link}>Orders</Link>
              <button onClick={logout} style={styles.btn}>Logout</button>
            </>
          : <button onClick={() => setShowLogin(true)} style={styles.btn}>Login</button>
        }
      </div>
    </nav>
  )
}

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', background: '#ff6b35', color: 'white' },
  logo: { margin: 0, color: 'white' },
  links: { display: 'flex', gap: '20px', alignItems: 'center' },
  link: { color: 'white', textDecoration: 'none', fontWeight: 'bold' },
  btn: { background: 'white', color: '#ff6b35', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
  badge: { background: 'white', color: '#ff6b35', borderRadius: '50%', padding: '2px 6px', fontSize: '12px', marginLeft: '4px' }
}

export default Navbar