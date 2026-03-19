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
    localStorage.removeItem('cart')
    navigate('/')
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <span style={styles.logoIcon}>🍛</span>
        <span style={styles.logoText}>SpiceRoute</span>
      </div>
      <div style={styles.links}>
        <Link to='/' style={styles.link}>Home</Link>
        <Link to='/cart' style={styles.cartLink}>
          🛒 Cart
          {totalItems > 0 && <span style={styles.badge}>{totalItems}</span>}
        </Link>
        {token
          ? <>
              <Link to='/myorders' style={styles.link}>My Orders</Link>
              <button onClick={logout} style={styles.logoutBtn}>Logout</button>
            </>
          : <button onClick={() => setShowLogin(true)} style={styles.loginBtn}>Login</button>
        }
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 40px',
    background: 'linear-gradient(135deg, #6C3483 0%, #9B59B6 100%)',
    boxShadow: '0 4px 20px rgba(108, 52, 131, 0.3)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: { display: 'flex', alignItems: 'center', gap: '10px' },
  logoIcon: { fontSize: '32px' },
  logoText: {
    fontSize: '24px',
    fontWeight: '800',
    color: 'white',
    letterSpacing: '1px',
  },
  links: { display: 'flex', gap: '25px', alignItems: 'center' },
  link: {
    color: 'rgba(255,255,255,0.9)',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '15px',
    transition: 'color 0.3s',
  },
  cartLink: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '15px',
    position: 'relative',
    background: 'rgba(255,255,255,0.15)',
    padding: '8px 16px',
    borderRadius: '20px',
  },
  badge: {
    background: '#E74C3C',
    color: 'white',
    borderRadius: '50%',
    padding: '2px 7px',
    fontSize: '11px',
    marginLeft: '5px',
    fontWeight: 'bold',
  },
  loginBtn: {
    background: 'linear-gradient(135deg, #27AE60, #2ECC71)',
    color: 'white',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '14px',
    boxShadow: '0 4px 15px rgba(39, 174, 96, 0.4)',
    transition: 'transform 0.2s',
  },
  logoutBtn: {
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: '2px solid rgba(255,255,255,0.5)',
    padding: '8px 20px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
  },
}

export default Navbar