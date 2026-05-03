import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(email, password);
            navigate('/clubs');
        } catch (err) {
            setError(err.response?.data || 'Ошибка при регистрации');
        }
    };

    return (
        <div style={styles.page}>

            {/* CLEAN BACKGROUND */}
            <div style={styles.bg} />

            <div style={styles.card}>

                <h2 style={styles.title}>Create account</h2>
                <p style={styles.subtitle}>
                    Join Narxoz Clubs 🚀
                </p>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        required
                    />

                    <button type="submit" style={styles.button}>
                        Create account
                    </button>

                </form>

                <p style={styles.bottomText}>
                    Already have account? <Link to="/login" style={styles.link}>Sign in</Link>
                </p>

            </div>

        </div>
    );
};

const styles = {
    page: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        /* КЛЮЧЕВОЕ: изоляция от navbar/footer */
        position: 'fixed',
        inset: 0,
        zIndex: 9999,

        background: '#050505',
        overflow: 'hidden',
        fontFamily: 'Inter, sans-serif'
    },

    bg: {
        position: 'absolute',
        inset: 0,
        background: `
            radial-gradient(circle at 50% 30%, rgba(63,185,80,0.12), transparent 60%),
            radial-gradient(circle at 20% 80%, rgba(46,160,67,0.08), transparent 60%)
        `,
        filter: 'blur(60px)'
    },

    card: {
        position: 'relative',
        width: 380,
        padding: 40,
        borderRadius: 18,

        background: 'rgba(15,15,15,0.75)',
        border: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(16px)',

        boxShadow: '0 30px 80px rgba(0,0,0,0.7)',
        zIndex: 2
    },

    title: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 800,
        marginBottom: 6
    },

    subtitle: {
        color: '#9ca3af',
        fontSize: 14,
        marginBottom: 25
    },

    error: {
        background: 'rgba(255,65,54,0.08)',
        border: '1px solid rgba(255,65,54,0.2)',
        color: '#ff6b6b',
        padding: 10,
        borderRadius: 10,
        fontSize: 13,
        marginBottom: 15
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12
    },

    input: {
        padding: '12px 14px',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(0,0,0,0.4)',
        color: '#fff',
        outline: 'none',
        transition: '0.2s'
    },

    button: {
        marginTop: 8,
        padding: '12px',
        borderRadius: 12,
        border: 'none',
        background: 'linear-gradient(135deg,#3fb950,#2ea043)',
        color: '#fff',
        fontWeight: 600,
        cursor: 'pointer',
        boxShadow: '0 10px 25px rgba(63,185,80,0.25)',
        transition: '0.2s'
    },

    bottomText: {
        marginTop: 16,
        fontSize: 13,
        color: '#9ca3af',
        textAlign: 'center'
    },

    link: {
        color: '#3fb950',
        textDecoration: 'none',
        fontWeight: 600
    }
};

export default Register;