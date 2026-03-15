import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: '#f1f1f1',
            color: '#333',
            textAlign: 'center',
            padding: '15px',
            marginTop: 'auto', // Эта магия прижмет футер к низу экрана
            borderTop: '1px solid #ddd'
        }}>
            <p style={{ margin: 0 }}>
                © {new Date().getFullYear()} Студенческий Клуб. Все права защищены.
            </p>
        </footer>
    );
};

export default Footer;