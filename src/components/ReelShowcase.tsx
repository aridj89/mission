import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { REELS } from '../data';

export default function ReelShowcase() {
  const { t } = useTranslation();
  const N = REELS.length;
  const [activeIdx, setActiveIdx] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);

  const prevIdx = (activeIdx - 1 + N) % N;
  const nextIdx = (activeIdx + 1) % N;

  const goPrev = useCallback(() => {
    setActiveIdx((curr) => (curr - 1 + N) % N);
  }, [N]);

  const goNext = useCallback(() => {
    setActiveIdx((curr) => (curr + 1) % N);
  }, [N]);

  // Play only the 3 visible videos (center + left + right) and manage audio on center
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
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
  }, [activeIdx, prevIdx, nextIdx, soundEnabled]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goPrev, goNext]);

  const toggleSound = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSoundEnabled((prev) => !prev);
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
                'opacity-100 z-30 [transform:translate3d(0,0,0)_scale(1)_rotateY(0deg)] border-[#9A73F0] shadow-[0_25px_70px_rgba(123,91,224,0.55)]';
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
                  if (isCenter) toggleSound();
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
                  muted={!(isCenter && soundEnabled)}
                  loop
                  playsInline
                  preload={isVisible ? 'auto' : 'metadata'}
                  className="w-full h-full object-cover block pointer-events-none"
                />

                {/* Dark overlay on side cards for depth */}
                {!isCenter && isVisible && (
                  <div className="absolute inset-0 bg-[#0b051b]/35 transition-opacity duration-300 hover:opacity-10 pointer-events-none" />
                )}

                {/* Sound Toggle Button on Center Card */}
                {isCenter && (
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
    </section>
  );
}
