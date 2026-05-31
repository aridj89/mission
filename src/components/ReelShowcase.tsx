import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Pause, X, RotateCcw, Volume2, VolumeX, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Reel } from '../types';
import { REELS, REEL_CATEGORIES } from '../data';

const CATEGORY_COLORS: Record<string, string> = {
  ugc: 'from-purple-600/20 to-pink-600/20 border-purple-500/30',
  dentist: 'from-blue-600/20 to-cyan-600/20 border-blue-500/30',
  esthetique: 'from-rose-600/20 to-orange-600/20 border-rose-500/30',
  pharmacie: 'from-green-600/20 to-teal-600/20 border-green-500/30',
  evenement: 'from-fuchsia-600/20 to-purple-600/20 border-fuchsia-500/30',
  other: 'from-rose-600/20 to-orange-600/20 border-rose-500/30',
};

const CATEGORY_PILL_COLORS: Record<string, string> = {
  ugc: 'bg-purple-600 hover:bg-purple-500',
  dentist: 'bg-blue-600 hover:bg-blue-500',
  esthetique: 'bg-rose-600 hover:bg-rose-500',
  pharmacie: 'bg-green-600 hover:bg-green-500',
  evenement: 'bg-fuchsia-600 hover:bg-fuchsia-500',
  other: 'bg-rose-600 hover:bg-rose-500',
};

export default function ReelShowcase() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Carousel State
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const carouselTouchStart = useRef<number | null>(null);

  // Center Video State
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);

  const filteredReels = activeCategory === 'all'
    ? REELS
    : REELS.filter(r => r.category === activeCategory);

  // Auto-advance Carousel if not interacted with
  useEffect(() => {
    if (activeCategory !== 'all' || isCarouselHovered) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % filteredReels.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeCategory, isCarouselHovered, filteredReels.length]);

  // Make sure new center videos start playing if isPlaying is true
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => { });
      } else {
        videoRef.current.pause();
      }
    }
  }, [carouselIndex, isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Carousel touch handlers
  const handleCarouselTouchStart = (e: React.TouchEvent) => {
    carouselTouchStart.current = e.touches[0].clientX;
    setIsCarouselHovered(true);
  };

  const handleCarouselTouchEnd = (e: React.TouchEvent) => {
    if (!carouselTouchStart.current) return;
    const diff = carouselTouchStart.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      setCarouselIndex((prev) => (prev + 1) % filteredReels.length);
      setIsPlaying(true);
    } else if (diff < -50) {
      setCarouselIndex((prev) => (prev - 1 + filteredReels.length) % filteredReels.length);
      setIsPlaying(true);
    }
    carouselTouchStart.current = null;
    setIsCarouselHovered(false);
  };

  return (
    <section className="bg-white text-black dark:bg-black dark:text-[#e5e2e1] py-16 px-4 md:px-12 overflow-hidden transition-colors duration-500" id="reel-showcase-section">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">

        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="font-hanken text-4xl sm:text-6xl font-extrabold text-black dark:text-white tracking-tight uppercase">
            {t('reel.title')}
          </h2>
          <p className="font-sans text-sm text-zinc-500 max-w-lg mx-auto">
            {filteredReels.length} {filteredReels.length > 1 ? t('reel.videos') : t('reel.video')}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { setActiveCategory('all'); setCarouselIndex(0); setIsPlaying(true); }}
            className={`px-6 py-2.5 rounded-full font-mono text-xs uppercase font-bold transition-all duration-300 border ${activeCategory === 'all'
              ? 'bg-[#0071ec]/10 border-[#0071ec] text-[#0071ec] shadow-[0_0_15px_rgba(0,113,236,0.3)]'
              : 'bg-black/5 dark:bg-[#1A1A1A] border-black/10 dark:border-white/10 text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:border-[#0071ec]/50 hover:border-[#0071ec]/50 dark:hover:text-[#0071ec]'
              }`}
          >
            {t('reel_categories.all', 'ALL')}
          </button>
          {REEL_CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id;
            let themeClass = '';

            const defaultInactive = 'bg-black/5 dark:bg-[#1A1A1A] border-black/10 dark:border-white/10 text-zinc-500 dark:text-zinc-400';
            if (cat.id === 'ugc') {
              themeClass = isActive
                ? 'bg-purple-500/10 border-purple-500 text-purple-600 dark:text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : `${defaultInactive} hover:border-purple-500/50 hover:text-purple-600 dark:hover:text-purple-400`;
            } else if (cat.id === 'dentist') {
              themeClass = isActive
                ? 'bg-blue-500/10 border-blue-500 text-blue-600 dark:text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                : `${defaultInactive} hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400`;
            } else if (cat.id === 'esthetique') {
              themeClass = isActive
                ? 'bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                : `${defaultInactive} hover:border-rose-500/50 hover:text-rose-600 dark:hover:text-rose-400`;
            } else if (cat.id === 'pharmacie') {
              themeClass = isActive
                ? 'bg-green-500/10 border-green-500 text-green-600 dark:text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                : `${defaultInactive} hover:border-green-500/50 hover:text-green-600 dark:hover:text-green-400`;
            } else if (cat.id === 'evenement') {
              themeClass = isActive
                ? 'bg-fuchsia-500/10 border-fuchsia-500 text-fuchsia-600 dark:text-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.3)]'
                : `${defaultInactive} hover:border-fuchsia-500/50 hover:text-fuchsia-600 dark:hover:text-fuchsia-400`;
            } else {
              themeClass = isActive
                ? 'bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                : `${defaultInactive} hover:border-rose-500/50 hover:text-rose-600 dark:hover:text-rose-400`;
            }

            return (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setCarouselIndex(0); setIsPlaying(true); }}
                className={`px-6 py-2.5 rounded-full font-mono text-xs uppercase font-bold transition-all duration-300 border ${themeClass}`}
              >
                {t(`reel_categories.${cat.id}`, cat.label)}
              </button>
            );
          })}
        </div>

        {/* Dynamic Display: 3D Carousel for ALL categories */}
        <div
          className="relative h-[500px] sm:h-[600px] w-full max-w-5xl mx-auto [perspective:1000px] flex items-center justify-center"
          onMouseEnter={() => setIsCarouselHovered(true)}
          onMouseLeave={() => setIsCarouselHovered(false)}
          onTouchStart={handleCarouselTouchStart}
          onTouchEnd={handleCarouselTouchEnd}
        >
          {/* Carousel Controls */}
          <button
            onClick={() => {
              setCarouselIndex((prev) => (prev - 1 + filteredReels.length) % filteredReels.length);
              setIsPlaying(true);
            }}
            className="absolute left-2 sm:left-4 z-30 p-2 sm:p-3 rounded-full bg-black/40 sm:bg-black/40 dark:bg-black/40 sm:dark:bg-white/5 border border-black/10 dark:border-white/10 text-white hover:bg-black/60 dark:hover:bg-white/10 transition-colors backdrop-blur-md"
          >
            <ChevronLeft size={24} className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={() => {
              setCarouselIndex((prev) => (prev + 1) % filteredReels.length);
              setIsPlaying(true);
            }}
            className="absolute right-2 sm:right-4 z-30 p-2 sm:p-3 rounded-full bg-black/40 sm:bg-black/40 dark:bg-black/40 sm:dark:bg-white/5 border border-black/10 dark:border-white/10 text-white hover:bg-black/60 dark:hover:bg-white/10 transition-colors backdrop-blur-md"
          >
            <ChevronRight size={24} className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {filteredReels.map((reel, index) => {
            // Calculate relative position
            let diff = index - carouselIndex;
            if (diff > Math.floor(filteredReels.length / 2)) diff -= filteredReels.length;
            if (diff < -Math.floor(filteredReels.length / 2)) diff += filteredReels.length;

            // Only show items within distance of 2
            if (Math.abs(diff) > 2) return null;

            const isCenter = diff === 0;
            const translateX = diff * (isMobile ? 75 : 120);
            const scale = isCenter ? 1 : (isMobile ? 0.85 : 0.8);
            const zIndex = 10 - Math.abs(diff);
            const opacity = isCenter ? 1 : Math.abs(diff) === 1 ? (isMobile ? 0.8 : 0.6) : 0;

            const colorClass = CATEGORY_COLORS[reel.category] || 'from-zinc-600/20 to-zinc-600/20 border-zinc-500/30';

            return (
              <div
                key={reel.id}
                onClick={() => {
                  if (isCenter) {
                    togglePlay();
                  } else {
                    setCarouselIndex(index);
                    setIsPlaying(true);
                  }
                }}
                className={`absolute top-1/2 left-1/2 w-[260px] sm:w-[320px] aspect-[9/16] rounded-2xl overflow-hidden border bg-gradient-to-b ${colorClass} transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-2xl ${isCenter ? 'cursor-pointer hover:scale-105 shadow-[#0071ec]/20' : 'cursor-pointer blur-[2px]'}`}
                style={{
                  transform: `translate(calc(-50% + ${translateX}%), -50%) scale(${scale})`,
                  zIndex,
                  opacity,
                }}
              >
                <video
                  ref={isCenter ? videoRef : null}
                  src={reel.videoUrl}
                  className="absolute inset-0 w-full h-full object-contain bg-black"
                  muted={isCenter ? isMuted : true}
                  loop
                  playsInline
                  autoPlay={isCenter}
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent pointer-events-none" />

                {/* Play/Pause Overlay */}
                {isCenter && !isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/40 flex items-center justify-center">
                      <Play size={24} className="text-white fill-current ml-1" />
                    </div>
                  </div>
                )}

                {/* Sound Toggle Button */}
                {isCenter && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute();
                    }}
                    className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    {isMuted ? <VolumeX size={14} className="text-red-400" /> : <Volume2 size={14} />}
                  </button>
                )}

                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-white/15 backdrop-blur-md text-white font-mono text-[8px] tracking-wider px-2 py-0.5 rounded-full uppercase font-bold border border-white/20">
                    {reel.category}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10 pointer-events-none">
                  <p className="font-hanken text-sm font-bold text-white truncate">{reel.title}</p>
                  <p className="font-mono text-[10px] text-zinc-400 mt-0.5">{t(`reel_subtitles.${reel.category}`)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
