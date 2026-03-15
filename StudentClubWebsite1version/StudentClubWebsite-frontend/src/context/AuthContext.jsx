import React, { createContext, useState, useContext } from 'react';
import apiClient from '../api/apiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Если null, значит не залогинен

    const login = async (email, password) => {
        try {
            const response = await apiClient.post('/auth/login', { email, password });
            setUser(response.data); // Сохраняем данные юзера
            return true;
        } catch (error) {
            console.error("Ошибка логина:", error);
            throw error;
        }
    };

    const register = async (email, password) => {
        try {
            const response = await apiClient.post('/auth/register', { email, password });
            setUser(response.data);
            return true;
        } catch (error) {
            console.error("Ошибка регистрации:", error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);