import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';

const EventsList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await apiClient.get('/events');
                // Можно отсортировать мероприятия по дате (сначала ближайшие)
                const sortedEvents = response.data.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
                setEvents(sortedEvents);
            } catch (error) {
                console.error("Не удалось загрузить мероприятия", error);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div>
            <h1 style={{ marginBottom: '20px', borderBottom: '2px solid #2E3B55', paddingBottom: '10px' }}>
                🎉 Предстоящие мероприятия
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {events.length === 0 ? <p>Мероприятий пока нет...</p> : null}
                
                {events.map(event => (
                    <div key={event.id} style={{ 
                        border: '1px solid #e0e0e0', 
                        borderRadius: '8px', 
                        overflow: 'hidden',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                        backgroundColor: '#fff',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {/* "Шапка" карточки с датой */}
                        <div style={{ backgroundColor: '#2E3B55', color: 'white', padding: '10px 15px', fontWeight: 'bold' }}>
                            {new Date(event.eventDate).toLocaleString('ru-RU', { 
                                day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' 
                            })}
                        </div>
                        
                        {/* Тело карточки */}
                        <div style={{ padding: '15px', flex: 1 }}>
                            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{event.title}</h3>
                            <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>
                                {event.description}
                            </p>
                        </div>
                        
                        {/* "Подвал" карточки с клубом */}
                        <div style={{ padding: '10px 15px', backgroundColor: '#f9f9f9', borderTop: '1px solid #eee', fontSize: '13px', color: '#555' }}>
                            Организатор: <b>{event.club ? event.club.name : 'Неизвестный клуб'}</b>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventsList;