import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import { motion, AnimatePresence } from 'framer-motion';

const emptyForm = {
  title: '',
  description: '',
  eventDate: '',
  clubId: '',
  organizerName: '' 
};

const EventsManager = () => {
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingEvent, setEditingEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isManualOrganizer, setIsManualOrganizer] = useState(false); 
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [eventsRes, clubsRes] = await Promise.all([
        apiClient.get('/events'),
        apiClient.get('/clubs')
      ]);
      setEvents(eventsRes.data);
      setClubs(clubsRes.data);
    } catch (error) {
      console.error("Error loading data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreate = () => {
    setEditingEvent(null);
    setFormData(emptyForm);
    setIsManualOrganizer(false);
    setModalOpen(true);
  };

  const openEdit = (event) => {
    setEditingEvent(event);
    const manual = !!event.organizerName;
    setIsManualOrganizer(manual);
    setFormData({
      title: event.title,
      description: event.description,
      eventDate: event.eventDate?.substring(0, 16),
      clubId: event.club?.id || '',
      organizerName: event.organizerName || ''
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingEvent(null);
    setFormData(emptyForm);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      
      const payload = {
        ...formData,
        clubId: isManualOrganizer ? null : (formData.clubId || null),
        organizerName: isManualOrganizer ? formData.organizerName : null
      };

      if (editingEvent) {
        await apiClient.put(`/events/${editingEvent.id}`, payload);
      } else {
        await apiClient.post('/events', payload);
      }
      await fetchData();
      closeModal();
    } catch (error) {
      console.error("Error saving event", error);
      alert("Error saving. Make sure you added organizerName field to the backend!");
    } finally {
      setSaving(false);
    }
  };

  const filteredEvents = events.filter(e => e.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.pageTitle}>Events</h2>
        <div style={styles.actions}>
          <div style={styles.searchWrapper}>
            <input
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.search}
            />
          </div>
          <motion.button 
            onClick={openCreate} 
            style={styles.addBtn} 
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0px 0px 20px 5px rgba(255, 0, 51, 0.6)" 
            }}
            whileTap={{ scale: 0.95 }}
          >
            + Create
          </motion.button>
        </div>
      </div>

      {/* GRID LIST */}
      <div style={styles.grid}>
        {loading ? (
          <p style={{ color: '#888' }}>Loading...</p>
        ) : filteredEvents.length === 0 ? (
          <p style={{ color: '#888' }}>No events found</p>
        ) : filteredEvents.map(event => (
          <motion.div 
            key={event.id} 
            style={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ 
              y: -12, 
              scale: 1.02,
              rotateX: 2,
              rotateY: -2,
              borderColor: 'rgba(255, 0, 51, 0.8)',
              boxShadow: '0 25px 40px -10px rgba(0, 0, 0, 0.8), 0 0 25px 2px rgba(255, 0, 51, 0.4)'
            }}
          >
            <div style={styles.cardHighlight}></div>

            <h3 style={styles.cardTitle}>{event.title}</h3>
            <p style={styles.desc}>{event.description}</p>
            
            <div style={styles.metaInfo}>
              <div style={styles.metaRow}>
                <span style={styles.metaLabel}>Date:</span>
                <span style={styles.metaValue}>{new Date(event.eventDate).toLocaleString('en-GB')}</span>
              </div>
              <div style={styles.metaRow}>
                <span style={styles.metaLabel}>Org:</span>
                <span style={styles.metaValue}>{event.club ? event.club.name : (event.organizerName || 'University')}</span>
              </div>
            </div>

            <div style={styles.btns}>
              <motion.button 
                whileHover={{ scale: 1.03 }} 
                whileTap={{ scale: 0.97 }} 
                onClick={() => openEdit(event)} 
                style={styles.editBtn}
              >
                Edit
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,0,51,0.2)' }} 
                whileTap={{ scale: 0.97 }} 
                onClick={() => setDeleteId(event.id)} 
                style={styles.deleteBtn}
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL CREATE/EDIT */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div style={styles.overlay} onClick={closeModal} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div style={styles.modal} onClick={e => e.stopPropagation()} initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}>
              <h3 style={styles.modalTitle}>{editingEvent ? 'Edit' : 'Create'} Event</h3>
              <form onSubmit={handleSave} style={styles.form}>
                <label style={styles.label}>Title</label>
                <input required style={styles.input} value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />

                <label style={styles.label}>Description</label>
                <textarea style={styles.textarea} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />

                <label style={styles.label}>Date and Time</label>
                <input 
                  type="datetime-local" 
                  required 
                  style={styles.input} 
                  value={formData.eventDate} 
                  onChange={e => setFormData({...formData, eventDate: e.target.value})} 
                />

                <label style={styles.label}>Organizer</label>
                {!isManualOrganizer ? (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <select 
                      style={{...styles.input, flex: 1}} 
                      value={formData.clubId} 
                      onChange={e => {
                        if (e.target.value === "manual") setIsManualOrganizer(true);
                        else setFormData({...formData, clubId: e.target.value});
                      }}
                    >
                      <option value="">University (No club)</option>
                      {clubs.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      <option value="manual" style={{ color: '#ff0033', fontWeight: 'bold' }}>+ Enter manually...</option>
                    </select>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input 
                      placeholder="Enter organization name" 
                      style={{...styles.input, flex: 1}} 
                      value={formData.organizerName} 
                      onChange={e => setFormData({...formData, organizerName: e.target.value})} 
                    />
                    <button type="button" onClick={() => setIsManualOrganizer(false)} style={styles.cancelBtn}>Cancel</button>
                  </div>
                )}

                <div style={styles.modalActions}>
                  <button type="button" onClick={closeModal} style={styles.cancelBtn}>Cancel</button>
                  <button type="submit" style={styles.saveBtnModal}>{saving ? '...' : 'Save'}</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DELETE MODAL */}
      <AnimatePresence>
        {deleteId && (
          <motion.div style={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} style={styles.modal}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '20px' }}>Delete Event?</h3>
              <p style={{ color: '#9ca3af', marginBottom: '20px' }}>This action cannot be undone.</p>
              <div style={styles.modalActions}>
                <button onClick={() => setDeleteId(null)} style={styles.cancelBtn}>Cancel</button>
                <button onClick={async () => {
                  await apiClient.delete(`/events/${deleteId}`);
                  setEvents(prev => prev.filter(e => e.id !== deleteId));
                  setDeleteId(null);
                }} style={styles.saveBtnModal}>Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// СТИЛИ (С исправлениями отступов)
const styles = {
  wrapper: { padding: '20px', color: '#fff', minHeight: '100vh' },
  
  // Добавил flexWrap и gap чтобы элементы не слипались при сужении экрана
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '30px' },
  
  // Добавил marginRight для надежности
  pageTitle: { fontSize: '32px', fontWeight: '800', margin: 0, letterSpacing: '0.5px', marginRight: '20px' },
  
  // Кнопки и поиск всегда будут держаться вместе справа
  actions: { display: 'flex', gap: '20px', alignItems: 'center', marginLeft: 'auto' },
  
  searchWrapper: { position: 'relative' },
  search: { 
    background: 'rgba(25, 25, 25, 0.8)', 
    border: '1px solid rgba(255, 255, 255, 0.1)', 
    color: '#fff', 
    padding: '12px 20px', 
    borderRadius: '12px', 
    width: '280px',
    fontSize: '15px',
    outline: 'none',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)',
    transition: 'all 0.3s ease'
  },
  
  addBtn: { 
    background: 'linear-gradient(135deg, #ff0033 0%, #b30024 100%)', 
    color: '#fff', 
    border: '1px solid rgba(255, 255, 255, 0.2)', 
    padding: '12px 28px', 
    borderRadius: '12px', 
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '15px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 4px 15px rgba(255, 0, 51, 0.3)', 
  },

  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
    gap: '25px' 
  },
  
  card: { 
    position: 'relative',
    background: 'linear-gradient(145deg, #1e1e1e, #121212)', 
    padding: '25px', 
    borderRadius: '20px', 
    border: '1px solid rgba(255,255,255,0.05)', 
    boxShadow: '8px 8px 16px rgba(0,0,0,0.4), -4px -4px 10px rgba(255,255,255,0.02)', 
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transformStyle: 'preserve-3d', 
  },

  cardHighlight: {
    position: 'absolute',
    top: 0, left: 0, right: 0, height: '4px',
    background: 'linear-gradient(90deg, rgba(255,0,51,0) 0%, rgba(255,0,51,0.8) 50%, rgba(255,0,51,0) 100%)',
    opacity: 0.5
  },

  cardTitle: { fontSize: '20px', fontWeight: 'bold', margin: '0 0 10px 0', zIndex: 1 },
  desc: { fontSize: '14px', color: '#aaa', flexGrow: 1, marginBottom: '20px', lineHeight: '1.5', zIndex: 1 },
  
  metaInfo: { 
    background: 'rgba(0, 0, 0, 0.4)', 
    padding: '15px', 
    borderRadius: '12px', 
    marginBottom: '20px',
    border: '1px solid rgba(255,255,255,0.03)',
    zIndex: 1
  },
  metaRow: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' },
  metaLabel: { color: '#777' },
  metaValue: { color: '#eee', fontWeight: '600' },

  btns: { display: 'flex', gap: '15px', zIndex: 1 },
  editBtn: { 
    flex: 1, background: 'rgba(255,255,255,0.05)', color: '#fff', 
    border: '1px solid rgba(255,255,255,0.1)', padding: '10px', 
    borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
  },
  deleteBtn: { 
    flex: 1, background: 'rgba(255,0,51,0.05)', color: '#ff0033', 
    border: '1px solid rgba(255,0,51,0.3)', padding: '10px', 
    borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
  },

  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modal: { background: '#111', padding: '30px', borderRadius: '24px', width: '500px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)' },
  modalTitle: { margin: '0 0 25px 0', fontSize: '22px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  label: { fontSize: '13px', color: '#888', fontWeight: '600', marginBottom: '-5px' },
  input: { background: '#1a1a1a', border: '1px solid #333', color: '#fff', padding: '14px', borderRadius: '10px', fontSize: '15px', outline: 'none' },
  textarea: { background: '#1a1a1a', border: '1px solid #333', color: '#fff', padding: '14px', borderRadius: '10px', fontSize: '15px', minHeight: '100px', outline: 'none', resize: 'vertical' },
  modalActions: { display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '20px' },
  saveBtnModal: { background: '#ff0033', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' },
  cancelBtn: { background: 'transparent', border: '1px solid #444', color: '#fff', padding: '12px 25px', borderRadius: '10px', cursor: 'pointer' }
};

export default EventsManager;