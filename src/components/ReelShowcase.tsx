import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { REELS } from '../data';

const RADIUS = 520;
const SPIN = 1;

export default function ReelShowcase() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const targetRef = useRef(0);
  const curRef = useRef(0);
  // Audio state
  const soundActiveRef = useRef(false);
  const activeAudioIdxRef = useRef<number | null>(null);
  const prevFrontIdxRef = useRef<number>(-1);
  const frontIdxRef = useRef<number>(0);
  // Auto-rotation state
  const autoAngleRef = useRef(0);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const scene = sceneRef.current;
    const track = trackRef.current;
    if (!section || !stage || !scene || !track) return;

    const N = REELS.length;
    const step = 360 / N;

    // SVG icons
    const iconMuted = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;
    const iconSound = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;

    // Create cards
    type CardData = { card: HTMLDivElement; video: HTMLVideoElement; btn: HTMLButtonElement };
    const cards: CardData[] = [];

    // Helper: mute all videos except targetIdx (if targetIdx === null, mute all)
    const muteAllExcept = (targetIdx: number | null) => {
      cards.forEach(({ video, btn }, idx) => {
        if (idx === targetIdx) {
          video.muted = false;
          if (video.paused) video.play().catch(() => {});
          btn.innerHTML = iconSound;
          btn.style.background = 'rgba(31,91,255,0.85)';
          btn.style.borderColor = '#4d86ff';
          btn.style.boxShadow = '0 0 16px rgba(77,134,255,0.6)';
        } else {
          video.muted = true;
          btn.innerHTML = iconMuted;
          btn.style.background = 'rgba(0,0,0,0.6)';
          btn.style.borderColor = 'rgba(255,255,255,0.3)';
          btn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
        }
      });
      activeAudioIdxRef.current = targetIdx;
    };

    // Toggle sound for a specific card
    const handleToggleSound = (idx: number) => {
      if (activeAudioIdxRef.current === idx && soundActiveRef.current) {
        // Already active on this card -> mute it
        soundActiveRef.current = false;
        muteAllExcept(null);
      } else {
        // Unmute this card -> automatically mutes any previous card
        soundActiveRef.current = true;
        muteAllExcept(idx);
      }
    };

    REELS.forEach((reel, i) => {
      const card = document.createElement('div');
      card.style.cssText = `
        position:absolute;
        width:min(34vw,240px);
        aspect-ratio:9/16;
        left:calc(min(34vw,240px)/-2);
        top:calc(min(34vw,240px)*-0.89);
        border-radius:16px;
        overflow:hidden;
        background:#000;
        box-shadow:0 20px 60px rgba(0,0,0,0.5);
        backface-visibility:hidden;
        will-change:transform,opacity;
        border:1px solid rgba(77,134,255,0.45);
        cursor:pointer;
      `;

      const video = document.createElement('video');
      video.src = reel.videoUrl;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.autoplay = true;
      video.preload = 'auto';
      video.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
      video.play().catch(() => {});

      // Sound toggle button
      const btn = document.createElement('button');
      btn.innerHTML = iconMuted;
      btn.setAttribute('aria-label', 'Toggle audio');
      btn.style.cssText = `
        position:absolute;
        top:12px;
        right:12px;
        z-index:20;
        width:38px;
        height:38px;
        border-radius:50%;
        background:rgba(0,0,0,0.6);
        border:1px solid rgba(255,255,255,0.3);
        color:#fff;
        display:flex;
        align-items:center;
        justify-content:center;
        cursor:pointer;
        backdrop-filter:blur(8px);
        opacity:0;
        transition:opacity 0.25s, transform 0.2s, background 0.2s, box-shadow 0.2s;
        pointer-events:none;
        box-shadow:0 4px 12px rgba(0,0,0,0.4);
      `;
      btn.onmouseenter = () => { btn.style.transform = 'scale(1.12)'; };
      btn.onmouseleave = () => { btn.style.transform = 'scale(1)'; };

      btn.onclick = (e) => {
        e.stopPropagation();
        handleToggleSound(i);
      };

      // Click card to toggle sound if in front
      card.onclick = () => {
        if (frontIdxRef.current === i) {
          handleToggleSound(i);
        }
      };

      card.appendChild(video);
      card.appendChild(btn);
      scene.appendChild(card);
      cards.push({ card, video, btn });
    });

    // Scroll handler
    const handleScroll = () => {
      if (!track) return;
      const trackHeight = track.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY - (track.getBoundingClientRect().top + window.scrollY);
      targetRef.current = trackHeight > 0 ? Math.max(0, Math.min(1, scrolled / trackHeight)) : 0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Hover & touch listeners to pause auto-rotation on user inspection
    const onEnter = () => { isHoveredRef.current = true; };
    const onLeave = () => { isHoveredRef.current = false; };
    stage.addEventListener('mouseenter', onEnter);
    stage.addEventListener('mouseleave', onLeave);
    stage.addEventListener('touchstart', onEnter, { passive: true });
    stage.addEventListener('touchend', onLeave, { passive: true });

    // Animation loop
    const frame = () => {
      curRef.current += (targetRef.current - curRef.current) * 0.06;

      // Auto-rotation: continuously rotates smoothly unless hovered or active audio is playing
      if (!isHoveredRef.current && !soundActiveRef.current) {
        autoAngleRef.current += 0.16;
      }

      // Combine auto-rotation + user scroll control
      const angle = autoAngleRef.current + curRef.current * 360 * SPIN;
      const r = Math.min(RADIUS, window.innerWidth * 0.55);

      let maxDepth = -1;
      let frontIdx = 0;

      cards.forEach(({ card, video, btn }, i) => {
        const a = i * step + angle;
        const depth = (Math.cos((a * Math.PI) / 180) + 1) / 2;

        // Blur for cards in the back
        const blurAmount = depth < 0.5 ? ((0.5 - depth) * 10).toFixed(1) : '0';

        // Exact same horizontal level for all cards (no vertical wave, no tilt)
        card.style.transform = `rotateY(${a}deg) translateZ(${r}px) scale(${(0.82 + 0.18 * depth).toFixed(3)})`;
        card.style.opacity = (0.35 + 0.65 * depth).toFixed(3);
        card.style.zIndex = String(Math.round(depth * 100));
        card.style.filter = `blur(${blurAmount}px)`;

        const isFront = depth > 0.4;
        if (isFront && video.paused) video.play().catch(() => {});
        if (!isFront && !video.paused) video.pause();

        // Track the most front card
        if (depth > maxDepth) {
          maxDepth = depth;
          frontIdx = i;
        }

        // Hide sound btn by default
        btn.style.opacity = '0';
        btn.style.pointerEvents = 'none';
      });

      frontIdxRef.current = frontIdx;

      // Handle front card transition for audio:
      // If sound is active and front card changed, mute previous and unmute new front
      if (frontIdx !== prevFrontIdxRef.current) {
        if (soundActiveRef.current) {
          muteAllExcept(frontIdx);
        } else {
          muteAllExcept(null);
        }
        prevFrontIdxRef.current = frontIdx;
      }

      // Show sound btn only on the frontmost card
      const front = cards[frontIdx];
      if (front && maxDepth > 0.75) {
        front.btn.style.opacity = '1';
        front.btn.style.pointerEvents = 'auto';
      }

      scene.style.transform = `translateZ(-${(r * 0.25).toFixed(0)}px)`;
      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', handleScroll);
      stage.removeEventListener('mouseenter', onEnter);
      stage.removeEventListener('mouseleave', onLeave);
      stage.removeEventListener('touchstart', onEnter);
      stage.removeEventListener('touchend', onLeave);
      muteAllExcept(null);
      cards.forEach(({ card, video }) => {
        video.pause();
        video.src = '';
        card.remove();
      });
    };
  }, []);

  return (
    <>
      <div
        ref={trackRef}
        id="reel-showcase-section"
        style={{ height: '600vh', position: 'relative' }}
        className="bg-white"
      >
        <div
          ref={sectionRef}
          style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}
          className="bg-white"
        >
          <div
            ref={stageRef}
            style={{
              position: 'absolute',
              inset: 0,
              perspective: '1400px',
              background: 'radial-gradient(ellipse at 50% 40%, #dce8ff 0%, #ffffff 70%)',
            }}
          >
            {/* Section title */}
            <div className="absolute top-8 left-0 right-0 text-center z-10 pointer-events-none">
              <h2 className="font-hanken text-4xl sm:text-6xl font-extrabold text-black tracking-tight uppercase">
                {t('reel.title')}
              </h2>
              <p className="font-mono text-xs text-zinc-500 mt-2 tracking-widest uppercase">
                {t('reel.scroll_hint', 'Scroll to explore')}
              </p>
            </div>

            {/* 3D Scene anchor */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: 0,
                height: 0,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
              ref={sceneRef}
            />

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10 pointer-events-none">
              <div className="flex flex-col items-center gap-2 animate-bounce opacity-40">
                <div className="w-px h-12 bg-current" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-500">scroll</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
