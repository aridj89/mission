import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ReelShowcase from './components/ReelShowcase';
import LogoMarquee from './components/LogoMarquee';
import { ArrowUpRight } from 'lucide-react';

export default function App() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [logoIndex, setLogoIndex] = useState(1);
  const [rotation, setRotation] = useState(0);

  // Handle global synchronised rotation timer (Header Logo & Hero & Footer)
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 180);
      setTimeout(() => {
        setLogoIndex(prev => (prev === 0 ? 1 : 0));
      }, 300); // Change logo halfway through rotation
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToPortfolio = () => {
    document.getElementById('reel-showcase-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-black min-h-screen antialiased flex flex-col font-sans" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Fixed Header */}
      <Header 
        logoIndex={logoIndex}
        rotation={rotation}
      />

      {/* Main Content */}
      <main className="flex-grow pt-16" id="primary-main-viewport">
        <Hero 
          onViewPortfolio={scrollToPortfolio}
          logoIndex={logoIndex}
          rotation={rotation}
        />

        <LogoMarquee />

        <ReelShowcase />

        {/* CTA Banner */}
        <section className="py-24 px-6 md:px-16 text-center border-t border-black/5 bg-white">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="font-hanken text-4xl sm:text-6xl font-extrabold text-black dark:text-white tracking-tight uppercase leading-none">
              {t('cta.title')}
            </h2>
            <div className="flex justify-center pt-2">
              <a 
                href="https://wa.me/213540893911"
                target="_blank"
                rel="noopener noreferrer"
                className="btn flex items-center justify-center gap-3 font-hanken"
                id="connect-cta-btn"
              >
                {t('cta.button')} <ArrowUpRight size={22} className="stroke-[2.5px]" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Universal Footer */}
      <Footer logoIndex={logoIndex} rotation={rotation} />
    </div>
  );
}
