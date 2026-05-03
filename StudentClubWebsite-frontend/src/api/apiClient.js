import axios from 'axios';

const apiClient = axios.create({
    // Убедись, что твой Spring Boot запущен на 8080 порту
    baseURL: 'http://localhost:8080/api', 
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;