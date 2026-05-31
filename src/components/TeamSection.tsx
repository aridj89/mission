import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TEAM_MEMBERS } from '../data';
import { TeamMember } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TeamFlipCard from './TeamFlipCard';

export default function TeamSection({ isGlobalFlipped = false }: { isGlobalFlipped?: boolean }) {
  const { t, i18n } = useTranslation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isRTL = i18n.language === 'ar';

  // Scroll to center items on mount
  useEffect(() => {
    // We add a tiny delay to ensure layout is calculated
    const timeout = setTimeout(() => {
      if (scrollContainerRef.current) {
        // Find both founder flip cards (Front face IDs)
        const firstCard = document.getElementById('team-card-ramy-zoubiri');
        const secondCard = document.getElementById('team-card-aridj-bouzidi');
        
        if (firstCard && secondCard) {
          const container = scrollContainerRef.current;
          
          if (isRTL) {
            // For RTL, calculating scroll position is tricky, rely on scrollIntoView
            // Center the first card
            secondCard.scrollIntoView({ inline: 'center', block: 'nearest' });
          } else {
            // For LTR, calculate exact center between both cards
            const relativeLeftEdge = Math.min(firstCard.offsetLeft, secondCard.offsetLeft) - container.offsetLeft;
            const relativeRightEdge = Math.max(firstCard.offsetLeft + firstCard.clientWidth, secondCard.offsetLeft + secondCard.clientWidth) - container.offsetLeft;
            const centerOfCards = relativeLeftEdge + (relativeRightEdge - relativeLeftEdge) / 2;
            
            const targetScrollLeft = centerOfCards - (container.clientWidth / 2);
            container.scrollLeft = targetScrollLeft;
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
            
            <div className="h-24 sm:h-32 flex justify-center items-center overflow-hidden mt-4">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={isGlobalFlipped ? "mission" : "vexa"}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center gap-2 sm:gap-4"
                >
                  <img 
                    src={isGlobalFlipped ? "/logo.jpg" : "/Ve.png"} 
                    alt={isGlobalFlipped ? "Mission Verse" : "Vexa"} 
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover shadow-lg"
                  />
                  <h2 className="font-hanken text-4xl sm:text-6xl font-extrabold text-black dark:text-white uppercase tracking-tight">
                    {isGlobalFlipped ? "MISSION VERSE" : "VEXA"}
                  </h2>
                </motion.div>
              </AnimatePresence>
            </div>

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
              className="flex overflow-x-auto gap-3 sm:gap-8 snap-x snap-mandatory pb-8 pt-4 px-4 sm:px-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-center"
            >
              {(() => {
                const aridj = TEAM_MEMBERS.find(m => m.id === 'aridj-bouzidi');
                const abdou = TEAM_MEMBERS.find(m => m.id === 'direche-abderrahmen');
                const ramy = TEAM_MEMBERS.find(m => m.id === 'ramy-zoubiri');
                const oussama = TEAM_MEMBERS.find(m => m.id === 'oussama-hamdaoui');

                const others = TEAM_MEMBERS.filter(m => !['aridj-bouzidi', 'direche-abderrahmen', 'ramy-zoubiri', 'oussama-hamdaoui'].includes(m.id));
                const otherCard1 = { front: others[0], back: others[1] };
                const otherCard2 = { front: others[2], back: others[3] };
                const otherCard3 = { front: others[4], back: others[5] };

                const cardClass = "w-[45vw] sm:w-[28vw] md:w-[22vw]";

                return (
                  <>
                    {otherCard1.front && otherCard1.back && (
                      <TeamFlipCard 
                        memberFront={otherCard1.front} 
                        memberBack={otherCard1.back} 
                        isFlipped={isGlobalFlipped} 
                        className={cardClass}
                        delay={0.05}
                      />
                    )}
                    
                    {otherCard2.front && otherCard2.back && (
                      <TeamFlipCard 
                        memberFront={otherCard2.front} 
                        memberBack={otherCard2.back} 
                        isFlipped={isGlobalFlipped} 
                        className={cardClass}
                        delay={0.1}
                      />
                    )}
                    
                    {ramy && oussama && (
                      <TeamFlipCard 
                        memberFront={ramy} 
                        memberBack={oussama} 
                        isFlipped={isGlobalFlipped} 
                        className={cardClass}
                        delay={0.15}
                      />
                    )}

                    {aridj && abdou && (
                      <TeamFlipCard 
                        memberFront={aridj} 
                        memberBack={abdou} 
                        isFlipped={isGlobalFlipped} 
                        className={cardClass}
                        delay={0.2}
                      />
                    )}

                    {otherCard3.front && otherCard3.back && (
                      <TeamFlipCard 
                        memberFront={otherCard3.front} 
                        memberBack={otherCard3.back} 
                        isFlipped={isGlobalFlipped} 
                        className={cardClass}
                        delay={0.25}
                      />
                    )}
                  </>
                );
              })()}
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
