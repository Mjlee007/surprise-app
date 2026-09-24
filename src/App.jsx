import React, { useState } from 'react';
import { Heart, Gift, Music, VolumeX, ChevronRight, ChevronLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './App.css';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [yesPressed, setYesPressed] = useState(false);
  const [currentReason, setCurrentReason] = useState(0);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  
  // States for runaway "No" button position
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);

  const toggleMusic = () => {
    setIsPlayingMusic(!isPlayingMusic);
  };

  const handleOpenGift = () => {
    setIsOpen(true);
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
  };

  const reasons = [
    "You are my absolute peace in a world full of chaos.",
    "The way you understand me without me even needing to speak a word.",
    "Every single day with you feels like an undeserved blessing.",
    "Your heart is the safest and warmest home I have ever known.",
    "You inspire me to become a better version of myself every single day.",
    "Even in a room full of people, my eyes always search for you.",
    "Loving you isn't just something I feel—it's the absolute best part of who I am."
  ];

  // 📸 Linked directly to your local images folder structure!
  const memories = [
    { title: "Angry Bird !", date: "Special Moment #1", bg: "url('/images/P1.jpeg')" },
    { title: "Beautiful Memory", date: "Special Moment #2", bg: "url('/images/P2.jpeg')" },
    { title: "Unforgettable Time", date: "Special Moment #3", bg: "url('/images/P3.jpeg')" },
    { title: "Sweet Smiles", date: "Special Moment #4", bg: "url('/images/P4.jpeg')" },
    { title: "Magical Selfie", date: "Special Moment #5", bg: "url('/images/P5.jpeg')" },
    { title: "Natural Meditation ", date: "Special Moment #6", bg: "url('/images/P6.jpeg')" },
    { title: "Pure Happiness", date: "Special Moment #7", bg: "url('/images/P7.jpeg')" },
    { title: "Our Adventure", date: "Special Moment #8", bg: "url('/images/P8.jpeg')" },
    { title: "Endless Joy", date: "Special Moment #9", bg: "url('/images/P9.jpeg')" },
    { title: "Traditional", date: "Special Moment #10", bg: "url('/images/P10.jpeg')" },
  ];

  const moveNoButton = () => {
    const randomX = (Math.random() - 0.5) * 250;
    const randomY = (Math.random() - 0.5) * 200;
    setNoPosition({ x: randomX, y: randomY });
    setNoCount(prev => prev + 1);
  };

  const getNoButtonText = () => {
    const phrases = [ "No", "Nice try!", "Pookie please...", "Can't catch me! 😜", "Wrong button!", "You have to say YES!", "Say YES already! ❤️" ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div className="app-container">
      <div className="floating-hearts">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="floating-heart" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s`, animationDuration: `${Math.random() * 3 + 2}s` }}></div>
        ))}
      </div>

      {/* <button onClick={toggleMusic} className="music-toggle-btn" title="Toggle Ambient Vibe">
        {isPlayingMusic ? <Music className="animate-bounce" size={20} /> : <VolumeX size={20} />}
      </button> */}

      {!isOpen ? (
        <div className="gift-screen">
          <div className="gift-card fade-in">
            <span className="badge">Special Delivery For You</span>
            <h1 className="title-lg">HI PRANATHI! ✨</h1>
            <p className="subtitle">I gathered some of our favorite moments in one place. Tap below to open it up!</p>
            <div onClick={handleOpenGift} className="gift-box-wrapper">
              <div className="gift-box-glow"></div>
              <div className="gift-box-content">
                <Gift className="gift-icon" size={64} />
                <span className="gift-btn-text">Tap to See Our Memories</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="dashboard-wrapper fade-in">
          <header className="navbar">
            <div className="nav-brand">
              <Heart className="text-rose-500 fill-rose-500 animate-pulse" size={22} />
              <span>Forever Us</span>
            </div>
            <nav className="nav-links">
              {['home', 'reasons', 'memories', 'proposal'].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`nav-tab ${activeTab === tab ? 'active' : ''}`}>{tab}</button>
              ))}
            </nav>
          </header>

          <main className="main-content">
            {activeTab === 'home' && (
              <div className="card-container text-center">
                <h1 className="title-xl">To My Absolute Favorite Person 💖</h1>
                <p className="body-text">I built this little corner of the internet just for you. Navigate using the tabs above to explore our reasons, memories, and a special question at the end.</p>
                <button onClick={() => setActiveTab('proposal')} className="primary-btn mt-4">Go To Final Question ✨</button>
              </div>
            )}

            {activeTab === 'reasons' && (
              <div className="card-container">
                <h2 className="section-title">Why I Love You</h2>
                <div className="reason-card">
                  <span className="reason-counter">Reason #{currentReason + 1} of {reasons.length}</span>
                  <p className="reason-text">"{reasons[currentReason]}"</p>
                  <div className="reason-controls">
                    <button onClick={() => setCurrentReason(prev => (prev === 0 ? reasons.length - 1 : prev - 1))} className="control-btn"><ChevronLeft size={22} /></button>
                    <button onClick={() => setCurrentReason(prev => (prev === reasons.length - 1 ? 0 : prev + 1))} className="control-btn"><ChevronRight size={22} /></button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'memories' && (
              <div className="gallery-section fade-in">
                <h2 className="section-title" style={{ marginBottom: 0 }}>Our Special Moments</h2>
                <Swiper
                  effect={'coverflow'}
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={'auto'}
                  loop={true}
                  coverflowEffect={{ rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true }}
                  pagination={{ clickable: true }}
                  modules={[EffectCoverflow, Pagination, Mousewheel, Keyboard]}
                  mousewheel={true}
                  keyboard={true}
                  className="mySwiper"
                >
                  {memories.map((mem, idx) => (
                    <SwiperSlide key={idx} style={{ backgroundImage: mem.bg }}>
                      <div className="slide-content">
                        <h3 className="slide-title">{mem.title}</h3>
                        <p className="slide-date">{mem.date}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            {activeTab === 'proposal' && (
              <div className="card-container text-center">
                <div className="proposal-icon-wrapper">
                  <span style={{ fontSize: '3rem' }}>🥰</span>
                </div>
                {!yesPressed ? (
                  <>
                    <h2 className="title-lg">Will you stay with me forever?</h2>
                    <p className="subtitle mb-6">There's only one correct answer allowed!</p>
                    
                    <div className="proposal-actions" style={{ position: 'relative', minHeight: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                      
                      {/* YES BUTTON */}
                      <button 
                        onClick={() => { setYesPressed(true); confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } }); }} 
                        className="primary-btn" 
                        style={{ zIndex: 10 }}
                      >
                        YES! ❤️
                      </button>

                      {/* RUNAWAY NO BUTTON */}
                      <button 
                        onMouseEnter={moveNoButton}
                        onTouchStart={moveNoButton}
                        onClick={moveNoButton}
                        className="no-btn"
                        style={{
                          transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                          transition: 'transform 0.15s ease-out',
                          position: 'relative'
                        }}
                      >
                        {getNoButtonText()}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="fade-in">
                    <h2 className="title-xl text-rose-600 mb-3">Yay!! Best decision ever! 🎉💍</h2>
                    <p className="body-text">I love you to the moon and back. Thank you for being my world! ❤️</p>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}