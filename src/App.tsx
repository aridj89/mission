import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import TeamSection from './components/TeamSection';
import ReelShowcase from './components/ReelShowcase';
import BentoGrid from './components/BentoGrid';
import LogoMarquee from './components/LogoMarquee';
import ContactSection from './components/ContactSection';
import { ActiveTab } from './types';
import { Home, Grid, Mail, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<ActiveTab>('HOME');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGlobalFlipped, setIsGlobalFlipped] = useState(false);
  const isRTL = i18n.language === 'ar';

  const [logoIndex, setLogoIndex] = useState(1);
  const [rotation, setRotation] = useState(0);

  // Handle global synchronised rotation timer (Header Logo & Team Cards)
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 180);
      setIsGlobalFlipped(prev => !prev);
      setTimeout(() => {
        setLogoIndex(prev => (prev === 0 ? 1 : 0));
      }, 300); // Change logo halfway through rotation
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Smooth scroll to top on tab change
  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ------------------------------------
  // Framer Motion Variants
  // ------------------------------------
  
  const menuVariants = {
    closed: { x: isRTL ? '100%' : '-100%', transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } },
    open: { x: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }
  };

  const appWrapperVariants = {
    closed: { 
      scale: 1, 
      x: 0, 
      rotateY: 0,
      borderRadius: '0px',
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
    },
    open: { 
      scale: 0.85, 
      x: isRTL ? '-40%' : '40%', 
      rotateY: isRTL ? 15 : -15,
      borderRadius: '30px',
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const pageVariants = {
    initial: { rotateY: 90, opacity: 0, scale: 0.9 },
    animate: { rotateY: 0, opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } },
    exit: { rotateY: -90, opacity: 0, scale: 0.9, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }
  };

  return (
    <div className="bg-gray-100 dark:bg-[#111] min-h-screen relative overflow-x-hidden transition-colors duration-500" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* 
        The Curved Half-Circle Menu
        It sits fixed on the screen edge and slides in.
      */}
      <motion.nav 
        variants={menuVariants}
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        className={`fixed top-0 bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-[80vw] sm:w-[50vw] md:w-[40vw] bg-white dark:bg-[#0A0A0A] border-y border-black/5 dark:border-white/5 flex flex-col justify-center items-center z-0 transition-colors duration-500`}
        style={{
          borderTopRightRadius: isRTL ? '0' : '100% 50%',
          borderBottomRightRadius: isRTL ? '0' : '100% 50%',
          borderTopLeftRadius: isRTL ? '100% 50%' : '0',
          borderBottomLeftRadius: isRTL ? '100% 50%' : '0',
          borderRight: isRTL ? 'none' : '1px solid rgba(255,255,255,0.05)',
          borderLeft: isRTL ? '1px solid rgba(255,255,255,0.05)' : 'none',
          boxShadow: isRTL ? '-50px 0 100px rgba(0,0,0,0.9)' : '50px 0 100px rgba(0,0,0,0.9)'
        }}
      >
         <div className="flex flex-col gap-6 sm:gap-10 items-start sm:items-center text-left sm:text-center w-full relative z-10 px-8 sm:px-8">
            {['HOME', 'WORK', 'CONTACT'].map((tab, i) => (
              <motion.button
                key={tab}
                onClick={() => handleTabChange(tab as ActiveTab)}
                initial={{ opacity: 0, x: isRTL ? 50 : -50, scale: 0.8 }}
                animate={isMenuOpen ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: isRTL ? 50 : -50, scale: 0.8 }}
                transition={{ delay: isMenuOpen ? 0.3 + (i * 0.1) : 0, duration: 0.5, type: 'spring', bounce: 0.4 }}
                className={`font-hanken text-lg sm:text-3xl md:text-4xl font-black uppercase tracking-tighter transition-all duration-300 hover:scale-110 origin-left sm:origin-center ${activeTab === tab ? 'text-[#0071ec]' : 'text-zinc-500 hover:text-black dark:hover:text-white'}`}
              >
                {t(`nav.${tab.toLowerCase()}`)}
              </motion.button>
            ))}
         </div>
      </motion.nav>

      {/* 
        Fixed Top Bar - Kept outside motion.div to prevent fixed positioning breakage 
      */}
      <div className={`transition-opacity duration-300 relative z-50 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Header 
          activeTab={activeTab} 
          setActiveTab={handleTabChange} 
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          logoIndex={logoIndex}
          rotation={rotation}
        />
      </div>

      {/* 
        Main App Wrapper
        This holds the entire original app, applying 3D transforms when menu is open.
      */}
      <div style={{ perspective: '2000px' }} className="pointer-events-none">
        <motion.div 
          variants={appWrapperVariants}
          initial="closed"
          animate={isMenuOpen ? "open" : "closed"}
          className="min-h-screen bg-white text-black dark:bg-black dark:text-[#e5e2e1] antialiased flex flex-col font-sans relative z-10 shadow-[0_0_100px_rgba(0,0,0,0.2)] dark:shadow-[0_0_100px_rgba(0,0,0,1)] origin-center transition-colors duration-500 pointer-events-auto"
          style={{ 
            transformOrigin: isRTL ? 'right center' : 'left center',
            height: isMenuOpen ? '100vh' : 'auto',
            overflow: isMenuOpen ? 'hidden' : 'visible'
          }}
        >
        {/* Overlay to catch clicks and close menu when clicking main body */}
        {isMenuOpen && (
          <div 
            className="absolute inset-0 z-[60] bg-white/20 dark:bg-black/20 backdrop-blur-[2px] cursor-pointer" 
            onClick={() => setIsMenuOpen(false)} 
          />
        )}

        {/* Primary Context Container */}
        <main className="flex-grow pt-16 pb-8" id="primary-main-viewport" style={{ perspective: '1500px' }}>
          
          <AnimatePresence mode="wait">
            {activeTab === 'HOME' && (
              <motion.div 
                key="home" 
                variants={pageVariants} 
                initial="initial" 
                animate="animate" 
                exit="exit" 
                className="origin-center" 
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Hero 
                  onViewPortfolio={() => {
                    handleTabChange('WORK');
                  }}
                  logoIndex={logoIndex}
                  rotation={rotation}
                />

                <LogoMarquee />

                <ReelShowcase />

                {/* In-view Core CTA Banner */}
                <section className="py-24 px-6 md:px-16 text-center border-t border-black/5 dark:border-white/5 bg-white dark:bg-black transition-colors duration-500">
                  <div className="max-w-4xl mx-auto space-y-8">
                    <h2 className="font-hanken text-4xl sm:text-6xl font-extrabold text-black dark:text-white tracking-tight uppercase leading-none">
                      {t('cta.title')}
                    </h2>
                    <div className="flex justify-center pt-2">
                      <button 
                        onClick={() => handleTabChange('CONTACT')}
                        className="btn flex items-center justify-center gap-3 font-hanken"
                        id="connect-cta-btn"
                      >
                        {t('cta.button')} <ArrowUpRight size={22} className="stroke-[2.5px]" />
                      </button>
                    </div>
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'WORK' && (
              <motion.div 
                key="work" 
                variants={pageVariants} 
                initial="initial" 
                animate="animate" 
                exit="exit" 
                className="origin-center min-h-[80vh]" 
                style={{ transformStyle: 'preserve-3d' }}
              >
                <TeamSection isGlobalFlipped={isGlobalFlipped} />
              </motion.div>
            )}

            {activeTab === 'CONTACT' && (
              <motion.div 
                key="contact" 
                variants={pageVariants} 
                initial="initial" 
                animate="animate" 
                exit="exit" 
                className="origin-center min-h-[80vh]" 
                style={{ transformStyle: 'preserve-3d' }}
              >
                <ContactSection />
              </motion.div>
            )}
          </AnimatePresence>

        </main>

        {/* Universal Footer */}
        <Footer setActiveTab={handleTabChange} logoIndex={logoIndex} rotation={rotation} />

        </motion.div>
      </div>
      
      {/* Bottom Nav Bar (Mobile Only Viewport) - Kept outside motion.div */}
      <div className={`transition-opacity duration-300 relative z-50 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 dark:bg-black/90 backdrop-blur-xl border-t border-black/10 dark:border-white/10 flex justify-around items-center h-20 pb-safe transition-colors duration-500" id="mobile-bottom-navbar">
          <button 
            onClick={() => handleTabChange('HOME')}
            className={`flex flex-col items-center justify-center gap-1 w-20 py-1 transition-all ${
              activeTab === 'HOME' ? 'text-black dark:text-white' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
            }`}
          >
            <Home size={18} />
            <span className="font-mono text-[8px] tracking-widest font-semibold">{t('nav.home')}</span>
          </button>

          <button 
            onClick={() => handleTabChange('WORK')}
            className={`flex flex-col items-center justify-center gap-1 w-20 py-1 transition-all ${
              activeTab === 'WORK' ? 'text-black dark:text-white' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
            }`}
          >
            <Grid size={18} />
            <span className="font-mono text-[8px] tracking-widest font-semibold">{t('nav.work')}</span>
          </button>

          <button 
            onClick={() => handleTabChange('CONTACT')}
            className={`flex flex-col items-center justify-center gap-1 w-20 py-1 transition-all ${
              activeTab === 'CONTACT' ? 'text-black dark:text-white' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
            }`}
          >
            <Mail size={18} />
            <span className="font-mono text-[8px] tracking-widest font-semibold">{t('nav.contact')}</span>
          </button>
        </nav>
      </div>
      
    </div>
  );
}
