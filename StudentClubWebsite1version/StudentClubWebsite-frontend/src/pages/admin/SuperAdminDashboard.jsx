import React, { useState } from 'react';
import ClubsManager from './ClubsManager';
import UsersManager from './UsersManager';
import EventsManager from './EventsManager';

const SuperAdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('clubs');

    const tabStyle = (tabName) => ({
        padding: '10px 20px',
        cursor: 'pointer',
        backgroundColor: activeTab === tabName ? '#2E3B55' : '#ddd',
        color: activeTab === tabName ? 'white' : 'black',
        border: 'none',
        borderRadius: '5px 5px 0 0',
        marginRight: '5px',
        fontWeight: 'bold'
    });

    return (
        <div>
            <h1 style={{ borderBottom: '2px solid #2E3B55', paddingBottom: '10px' }}>
                ⚙️ Панель Супер-Администратора
            </h1>
            
            {/* Панель вкладок */}
            <div style={{ display: 'flex', marginTop: '20px', borderBottom: '3px solid #2E3B55' }}>
                <button style={tabStyle('clubs')} onClick={() => setActiveTab('clubs')}>Управление Клубами</button>
                <button style={tabStyle('events')} onClick={() => setActiveTab('events')}>Управление Мероприятиями</button>
                <button style={tabStyle('users')} onClick={() => setActiveTab('users')}>Управление Пользователями</button>
            </div>

            {/* Содержимое вкладок */}
            <div style={{ padding: '20px', backgroundColor: '#f9f9f9', border: '1px solid #ddd', borderTop: 'none' }}>
                {activeTab === 'clubs' && <ClubsManager />}
                {activeTab === 'events' && <EventsManager />}
                {activeTab === 'users' && <UsersManager />}
            </div>
        </div>
    );
};

export default SuperAdminDashboard;