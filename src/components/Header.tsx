import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import MissionLogo from './MissionLogo';

interface HeaderProps {
  logoIndex?: number;
  rotation: number;
}

const LANGUAGES = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'fr', label: 'FR', full: 'Français' },
  { code: 'ar', label: 'AR', full: 'العربية' }
];

export default function Header({ rotation }: HeaderProps) {
  const { i18n } = useTranslation();
  const [langDropdownOpen, setLangDropdownOpen] = React.useState(false);
  const langRef = React.useRef<HTMLDivElement>(null);
  
  const logos = ['/logo.png', '/Ve.png'];
  const brandNames = ['ORVA', 'VEXA'];

  const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setLangDropdownOpen(false);
  };

  // Close language dropdown when clicking outside
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="bg-gradient-to-r from-[#0e0524]/55 via-[#1A0844]/55 to-[#281260]/55 backdrop-blur-md border-b border-white/5 fixed top-0 w-full z-50 px-5 md:px-16 h-16 flex justify-between items-center transition-all duration-300">
      {/* Left Section: Logo */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        className="flex items-center gap-2 hover:opacity-90 transition-opacity"
        id="logo-button"
      >
        <div 
          className="relative w-8 h-8 transition-transform duration-700 ease-in-out [transform-style:preserve-3d]" 
          style={{ transform: `rotateY(${rotation}deg)` }}
        >
          <img src={logos[1]} alt={brandNames[1]} className="absolute inset-0 w-8 h-8 rounded-sm object-cover [backface-visibility:hidden]" />
          <MissionLogo alt={brandNames[0]} className="absolute inset-0 w-8 h-8 rounded-sm object-cover [backface-visibility:hidden] [transform:rotateY(180deg)]" />
        </div>
        
        <div 
          className="grid transition-transform duration-700 ease-in-out [transform-style:preserve-3d] items-center text-left"
          style={{ transform: `rotateX(${rotation}deg)` }}
        >
          <span className="col-start-1 row-start-1 font-hanken font-extrabold tracking-tighter text-lg md:text-xl text-white uppercase [backface-visibility:hidden] whitespace-nowrap">
            {brandNames[1]}
          </span>
          <span className="col-start-1 row-start-1 font-hanken font-extrabold tracking-tighter text-lg md:text-xl text-white uppercase [backface-visibility:hidden] [transform:rotateX(180deg)] whitespace-nowrap">
            {brandNames[0]}
          </span>
        </div>
      </button>

      {/* Center Nav: Portfolio anchor */}
      <nav className="flex gap-2 items-center">
        <button
          onClick={() => {
            document.getElementById('reel-showcase-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="py-1.5 px-5 rounded-[2rem] border border-white/15 hover:border-[#9A73F0] transition-all duration-300 text-xs font-mono tracking-widest bg-white/5 text-purple-200/80 hover:text-white"
          id="nav-portfolio-btn"
        >
          PORTFOLIO
        </button>
      </nav>

      {/* Right Section: Language Selector */}
      <div className="flex items-center gap-3">
        {/* Language Dropdown */}
        <div className="relative" ref={langRef}>
          <button 
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-white/15 text-purple-200/80 hover:text-white hover:border-[#9A73F0] bg-white/5 rounded-sm transition-all duration-300 font-mono text-[10px] tracking-widest uppercase"
            id="lang-selector-btn"
          >
            <Globe size={12} className="text-[#9A73F0]" />
            {currentLang.label}
          </button>
          
          {langDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 bg-[#16083a]/95 backdrop-blur-xl border border-white/15 rounded-md shadow-2xl shadow-black/60 overflow-hidden min-w-[140px] z-50 animate-fade-in">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full text-left px-4 py-2.5 font-mono text-xs tracking-wider transition-all duration-200 flex items-center justify-between gap-4 ${
                    i18n.language === lang.code
                      ? 'bg-[#7B5BE0]/25 text-[#d7c8ff] font-semibold'
                      : 'text-purple-200/75 hover:bg-white/10 hover:text-white'
                  }`}
                  id={`lang-option-${lang.code}`}
                >
                  <span>{lang.full}</span>
                  <span className="text-[10px] text-purple-300/60">{lang.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
