import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TEAM_MEMBERS } from '../data';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TeamSection() {
  const { t, i18n } = useTranslation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isRTL = i18n.language === 'ar';

  // Scroll to center items on mount
  useEffect(() => {
    // We add a tiny delay to ensure layout is calculated
    const timeout = setTimeout(() => {
      if (scrollContainerRef.current) {
        // Find the card for 'ramy-zoubiri' (the first of the 3 founders)
        const centerCard = document.getElementById('team-card-ramy-zoubiri');
        if (centerCard) {
          const container = scrollContainerRef.current;
          
          if (isRTL) {
            // For RTL, calculating scroll position is a bit different depending on browser
            // A simple reliable way is to just use scrollIntoView
            centerCard.scrollIntoView({ inline: 'start', block: 'nearest' });
          } else {
            // For LTR
            container.scrollLeft = centerCard.offsetLeft - container.offsetLeft;
          }
        }
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [isRTL]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollBy({ left: isRTL ? container.clientWidth * 0.8 : -container.clientWidth * 0.8, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollBy({ left: isRTL ? -container.clientWidth * 0.8 : container.clientWidth * 0.8, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white text-black dark:bg-black dark:text-[#e5e2e1] pt-24 pb-8 px-4 sm:px-6 md:px-16 overflow-hidden relative transition-colors duration-500" id="team-section">
      <div className="max-w-[90rem] mx-auto">

        {/* Team Area */}
        <div className="space-y-12" id="team-area">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
            className="text-center space-y-4 max-w-2xl mx-auto"
          >
            <motion.span 
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className="font-mono text-xs text-[#0071ec] tracking-widest uppercase block font-semibold"
            >
              {t('team.label')}
            </motion.span>
            
            <motion.h2 
              variants={{ hidden: { opacity: 0, scale: 0.9, y: 20 }, visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100 } } }}
              className="font-hanken text-4xl sm:text-6xl font-extrabold text-black dark:text-white uppercase tracking-tight"
            >
              {t('team.title')}
            </motion.h2>

            <motion.p 
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className="font-sans text-sm sm:text-base text-zinc-500 dark:text-zinc-400 font-light"
            >
              {t('team.description')}
            </motion.p>
          </motion.div>

          {/* Carousel Container */}
          <div className="relative group">
            
            {/* Nav Buttons */}
            <button 
              onClick={isRTL ? scrollRight : scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/50 dark:bg-black/50 border border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-white/80 dark:hover:bg-black/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block ml-2"
            >
              <ChevronLeft size={24} className={isRTL ? "rotate-180" : ""} />
            </button>

            <button 
              onClick={isRTL ? scrollLeft : scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/50 dark:bg-black/50 border border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-white/80 dark:hover:bg-black/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block mr-2"
            >
              <ChevronRight size={24} className={isRTL ? "rotate-180" : ""} />
            </button>

            {/* Scrollable Area */}
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-3 sm:gap-8 snap-x snap-mandatory pb-4 pt-4 px-4 sm:px-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {TEAM_MEMBERS.map((member, index) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "0px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  key={member.id}
                  className="snap-start shrink-0 w-[30vw] sm:w-[calc(33.333%-1.33rem)] relative bg-gray-50 dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 hover:border-[#0071ec] transition-all duration-500 rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/5] flex flex-col justify-end shadow-xl cursor-grab active:cursor-grabbing"
                  id={`team-card-${member.id}`}
                  whileHover={{ y: -10 }}
                >
                  {member.imageUrl ? (
                    <>
                      <img 
                        src={member.imageUrl} 
                        alt={member.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      <div className="absolute bottom-0 left-0 p-2 sm:p-6 w-full z-10 space-y-0.5 sm:space-y-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                        <p className="font-mono text-[5px] sm:text-[10px] text-[#0071ec] uppercase tracking-widest font-bold drop-shadow-md leading-tight">
                          {t(`team_roles.${member.id}`)}
                        </p>
                        <h4 className="font-hanken text-[10px] sm:text-2xl font-bold text-white tracking-tight drop-shadow-md leading-tight">
                          {member.name}
                        </h4>
                      </div>
                    </>
                  ) : null}
                </motion.div>
              ))}
            </div>

            {/* Gradient Edges to indicate scroll */}
            <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-white dark:from-black to-transparent pointer-events-none z-10 transition-colors duration-500"></div>
            <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-white dark:from-black to-transparent pointer-events-none z-10 transition-colors duration-500"></div>

          </div>
        </div>

      </div>
    </section>
  );
}
