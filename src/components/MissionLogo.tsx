import React from 'react';

interface MissionLogoProps {
  alt?: string;
  className?: string;
}

/**
 * Mission Verse / ORVA logo.
 * Renders /logo.png on all screen sizes (cache-busted via ?v=2).
 */
export default function MissionLogo({ alt = 'Mission Verse', className }: MissionLogoProps) {
  return <img src="/logo.png?v=2" alt={alt} className={className} />;
}
