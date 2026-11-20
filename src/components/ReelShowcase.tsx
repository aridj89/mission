import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Volume2, VolumeX, X, Maximize2 } from 'lucide-react';
import { REELS } from '../data';

export default function ReelShowcase() {
  const { t } = useTranslation();
  const N = REELS.length;
  const [activeIdx, setActiveIdx] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const modalVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const feedRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const prevIdx = (activeIdx - 1 + N) % N;
  const nextIdx = (activeIdx + 1) % N;

  const goPrev = useCallback(() => {
    setActiveIdx((curr) => (curr - 1 + N) % N);
  }, [N]);

  const goNext = useCallback(() => {
    setActiveIdx((curr) => (curr + 1) % N);
  }, [N]);

  const scrollToSlide = useCallback((idx: number, behavior: ScrollBehavior = 'smooth') => {
    const feed = feedRef.current;
    if (!feed) return;
    const clamped = ((idx % N) + N) % N;
    feed.scrollTo({
      top: clamped * feed.clientHeight,
      behavior,
    });
  }, [N]);

  // Manage playback for the 3-card carousel vs expanded viewer
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (isExpanded) {
        // Pause background carousel cards while expanded viewer is open
        video.muted = true;
        if (!video.paused) video.pause();
        return;
      }

      const isCenter = idx === activeIdx;
      const isVisible = isCenter || idx === prevIdx || idx === nextIdx;

      if (isVisible) {
        video.muted = !(isCenter && soundEnabled);
        if (video.paused) {
          video.play().catch(() => {});
        }
      } else {
        video.muted = true;
        if (!video.paused) {
          video.pause();
        }
      }
    });

    modalVideoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (!isExpanded) {
        video.muted = true;
        if (!video.paused) video.pause();
        return;
      }

      const isCurrent = idx === activeIdx;
      const isNeighbor = Math.abs(idx - activeIdx) <= 1;

      if (isCurrent) {
        video.muted = !soundEnabled;
        if (video.paused) {
          video.play().catch(() => {});
        }
      } else {
        video.muted = true;
        if (!video.paused) {
          video.pause();
        }
        if (isNeighbor && video.readyState === 0) {
          video.load();
        }
      }
    });
  }, [activeIdx, prevIdx, nextIdx, soundEnabled, isExpanded]);

  // When opening expanded viewer, jump scroll position to activeIdx
  useEffect(() => {
    if (!isExpanded) return;
    const raf = requestAnimationFrame(() => {
      scrollToSlide(activeIdx, 'instant' as ScrollBehavior);
    });
    return () => cancelAnimationFrame(raf);
  }, [isExpanded]);

  // Keyboard navigation (Left/Right in carousel, Up/Down/Escape in expanded viewer)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isExpanded) {
        if (e.key === 'Escape') {
          setIsExpanded(false);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          const next = Math.min(N - 1, activeIdx + 1);
          scrollToSlide(next, 'smooth');
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = Math.max(0, activeIdx - 1);
          scrollToSlide(prev, 'smooth');
        }
      } else {
        if (e.key === 'ArrowLeft') goPrev();
        else if (e.key === 'ArrowRight') goNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isExpanded, activeIdx, N, goPrev, goNext, scrollToSlide]);

  const toggleSound = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSoundEnabled((prev) => !prev);
  };

  const openExpanded = () => {
    setSoundEnabled(true);
    setIsExpanded(true);
  };

  const closeExpanded = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsExpanded(false);
  };

  const handleFeedScroll = () => {
    const feed = feedRef.current;
    if (!feed || feed.clientHeight === 0) return;
    const idx = Math.round(feed.scrollTop / feed.clientHeight);
    if (idx >= 0 && idx < N && idx !== activeIdx) {
      setActiveIdx(idx);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) goPrev();
      else goNext();
    }
  };

  return (
    <section
      id="reel-showcase-section"
      className="relative z-20 min-h-[calc(100dvh-4rem)] w-full flex flex-col justify-between items-center py-10 sm:py-14 px-4 sm:px-8 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 45%, rgba(70, 45, 128, 0.38) 0%, rgba(26, 8, 68, 0.35) 52%, rgba(11, 5, 27, 0.32) 100%)',
      }}
    >
      {/* Section title */}
      <div className="text-center z-20 space-y-2">
        <h2 className="font-hanken text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight uppercase">
          {t('reel.title')}
        </h2>
        <p className="font-mono text-xs text-purple-200/75 tracking-widest uppercase">
          {activeIdx + 1} / {N}
        </p>
      </div>

      {/* 3-Video Stage (1 Center, 1 Left, 1 Right) */}
      <div
        className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-4 select-none [perspective:1400px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Left Navigation Button */}
        <button
          onClick={goPrev}
          aria-label="Previous video"
          className="absolute left-1 sm:left-4 md:left-8 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#1A0844]/85 hover:bg-[#7B5BE0] border border-[#9A73F0]/50 text-white flex items-center justify-center backdrop-blur-md shadow-[0_0_25px_rgba(123,91,224,0.45)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          id="reel-prev-btn"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Video Cards */}
        <div className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] flex items-center justify-center [transform-style:preserve-3d]">
          {REELS.map((reel, idx) => {
            const isCenter = idx === activeIdx;
            const isLeft = idx === prevIdx;
            const isRight = idx === nextIdx;
            const isVisible = isCenter || isLeft || isRight;

            let transformClass =
              'opacity-0 pointer-events-none [transform:translate3d(0,0,-300px)_scale(0.5)] z-0';
            if (isCenter) {
              transformClass =
                'opacity-100 z-30 [transform:translate3d(0,0,0)_scale(1)_rotateY(0deg)] border-[#9A73F0] shadow-[0_25px_70px_rgba(123,91,224,0.55)] hover:scale-[1.03]';
            } else if (isLeft) {
              transformClass =
                'opacity-55 hover:opacity-85 z-20 [transform:translate3d(-72%,0,-120px)_scale(0.8)_rotateY(18deg)] sm:[transform:translate3d(-95%,0,-120px)_scale(0.82)_rotateY(18deg)] border-[#7B5BE0]/40 shadow-[0_15px_40px_rgba(0,0,0,0.6)]';
            } else if (isRight) {
              transformClass =
                'opacity-55 hover:opacity-85 z-20 [transform:translate3d(72%,0,-120px)_scale(0.8)_rotateY(-18deg)] sm:[transform:translate3d(95%,0,-120px)_scale(0.82)_rotateY(-18deg)] border-[#7B5BE0]/40 shadow-[0_15px_40px_rgba(0,0,0,0.6)]';
            }

            return (
              <div
                key={reel.id}
                onClick={() => {
                  if (isCenter) openExpanded();
                  else if (isLeft) goPrev();
                  else if (isRight) goNext();
                }}
                className={`absolute w-[200px] sm:w-[240px] md:w-[270px] aspect-[9/16] rounded-2xl overflow-hidden bg-black border transition-all duration-500 ease-out cursor-pointer ${transformClass}`}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[idx] = el;
                  }}
                  src={reel.videoUrl}
                  muted={!(isCenter && soundEnabled) || isExpanded}
                  loop
                  playsInline
                  preload={isVisible ? 'auto' : 'metadata'}
                  className="w-full h-full object-cover block pointer-events-none"
                />

                {/* Dark overlay on side cards for depth */}
                {!isCenter && isVisible && (
                  <div className="absolute inset-0 bg-[#0b051b]/35 transition-opacity duration-300 hover:opacity-10 pointer-events-none" />
                )}

                {/* Controls on Center Card */}
                {isCenter && (
                  <>
                    <button
                      onClick={toggleSound}
                      aria-label="Toggle audio"
                      className={`absolute top-3 right-3 z-20 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 hover:scale-110 cursor-pointer ${
                        soundEnabled
                          ? 'bg-[#7B5BE0] border border-[#9A73F0] text-white shadow-[0_0_16px_rgba(154,115,240,0.75)]'
                          : 'bg-black/60 border border-white/30 text-white shadow-md'
                      }`}
                    >
                      {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                    </button>

                    <div className="absolute bottom-3 right-3 z-20 px-2.5 py-1 rounded-full bg-black/60 border border-white/25 text-white/90 backdrop-blur-md flex items-center gap-1.5 font-mono text-[10px] tracking-wider pointer-events-none">
                      <Maximize2 size={12} />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Navigation Button */}
        <button
          onClick={goNext}
          aria-label="Next video"
          className="absolute right-1 sm:right-4 md:right-8 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#1A0844]/85 hover:bg-[#7B5BE0] border border-[#9A73F0]/50 text-white flex items-center justify-center backdrop-blur-md shadow-[0_0_25px_rgba(123,91,224,0.45)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          id="reel-next-btn"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2 z-20">
        {REELS.map((reel, idx) => (
          <button
            key={reel.id}
            onClick={() => setActiveIdx(idx)}
            aria-label={`Video ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              idx === activeIdx
                ? 'w-7 bg-[#9A73F0] shadow-[0_0_10px_#9A73F0]'
                : 'w-2 bg-white/25 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Expanded Vertical Scroll Video Viewer (Not Fullscreen — Site Visible Underneath) */}
      {isExpanded && (
        <div
          onClick={closeExpanded}
          onWheel={(e) => {
            if (feedRef.current && e.target === e.currentTarget) {
              feedRef.current.scrollBy({ top: e.deltaY, behavior: 'smooth' });
            }
          }}
          className="fixed inset-0 z-50 bg-[#080316]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          id="expanded-reel-overlay"
        >
          {/* Enlarged Video Card Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative h-[78dvh] sm:h-[82dvh] max-h-[760px] aspect-[9/16] max-w-[90vw] rounded-3xl overflow-hidden bg-black border-2 border-[#9A73F0] shadow-[0_25px_90px_rgba(123,91,224,0.75)] flex flex-col"
          >
            {/* Top Bar inside enlarged video: Sound Toggle + Counter + Exit Button */}
            <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none">
              <button
                onClick={toggleSound}
                aria-label="Toggle audio"
                className={`pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 hover:scale-110 cursor-pointer ${
                  soundEnabled
                    ? 'bg-[#7B5BE0] border border-[#9A73F0] text-white shadow-[0_0_16px_rgba(154,115,240,0.8)]'
                    : 'bg-black/65 border border-white/30 text-white'
                }`}
              >
                {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>

              <span className="px-3 py-1 rounded-full bg-black/60 border border-white/20 text-white font-mono text-xs tracking-widest backdrop-blur-md">
                {activeIdx + 1} / {N}
              </span>

              {/* Exit / Close Button */}
              <button
                onClick={closeExpanded}
                aria-label="Close video viewer"
                id="close-expanded-reel-btn"
                className="pointer-events-auto flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#1A0844]/90 hover:bg-[#ff3b6b] border border-[#9A73F0]/70 hover:border-white text-white font-mono text-xs font-bold tracking-wider backdrop-blur-md shadow-[0_0_20px_rgba(123,91,224,0.7)] transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                <X size={16} />
                <span>FERMER</span>
              </button>
            </div>

            {/* Up / Down quick scroll buttons on right side */}
            <div className="absolute right-3 bottom-16 z-30 flex flex-col gap-2">
              <button
                onClick={() => scrollToSlide(Math.max(0, activeIdx - 1), 'smooth')}
                disabled={activeIdx === 0}
                aria-label="Previous video"
                className="w-9 h-9 rounded-full bg-black/60 hover:bg-[#7B5BE0] disabled:opacity-30 border border-white/25 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
              >
                <ChevronUp size={18} />
              </button>
              <button
                onClick={() => scrollToSlide(Math.min(N - 1, activeIdx + 1), 'smooth')}
                disabled={activeIdx === N - 1}
                aria-label="Next video"
                className="w-9 h-9 rounded-full bg-black/60 hover:bg-[#7B5BE0] disabled:opacity-30 border border-white/25 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
              >
                <ChevronDown size={18} />
              </button>
            </div>

            {/* Bottom Scroll Hint */}
            <div className="absolute bottom-3 left-0 right-0 z-30 flex justify-center pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-black/55 border border-white/15 text-purple-200/90 font-mono text-[10px] tracking-widest uppercase backdrop-blur-md">
                Scroll ↓ next video
              </span>
            </div>

            {/* Vertical Snap-Scrolling Video Feed */}
            <div
              ref={feedRef}
              onScroll={handleFeedScroll}
              className="w-full h-full overflow-y-auto snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {REELS.map((reel, idx) => (
                <div
                  key={`expanded-${reel.id}`}
                  onClick={toggleSound}
                  className="w-full h-full snap-start snap-always shrink-0 relative bg-black flex items-center justify-center cursor-pointer"
                >
                  <video
                    ref={(el) => {
                      modalVideoRefs.current[idx] = el;
                    }}
                    src={reel.videoUrl}
                    muted={!(idx === activeIdx && soundEnabled)}
                    loop
                    playsInline
                    preload={Math.abs(idx - activeIdx) <= 1 ? 'auto' : 'metadata'}
                    className="w-full h-full object-cover block pointer-events-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
