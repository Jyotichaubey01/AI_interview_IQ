import React from 'react'
import { motion } from 'framer-motion'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../utils/firebase'
import axios from 'axios'
import { useDispatch } from 'react-redux'

const ServerUrl = 'http://localhost:8000'

const Auth = () => {
  const dispatch = useDispatch()

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      const user = response.user
      const name = user.displayName
      const email = user.email
      dispatch(setUserData(result.data))

      const result = await axios.post(
        ServerUrl + '/api/auth/google',
        { name, email },
        { withCredentials: true }
      )

      console.log(result.data)

    } catch (error) {
      console.log(error)
      dispatch(setUserData(null))
    }
  }

  return (
    <motion.div
      style={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        style={styles.card}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.div
          style={styles.logoRow}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <div style={styles.logoIcon}>🤖</div>
          <span style={styles.logoText}>InterviewIQ.AI</span>
        </motion.div>

        <motion.h2
          style={styles.heading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Continue with
        </motion.h2>

        <motion.div
          style={styles.badge}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4, type: 'spring' }}
        >
          ✨ AI Smart Interview
        </motion.div>

        <motion.p
          style={styles.description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          Sign in to start AI-powered mock interviews, track your progress,
          and unlock detailed performance insights.
        </motion.p>

        <motion.button
          onClick={handleGoogleAuth}
          style={styles.button}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          whileHover={{ scale: 1.03, backgroundColor: '#2d2d2d' }}
          whileTap={{ scale: 0.97 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f5f7',
  },
  card: {
    background: '#fff',
    padding: '2.5rem 2rem',
    borderRadius: '16px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
    width: '360px',
    textAlign: 'center',
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  logoIcon: {
    width: '28px',
    height: '28px',
    background: '#1a1a1a',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
  },
  logoText: {
    fontWeight: 600,
    fontSize: '1rem',
    color: '#1a1a1a',
  },
  heading: {
    fontSize: '1.4rem',
    fontWeight: 700,
    color: '#1a1a1a',
    marginBottom: '0.75rem',
  },
  badge: {
    display: 'inline-block',
    background: '#e6f9ec',
    color: '#1a9850',
    fontWeight: 600,
    fontSize: '0.95rem',
    padding: '0.5rem 1rem',
    borderRadius: '999px',
    marginBottom: '1.25rem',
  },
  description: {
    color: '#6b7280',
    fontSize: '0.9rem',
    lineHeight: 1.5,
    marginBottom: '1.75rem',
  },
  button: {
    width: '100%',
    padding: '0.75rem 1rem',
    background: '#1a1a1a',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

export default Auth