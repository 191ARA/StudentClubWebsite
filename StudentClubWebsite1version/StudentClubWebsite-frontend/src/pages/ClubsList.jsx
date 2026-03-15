import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';
import { useAuth } from '../context/AuthContext';

const ClubsList = () => {
    const [clubs, setClubs] = useState([]);
    const { user, logout } = useAuth();

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const response = await apiClient.get('/clubs');
                setClubs(response.data);
            } catch (error) {
                console.error("Не удалось загрузить клубы", error);
            }
        };
        fetchClubs();
    }, []);

    // Проверяем, является ли текущий пользователь админом
    const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';

    return (
        <div style={{ padding: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                <h1>Студенческие Клубы</h1>
                {user ? (
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <span>
                            Привет, <b>{user.email}</b>! 
                            <br/>
                            <small>Роль: {user.role}</small>
                        </span>
                        <button onClick={logout}>Выйти</button>
                    </div>
                ) : (
                    <span>Вы не авторизованы</span>
                )}
            </header>

            {/* Эта кнопка появится только если isAdmin === true */}
            {isAdmin && (
                <button style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    + Создать новый клуб (Админ)
                </button>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {clubs.length === 0 ? <p>Клубов пока нет...</p> : null}
                
                {clubs.map(club => (
                    <div key={club.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
                        <h3>{club.name}</h3>
                        <p>{club.description}</p>
                        
                        {/* Админы также могут видеть кнопки редактирования и удаления */}
                        {isAdmin && (
                            <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                                <button style={{ cursor: 'pointer' }}>Редактировать</button>
                                <button style={{ cursor: 'pointer', color: 'red' }}>Удалить</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClubsList;