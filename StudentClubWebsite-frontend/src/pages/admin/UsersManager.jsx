import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import { motion, AnimatePresence } from 'framer-motion';

const UsersManager = () => {
    const [users, setUsers] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/users');
            setUsers(response.data);
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    const requestDelete = (id) => setDeleteId(id);

    const confirmDelete = async () => {
        try {
            await apiClient.delete(`/users/${deleteId}`);
            setUsers(prev => prev.filter(u => u.id !== deleteId));
            setDeleteId(null);
        } catch (error) {
            console.error("Failed to delete user", error);
        }
    };

    const getRoleStyle = (role) => {
        switch (role) {
            case 'SUPER_ADMIN': return { color: '#ef4444', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.5px' };
            case 'ADMIN': return { color: '#f59e0b', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.5px' };
            default: return { color: '#6b7280', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.5px' };
        }
    };

    const filtered = users.filter(u =>
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={styles.wrapper}>

            {/* HEADER */}
            <div style={styles.header}>
                <h2>👥 Users</h2>

                <input
                    placeholder="Search by email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={styles.search}
                />
            </div>

            {/* LIST */}
            <div style={styles.grid}>
                {loading ? (
                    <p>Loading...</p>
                ) : filtered.map(user => (
                    <motion.div
                        key={user.id}
                        whileHover={{ scale: 1.02 }}
                        style={styles.card}
                    >
                        <div style={styles.cardInfo}>
                            <div style={styles.avatar}>
                                {user.email.charAt(0).toUpperCase()}
                            </div>
                            
                            <div style={styles.userDetails}>
                                <div style={styles.email}>{user.email}</div>
                                <div style={getRoleStyle(user.role)}>
                                    {user.role}
                                </div>
                            </div>
                        </div>

                        <button onClick={() => requestDelete(user.id)} style={styles.deleteBtn}>
                            🗑️ Delete
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* DELETE MODAL */}
            <AnimatePresence>
                {deleteId && (
                    <motion.div style={styles.overlay}>
                        <motion.div style={styles.modal}>
                            <h3 style={{ marginTop: 0 }}>Delete user?</h3>
                            <p style={{ color: '#6b7280', marginBottom: '20px' }}>This action cannot be undone.</p>

                            <div style={styles.modalActions}>
                                <button onClick={() => setDeleteId(null)} style={styles.cancelBtn}>Cancel</button>
                                <button onClick={confirmDelete} style={styles.deleteBtnSolid}>Delete</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

const styles = {
    wrapper: { display: 'flex', flexDirection: 'column', gap: 20 },

    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' },
    search: { padding: '10px 15px', borderRadius: 10, border: '1px solid #ddd', minWidth: '250px' },

    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 15
    },

    card: {
        background: '#fff',
        padding: '15px 20px',
        borderRadius: 16,
        border: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
    },

    cardInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: 15
    },

    avatar: {
        width: 45,
        height: 45,
        borderRadius: '50%',
        background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        flexShrink: 0
    },

    userDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4
    },

    email: { fontWeight: 700, fontSize: '1.05rem', color: '#1f2937', wordBreak: 'break-all' },

    deleteBtn: { 
        background: '#fee2e2', 
        color: '#dc2626', 
        border: 'none', 
        padding: '8px 12px', 
        borderRadius: 8, 
        fontWeight: 600, 
        cursor: 'pointer',
        flexShrink: 0 
    },

    overlay: {
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 50,
        backdropFilter: 'blur(4px)'
    },

    modal: {
        background: '#fff', padding: '25px', borderRadius: 16, width: '100%', maxWidth: 420,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
    },

    modalActions: { display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 },

    cancelBtn: { background: '#f3f4f6', color: '#4b5563', border: 'none', padding: '10px 16px', borderRadius: 8, fontWeight: 600, cursor: 'pointer' },
    deleteBtnSolid: { background: '#ef4444', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }
};

export default UsersManager;