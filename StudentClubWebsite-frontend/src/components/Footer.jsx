import React, { useState } from 'react';

export default function Footer() {
    // Состояние для управления модальными окнами (null, 'Help', 'Contacts', 'Rules')
    const [activeModal, setActiveModal] = useState(null);

    const openModal = (e, target) => {
        e.preventDefault();
        setActiveModal(target);
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    // Контент для разных модальных окон
    const renderModalContent = () => {
        switch (activeModal) {
            case 'Help':
                return (
                    <>
                        <h2 style={styles.modalTitle}>How can we <span style={styles.logoAccent}>help?</span></h2>
                        <p style={styles.modalText}>If you have any problems with the platform, club registration, or event creation, please contact the site administrators.</p>
                        <ul style={styles.modalList}>
                            <li>Check the FAQ section in your dashboard.</li>
                            <li>Make sure your account is verified by the university.</li>
                        </ul>
                    </>
                );
            case 'Contacts':
                return (
                    <>
                        <h2 style={styles.modalTitle}>Contact <span style={styles.logoAccent}>Us</span></h2>
                        <p style={styles.modalText}>We are always open to communication. Get in touch with us through the following channels:</p>
                        <div style={styles.contactItem}>📧 Email: support@narxoz.kz</div>
                        <div style={styles.contactItem}>📱 Phone: +7 (XXX) XXX-XX-XX</div>
                        <div style={styles.contactItem}>✈️ Telegram: @narxoz_clubs</div>
                    </>
                );
            case 'Rules':
                return (
                    <>
                        <h2 style={styles.modalTitle}>Platform <span style={styles.logoAccent}>Rules</span></h2>
                        <p style={styles.modalText}>By using NARXOZ CLUBS, you agree to:</p>
                        <ul style={styles.modalList}>
                            <li>Respect all community members.</li>
                            <li>Post only accurate information about events.</li>
                            <li>Do not use the platform for spam or commercial purposes.</li>
                        </ul>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <style>
                {`
                    @keyframes syncRedPulse {
                        0% { text-shadow: 0 0 4px rgba(255,0,51,0.3); opacity: 0.8; }
                        50% { text-shadow: 0 0 15px rgba(255,0,51,0.9); opacity: 1; }
                        100% { text-shadow: 0 0 4px rgba(255,0,51,0.3); opacity: 0.8; }
                    }
                    @keyframes syncRedBorderTopPulse {
                        0% { border-top-color: rgba(255,0,51,0.1); box-shadow: 0 -2px 10px rgba(255,0,51,0.05); }
                        50% { border-top-color: rgba(255,0,51,0.6); box-shadow: 0 -2px 20px rgba(255,0,51,0.25); }
                        100% { border-top-color: rgba(255,0,51,0.1); box-shadow: 0 -2px 10px rgba(255,0,51,0.05); }
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px) scale(0.95); }
                        to { opacity: 1; transform: translateY(0) scale(1); }
                    }
                    .pulse-text { animation: syncRedPulse 2.5s infinite ease-in-out; }
                    .pulse-border-footer { animation: syncRedBorderTopPulse 2.5s infinite ease-in-out; }
                    .modal-anim { animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                `}
            </style>

            <footer style={styles.footer} className="pulse-border-footer">
                <div style={styles.container}>

                    {/* BRAND */}
                    <div style={styles.brand}>
                        <h3 style={styles.logo}>
                            <span style={styles.logoAccent} className="pulse-text">NARXOZ</span> CLUBS
                        </h3>
                        <p style={styles.desc}>
                            A unified platform for student communities, events and growth.
                            Dive into the real student energy.
                        </p>
                    </div>

                    {/* LINKS */}
                    <div style={styles.links}>
                        <a 
                            href="#help" 
                            onClick={(e) => openModal(e, 'Help')} 
                            style={styles.link}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#ff0033';
                                e.currentTarget.style.textShadow = '0 0 8px rgba(255,0,51,0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#9ca3af';
                                e.currentTarget.style.textShadow = 'none';
                            }}
                        >Help</a>
                        <a 
                            href="#contacts" 
                            onClick={(e) => openModal(e, 'Contacts')} 
                            style={styles.link}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#ff0033';
                                e.currentTarget.style.textShadow = '0 0 8px rgba(255,0,51,0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#9ca3af';
                                e.currentTarget.style.textShadow = 'none';
                            }}
                        >Contacts</a>
                        <a 
                            href="#rules" 
                            onClick={(e) => openModal(e, 'Rules')} 
                            style={styles.link}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#ff0033';
                                e.currentTarget.style.textShadow = '0 0 8px rgba(255,0,51,0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#9ca3af';
                                e.currentTarget.style.textShadow = 'none';
                            }}
                        >Rules</a>
                    </div>
                </div>

                <div style={styles.bottom}>
                    © {new Date().getFullYear()} Narxoz University. All rights reserved.
                </div>
            </footer>

            {/* MODAL OVERLAY */}
            {activeModal && (
                <div style={styles.overlay} onClick={closeModal}>
                    <div 
                        style={styles.modalCard} 
                        className="modal-anim pulse-border-footer"
                        onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике внутри модалки
                    >
                        <button 
                            style={styles.closeButton} 
                            onClick={closeModal}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#ff0033'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                        >
                            ✕
                        </button>
                        {renderModalContent()}
                    </div>
                </div>
            )}
        </>
    );
}

const styles = {
    footer: { marginTop: 'auto', background: '#0a0a0a', borderTop: '1px solid rgba(255,0,51,0.1)', padding: '50px 40px 30px', color: '#9ca3af', position: 'relative', zIndex: 10 },
    container: { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' },
    brand: { maxWidth: '350px' },
    logo: { color: '#fff', fontSize: '1.2rem', marginBottom: '12px', fontWeight: 900, letterSpacing: '1px', textTransform: 'uppercase' },
    logoAccent: { color: '#ff0033' },
    desc: { fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.6' },
    links: { display: 'flex', gap: '30px', alignItems: 'center' },
    link: { color: '#9ca3af', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600, position: 'relative', transition: 'all 0.3s ease', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px' },
    bottom: { marginTop: '40px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', fontSize: '0.8rem', color: '#6b7280', letterSpacing: '1px' },
    
    // Стили для модального окна
    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
    },
    modalCard: {
        background: '#0a0a0a',
        borderTop: '2px solid rgba(255,0,51,0.4)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        borderLeft: '1px solid rgba(255,255,255,0.05)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '16px',
        padding: '40px',
        maxWidth: '500px',
        width: '100%',
        position: 'relative',
        color: '#fff',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
    },
    closeButton: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: 'transparent',
        border: 'none',
        color: '#9ca3af',
        fontSize: '1.5rem',
        cursor: 'pointer',
        transition: 'color 0.3s ease'
    },
    modalTitle: {
        fontSize: '2rem',
        fontWeight: 800,
        margin: '0 0 20px 0',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    },
    modalText: {
        color: '#9ca3af',
        lineHeight: '1.6',
        fontSize: '1rem',
        marginBottom: '20px'
    },
    modalList: {
        color: '#d1d5db',
        lineHeight: '1.8',
        paddingLeft: '20px',
        margin: 0
    },
    contactItem: {
        background: 'rgba(255,255,255,0.03)',
        padding: '12px 20px',
        borderRadius: '8px',
        marginBottom: '10px',
        color: '#e5e7eb',
        border: '1px solid rgba(255,255,255,0.05)',
        fontWeight: 500
    }
};