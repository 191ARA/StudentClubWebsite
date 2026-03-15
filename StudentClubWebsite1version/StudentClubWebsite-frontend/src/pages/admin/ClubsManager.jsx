import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';

const ClubsManager = () => {
    const [clubs, setClubs] = useState([]);
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [editingId, setEditingId] = useState(null);

    const fetchClubs = async () => {
        const res = await apiClient.get('/clubs');
        setClubs(res.data);
    };

    useEffect(() => { fetchClubs(); }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await apiClient.put(`/clubs/${editingId}`, formData);
            } else {
                await apiClient.post('/clubs', formData);
            }
            setFormData({ name: '', description: '' });
            setEditingId(null);
            fetchClubs();
        } catch (error) {
            alert('Ошибка при сохранении клуба');
        }
    };

    const handleEdit = (club) => {
        setEditingId(club.id);
        setFormData({ name: club.name, description: club.description });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Удалить клуб? Все его мероприятия будут удалены!')) return;
        await apiClient.delete(`/clubs/${id}`);
        fetchClubs();
    };

    return (
        <div>
            <h2>📚 Клубы</h2>
            <form onSubmit={handleSave} style={{ marginBottom: '20px', padding: '15px', background: 'white', border: '1px solid #ccc' }}>
                <h3>{editingId ? 'Редактировать' : 'Добавить'}</h3>
                <input type="text" placeholder="Название" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ marginRight: '10px', padding: '5px' }} />
                <input type="text" placeholder="Описание" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ marginRight: '10px', padding: '5px', width: '300px' }} />
                <button type="submit" style={{ padding: '6px 15px', background: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Сохранить</button>
                {editingId && <button type="button" onClick={() => {setEditingId(null); setFormData({name:'', description:''})}} style={{ marginLeft: '10px', padding: '6px 15px' }}>Отмена</button>}
            </form>

            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }} border="1" cellPadding="10">
                <thead style={{ background: '#eee' }}>
                    <tr><th>Название</th><th>Описание</th><th>Действия</th></tr>
                </thead>
                <tbody>
                    {clubs.map(club => (
                        <tr key={club.id}>
                            <td>{club.name}</td>
                            <td>{club.description}</td>
                            <td style={{ textAlign: 'center' }}>
                                <button onClick={() => handleEdit(club)} style={{ marginRight: '10px' }}>✏️ Изменить</button>
                                <button onClick={() => handleDelete(club.id)} style={{ color: 'red' }}>🗑️ Удалить</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClubsManager;