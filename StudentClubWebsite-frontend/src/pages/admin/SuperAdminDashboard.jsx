import React, { useState } from 'react';
import UsersManager from './UsersManager';
import EventsManager from './EventsManager';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUsers, FaCalendarAlt } from 'react-icons/fa';

const tabs = [
  { key: 'events', label: 'Events', icon: <FaCalendarAlt /> },
  { key: 'users', label: 'Users', icon: <FaUsers /> },
];

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('events');

  return (
    <div style={styles.wrapper}>
      {/* Background neon blobs */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      {/* Sidebar */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={styles.sidebar}
      >
        <motion.div
          animate={{ textShadow: ['0 0 4px rgba(255,0,51,0.3)', '0 0 15px rgba(255,0,51,0.9)', '0 0 4px rgba(255,0,51,0.3)'] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          style={styles.logo}
        >
          ⚙️ SUPER ADMIN
        </motion.div>

        <div style={styles.nav}>
          {tabs.map((tab) => (
            <motion.div
              key={tab.key}
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.key)}
              style={{
                ...styles.navItem,
                ...(activeTab === tab.key ? styles.navItemActive : {}),
              }}
            >
              <span style={{ marginRight: 10 }}>{tab.icon}</span>
              {tab.label}

              {activeTab === tab.key && (
                <motion.div
                  layoutId="activeIndicator"
                  style={styles.indicator}
                />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <div style={styles.main}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.header}
        >
          <h1 style={styles.title}>Dashboard 🚀</h1>
          <p style={styles.subtitle}>Narxoz Clubs Content Management System</p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25 }}
            style={styles.card}
          >
            {activeTab === 'events' && <EventsManager />}
            {activeTab === 'users' && <UsersManager />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0,
    background: '#050505',
    fontFamily: 'Inter, sans-serif',
    color: '#ffffff',
    overflow: 'hidden',
    position: 'relative',
  },
  blob1: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(255,0,51,0.08) 0%, transparent 70%)',
    top: '-100px',
    left: '-100px',
    animation: 'floatBg 6s ease-in-out infinite',
    pointerEvents: 'none',
  },
  blob2: {
    position: 'absolute',
    width: '350px',
    height: '350px',
    background: 'radial-gradient(circle, rgba(255,0,51,0.05) 0%, transparent 70%)',
    bottom: '-100px',
    right: '-100px',
    animation: 'floatBg 8s ease-in-out infinite',
    pointerEvents: 'none',
  },
  sidebar: {
    width: '260px',
    background: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(10px)',
    borderRight: '1px solid rgba(255, 255, 255, 0.05)',
    padding: '30px 20px',
    zIndex: 2,
  },
  logo: {
    fontSize: '18px',
    fontWeight: '900',
    marginBottom: '40px',
    color: '#fff',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 15px',
    borderRadius: '10px',
    cursor: 'pointer',
    color: '#9ca3af',
    position: 'relative',
    transition: 'all 0.3s',
    fontWeight: '500',
  },
  navItemActive: {
    background: 'rgba(255, 0, 51, 0.1)',
    color: '#ff0033',
    fontWeight: '700',
  },
  indicator: {
    position: 'absolute',
    left: 0,
    top: '10%',
    bottom: '10%',
    width: '4px',
    background: '#ff0033',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(255,0,51,0.5)',
  },
  main: {
    flex: 1,
    padding: '40px',
    zIndex: 2,
    overflowY: 'auto',
  },
  header: {
    marginBottom: '30px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '900',
    margin: 0,
    color: '#fff',
  },
  subtitle: {
    marginTop: '8px',
    color: '#9ca3af',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(12px)',
    borderRadius: '16px',
    padding: '30px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
    minHeight: '600px',
  },
};

export default SuperAdminDashboard;