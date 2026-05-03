import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Импорт компонентов интерфейса
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Импорт страниц
import Login from './pages/Login';
import Register from './pages/Register';
import ClubsList from './pages/ClubsList';
import EventsList from './pages/EventsList';

// Импорт компонентов защиты
import ProtectedRoute from './components/ProtectedRoute';

// Импорт страниц администратора
import SuperAdminDashboard from './pages/admin/SuperAdminDashboard';

const App = () => {
    const location = useLocation();

    // 🔥 Скрываем navbar/footer на auth страницах
    const hideLayout = location.pathname === '/login' || location.pathname === '/register';

    // 🔥 ДОБАВЛЕН РОУТ АДМИНКИ: теперь /superadmin тоже растягивается на 100% экрана
    const isFullWidth = hideLayout || location.pathname === '/clubs' || location.pathname.startsWith('/superadmin');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
            
            {!hideLayout && <Navbar />}

            <main style={{ 
                flex: 1, 
                padding: isFullWidth ? '0' : '20px', // Убираем отступы для админки
                maxWidth: isFullWidth ? '100%' : '1200px', // Растягиваем админку на всю ширину
                margin: '0 auto', 
                width: '100%' 
            }}>
                <Routes>

                    {/* 🔥 ТЕПЕРЬ СРАЗУ НА REGISTER */}
                    <Route path="/" element={<Navigate to="/register" replace />} />

                    {/* ПУБЛИЧНЫЕ */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/clubs" element={<ClubsList />} />
                    <Route path="/events" element={<EventsList />} />

                    {/* ADMIN */}
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

            {!hideLayout && <Footer />}
        </div>
    );
};

export default App;