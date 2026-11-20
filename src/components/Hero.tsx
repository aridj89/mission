import React from 'react';

export default function Hero() {
  return (
    <video
      src="/vd1.mp4"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="fixed inset-0 z-0 w-full h-full object-cover object-center pointer-events-none"
    />
  );
}
