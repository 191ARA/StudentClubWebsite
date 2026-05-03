import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const clubsData = [
  {
    id: 1, 
    name: 'ENACTUS NARXOZ', 
    category: 'LEADERSHIP & BUSINESS', 
    slogan: 'Entrepreneurial Action Us',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop',
    members: 124, 
    founded: '1994 / 2022',
    description: 'An international non-profit organization. We create startups that solve social, environmental, and innovative problems.',
    achievements: ['🏆 Finalists of the National Expo', '🌍 Prize winners of the Chevron "Water Race" competition'],
    gallery: [
      '/images/enactus3.jpg',
      '/images/enactus2.png'
    ]
  },
  {
    id: 2, 
    name: 'NARXOZ TEAM', 
    category: 'EVENTS & CREATIVE', 
    slogan: 'Non-stop Event Creators',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop',
    members: 85, 
    founded: '2017',
    description: 'An organization that hosts the brightest student events. Movie screenings, comedy shows, initiation ceremonies, and the hustle of preparation — that is about us!',
    achievements: ['🎭 Dozens of organized events', '🔥 The most creative team on campus'],
    gallery: [
      '/images/team1.png',
      '/images/team2.png'
    ]
  },
  {
    id: 3, 
    name: 'ONELIFE TRIPZ', 
    category: 'CULTURE & TRAVEL', 
    slogan: 'Live in High!',
    image: '/images/onelife.png',
    members: 60, 
    founded: '2022',
    description: 'A club for those who love active recreation and know how to organize it. Breathtaking hikes to Kolsai, Charyn, and the City of Nomads.',
    achievements: ['🏔 Leaders with 3+ years of experience', '🏕 Annual large-scale student trips'],
    gallery: [
      '/images/tripz1.png',
      '/images/tripz2.png',
      '/images/tripz3.png'
    ]
  },
  {
    id: 4, 
    name: 'JARQYN', 
    category: 'MENTAL HEALTH', 
    slogan: 'Safe & Comfortable Space',
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=800&auto=format&fit=crop',
    members: 45, 
    founded: '2021',
    description: 'An organization dedicated to providing psychological support to students. Trainings, seminars, and a safe, non-judgmental environment.',
    achievements: ['🤝 Dozens of art therapy sessions hosted', '🧘‍♀️ Helping relieve stress before exams'],
    gallery: [
      '/images/jarqyn1.png',
      '/images/jarqyn2.png',
      '/images/jarqyn3.png'
    ]
  },
  {
    id: 5, 
    name: 'NARXOZ THUNDER', 
    category: 'CYBERSPORTS', 
    slogan: 'Virtual Battles Await',
    image: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=800&auto=format&fit=crop',
    members: 95, 
    founded: '2019',
    description: 'A platform for those passionate about the world of esports. Participate in tournaments, develop your skills, and join the university\'s national team.',
    achievements: ['🎮 Annual tryouts for the main roster', '🏆 Prize-winners at inter-university tournaments'],
    gallery: [
      '/images/thunder1.png',
      '/images/thunder2.png',
      '/images/thunder3.png',
      '/images/thunder4.png'
    ]
  },
  {
    id: 6, 
    name: 'TARLAN DEBATE', 
    category: 'PUBLIC SPEAKING', 
    slogan: 'Persuade and Win',
    image: 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?q=80&w=800&auto=format&fit=crop',
    members: 70, 
    founded: '2015',
    description: 'One of the oldest debate clubs. We teach critical thinking, argumentation, and public speaking.',
    achievements: ['🗣 Winners of republican tournaments', '🏆 Organizers of the "Narxoz Cup"'],
    gallery: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop' 
    ]
  },
  {
    id: 7, 
    name: 'QUPIA MAFIA', 
    category: 'INTELLECTUAL GAMES', 
    slogan: 'The city falls asleep...',
    image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=800&auto=format&fit=crop',
    members: 55, 
    founded: '2018',
    description: 'An intellectual and psychological club for fans of the game "Mafia". We develop deduction, intuition, and lie detection skills.',
    achievements: ['🕵️‍♂️ Weekly games on campus', '🎩 Hosting inter-university sports mafia tournaments'],
    gallery: [
      'https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1570303345338-e1f0eddf4946?q=80&w=800&auto=format&fit=crop' // ЗАМЕНЕНО: Атмосферное фото игры в карты
    ]
  },
  {
    id: 8, 
    name: 'VOLUNTEER LEAGUE', 
    category: 'SOCIAL IMPACT', 
    slogan: 'Making the world better',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800&auto=format&fit=crop', // ЗАМЕНЕНО: Новое главное фото (лого/аватар)
    members: 200, 
    founded: '2014',
    description: 'The largest volunteer movement on campus. We help at major events, organize charity campaigns, and care about the environment.',
    achievements: ['🤝 Over 500 volunteer hours per year', '❤️ Helping orphanages and animal shelters'],
    gallery: [
      'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 10, 
    name: 'DIPLOMAT', 
    category: 'INTERNATIONAL RELATIONS', 
    slogan: 'Connecting the World',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop',
    members: 40, 
    founded: '2020',
    description: 'A club for those interested in geopolitics and diplomacy. We organize Model UNs, meetings with ambassadors, and discussions in English.',
    achievements: ['🌍 Organizers of Narxoz Model UN', '🤝 Meetings with international experts'],
    gallery: [
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop' 
    ]
  },
  {
    id: 11, 
    name: 'STUDENT RESEARCH', 
    category: 'SCIENCE & RESEARCH', 
    slogan: 'Science is easy, interesting, useful!',
    image: '/images/research.png',
    members: 50, 
    founded: '2016',
    description: 'At Narxoz University, we actively promote student development in science. Students actively participate in city, national, and international conferences; publish their work in KKSON and Scopus; and become laureates of various competitions in their fields.',
    achievements: ['🔬 Publications in KKSON and Scopus', '🥇 Laureates of scientific olympiads'],
    gallery: [
      '/images/research1.png',
      '/images/research2.png',
      '/images/research3.png'
    ]
  },
  {
    id: 12, 
    name: 'NARXOZ PRIDE', 
    category: 'SPORTS & ATHLETICS', 
    slogan: 'We bring the spirit',
    image: '/images/pride.png',
    members: 110, 
    founded: '2018',
    description: 'A sports student organization that organizes sports tournaments, promoting healthy lifestyle ideas among students. We develop almost all areas in sports, from basketball to table tennis. Also, one of our main directions is the Cheerleaders team.',
    achievements: ['🏅 Dozens of organized sports tournaments', '📣 Campus-wide cheerleading performances'],
    gallery: [
      '/images/pride1.png',
      '/images/pride2.png',
      '/images/pride3.png',
      '/images/pride4.png'
    ]
  },
  {
    id: 13, 
    name: 'MAKE YOURSELF', 
    category: 'LITERATURE & ORATORY', 
    slogan: 'Read, Discuss, Speak',
    image: '/images/makeyourself.png',
    members: 35, 
    founded: '2021',
    description: 'A literary club that brings together lovers of reading and writing. The purpose of the club is to encourage members to read more literature and, through discussions, deliver competent speeches and instill the skills of oratory.',
    achievements: ['📚 Weekly literary discussions', '🎤 Public speaking and debate sessions'],
    gallery: [
      '/images/makeyourself1.png',
      '/images/makeyourself2.png'
    ]
  },
  {
    id: 14, 
    name: 'MEDIA LAB', 
    category: 'MEDIA & PRODUCTION', 
    slogan: 'Capture the Moment',
    image: 'https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=800&auto=format&fit=crop',
    members: 65, 
    founded: '2020',
    description: 'A student organization specializing in video and photography, as well as the development of students\' talents in the media industry. Learn how to work with professional equipment, understand the basics of content promotion, editing, and sound recording.',
    achievements: ['🎥 Official media coverage of campus events', '📸 Dozens of viral student projects'],
    gallery: [
      '/images/medialab1.png',
      '/images/medialab2.png',
      '/images/medialab3.png',
      '/images/medialab4.png'
    ]
  },
  {
    id: 15, 
    name: 'GROW UP', 
    category: 'CREATIVITY & PERFORMANCE', 
    slogan: 'Shine Bright, Speak Boldly',
    image: '/images/growup.png',
    members: 80, 
    founded: '2019',
    description: 'A creative organization participating in all university events and city competitions. Get rid of stiffness, deliver unforgettable performances, become charismatic, and acquire a large and friendly family. We will give you a bright student life!',
    achievements: ['🌟 Vivid and unforgettable performances', '🏆 Prize-winners of city talent shows'],
    gallery: [
      '/images/growup1.png',
      '/images/growup2.png',
      '/images/growup3.png',
      '/images/growup4.png'
    ]
  },
  {
    id: 16, 
    name: 'ECO MINDED', 
    category: 'ENVIRONMENT & SUSTAINABILITY', 
    slogan: 'Protecting Our Future',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
    members: 50, 
    founded: '2021',
    description: 'A community of students interested in ecology who want to do something useful for the environment. Our goal is to increase environmental culture and awareness. We organize lectures, seminars, quizzes, and contests related to ecology.',
    achievements: ['🌱 Successful campus recycling programs', '🌍 Regular environmental awareness seminars'],
    gallery: [
      '/images/eco1.png',
      '/images/eco2.png',
      '/images/eco3.png'
    ]
  }
];
export default function NarxozClubsScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false); 
  const [selectedClub, setSelectedClub] = useState(null); 
  
  //СОСТОЯНИЯ ДЛЯ ФОРМЫ 
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', contact: '', course: '', specialty: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const hoverIntervalRef = useRef(null);

  //анимации для CAMPUS, линии и КАРТОЧКИ
  const syncTransition = { duration: 2, repeat: Infinity, ease: "easeInOut" };
  const syncOpacity = [0.4, 1, 0.4];

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % clubsData.length);
  };
  
  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? clubsData.length - 1 : prev - 1));
  };

  const startHoverScroll = (dir) => {
    if (selectedClub) return; 
    setDirection(dir);
    setActiveIndex((prev) => {
      if (dir === 1) return (prev + 1) % clubsData.length;
      return prev === 0 ? clubsData.length - 1 : prev - 1;
    });

    hoverIntervalRef.current = setInterval(() => {
      setDirection(dir);
      setActiveIndex((prev) => {
        if (dir === 1) return (prev + 1) % clubsData.length;
        return prev === 0 ? clubsData.length - 1 : prev - 1;
      });
    }, 1200); 
  };

  const stopHoverScroll = () => {
    if (hoverIntervalRef.current) {
      clearInterval(hoverIntervalRef.current);
      hoverIntervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopHoverScroll();
  }, []);

  const handleCardClick = (club) => {
    stopHoverScroll();
    setSelectedClub(club);
  };

  const closeModal = () => {
    setSelectedClub(null);
    // Сбрасываем форму
    setTimeout(() => {
      setShowJoinForm(false);
      setIsSuccess(false);
      setFormData({ name: '', contact: '', course: '', specialty: '', message: '' });
    }, 300);
  };

  //ЛОГИКА ОТПРАВКИ ФОРМЫ В TELEGRAM
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Токен и ID
    const botToken = ''; 
    const chatId = ''; 
    
    //сообщение
    const message = `🔥 Новая заявка в клуб: ${selectedClub.name}!\n\n👤 Имя: ${formData.name}\n🎓 Курс: ${formData.course}\n📚 Специальность: ${formData.specialty}\n📞 Контакт: ${formData.contact}\n💬 Сообщение: ${formData.message}`;

    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          chat_id: chatId, 
          text: message 
        })
      });
      
      setIsSuccess(true);
    } catch (error) {
      console.error("Ошибка при отправке:", error);
      alert("Не удалось отправить заявку. Проверьте интернет!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 200 : -200, opacity: 0, scale: 0.8, rotateY: dir > 0 ? 25 : -25 }),
    center: { x: 0, opacity: 1, scale: 1, rotateY: 0, transition: { duration: 0.6, type: "spring", bounce: 0.4 } },
    exit: (dir) => ({ x: dir < 0 ? 200 : -200, opacity: 0, scale: 0.8, rotateY: dir < 0 ? 25 : -25, transition: { duration: 0.5 } })
  };

  const progressPercentage = ((activeIndex + 1) / clubsData.length) * 100;

  return (
    <div style={styles.wrapper}>
      <div style={styles.background} />

      <main style={{...styles.mainContent, filter: selectedClub ? 'blur(10px)' : 'none', transition: 'filter 0.3s'}}>
        
        {/*ЛЕВЫЙ БЛОК*/}
        <div style={styles.leftSidebar}>
          <div style={styles.verticalLine}>
            <div style={styles.dot} />
            <div style={styles.dot} />
            
            <motion.div 
              animate={{ boxShadow: ['0 0 5px #ff0033', '0 0 20px #ff0033', '0 0 5px #ff0033'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={styles.activeCircle}
            >
              <motion.svg 
                animate={{ rotate: [0, 180, 360], scale: [0.8, 1.1, 0.8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff0033" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </motion.svg>
            </motion.div>

            <div style={styles.dot} />
          </div>
          
          <div style={styles.titleContainer}>
            {/*СИНХРОНИЗИРОВАННЫЙ CAMPUS*/}
            <motion.h2 
              animate={{ 
                opacity: syncOpacity, 
                textShadow: ['0 0 5px rgba(255,0,51,0.2)', '0 0 15px rgba(255,0,51,0.8)', '0 0 5px rgba(255,0,51,0.2)'] 
              }}
              transition={syncTransition}
              style={{...styles.ghostText, ...styles.fadedTextTop}}
            >
              CAMPUS
            </motion.h2>
            
            <h1 style={styles.mainTitle}>NARXOZ<br/>CLUBS</h1>
            <h2 style={{...styles.ghostText, ...styles.fadedTextBottom}}>FIND YOUR TRIBE</h2>
            
            {/*СИНХРОНИЗИРОВАННАЯ ЛИНИЯ */}
            <motion.div
              animate={{ 
                borderLeftColor: ['rgba(255,0,51,0.2)', '#ff0033', 'rgba(255,0,51,0.2)'],
                opacity: syncOpacity
              }}
              transition={syncTransition}
              style={styles.descriptionWrapper}
            >
              <p style={styles.description}>
                Forget boring routines. Dive into the real student energy! Discover your passions, 
                level up your skills, and connect with people who share your drive. 
                Your legacy at Narxoz starts here.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ПРАВЫЙ БЛОК*/}
        <div style={styles.carouselContainer}>
          {!selectedClub && (
            <>
              <div style={styles.hoverZoneLeft} onMouseEnter={() => startHoverScroll(-1)} onMouseLeave={stopHoverScroll} />
              <div style={styles.hoverZoneRight} onMouseEnter={() => startHoverScroll(1)} onMouseLeave={stopHoverScroll} />
            </>
          )}

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              style={styles.singleCardWrapper}
              onClick={() => handleCardClick(clubsData[activeIndex])}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/*КАРТОЧКА С  РАМОЙ*/}
              <motion.div 
                whileHover={{ 
                  scale: 1.05, 
                  rotateX: 8, 
                  rotateY: -8, 
                  boxShadow: '-20px 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(255,0,51,0.4), 0 0 10px rgba(255,0,51,0.6)' 
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={styles.card3DContainer}
              >
                {/* Пульсирующая тонкая линия окантовки (синхронизирована) */}
                <motion.div
                  animate={{ opacity: syncOpacity }}
                  transition={syncTransition}
                  style={styles.cardFrameDetail}
                />

                <motion.img 
                  src={clubsData[activeIndex].image} 
                  alt={clubsData[activeIndex].name} 
                  animate={{ scale: isHovered ? 1.1 : 1 }}
                  transition={{ duration: 0.6 }}
                  style={styles.cardImage} 
                />
                <div style={styles.topGradient} />

                <div style={styles.floatingContent}>
                  <div style={styles.cardHeader}>
                    <div style={styles.categoryBadge}>
                      <span style={styles.pulseDot} />
                      {clubsData[activeIndex].category}
                    </div>
                    <div style={styles.membersBadge}>👥 {clubsData[activeIndex].members}</div>
                  </div>

                  <motion.div animate={{ y: isHovered ? -10 : 0 }} transition={{ duration: 0.3 }} style={styles.glassPanel}>
                    <div style={styles.textGroup}>
                      <span style={styles.cardTitleText}>{clubsData[activeIndex].name}</span>
                      <span style={styles.cardSloganText}>{clubsData[activeIndex].slogan}</span>
                    </div>
                    <motion.div 
                      animate={{ backgroundColor: isHovered ? '#ff0033' : 'rgba(255,255,255,0.1)', color: isHovered ? '#fff' : '#fff' }}
                      style={styles.actionButton}
                    >↗</motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/*ПОДВАЛ */}
      <footer style={{...styles.footer, filter: selectedClub ? 'blur(10px)' : 'none', transition: 'filter 0.3s'}}>
        <div style={styles.pageNumberRotated}>05 / 06</div>
        <div style={styles.controls}>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.85 }} onClick={() => { stopHoverScroll(); prevSlide(); }} style={styles.controlBtn}>←</motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.85 }} onClick={() => { stopHoverScroll(); nextSlide(); }} style={styles.controlBtn}>→</motion.button>
          
          <div style={styles.progressLine}>
            <motion.div animate={{ width: `${progressPercentage}%` }} transition={{ type: "spring", stiffness: 80 }} style={styles.progressIndicator} />
            <motion.div animate={{ left: `calc(${progressPercentage}% - 6px)` }} transition={{ type: "spring", stiffness: 80 }} style={styles.progressGlowPoint} />
          </div>
          <span style={styles.slideNumber}>{String(activeIndex + 1).padStart(2, '0')}</span>
        </div>
      </footer>

      {/* МОДАЛЬНОЕ ОКНО С ФОРМОЙ И АНИМАЦИЯМИ */}
      <AnimatePresence>
        {selectedClub && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={styles.modalOverlay} onClick={closeModal}
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={styles.modalContainer} onClick={(e) => e.stopPropagation()} 
            >
              <button style={styles.closeModalBtn} onClick={closeModal}>✕</button>

              <div style={styles.modalHeaderImg}>
                <img src={selectedClub.image} alt={selectedClub.name} style={styles.modalImage} />
                <div style={styles.modalImgOverlay} />
                <div style={styles.modalTitleBox}>
                  <div style={styles.categoryBadge}><span style={styles.pulseDot} />{selectedClub.category}</div>
                  <h2 style={styles.modalMainTitle}>{selectedClub.name}</h2>
                  <p style={styles.modalSlogan}>{selectedClub.slogan}</p>
                </div>
              </div>

              <div style={styles.modalBody}>
                <AnimatePresence mode="wait">
                  
                  {/*СОСТОЯНИЕ 1: ИНФОРМАЦИЯ О КЛУБЕ*/}
                  {!showJoinForm && !isSuccess && (
                    <motion.div key="info" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <div style={styles.statsRow}>
                        <div style={styles.statBox}>
                          <span style={styles.statValue}>👥 {selectedClub.members}</span>
                          <span style={styles.statLabel}>Participants</span>
                        </div>
                        <div style={styles.statBox}>
                          <span style={styles.statValue}>📅 {selectedClub.founded}</span>
                          <span style={styles.statLabel}>Founded</span>
                        </div>
                      </div>

                      <div style={styles.infoSection}>
                        <h3 style={styles.sectionTitle}>About the club</h3>
                        <p style={styles.infoText}>{selectedClub.description}</p>
                      </div>

                      {/*ГАЛЕРЕЯ */}
                      {selectedClub.gallery && selectedClub.gallery.length > 0 && (
                        <div style={styles.infoSection}>
                          <h3 style={styles.sectionTitle}>Photo of participants</h3>
                          <div style={styles.galleryContainer}>
                            {selectedClub.gallery.map((imgUrl, idx) => (
                              <motion.img 
                                key={idx} 
                                src={imgUrl} 
                                alt={`gallery-${idx}`} 
                                style={styles.galleryImage}
                                whileHover={{ scale: 1.05 }}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      <div style={styles.infoSection}>
                        <h3 style={styles.sectionTitle}>Achievements</h3>
                        <ul style={styles.achievementsList}>
                          {selectedClub.achievements.map((ach, idx) => (
                            <li key={idx} style={styles.achievementItem}>{ach}</li>
                          ))}
                        </ul>
                      </div>

                      <motion.button 
                        whileHover={{ scale: 1.02, backgroundColor: '#cc0029' }}
                        whileTap={{ scale: 0.95 }}
                        style={styles.joinBtn}
                        onClick={() => setShowJoinForm(true)}
                      >
                        BECOME PART OF THE CLUB
                      </motion.button>
                    </motion.div>
                  )}

                  {/*СОСТОЯНИЕ2: ФОРМА ЗАЯВКИ С НОВЫМИ ПОЛЯМИ*/}
                  {showJoinForm && !isSuccess && (
                    <motion.form 
                      key="form" onSubmit={handleFormSubmit}
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                      style={styles.formContainer}
                    >
                      <h3 style={{...styles.sectionTitle, color: '#ff0033', fontSize: '1.2rem', marginBottom: '15px'}}>
                        Application in {selectedClub.name}
                      </h3>
                      
                      <div style={styles.inputGroup}>
                        <label style={styles.inputLabel}>Your first and last name</label>
                        <input required type="text" name="name" value={formData.name} onChange={handleInputChange} style={styles.inputField} placeholder="Zhumakhanuly Daulet" />
                      </div>

                      {/* НОВЫЕ ПОЛЯ */}
                      <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                        <div style={{...styles.inputGroup, flex: 1, marginBottom: 0}}>
                          <label style={styles.inputLabel}>Course</label>
                          <input required type="text" name="course" value={formData.course} onChange={handleInputChange} style={styles.inputField} placeholder="For example: 1st year" />
                        </div>

                        <div style={{...styles.inputGroup, flex: 1, marginBottom: 0}}>
                          <label style={styles.inputLabel}>Specialty</label>
                          <input required type="text" name="specialty" value={formData.specialty} onChange={handleInputChange} style={styles.inputField} placeholder="IT, Finance..." />
                        </div>
                      </div>

                      <div style={styles.inputGroup}>
                        <label style={styles.inputLabel}>Telegram or Mobile number</label>
                        <input required type="text" name="contact" value={formData.contact} onChange={handleInputChange} style={styles.inputField} placeholder="@username or +7..." />
                      </div>

                      <div style={styles.inputGroup}>
                        <label style={styles.inputLabel}>Why this club?</label>
                        <textarea required name="message" value={formData.message} onChange={handleInputChange} style={{...styles.inputField, height: '80px', resize: 'none'}} placeholder="I want to improve my skills and find a cool community..." />
                      </div>

                      <div style={styles.formActions}>
                        <button type="button" onClick={() => setShowJoinForm(false)} style={styles.cancelBtn}>Back</button>
                        <motion.button 
                          type="submit" 
                          disabled={isSubmitting}
                          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                          style={{...styles.submitBtn, opacity: isSubmitting ? 0.7 : 1}}
                        >
                          {isSubmitting ? 'SENDING...' : 'SUBMIT APPLICATION'}
                        </motion.button>
                      </div>
                    </motion.form>
                  )}

                  {/* СОСТОЯНИЕ: УСПЕШНАЯ ОТПРАВКА */}
                  {isSuccess && (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                      style={styles.successContainer}
                    >
                      <motion.div 
                        initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }} transition={{ type: 'spring', damping: 10, delay: 0.2 }}
                        style={styles.successIcon}
                      >
                        ✓
                      </motion.div>
                      <h3 style={styles.successTitle}>REQUEST SENT!</h3>
                      <p style={styles.successText}>We have received your information. The manager of the {selectedClub.name} club will contact you shortly.</p>
                      <motion.button 
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        style={styles.closeSuccessBtn} onClick={closeModal}
                      >
                        EXCELLENT
                      </motion.button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- СТИЛИ ---
const styles = {
  wrapper: { position: 'relative', width: '100%', minHeight: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column', fontFamily: '"Helvetica Neue", Arial, sans-serif', color: '#ffffff', overflow: 'hidden', backgroundColor: '#0a0a0a', boxSizing: 'border-box' },
  background: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `linear-gradient(to right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.6) 50%, rgba(10,10,10,0.8) 100%), url('/maxresdefault.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 },
  
  mainContent: { position: 'relative', zIndex: 10, flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 5%', width: '100%', boxSizing: 'border-box', gap: '40px' },
  leftSidebar: { display: 'flex', width: '45%', minWidth: '400px', flexShrink: 0 },
  verticalLine: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginRight: '40px' },
  dot: { width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.3)' },
  
  activeCircle: { width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #ff0033', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 0, 51, 0.1)' },
  
  titleContainer: { display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 },
  ghostText: { fontSize: '1vw', minFontSize: '12px', fontWeight: '700', letterSpacing: '8px', margin: 0, textTransform: 'uppercase', whiteSpace: 'nowrap' },
  fadedTextTop: { color: '#ff0033' },
  mainTitle: { fontSize: '5vw', minFontSize: '60px', fontWeight: '900', letterSpacing: '1px', margin: '5px 0', whiteSpace: 'nowrap', background: 'linear-gradient(180deg, #ffffff 0%, #b0c4de 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '0 10px 30px rgba(0,0,0,0.8)' },
  fadedTextBottom: { color: 'rgba(255,255,255,0.3)' },
  
  descriptionWrapper: { margin: '30px 0 0 0', borderLeft: '2px solid transparent', paddingLeft: '20px' },
  description: { maxWidth: '480px', fontSize: '1.1rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.6)', margin: 0, fontWeight: '400' },

  carouselContainer: { position: 'relative', display: 'flex', alignItems: 'center', width: '45%', minWidth: '350px', justifyContent: 'center', flexShrink: 0, perspective: '1500px' },
  hoverZoneLeft: { position: 'absolute', left: '-80px', top: '10%', bottom: '10%', width: '100px', zIndex: 30, cursor: 'w-resize' },
  hoverZoneRight: { position: 'absolute', right: '-80px', top: '10%', bottom: '10%', width: '100px', zIndex: 30, cursor: 'e-resize' },
  singleCardWrapper: { display: 'flex', cursor: 'pointer', transformStyle: 'preserve-3d', position: 'relative', zIndex: 20 },
  
  card3DContainer: { 
    position: 'relative', width: '360px', height: '520px', borderRadius: '24px', 
    overflow: 'hidden', 
    border: '1px solid #ff0033', 
    boxShadow: '0 0 20px rgba(255,0,51,0.15)',
    transformStyle: 'preserve-3d', backgroundColor: '#111' 
  }, 

  cardFrameDetail: {
    position: 'absolute', top: 5, left: 5, right: 5, bottom: 5,
    borderRadius: '20px',
    border: '1px solid rgba(255,0,51,0.2)',
    boxShadow: '0 0 10px rgba(255,0,51,0.1)'
  },
  
  cardImage: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' },
  topGradient: { position: 'absolute', top: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)' },
  floatingContent: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px', boxSizing: 'border-box', pointerEvents: 'none' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
  categoryBadge: { display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '30px', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: '#fff', backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', width: 'fit-content' },
  pulseDot: { width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ff0033', boxShadow: '0 0 10px #ff0033' },
  membersBadge: { fontSize: '0.75rem', fontWeight: '700', color: 'rgba(255,255,255,0.8)', padding: '6px 12px', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: '30px', backdropFilter: 'blur(10px)' },
  glassPanel: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderRadius: '20px', backgroundColor: 'rgba(10, 10, 10, 0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 -10px 30px rgba(0,0,0,0.3)', width: '100%', boxSizing: 'border-box' },
  textGroup: { display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '75%' },
  cardTitleText: { fontSize: '1.5rem', color: '#ffffff', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: '1.2' },
  cardSloganText: { fontSize: '0.85rem', color: '#ff0033', fontWeight: '500', letterSpacing: '0.5px' },
  actionButton: { width: '45px', height: '45px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.2rem', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.2)' },

  footer: { position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '30px 5%', width: '100%', boxSizing: 'border-box' },
  pageNumberRotated: { transform: 'rotate(-90deg)', transformOrigin: 'left bottom', fontSize: '0.8rem', letterSpacing: '3px', color: 'rgba(255,255,255,0.4)', width: '50px', marginBottom: '20px', textTransform: 'uppercase', fontWeight: 'bold' },
  controls: { display: 'flex', alignItems: 'center', gap: '20px', width: '50%', minWidth: '300px' },
  controlBtn: { width: '50px', height: '50px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'transparent', color: '#fff', fontSize: '1.2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', backdropFilter: 'blur(5px)' },
  progressLine: { flex: 1, height: '2px', backgroundColor: 'rgba(255,255,255,0.1)', position: 'relative', margin: '0 10px' },
  progressIndicator: { position: 'absolute', top: 0, left: 0, height: '100%', backgroundColor: '#ff0033' },
  progressGlowPoint: { position: 'absolute', top: '-4px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#fff', boxShadow: '0 0 10px #ff0033, 0 0 5px #fff' },
  slideNumber: { fontSize: '1.2rem', fontWeight: '700', letterSpacing: '2px' },

  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(15px)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' },
  modalContainer: { width: '100%', maxWidth: '600px', maxHeight: '90vh', backgroundColor: '#111', borderRadius: '24px', overflowY: 'auto', overflowX: 'hidden', position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1)', scrollbarWidth: 'none' },
  closeModalBtn: { position: 'absolute', top: '20px', right: '20px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', fontSize: '1.2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', zIndex: 10, backdropFilter: 'blur(5px)' },
  
  modalHeaderImg: { position: 'relative', width: '100%', height: '250px' },
  modalImage: { width: '100%', height: '100%', objectFit: 'cover' },
  modalImgOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, transparent 0%, #111 100%)' },
  modalTitleBox: { position: 'absolute', bottom: '20px', left: '30px', right: '30px' },
  modalMainTitle: { fontSize: '2.5rem', fontWeight: '900', margin: '10px 0 5px 0', textTransform: 'uppercase', letterSpacing: '1px', textShadow: '0 4px 20px rgba(0,0,0,0.8)' },
  modalSlogan: { fontSize: '1rem', color: '#ff0033', margin: 0, fontWeight: '500' },

  modalBody: { padding: '30px' },
  statsRow: { display: 'flex', gap: '20px', marginBottom: '30px' },
  statBox: { flex: 1, backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '15px', display: 'flex', flexDirection: 'column', gap: '5px' },
  statValue: { fontSize: '1.2rem', fontWeight: '700', color: '#fff' },
  statLabel: { fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' },
  
  infoSection: { marginBottom: '30px' },
  sectionTitle: { fontSize: '1.2rem', fontWeight: '700', color: '#fff', marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' },
  infoText: { fontSize: '1rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.7)', margin: 0 },
  
  galleryContainer: { display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', scrollbarWidth: 'none' },
  galleryImage: { width: '150px', height: '100px', objectFit: 'cover', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' },
  
  achievementsList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' },
  achievementItem: { fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '10px' },

  joinBtn: { width: '100%', padding: '20px', backgroundColor: '#ff0033', color: '#fff', border: 'none', borderRadius: '16px', fontSize: '1.1rem', fontWeight: '800', letterSpacing: '2px', cursor: 'pointer', marginTop: '10px' },
  
  formContainer: { display: 'flex', flexDirection: 'column', gap: '15px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' },
  inputLabel: { fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px' },
  inputField: { width: '100%', padding: '15px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '1rem', boxSizing: 'border-box', outline: 'none' },
  formActions: { display: 'flex', gap: '15px', marginTop: '10px' },
  cancelBtn: { flex: 1, padding: '15px', backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '12px', cursor: 'pointer', fontSize: '1rem', fontWeight: '600' },
  submitBtn: { flex: 2, padding: '15px', backgroundColor: '#ff0033', border: 'none', color: '#fff', borderRadius: '12px', cursor: 'pointer', fontSize: '1rem', fontWeight: '700', letterSpacing: '1px' },

  successContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', textAlign: 'center' },
  successIcon: { width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(40, 167, 69, 0.1)', border: '2px solid #28a745', color: '#28a745', fontSize: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' },
  successTitle: { fontSize: '1.5rem', fontWeight: '800', color: '#fff', margin: '0 0 10px 0', letterSpacing: '1px' },
  successText: { fontSize: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5', marginBottom: '30px' },
  closeSuccessBtn: { padding: '15px 40px', backgroundColor: '#222', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '30px', cursor: 'pointer', fontSize: '1rem', fontWeight: '700' }
};