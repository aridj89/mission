import React from 'react';
import { MessageCircle } from 'lucide-react';
import MissionLogo from './MissionLogo';

interface HeaderProps {
  logoIndex?: number;
  rotation: number;
}

const ORVA_INSTA_URL = 'https://www.instagram.com/orva.media?fqnt=MTg3cWw3cGJwOTMxcQ%3D%3D&utm_source=qr';
const VEXA_INSTA_URL = 'https://www.instagram.com/vexa.agency_?fqnt=cW5wZ2d6OWp0d3Jr';
const WHATSAPP_URL = 'https://wa.me/213540893911';

export default function Header({ rotation }: HeaderProps) {
  const logos = ['/logo.png', '/Ve.png'];
  const brandNames = ['ORVA', 'VEXA'];

  return (
    <header className="fixed top-3 left-1/2 -translate-x-1/2 w-[95%] sm:w-[88%] max-w-3xl h-12 sm:h-14 rounded-full bg-gradient-to-r from-[#0e0524]/75 via-[#1A0844]/75 to-[#281260]/75 backdrop-blur-xl border border-white/15 shadow-[0_8px_32px_rgba(11,5,27,0.65)] z-50 px-3 sm:px-6 grid grid-cols-[auto_1fr_auto] items-center gap-2 transition-all duration-300">
      {/* Left Section: Logo */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        className="flex items-center gap-1.5 sm:gap-2 hover:opacity-90 transition-opacity shrink-0"
        id="logo-button"
      >
        <div 
          className="relative w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-700 ease-in-out [transform-style:preserve-3d]" 
          style={{ transform: `rotateY(${rotation}deg)` }}
        >
          <img src={logos[1]} alt={brandNames[1]} className="absolute inset-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover [backface-visibility:hidden]" />
          <MissionLogo alt={brandNames[0]} className="absolute inset-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover [backface-visibility:hidden] [transform:rotateY(180deg)]" />
        </div>
        
        <div 
          className="hidden xs:grid sm:grid transition-transform duration-700 ease-in-out [transform-style:preserve-3d] items-center text-left"
          style={{ transform: `rotateX(${rotation}deg)` }}
        >
          <span className="col-start-1 row-start-1 font-hanken font-extrabold tracking-tighter text-sm sm:text-lg text-white uppercase [backface-visibility:hidden] whitespace-nowrap">
            {brandNames[1]}
          </span>
          <span className="col-start-1 row-start-1 font-hanken font-extrabold tracking-tighter text-sm sm:text-lg text-white uppercase [backface-visibility:hidden] [transform:rotateX(180deg)] whitespace-nowrap">
            {brandNames[0]}
          </span>
        </div>
      </button>

      {/* Center Nav: Welcome pill in the exact middle */}
      <nav className="flex justify-center items-center min-w-0">
        <button
          onClick={() => {
            document.getElementById('reel-showcase-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="py-1 sm:py-1.5 px-2.5 sm:px-5 rounded-full border border-white/15 hover:border-[#9A73F0] transition-all duration-300 text-[8.5px] sm:text-xs font-mono tracking-wider sm:tracking-widest bg-white/5 text-purple-100/95 hover:text-white whitespace-nowrap truncate"
          id="nav-portfolio-btn"
        >
          WELCOME TO ORVA & VEXA
        </button>
      </nav>

      {/* Right Section: Orva Insta (logo.png), Vexa Insta (Ve.png), and WhatsApp button */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Orva Instagram Button (public/logo.png) */}
        <a
          href={ORVA_INSTA_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram Orva Media"
          aria-label="Instagram Orva Media"
          id="nav-orva-insta-btn"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-[#9A73F0]/60 hover:border-white shadow-[0_0_14px_rgba(154,115,240,0.5)] hover:scale-110 active:scale-95 transition-all duration-200 shrink-0 block"
        >
          <MissionLogo alt="Orva Media Instagram" className="w-full h-full object-cover" />
        </a>

        {/* Vexa Instagram Button (public/Ve.png) */}
        <a
          href={VEXA_INSTA_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram Vexa Agency"
          aria-label="Instagram Vexa Agency"
          id="nav-vexa-insta-btn"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-[#9A73F0]/60 hover:border-white shadow-[0_0_14px_rgba(154,115,240,0.5)] hover:scale-110 active:scale-95 transition-all duration-200 shrink-0 block"
        >
          <img src="/Ve.png" alt="Vexa Agency Instagram" className="w-full h-full object-cover" />
        </a>

        {/* WhatsApp Button */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp"
          aria-label="WhatsApp"
          id="nav-whatsapp-btn"
          className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#6446A6] to-[#9A73F0] hover:from-[#7B5BE0] hover:to-[#b392ff] border border-white/25 text-white font-mono text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase shadow-[0_0_16px_rgba(123,91,224,0.55)] hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <MessageCircle size={13} className="shrink-0" />
          <span className="hidden md:inline">WHATSAPP</span>
        </a>
      </div>
    </header>
  );
}
