import React from 'react';

export default function Hero() {
  return (
    <section
      className="relative z-10 min-h-[calc(100dvh-4rem)] flex flex-col justify-center items-center px-6 md:px-16 overflow-hidden pointer-events-none"
      id="hero-section"
    >
      {/* Fixed full-page background video so it always stays visible beneath all sections */}
      <video
        src="/vd1.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 z-0 w-full h-full object-cover object-center pointer-events-none"
      />
    </section>
  );
}
