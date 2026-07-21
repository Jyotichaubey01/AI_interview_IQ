import React from 'react'
import { motion } from 'framer-motion'

const Auth = () => {
  const handleGoogleLogin = () => {
    // TODO: wire up your Google OAuth or auth flow here
    console.log('Continue with clicked')
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
          style={styles.button}
          onClick={handleGoogleLogin}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          whileHover={{ scale: 1.03, backgroundColor: '#4b5563' }}
          whileTap={{ scale: 0.97 }}
        >
          Continue
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
    padding: '0.75rem',
    background: '#6b7280',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
}

export default Auth