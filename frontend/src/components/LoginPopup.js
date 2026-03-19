import React, { useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { StoreContext } from '../context/StoreContext'

const LoginPopup = ({ setShowLogin }) => {
  const { setToken, url } = useContext(StoreContext)
  const [currState, setCurrState] = useState('Login')
  const [data, setData] = useState({ name: '', email: '', password: '' })

  const onChangeHandler = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const endpoint = currState === 'Login' ? '/api/auth/login' : '/api/auth/register'
      const response = await axios.post(url + endpoint, data)
      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
        toast.success(currState + ' successful!')
        setShowLogin(false)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error('Something went wrong!')
    }
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h2>{currState}</h2>
        <form onSubmit={onSubmit}>
          {currState === 'Sign Up' && (
            <input style={styles.input} name='name' placeholder='Your name' onChange={onChangeHandler} required />
          )}
          <input style={styles.input} name='email' type='email' placeholder='Your email' onChange={onChangeHandler} required />
          <input style={styles.input} name='password' type='password' placeholder='Password' onChange={onChangeHandler} required />
          <button style={styles.btn} type='submit'>{currState}</button>
        </form>
        {currState === 'Login'
          ? <p>Don't have an account? <span style={styles.toggle} onClick={() => setCurrState('Sign Up')}>Sign Up</span></p>
          : <p>Already have an account? <span style={styles.toggle} onClick={() => setCurrState('Login')}>Login</span></p>
        }
        <span style={styles.close} onClick={() => setShowLogin(false)}>✕</span>
      </div>
    </div>
  )
}

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' },
  popup: { background: 'white', padding: '40px', borderRadius: '10px', width: '350px', position: 'relative' },
  input: { width: '100%', padding: '10px', margin: '8px 0', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' },
  btn: { width: '100%', padding: '12px', background: '#ff6b35', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' },
  toggle: { color: '#ff6b35', cursor: 'pointer', fontWeight: 'bold' },
  close: { position: 'absolute', top: '15px', right: '20px', cursor: 'pointer', fontSize: '20px' }
}

export default LoginPopup