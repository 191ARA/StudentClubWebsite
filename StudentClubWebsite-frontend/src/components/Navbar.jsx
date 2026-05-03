import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/clubs');
    };

    return (
        <>
            <style>
                {`
                    @keyframes syncRedPulse {
                        0% { text-shadow: 0 0 4px rgba(255,0,51,0.3); opacity: 0.8; }
                        50% { text-shadow: 0 0 15px rgba(255,0,51,0.9); opacity: 1; }
                        100% { text-shadow: 0 0 4px rgba(255,0,51,0.3); opacity: 0.8; }
                    }
                    @keyframes syncRedBorderPulse {
                        0% { border-bottom-color: rgba(255,0,51,0.1); box-shadow: 0 2px 10px rgba(255,0,51,0.05); }
                        50% { border-bottom-color: rgba(255,0,51,0.6); box-shadow: 0 2px 20px rgba(255,0,51,0.25); }
                        100% { border-bottom-color: rgba(255,0,51,0.1); box-shadow: 0 2px 10px rgba(255,0,51,0.05); }
                    }
                    .pulse-text { animation: syncRedPulse 2.5s infinite ease-in-out; }
                    .pulse-border-nav { animation: syncRedBorderPulse 2.5s infinite ease-in-out; }
                `}
            </style>

            <nav style={styles.nav} className="pulse-border-nav">

                {/* LEFT */}
                <div style={styles.left}>
                    <Link to="/clubs" style={styles.logo}>
                        <span style={styles.logoAccent} className="pulse-text">NARXOZ</span> CLUBS
                    </Link>

                    <div style={styles.navLinks}>
                        <Link
                            to="/clubs"
                            style={styles.navItem}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.color = '#ff0033';
                                e.currentTarget.style.background = 'rgba(255,0,51,0.08)';
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,0,51,0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.color = '#9ca3af';
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            Clubs
                        </Link>

                        <Link
                            to="/events"
                            style={styles.navItem}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.color = '#ff0033';
                                e.currentTarget.style.background = 'rgba(255,0,51,0.08)';
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,0,51,0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.color = '#9ca3af';
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            Events
                        </Link>
                    </div>
                </div>

                {/* RIGHT */}
                <div style={styles.right}>
                    {user ? (
                        <>
                            {user.role === 'SUPER_ADMIN' && (
                                <Link
                                    to="/superadmin"
                                    style={styles.admin}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,215,0,0.12)';
                                        e.currentTarget.style.boxShadow = '0 0 18px rgba(255,215,0,0.5)';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.borderColor = 'rgba(255,215,0,0.8)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.boxShadow = 'none';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.borderColor = 'rgba(255,215,0,0.4)';
                                    }}
                                >
                                    🛡 Admin
                                </Link>
                            )}

                            {/* USER */}
                            <div style={styles.user}>
                                <div style={styles.avatar}>
                                    {user.email?.[0]?.toUpperCase()}
                                </div>

                                <div>
                                    <div style={styles.username}>
                                        {user.email.split('@')[0]}
                                    </div>
                                    <div style={styles.role}>
                                        {user.role}
                                    </div>
                                </div>
                            </div>

                            {/* LOGOUT */}
                            <button
                                onClick={handleLogout}
                                style={styles.logout}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,65,54,0.12)';
                                    e.currentTarget.style.boxShadow = '0 0 18px rgba(255,65,54,0.5)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.borderColor = 'rgba(255,65,54,0.8)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = 'rgba(255,65,54,0.5)';
                                }}
                            >
                                Exit
                            </button>
                        </>
                    ) : (
                        <>
                            <Link 
                                to="/login" 
                                style={styles.link}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#ff0033'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                            >
                                Log in
                            </Link>

                            <Link 
                                to="/register" 
                                style={styles.cta}
                                className="pulse-text"
                                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 0, 51, 0.6)'}
                                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
}

const styles = {
    nav: {
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        height: 70,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 40px',
        background: 'rgba(10,10,10,0.85)', 
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(255,0,51,0.1)' // Базовый красный бордер
    },
    left: { display: 'flex', alignItems: 'center', gap: 40 },
    logo: { color: '#fff', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 900, letterSpacing: '1px' },
    logoAccent: { color: '#ff0033' }, // Красный цвет
    navLinks: { display: 'flex', gap: 14 },
    navItem: { color: '#9ca3af', textDecoration: 'none', fontSize: 14, fontWeight: 600, padding: '8px 12px', borderRadius: 10, transition: 'all 0.3s ease', cursor: 'pointer' },
    right: { display: 'flex', alignItems: 'center', gap: 14 },
    admin: { padding: '6px 10px', borderRadius: 8, border: '1px solid rgba(255,215,0,0.4)', color: '#FFD700', textDecoration: 'none', fontSize: 12, transition: '0.2s ease' },
    user: { display: 'flex', alignItems: 'center', gap: 10, padding: '6px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' },
    avatar: { width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #ff0033, #b30024)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff' }, // Красный градиент
    username: { fontSize: 13, color: '#fff', fontWeight: 600, lineHeight: 1 },
    role: { fontSize: 10, color: '#ff0033', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '2px' }, // Красная роль
    logout: { padding: '7px 12px', borderRadius: 8, border: '1px solid rgba(255,65,54,0.5)', background: 'transparent', color: '#FF4136', cursor: 'pointer', fontSize: 13, fontWeight: 600, transition: 'all 0.3s ease' },
    link: { color: '#9ca3af', textDecoration: 'none', fontSize: 14, fontWeight: 600, transition: 'color 0.3s ease' },
    cta: { padding: '8px 16px', borderRadius: 10, background: 'linear-gradient(135deg, #ff0033, #cc0029)', color: '#fff', textDecoration: 'none', fontSize: 13, fontWeight: 800, transition: 'all 0.3s ease', textTransform: 'uppercase', letterSpacing: '0.5px' } // Красный градиент
};