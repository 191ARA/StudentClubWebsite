import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';

const UsersManager = () => {
    const [users, setUsers] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ role: 'USER', club: null });

    const fetchData = async () => {
        const usersRes = await apiClient.get('/users');
        const clubsRes = await apiClient.get('/clubs');
        setUsers(usersRes.data);
        setClubs(clubsRes.data);
    };

    useEffect(() => { fetchData(); }, []);

    const handleEdit = (user) => {
        setEditingId(user.id);
        setFormData({ role: user.role, club: user.club });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await apiClient.put(`/users/${editingId}`, formData);
            setEditingId(null);
            fetchData();
        } catch (error) {
            alert('Ошибка при обновлении пользователя');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Точно удалить этого пользователя?')) return;
        await apiClient.delete(`/users/${id}`);
        fetchData();
    };

    return (
        <div>
            <h2>👥 Пользователи</h2>
            
            {editingId && (
                <form onSubmit={handleSave} style={{ marginBottom: '20px', padding: '15px', background: '#eefcf5', border: '1px solid #4CAF50' }}>
                    <h3>Изменение прав доступа</h3>
                    <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} style={{ marginRight: '10px', padding: '5px' }}>
                        <option value="USER">USER (Студент)</option>
                        <option value="ADMIN">ADMIN (Модератор клуба)</option>
                        <option value="SUPER_ADMIN">SUPER_ADMIN (Создатель)</option>
                    </select>

                    <select value={formData.club ? formData.club.id : ''} onChange={e => {
                        const selectedClub = clubs.find(c => c.id === e.target.value) || null;
                        setFormData({...formData, club: selectedClub});
                    }} style={{ marginRight: '10px', padding: '5px' }}>
                        <option value="">Без клуба</option>
                        {clubs.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>

                    <button type="submit" style={{ padding: '6px 15px', background: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Обновить права</button>
                    <button type="button" onClick={() => setEditingId(null)} style={{ marginLeft: '10px', padding: '6px 15px' }}>Отмена</button>
                </form>
            )}

            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }} border="1" cellPadding="10">
                <thead style={{ background: '#eee' }}>
                    <tr><th>Email</th><th>Роль</th><th>Привязка к клубу</th><th>Действия</th></tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.email}</td>
                            <td><b style={{ color: user.role === 'SUPER_ADMIN' ? 'red' : 'inherit' }}>{user.role}</b></td>
                            <td>{user.club ? user.club.name : '—'}</td>
                            <td style={{ textAlign: 'center' }}>
                                <button onClick={() => handleEdit(user)} style={{ marginRight: '10px' }}>⚙️ Настроить</button>
                                <button onClick={() => handleDelete(user.id)} style={{ color: 'red' }}>🗑️ Удалить</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersManager;