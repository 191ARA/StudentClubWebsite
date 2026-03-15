import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';

const EventsManager = () => {
    const [events, setEvents] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '', eventDate: '', clubId: '' });

    const fetchData = async () => {
        const eventsRes = await apiClient.get('/events');
        const clubsRes = await apiClient.get('/clubs');
        setEvents(eventsRes.data);
        setClubs(clubsRes.data);
    };

    useEffect(() => { fetchData(); }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await apiClient.put(`/events/${editingId}`, formData);
            } else {
                await apiClient.post('/events', formData);
            }
            setEditingId(null);
            setFormData({ title: '', description: '', eventDate: '', clubId: '' });
            fetchData();
        } catch (error) {
            alert('Ошибка при сохранении');
        }
    };

    const handleEdit = (event) => {
        setEditingId(event.id);
        setFormData({ 
            title: event.title, 
            description: event.description, 
            eventDate: event.eventDate.substring(0, 16), // Формат YYYY-MM-DDTHH:mm
            clubId: event.club ? event.club.id : ''
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Удалить мероприятие?')) return;
        await apiClient.delete(`/events/${id}`);
        fetchData();
    };

    return (
        <div>
            <h2>📅 Мероприятия</h2>
            <form onSubmit={handleSave} style={{ marginBottom: '20px', padding: '15px', background: 'white', border: '1px solid #ccc', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <input type="text" placeholder="Название" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ padding: '5px' }} />
                <input type="text" placeholder="Описание" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ padding: '5px' }} />
                <input type="datetime-local" required value={formData.eventDate} onChange={e => setFormData({...formData, eventDate: e.target.value})} style={{ padding: '5px' }} />
                
                <select required value={formData.clubId} onChange={e => setFormData({...formData, clubId: e.target.value})} disabled={editingId !== null} style={{ padding: '5px' }}>
                    <option value="" disabled>Выберите клуб...</option>
                    {clubs.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>

                <button type="submit" style={{ padding: '6px 15px', background: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Сохранить</button>
                {editingId && <button type="button" onClick={() => {setEditingId(null); setFormData({title:'', description:'', eventDate:'', clubId:''})}} style={{ padding: '6px 15px' }}>Отмена</button>}
            </form>

            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }} border="1" cellPadding="10">
                <thead style={{ background: '#eee' }}>
                    <tr><th>Название</th><th>Дата</th><th>Клуб</th><th>Действия</th></tr>
                </thead>
                <tbody>
                    {events.map(event => (
                        <tr key={event.id}>
                            <td>{event.title}</td>
                            <td>{new Date(event.eventDate).toLocaleString()}</td>
                            <td>{event.club ? event.club.name : '—'}</td>
                            <td style={{ textAlign: 'center' }}>
                                <button onClick={() => handleEdit(event)} style={{ marginRight: '10px' }}>✏️ Изменить</button>
                                <button onClick={() => handleDelete(event.id)} style={{ color: 'red' }}>🗑️ Удалить</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EventsManager;