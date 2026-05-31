import React from 'react';
import { useTranslation } from 'react-i18next';
import { CornerDownRight, Terminal, RefreshCw } from 'lucide-react';
import { BENTO_PROJECTS } from '../data';

export default function BentoGrid() {
  const { t } = useTranslation();
  const [specimenText, setSpecimenText] = React.useState('CORE_SYSTEM_ACTIVE');
  const [showSpecimenDrawer, setShowSpecimenDrawer] = React.useState(false);

  const filterSpecimens = [
    'CORE_SYSTEM_ACTIVE',
    'MINIMALIST_AGGRESSION_2026',
    'ZERO_DELAY_PIPELINE',
    'DESERT_LIGHT_808'
  ];

  const handleTextRotation = () => {
    const nextIdx = (filterSpecimens.indexOf(specimenText) + 1) % filterSpecimens.length;
    setSpecimenText(filterSpecimens[nextIdx]);
  };

  const projectVortex = BENTO_PROJECTS.find(p => p.id === 'vortex')!;
  const projectMono = BENTO_PROJECTS.find(p => p.id === 'agency-mono')!;
  const projectManifesto = BENTO_PROJECTS.find(p => p.id === 'manifesto')!;
  const projectOnyx = BENTO_PROJECTS.find(p => p.id === 'onyx')!;

  return (
    <section className="bg-white text-black dark:bg-black dark:text-[#e5e2e1] py-24 px-6 md:px-16 border-t border-black/5 dark:border-white/5 transition-colors duration-500" id="design-architecture">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Title Block */}
        <div className="space-y-2">
          <span className="font-mono text-[10px] text-[#0071ec] tracking-widest uppercase font-semibold">{t('bento.label')}</span>
          <h2 className="font-hanken text-3xl sm:text-5xl font-extrabold text-black dark:text-white tracking-tight uppercase">{t('bento.title')}</h2>
          <p className="font-sans text-xs sm:text-sm text-zinc-500 uppercase tracking-wide">{t('bento.subtitle')}</p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6" id="bento-box-grid">
          
          {/* Project 1: Vortex */}
          <div className="md:col-span-8 group relative bg-gray-50 dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 hover:border-[#0071ec] dark:hover:border-[#0071ec] transition-all duration-300 p-8 rounded-lg flex flex-col justify-between min-h-[460px]">
            <div className="space-y-4">
              <div className="flex gap-2">
                {projectVortex.tags?.map(tag => (
                  <span key={tag} className="px-3 py-1 border border-white/10 rounded-full font-mono text-[9px] uppercase tracking-wider text-zinc-400">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-hanken text-2xl sm:text-3xl font-extrabold text-black dark:text-white tracking-tight uppercase leading-tight">
                {projectVortex.title}
              </h3>
              <p className="font-sans text-sm text-zinc-500 dark:text-zinc-400 max-w-lg leading-relaxed font-light">
                {projectVortex.description}
              </p>
            </div>

            <div className="mt-8 overflow-hidden rounded-md border border-black/5 dark:border-white/5 bg-black">
              <img 
                src={projectVortex.imageUrl} 
                alt={projectVortex.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover opacity-90 group-hover:scale-102 group-hover:opacity-100 transition-all duration-750"
              />
            </div>
          </div>

          {/* Project 2: Agency Mono */}
          <div className="md:col-span-4 group relative bg-gray-50 dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 hover:border-[#0071ec] transition-all duration-300 p-8 rounded-lg flex flex-col justify-between">
            <div className="space-y-4">
              <span className="px-3 py-1 border border-white/10 rounded-full font-mono text-[9px] uppercase tracking-wider text-zinc-400 inline-block">
                {projectMono.category}
              </span>
              <h3 className="font-hanken text-2xl font-bold text-black dark:text-white tracking-tight uppercase">
                {projectMono.title}
              </h3>
              <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                {projectMono.description}
              </p>
            </div>

            {/* Specimen Live Playground */}
            <div className="my-6 p-4 bg-black border border-black/5 dark:border-white/5 font-mono text-zinc-400 space-y-3 rounded-md">
              <div className="flex justify-between items-center text-[8px] text-zinc-600 border-b border-white/10 pb-2">
                <span className="flex items-center gap-1"><Terminal size={10} /> {t('bento.specimen_monitor')}</span>
                <button 
                  onClick={handleTextRotation}
                  className="hover:text-white transition-colors flex items-center gap-1"
                  title="Cycle sample text"
                  id="cycle-specimen-btn"
                >
                  <RefreshCw size={8} /> {t('bento.cycle')}
                </button>
              </div>

              <div className="font-mono text-xs text-green-500 font-semibold truncate select-none tracking-widest bg-black/40 p-2 border border-white/5 text-center">
                {specimenText}
              </div>

              <input 
                type="text"
                value={specimenText}
                onChange={(e) => setSpecimenText(e.target.value.toUpperCase().replace(/\s/g, '_'))}
                placeholder="EDIT_SPECIMEN..."
                className="w-full bg-[#131212] border border-white/5 text-[9px] px-2 py-1.5 focus:outline-none focus:border-[#0071ec] text-zinc-300 text-center font-mono"
                maxLength={25}
                id="specimen-textbox"
              />
            </div>

            <button 
              onClick={() => setShowSpecimenDrawer(!showSpecimenDrawer)}
              className="w-full py-3 border border-black/10 dark:border-white/10 text-black dark:text-white font-mono text-xs tracking-widest uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 rounded-sm"
              id="specimen-toggle-btn"
            >
              {showSpecimenDrawer ? t('bento.close_specimen') : t('bento.view_specimen')}
            </button>
          </div>

          {/* Project 3: Manifesto */}
          <div className="md:col-span-4 group relative bg-gray-50 dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 hover:border-[#0071ec] transition-all duration-300 rounded-lg overflow-hidden flex flex-col justify-between">
            <div className="p-8 space-y-4">
              <span className="px-3 py-1 border border-white/10 rounded-full font-mono text-[9px] uppercase tracking-wider text-zinc-400 inline-block">
                {projectManifesto.category}
              </span>
              <h3 className="font-hanken text-2xl font-bold text-black dark:text-white tracking-tight uppercase">
                {projectManifesto.title}
              </h3>
              <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                {projectManifesto.description}
              </p>
            </div>

            <div className="mt-2 -mx-2 -mb-2 overflow-hidden border-t border-black/5 dark:border-white/5 bg-black h-56 flex items-end">
              <img 
                src={projectManifesto.imageUrl} 
                alt={projectManifesto.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover grayscale group-hover:grayscale-0 group-hover:scale-102 transition-all duration-750"
              />
            </div>
          </div>

          {/* Project 4: Onyx */}
          <div className="md:col-span-8 group relative bg-gray-50 dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 hover:border-[#0071ec] transition-all duration-300 p-8 rounded-lg flex flex-col md:flex-row gap-8 min-h-[300px]">
            <div className="flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="px-3 py-1 border border-white/10 rounded-full font-mono text-[9px] uppercase tracking-wider text-zinc-400 inline-block">
                  {projectOnyx.category}
                </span>
                <h3 className="font-hanken text-2xl font-bold text-black dark:text-white tracking-tight uppercase">
                  {projectOnyx.title}
                </h3>
                <p className="font-sans text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                  {projectOnyx.description}
                </p>
              </div>

              <div className="pt-2">
                <a 
                  href="#digital-motion-reels"
                  className="inline-flex items-center gap-2 font-mono text-xs text-black dark:text-white hover:text-[#0071ec] dark:hover:text-[#0071ec] transition-colors leading-none"
                  id="case-study-trigger"
                >
                  {t('bento.explore_case')} <CornerDownRight size={14} className="text-[#0071ec]" />
                </a>
              </div>
            </div>

            <div className="flex-1 rounded-md overflow-hidden border border-white/5 bg-black shrink-0 relative">
              <img 
                src={projectOnyx.imageUrl} 
                alt={projectOnyx.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

        </div>

      </div>

      {/* Font Specimen Details drawer */}
      {showSpecimenDrawer && (
        <div className="fixed inset-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md flex items-center justify-center p-4" id="specimen-drawer-overlay">
          <div className="bg-gray-100 dark:bg-[#131212] border border-black/10 dark:border-white/10 max-w-lg w-full p-6 md:p-8 rounded-lg space-y-6" id="specimen-popup-container">
            <div className="flex justify-between items-center border-b border-black/10 dark:border-white/10 pb-4">
              <h3 className="font-mono text-xs text-black dark:text-white uppercase tracking-widest font-bold">{t('bento.specimen_title')}</h3>
              <button 
                onClick={() => setShowSpecimenDrawer(false)}
                className="text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
                id="close-specimen-popup"
              >
                {t('bento.close')}
              </button>
            </div>

            <div className="space-y-4 font-mono text-slate-800 dark:text-slate-300">
              <div className="text-[10px] text-zinc-500 uppercase">{t('bento.glyph')}</div>
              <div className="text-xl tracking-widest bg-white dark:bg-black p-4 border border-black/5 dark:border-white/5 text-center font-semibold text-black dark:text-white">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                abcdefghijklmnopqrstuvwxyz<br />
                0123456789!?@#$%^&*
              </div>

              <div className="text-[10px] text-zinc-500 uppercase pt-2">{t('bento.thickness')}</div>
              <div className="space-y-2 text-xs">
                <p className="font-light">{t('bento.light')}</p>
                <p className="font-semibold">{t('bento.semibold')}</p>
                <p className="font-black">{t('bento.black')}</p>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button 
                onClick={() => setShowSpecimenDrawer(false)}
                className="px-6 py-2.5 bg-black text-white dark:bg-white dark:text-black font-mono text-xs tracking-widest uppercase hover:bg-[#0071ec] hover:text-white transition-all duration-300 rounded-none"
                id="specimen-drawer-agree"
              >
                {t('bento.acknowledge')}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
