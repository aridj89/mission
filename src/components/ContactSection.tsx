import React from 'react';
import { useTranslation } from 'react-i18next';
import { Send, MapPin, ExternalLink, MessageSquare, Compass, Check } from 'lucide-react';
import { OFFICE_LOCATION } from '../data';

export default function ContactSection() {
  const { t } = useTranslation();
  const [copiedText, setCopiedText] = React.useState<string | null>(null);

  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const glassLinks = [
    {
      id: 'whatsapp',
      label: t('contact.whatsapp'),
      handle: t('contact.whatsapp_handle'),
      desc: t('contact.whatsapp_desc'),
      icon: <MessageSquare size={28} className="text-emerald-400" />,
      glowColor: 'rgba(52,211,153,0.18)',
      borderColor: 'rgba(52,211,153,0.35)',
      hoverBorder: 'hover:border-emerald-400/60',
      action: '0540 89 39 11',
      href: 'https://wa.me/213540893911',
      accent: 'text-emerald-400',
    },
    {
      id: 'telegram',
      label: t('contact.telegram'),
      handle: t('contact.telegram_handle'),
      desc: t('contact.telegram_desc'),
      icon: <Send size={28} className="text-sky-400" />,
      glowColor: 'rgba(56,189,248,0.18)',
      borderColor: 'rgba(56,189,248,0.35)',
      hoverBorder: 'hover:border-sky-400/60',
      action: '@mission_verse',
      href: 'https://t.me/mission_verse',
      accent: 'text-sky-400',
    },
  ];

  const instaProfiles = [
    {
      id: 'instagram-vexa',
      label: 'VEXA Agency',
      handle: '@vexa.agency_',
      desc: 'Design & creative direction — follow VEXA Agency',
      href: 'https://www.instagram.com/vexa.agency_?igsh=MThzMDRtemh1Znk3cA%3D%3D&utm_source=qr',
      logo: '/Ve.png',
    },
    {
      id: 'instagram-mission',
      label: 'Mission Verse',
      handle: '@mission__verse',
      desc: 'Media production & brand motion — follow Mission Verse',
      href: 'https://www.instagram.com/mission__verse?igsh=ZHp1dWgzb3pzNXlv&utm_source=qr',
      logo: '/logo.jpg',
    },
  ];

  return (
    <section className="bg-white text-black dark:bg-black dark:text-[#e5e2e1] py-20 px-6 md:px-16 transition-colors duration-500" id="contact-integration-section">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Section 1: FIND US */}
        <div className="border-t border-black/10 dark:border-white/10 pt-16 space-y-12" id="find-us-container">
          {/* Title Area */}
          <div className="space-y-6 max-w-2xl">
            <span className="font-mono text-xs text-[#0071ec] tracking-widest uppercase block font-semibold">{t('contact.presence_label')}</span>
            <h2 className="font-hanken text-4xl sm:text-5xl font-extrabold text-black dark:text-white leading-tight uppercase">
              {t('contact.find_title')}
            </h2>
            <p className="font-sans text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
              {t('contact.find_desc')}
            </p>
          </div>

          {/* Grid for Card and Map — NFS glass style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" id="find-us-grid">

            {/* Studio Address Glass Card */}
            <div
              className="relative cursor-default group overflow-hidden rounded-[2rem] border transition-all duration-500 hover:border-[#0071ec]/60 hover:scale-[1.01] hover:shadow-2xl"
              style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderColor: 'rgba(0,113,236,0.28)',
                boxShadow: '0 4px 32px 0 rgba(0,113,236,0.12), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              {/* Blue glow blob */}
              <div
                className="absolute -top-12 -left-12 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none group-hover:opacity-35 transition-opacity duration-500"
                style={{ background: 'radial-gradient(circle, rgba(0,113,236,0.7) 0%, transparent 70%)' }}
              />

              <div className="relative z-10 flex items-center gap-5 p-6 sm:p-8">
                {/* Icon box */}
                <div
                  className="shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl border"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,113,236,0.18) 0%, rgba(255,255,255,0.04) 100%)',
                    borderColor: 'rgba(0,113,236,0.35)',
                  }}
                >
                  <MapPin size={26} className="text-[#0071ec]" />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <h3 className="font-hanken text-base sm:text-lg font-bold text-black dark:text-white tracking-tight">{OFFICE_LOCATION.name}</h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest font-semibold text-[#0071ec]">BATNA, ALGERIA</p>
                  <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed hidden sm:block pt-0.5">{OFFICE_LOCATION.address}</p>
                </div>

                <div className="shrink-0 text-right">
                  <a
                    href="https://www.google.com/maps/place/H53H%2BP83,+Rte+de+Biskra,+Batna,+Algeria"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    id="google-maps-link"
                    className="font-mono text-[10px] sm:text-xs font-bold text-[#0071ec] block hover:underline leading-none"
                  >
                    {t('contact.directions')}
                  </a>
                  <ExternalLink size={12} className="ml-auto mt-1 text-zinc-400 group-hover:text-[#0071ec] transition-colors" />
                </div>
              </div>

              {/* Radar ping status */}
              <div className="relative z-10 flex items-center justify-between px-6 sm:px-8 pb-5 font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0071ec] animate-ping inline-block" />
                  {t('contact.radar_online')}
                </span>
                <span className="text-[#0071ec] font-bold">{t('contact.stabilized')}</span>
              </div>

              {/* Bottom shimmer */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-50"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0,113,236,0.5), transparent)' }}
              />
            </div>

            {/* Google Maps Glass Embed Card */}
            <div
              className="relative group overflow-hidden rounded-[2rem] border transition-all duration-500 hover:border-[#0071ec]/60 min-h-[300px]"
              style={{
                borderColor: 'rgba(0,113,236,0.28)',
                boxShadow: '0 4px 32px 0 rgba(0,113,236,0.10), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
              id="google-maps-embed-container"
            >
              {/* HUD top bar */}
              <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center font-mono text-[9px] text-zinc-400 p-4 bg-gradient-to-b from-black/60 to-transparent">
                <span className="flex items-center gap-1 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0071ec] animate-ping" />
                  {t('contact.radar_online')}
                </span>
                <span className="uppercase text-zinc-500">GRID_SEC_42A</span>
              </div>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3224.234!2d6.1739!3d35.5610!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDMzJzE0LjciTiA2wrAxMCczNC4yIkU!5e0!3m2!1sfr!2sdz!4v1&q=H53H%2BP83,+Rte+de+Biskra,+Batna,+Algeria"
                className="w-full h-full min-h-[300px] border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mission Verse Location - Batna"
                id="google-maps-embed"
              ></iframe>

              {/* HUD bottom bar */}
              <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between font-mono text-[9px] text-zinc-400 bg-gradient-to-t from-black/70 to-transparent p-4">
                <span className="uppercase">{t('contact.precision')}</span>
                <span className="text-[#0071ec] font-bold">{t('contact.stabilized')}</span>
              </div>

              {/* Corner shimmer lines */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-50 z-30"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0,113,236,0.5), transparent)' }}
              />
            </div>
          </div>
        </div>

        {/* Section 2: CONNECT channel links */}
        <div className="space-y-12 pt-12 border-t border-black/10 dark:border-white/5" id="social-connect-area">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="font-mono text-xs text-[#0071ec] tracking-widest block font-semibold uppercase">{t('contact.connect_label')}</span>
            <h2 className="font-hanken text-3xl sm:text-5xl font-extrabold text-black dark:text-white uppercase tracking-tight">{t('contact.connect_title')}</h2>
            <p className="font-sans text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              {t('contact.connect_desc')}
            </p>
          </div>

          {/* WhatsApp & Telegram — glassmorphism pill cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
            {glassLinks.map((social) => (
              <div
                key={social.id}
                onClick={() => window.open(social.href, '_blank')}
                className={`relative cursor-pointer group overflow-hidden rounded-[2rem] border transition-all duration-500 ${social.hoverBorder} hover:scale-[1.02] hover:shadow-2xl`}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderColor: social.borderColor,
                  boxShadow: `0 4px 32px 0 ${social.glowColor}, inset 0 1px 0 rgba(255,255,255,0.08)`,
                }}
                id={`social-card-${social.id}`}
              >
                {/* Glow blob */}
                <div
                  className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-500"
                  style={{ background: social.glowColor }}
                />

                <div className="relative z-10 flex items-center gap-5 p-6 sm:p-8">
                  {/* Icon box */}
                  <div
                    className="shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl border"
                    style={{
                      background: `linear-gradient(135deg, ${social.glowColor} 0%, rgba(255,255,255,0.04) 100%)`,
                      borderColor: social.borderColor,
                    }}
                  >
                    {social.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <h3 className="font-hanken text-base sm:text-lg font-bold text-black dark:text-white tracking-tight">{social.label}</h3>
                    <p className={`font-mono text-[10px] uppercase tracking-widest font-semibold ${social.accent}`}>{social.handle}</p>
                    <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed hidden sm:block pt-1">{social.desc}</p>
                  </div>

                  {/* Action + icon */}
                  <div className="shrink-0 text-right">
                    <span className={`font-mono text-[10px] sm:text-xs font-bold ${social.accent} block`}>{social.action}</span>
                    <ExternalLink size={12} className="ml-auto mt-1 text-zinc-400 group-hover:text-white transition-colors" />
                  </div>
                </div>

                {/* Bottom shimmer line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px opacity-50"
                  style={{ background: `linear-gradient(90deg, transparent, ${social.borderColor}, transparent)` }}
                />
              </div>
            ))}
          </div>

          {/* Instagram — two profile cards */}
          <div className="space-y-3 pt-2">
            <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest text-center">Instagram</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {instaProfiles.map((profile) => (
                <div
                  key={profile.id}
                  onClick={() => window.open(profile.href, '_blank')}
                  className="relative cursor-pointer group overflow-hidden rounded-[2rem] border transition-all duration-500 hover:border-pink-400/60 hover:scale-[1.02] hover:shadow-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderColor: 'rgba(244,114,182,0.30)',
                    boxShadow: '0 4px 32px 0 rgba(244,114,182,0.12), inset 0 1px 0 rgba(255,255,255,0.08)',
                  }}
                  id={profile.id}
                >
                  {/* Pink glow blob */}
                  <div
                    className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-15 pointer-events-none group-hover:opacity-35 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(circle, rgba(244,114,182,0.6) 0%, transparent 70%)' }}
                  />

                  <div className="relative z-10 flex items-center gap-5 p-6 sm:p-8">
                    {/* Brand logo box */}
                    <div
                      className="shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl border border-pink-400/30 overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(253,164,175,0.18) 0%, rgba(168,85,247,0.12) 100%)',
                      }}
                    >
                      <img
                        src={profile.logo}
                        alt={profile.label}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-0.5">
                      <h3 className="font-hanken text-base sm:text-lg font-bold text-black dark:text-white tracking-tight">{profile.label}</h3>
                      <p className="font-mono text-[10px] uppercase tracking-widest font-semibold text-pink-400">{profile.handle}</p>
                      <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed hidden sm:block pt-1">{profile.desc}</p>
                    </div>

                    <div className="shrink-0">
                      <ExternalLink size={14} className="text-zinc-400 group-hover:text-pink-400 transition-colors" />
                    </div>
                  </div>

                  {/* Bottom shimmer */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-px opacity-40"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(244,114,182,0.5), transparent)' }}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
