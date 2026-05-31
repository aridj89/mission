import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  logoIndex: number;
  rotation: number;
}

export default function Footer({ setActiveTab, logoIndex, rotation }: FooterProps) {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const logos = ['/logo.jpg', '/Ve.png'];
  const brandNames = ['MISSION VERSE', 'VEXA'];

  return (
    <footer className="bg-white dark:bg-[#0e0e0e] border-t border-black/10 dark:border-white/10 w-full transition-colors duration-500" id="global-footer">
      <div className="flex flex-col items-center gap-8 pt-10 pb-8 px-6 text-center max-w-7xl mx-auto">
        
        {/* Logo and Headline */}
        <div className="space-y-4 flex flex-col items-center">
          <div className="transition-transform duration-700 ease-in-out [perspective:1000px]" style={{ transform: `rotateY(${rotation}deg)` }}>
            <img src={logos[logoIndex]} alt="Mission Verse" className="w-16 h-16 rounded-md object-cover transition-opacity duration-300" />
          </div>
          <div className="[perspective:1000px]">
            <span 
              className="font-hanken text-4xl md:text-5xl font-extrabold tracking-tighter text-black dark:text-white block uppercase transition-transform duration-700 ease-in-out"
              style={{ transform: `rotateX(${rotation}deg)` }}
            >
              {brandNames[logoIndex]}
            </span>
          </div>
          <p className="text-zinc-500 font-mono text-xs tracking-wider uppercase">
            {t('footer.tagline')}
          </p>
        </div>

        {/* Footer Navigation Link Lists */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 my-4">
          <button 
            onClick={() => { setActiveTab('HOME'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="font-mono text-xs tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all duration-200"
            id="footer-nav-strategy"
          >
            {t('footer.strategy')}
          </button>
          <button 
            onClick={() => { setActiveTab('WORK'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="font-mono text-xs tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all duration-200"
            id="footer-nav-production"
          >
            {t('footer.production')}
          </button>
          <button 
            onClick={() => { setActiveTab('CONTACT'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="font-mono text-xs tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all duration-200"
            id="footer-nav-connect"
          >
            {t('footer.connect')}
          </button>
        </div>

        {/* Tactical disclaimer */}
        <div className="max-w-md text-[10px] text-zinc-500 dark:text-zinc-600 font-mono leading-relaxed uppercase tracking-wider">
          {t('footer.disclaimer')}
        </div>

        {/* Copyright notice */}
        <p className="font-mono text-[11px] text-zinc-600 dark:text-zinc-500 opacity-50 uppercase tracking-widest mt-4">
          {t('footer.copyright', { year: currentYear })}
        </p>
      </div>
    </footer>
  );
}
