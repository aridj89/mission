import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onViewPortfolio: () => void;
  logoIndex: number;
  rotation: number;
}

export default function Hero({ onViewPortfolio, logoIndex, rotation }: HeroProps) {
  const { t } = useTranslation();

  const logos = ['/logo.jpg', '/Ve.png'];
  const brandNames = ['MISSION VERSE', 'VEXA'];

  return (
    <section
      className="relative min-h-[85dvh] flex flex-col justify-center items-center px-6 md:px-16 overflow-hidden border-b border-black/5 dark:border-white/5 bg-white dark:bg-black transition-colors duration-500"
      id="hero-section"
    >
      {/* Dynamic Ambient Blur Core background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/4 right-[10%] w-[35rem] h-[35rem] bg-[radial-gradient(circle_at_center,_#0071ec_0%,_transparent_65%)] blur-3xl rounded-full animate-[pulse_4s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-10 left-[5%] w-[25rem] h-[25rem] bg-[radial-gradient(circle_at_center,_rgba(0,113,236,0.15)_0%,_transparent_60%)] blur-2xl rounded-full animate-[pulse_6s_ease-in-out_infinite_1s]"></div>
      </div>

      {/* Hero Content — centered */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-10 pt-16 pb-8 w-full max-w-4xl mx-auto">

        {/* Logo with animated ring */}
        <div className="relative flex items-center justify-center">
          {/* Outer spinning ring */}
          <div className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-[#0071ec]/30 animate-[spin_12s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#0071ec] rounded-full shadow-[0_0_10px_#0071ec]"></div>
          </div>
          {/* Middle pulsing ring */}
          <div className="absolute w-36 h-36 sm:w-52 sm:h-52 rounded-full border border-black/10 dark:border-white/10 animate-[pulse_3s_ease-in-out_infinite]"></div>
          {/* Logo image */}
          <div 
            className="z-10 transition-transform duration-700 ease-in-out [perspective:1000px]"
            style={{ transform: `rotateY(${rotation}deg)` }}
          >
            <img
              src={logos[logoIndex]}
              alt="Mission Verse Media Logo"
              className="w-24 h-24 sm:w-36 sm:h-36 rounded-full object-cover border-2 border-[#0071ec]/60 shadow-[0_0_40px_rgba(0,113,236,0.5)]"
            />
          </div>
        </div>

        {/* Brand Name */}
        <div className="space-y-2 mt-8 [perspective:1000px]">
          <h1 
            className="font-hanken text-4xl sm:text-6xl md:text-7xl font-extrabold text-black dark:text-white tracking-tight uppercase leading-none transition-transform duration-700 ease-in-out"
            style={{ transform: `rotateX(${rotation}deg)` }}
          >
            {brandNames[logoIndex]}
          </h1>
          <p className="font-mono text-base sm:text-xl text-[#0071ec] tracking-[0.3em] uppercase font-semibold">
            MEDIA
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <button
            onClick={onViewPortfolio}
            className="btn font-mono text-xs tracking-widest text-center"
            id="view-portfolio-hero-btn"
          >
            {t('hero.view_portfolio')}
          </button>
        </div>
      </div>

    </section>
  );
}
