import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// allowedRoles - это массив ролей, которым разрешен доступ (например: ['ADMIN', 'SUPER_ADMIN'])
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth();

    // Если вообще не залогинен, кидаем на логин
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Если передан список разрешенных ролей, и роли юзера в нем нет — не пускаем
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Можно перенаправить на страницу "Доступ запрещен" или просто обратно к списку клубов
        alert("У вас нет прав для просмотра этой страницы!");
        return <Navigate to="/clubs" replace />;
    }

    // Если всё ок, рендерим страницу
    return children;
};

export default ProtectedRoute;