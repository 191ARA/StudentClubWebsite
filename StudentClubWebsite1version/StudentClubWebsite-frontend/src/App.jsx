import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Импорт компонентов интерфейса
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Импорт страниц
import Login from './pages/Login';
import Register from './pages/Register';
import ClubsList from './pages/ClubsList';
import EventsList from './pages/EventsList'; // Наша новая страница

// Импорт компонентов защиты
import ProtectedRoute from './components/ProtectedRoute';

// Импорт страниц администратора
import SuperAdminDashboard from './pages/admin/SuperAdminDashboard';

const App = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
            <Navbar />

            <main style={{ flex: 1, padding: '20px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                <Routes>
                    {/* При заходе на корень сайта кидаем на публичную страницу клубов */}
                    <Route path="/" element={<Navigate to="/clubs" replace />} />
                    
                    {/* ПУБЛИЧНЫЕ МАРШРУТЫ (Доступны всем без логина) */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/clubs" element={<ClubsList />} />
                    <Route path="/events" element={<EventsList />} />
                    
                    {/* ЭКСКЛЮЗИВНЫЕ МАРШРУТЫ */}
                    <Route 
                        path="/superadmin" 
                        element={
                            <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                                <SuperAdminDashboard />
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </main>

            <Footer />
        </div>
    );
};

export default App;