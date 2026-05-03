import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';

const EventsList = () => {
    const [events, setEvents] = useState([]);
    const [hoveredId, setHoveredId] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await apiClient.get('/events');
                const sortedEvents = response.data.sort(
                    (a, b) => new Date(a.eventDate) - new Date(b.eventDate)
                );
                setEvents(sortedEvents);
            } catch (error) {
                console.error("Failed to load events", error);
            }
        };
        fetchEvents();
    }, []);

    const formatDateTime = (dateString) => {
        const dateObj = new Date(dateString);
        // Перевели формат даты на английский
        const date = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
        const time = dateObj.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        return { date, time };
    };

    return (
        <div style={styles.wrapper}>
            {/* ATMOSPHERIC BACKGROUND */}
            <div style={styles.bg}></div>

            <div style={styles.container}>
                {/* HEADER */}
                <div style={styles.header}>
                    <h1 style={styles.title}>
                        Upcoming <span className="pulse-text" style={styles.accent}>Events</span>
                    </h1>
                    <p style={styles.subtitle}>
                        Don't miss the main events of student life
                    </p>
                </div>

                {/* TIMELINE LIST */}
                <div style={styles.timeline}>
                    {events.length === 0 ? (
                        <div style={styles.empty}>
                            <div style={styles.emptyIcon}>📭</div>
                            <p>No events yet</p>
                        </div>
                    ) : (
                        events.map(event => {
                            const { date, time } = formatDateTime(event.eventDate);
                            
                            return (
                                <div
                                    key={event.id}
                                    style={{
                                        ...styles.listItem,
                                        ...(hoveredId === event.id && styles.listItemHover)
                                    }}
                                    onMouseEnter={() => setHoveredId(event.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    {/* Пульсирующая точка на таймлайне */}
                                    <div style={{
                                        ...styles.timelineDot,
                                        ...(hoveredId === event.id ? { transform: 'scale(1.3)' } : {})
                                    }} className="pulse-box" />

                                    {/* Блок даты */}
                                    <div style={styles.dateBlock}>
                                        <div style={styles.dateText}>{date}</div>
                                        <div style={styles.timeText}>{time}</div>
                                    </div>

                                    {/* Основной контент */}
                                    <div style={styles.contentBlock}>
                                        <h3 style={{
                                            ...styles.eventTitle,
                                            color: hoveredId === event.id ? '#ff0033' : '#fff'
                                        }}>
                                            {event.title}
                                        </h3>
                                        
                                        <p style={styles.desc}>
                                            {event.description}
                                        </p>

                                        <div style={styles.footer}>
                                            <span style={styles.label}>Organizer</span>
                                            <span style={styles.club} className={hoveredId === event.id ? "pulse-box" : ""}>
                                                {/* ИСПРАВЛЕННАЯ ЛОГИКА ОРГАНИЗАТОРА */}
                                                {event.club ? event.club.name : (event.organizerName || 'University')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    wrapper: {
        position: 'relative',
        fontFamily: 'Inter, sans-serif',
        color: '#fff'
    },
    bg: {
        position: 'fixed',
        inset: 0,
        background: `
            radial-gradient(circle at 15% 20%, rgba(255,0,51,0.06), transparent 40%),
            radial-gradient(circle at 85% 80%, rgba(255,0,51,0.04), transparent 50%),
            #050505
        `,
        zIndex: -1,
        pointerEvents: 'none'
    },
    container: {
        position: 'relative',
        zIndex: 1,
        maxWidth: 900,
        margin: '0 auto',
        padding: '60px 20px'
    },
    header: {
        marginBottom: 60,
        textAlign: 'center'
    },
    title: {
        fontSize: '3rem',
        fontWeight: 900,
        marginBottom: 10,
        textTransform: 'uppercase',
        letterSpacing: '1px'
    },
    accent: {
        color: '#ff0033'
    },
    subtitle: {
        color: '#9ca3af',
        fontSize: '1.1rem'
    },
    timeline: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        position: 'relative',
        borderLeft: '2px solid rgba(255,0,51,0.1)', 
        marginLeft: '10px',
        paddingLeft: '40px'
    },
    listItem: {
        position: 'relative',
        display: 'flex',
        gap: 30,
        padding: '25px',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.03)',
        borderRadius: '16px',
        transition: 'all 0.3s ease',
        alignItems: 'flex-start',
        backdropFilter: 'blur(10px)'
    },
    listItemHover: {
        transform: 'translateX(10px)',
        background: 'rgba(255,0,51,0.03)',
        border: '1px solid rgba(255,0,51,0.3)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
    },
    timelineDot: {
        position: 'absolute',
        left: '-47px', 
        top: '32px',
        width: 12,
        height: 12,
        borderRadius: '50%',
        background: '#ff0033',
        border: '2px solid #050505',
        transition: 'transform 0.3s ease'
    },
    dateBlock: {
        minWidth: '110px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 4
    },
    dateText: {
        fontSize: '1.1rem',
        fontWeight: 800,
        color: '#fff',
        lineHeight: 1
    },
    timeText: {
        fontSize: '0.9rem',
        color: '#ff0033',
        fontWeight: 600
    },
    contentBlock: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    eventTitle: {
        fontSize: '1.4rem',
        fontWeight: 700,
        marginBottom: 10,
        transition: 'color 0.3s ease',
        margin: 0
    },
    desc: {
        color: '#9ca3af',
        lineHeight: 1.6,
        marginBottom: 20,
        fontSize: '0.95rem',
        margin: '0 0 20px 0'
    },
    footer: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginTop: 'auto'
    },
    label: {
        fontSize: 11,
        color: '#6b7280',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    club: {
        color: '#fff',
        fontWeight: 600,
        fontSize: '0.85rem',
        background: 'rgba(255,0,51,0.05)',
        border: '1px solid rgba(255,0,51,0.2)',
        padding: '6px 12px',
        borderRadius: '20px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        transition: 'all 0.3s'
    },
    empty: {
        textAlign: 'center',
        padding: '100px 0',
        color: '#6b7280',
        marginLeft: '-40px' 
    },
    emptyIcon: {
        fontSize: '3rem',
        marginBottom: 20,
        opacity: 0.3
    }
};

export default EventsList;