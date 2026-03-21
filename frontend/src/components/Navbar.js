import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'

const Navbar = ({ setShowLogin }) => {
  const { token, setToken, cartItems } = useContext(StoreContext)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const totalItems = Object.values(cartItems).reduce((a, b) => a + b, 0)

  const logout = () => {
    setToken('')
    localStorage.removeItem('token')
    localStorage.removeItem('cart')
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <>
      <nav style={styles.nav}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>🍛</span>
          <span style={styles.logoText}>SpiceRoute</span>
        </div>

        {/* Desktop Links */}
        <div style={styles.desktopLinks}>
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

        {/* Mobile Hamburger */}
        <button style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          <Link to='/' style={styles.mobileLink} onClick={() => setMenuOpen(false)}>🏠 Home</Link>
          <Link to='/cart' style={styles.mobileLink} onClick={() => setMenuOpen(false)}>
            🛒 Cart {totalItems > 0 && <span style={styles.badge}>{totalItems}</span>}
          </Link>
          {token
            ? <>
                <Link to='/myorders' style={styles.mobileLink} onClick={() => setMenuOpen(false)}>📦 My Orders</Link>
                <button onClick={logout} style={styles.mobileLogoutBtn}>Logout</button>
              </>
            : <button onClick={() => { setShowLogin(true); setMenuOpen(false) }} style={styles.mobileLoginBtn}>Login</button>
          }
        </div>
      )}
    </>
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
  logoIcon: { fontSize: '28px' },
  logoText: {
    fontSize: '22px',
    fontWeight: '800',
    color: 'white',
    letterSpacing: '1px',
  },
  desktopLinks: {
    display: 'flex',
    gap: '25px',
    alignItems: 'center',
    '@media (max-width: 768px)': { display: 'none' }
  },
  link: {
    color: 'rgba(255,255,255,0.9)',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '15px',
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
  hamburger: {
    display: 'none',
    background: 'rgba(255,255,255,0.2)',
    border: 'none',
    color: 'white',
    fontSize: '22px',
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '8px',
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
    background: '#6C3483',
    padding: '20px',
    gap: '15px',
    position: 'sticky',
    top: '60px',
    zIndex: 99,
  },
  mobileLink: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    padding: '12px 15px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '10px',
  },
  mobileLoginBtn: {
    background: 'linear-gradient(135deg, #27AE60, #2ECC71)',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '16px',
  },
  mobileLogoutBtn: {
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: '2px solid rgba(255,255,255,0.5)',
    padding: '12px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '16px',
  },
}

export default Navbar