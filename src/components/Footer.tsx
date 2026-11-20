import React from 'react';
import { useTranslation } from 'react-i18next';
import MissionLogo from './MissionLogo';

interface FooterProps {
  logoIndex?: number;
  rotation: number;
}

export default function Footer({ rotation }: FooterProps) {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const logos = ['/logo.png', '/Ve.png'];
  const brandNames = ['ORVA', 'VEXA'];

  return (
    <footer className="bg-transparent border-t border-white/5 w-full" id="global-footer">
      <div className="flex flex-col items-center gap-8 pt-10 pb-8 px-6 text-center max-w-7xl mx-auto">
        
        {/* Logo and Headline */}
        <div className="space-y-4 flex flex-col items-center">
          <div 
            className="relative w-16 h-16 transition-transform duration-700 ease-in-out [transform-style:preserve-3d]" 
            style={{ transform: `rotateY(${rotation}deg)` }}
          >
            <img src={logos[1]} alt={brandNames[1]} className="absolute inset-0 w-16 h-16 rounded-md object-cover [backface-visibility:hidden]" />
            <MissionLogo alt={brandNames[0]} className="absolute inset-0 w-16 h-16 rounded-md object-cover [backface-visibility:hidden] [transform:rotateY(180deg)]" />
          </div>
          
          <div 
            className="grid transition-transform duration-700 ease-in-out [transform-style:preserve-3d] place-items-center"
            style={{ transform: `rotateX(${rotation}deg)` }}
          >
            <span className="col-start-1 row-start-1 font-hanken text-4xl md:text-5xl font-extrabold tracking-tighter text-white uppercase [backface-visibility:hidden] whitespace-nowrap">
              {brandNames[1]}
            </span>
            <span className="col-start-1 row-start-1 font-hanken text-4xl md:text-5xl font-extrabold tracking-tighter text-white uppercase [backface-visibility:hidden] [transform:rotateX(180deg)] whitespace-nowrap">
              {brandNames[0]}
            </span>
          </div>
          <p className="text-purple-200/75 font-mono text-xs tracking-wider uppercase">
            {t('footer.tagline')}
          </p>
        </div>

        {/* Footer Navigation Link Lists */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 my-4">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono text-xs tracking-widest text-purple-200/75 hover:text-white transition-all duration-200 uppercase"
            id="footer-nav-home"
          >
            {t('nav.home', 'HOME')}
          </button>
          <button 
            onClick={() => document.getElementById('reel-showcase-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-mono text-xs tracking-widest text-purple-200/75 hover:text-white transition-all duration-200 uppercase"
            id="footer-nav-portfolio"
          >
            PORTFOLIO
          </button>
          <a 
            href="https://wa.me/213540893911" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-widest text-purple-200/75 hover:text-white transition-all duration-200 uppercase"
            id="footer-nav-whatsapp"
          >
            WHATSAPP
          </a>
        </div>

        {/* Tactical disclaimer */}
        <div className="max-w-md text-[10px] text-purple-200/55 font-mono leading-relaxed uppercase tracking-wider">
          {t('footer.disclaimer')}
        </div>

        {/* Copyright notice */}
        <p className="font-mono text-[11px] text-purple-300/60 opacity-75 uppercase tracking-widest mt-4">
          {t('footer.copyright', { year: currentYear })}
        </p>
      </div>
    </footer>
  );
}
