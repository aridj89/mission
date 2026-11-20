import React, { useRef, useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

const CLIENT_LOGOS = [
  { id: 1, src: '/logos/clinic-1.png', alt: 'Client 1' },
  { id: 2, src: '/logos/clinic-2.png', alt: 'Client 2' },
  { id: 3, src: '/logos/clinic-3.png', alt: 'Client 3' },
  { id: 4, src: '/logos/clinic-4.png', alt: 'Client 4' },
  { id: 5, src: '/logos/clinic-5.png', alt: 'Client 5' },
  { id: 6, src: '/logos/clinic-6.png', alt: 'Client 6' },
];

export default function LogoMarquee() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  // Auto-scroll logic
  useEffect(() => {
    let animationId: number;
    // Speed factor: higher is faster.
    const speed = 1.5; 
    
    const scroll = () => {
      if (scrollRef.current && !isInteracting) {
        scrollRef.current.scrollLeft += speed;
        
        // When we've scrolled past the first set of logos, jump back to 0 seamlessly
        // The scrollWidth is the total width of both sets.
        // We jump back when scrollLeft reaches half the total width.
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
          scrollRef.current.scrollLeft -= scrollRef.current.scrollWidth / 2;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isInteracting]);

  return (
    <div className="relative z-20 w-full overflow-hidden py-16 bg-gradient-to-b from-[#140735]/20 via-[#1A0844]/35 to-[#12062e]/30" id="logo-marquee-section">
      
      {/* Subtle ambient glow behind the marquee */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-32 bg-[radial-gradient(ellipse_at_center,_rgba(154,115,240,0.18)_0%,_transparent_70%)] blur-2xl"></div>
      </div>

      {/* Marquee container with transparent CSS mask edge fades so video shows through */}
      <div className="relative [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">

        {/* Scrolling track with touch support */}
        <div 
          ref={scrollRef}
          className="flex items-center overflow-x-auto w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] touch-pan-x cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => setIsInteracting(false)}
        >
          {/* We duplicate the set 4 times to ensure it fills wide screens and loops perfectly */}
          {[1, 2, 3, 4].map((setIndex) => (
            <React.Fragment key={`set-${setIndex}`}>
              {CLIENT_LOGOS.map((logo) => (
                <div
                  key={`${setIndex}-${logo.id}`}
                  className="flex-shrink-0 mx-8 sm:mx-14 md:mx-20 flex items-center justify-center group py-2"
                >
                  <div className="relative p-4 rounded-xl border border-transparent group-hover:border-white/15 group-hover:bg-white/[0.05] transition-all duration-500">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-20 sm:h-24 md:h-28 w-auto object-contain opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 pointer-events-none"
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
