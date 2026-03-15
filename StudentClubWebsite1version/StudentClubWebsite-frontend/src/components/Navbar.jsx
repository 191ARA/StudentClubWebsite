import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/clubs'); // После выхода оставляем на главной публичной странице
    };

    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 30px',
        backgroundColor: '#2E3B55',
        color: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    };

    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        marginLeft: '20px',
        fontWeight: 'bold',
        fontSize: '15px'
    };

    return (
        <nav style={navStyle}>
            {/* ЛЕВАЯ ЧАСТЬ: Логотип и публичные ссылки (доступны всем) */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link to="/clubs" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 'bold', marginRight: '30px' }}>
                    🎓 СтудКлуб
                </Link>
                
                <Link to="/clubs" style={linkStyle}>Клубы</Link>
                <Link to="/events" style={linkStyle}>Мероприятия</Link>
            </div>

            {/* ПРАВАЯ ЧАСТЬ: Авторизация или Профиль */}
            <div>
                {user ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {/* Админка только для SUPER_ADMIN */}
                        {user.role === 'SUPER_ADMIN' && (
                            <Link to="/superadmin" style={{ ...linkStyle, color: '#FFD700', marginRight: '20px' }}>
                                ⚙️ Админка
                            </Link>
                        )}
                        
                        <span style={{ fontSize: '0.9rem', color: '#ccc' }}>
                            {user.email}
                        </span>
                        
                        <button 
                            onClick={handleLogout} 
                            style={{ marginLeft: '15px', padding: '6px 15px', backgroundColor: '#FF4136', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Выйти
                        </button>
                    </div>
                ) : (
                    <div>
                        <Link to="/login" style={linkStyle}>Войти</Link>
                        <Link to="/register" style={{ ...linkStyle, backgroundColor: '#4CAF50', padding: '8px 15px', borderRadius: '4px' }}>
                            Регистрация
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;