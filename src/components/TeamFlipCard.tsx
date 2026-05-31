import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TeamMember } from '../types';

interface TeamFlipCardProps {
  memberFront: TeamMember;
  memberBack: TeamMember;
  isFlipped: boolean;
  className?: string;
  delay?: number;
}

export default function TeamFlipCard({ memberFront, memberBack, isFlipped, className = '', delay = 0 }: TeamFlipCardProps) {
  const { t } = useTranslation();

  const CardFace = ({ member, isBack = false }: { member: TeamMember, isBack?: boolean }) => (
    <div 
      className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-xl sm:rounded-2xl overflow-hidden bg-gray-50 dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 hover:border-[#0071ec] flex flex-col justify-end shadow-xl transition-all duration-500 group"
      style={isBack ? { transform: 'rotateY(180deg)' } : {}}
    >
      {member.imageUrl ? (
        <>
          <img 
            src={member.imageUrl} 
            alt={member.name}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 pointer-events-none group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-0 left-0 p-2 sm:p-6 w-full z-10 space-y-0.5 sm:space-y-1 pointer-events-none translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <p className="font-mono text-[5px] sm:text-[10px] text-[#0071ec] uppercase tracking-widest font-bold drop-shadow-md leading-tight">
              {t(`team_roles.${member.id}`)}
            </p>
            <h4 className="font-hanken text-[10px] sm:text-2xl font-bold text-white tracking-tight drop-shadow-md leading-tight">
              {member.name}
            </h4>
          </div>
        </>
      ) : null}
    </div>
  );

  return (
    <motion.div 
      id={`team-card-${memberFront.id}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.5, delay }}
      className={`snap-start shrink-0 aspect-[4/5] relative [perspective:1500px] cursor-grab active:cursor-grabbing ${className}`}
      whileHover={{ y: -10 }}
    >
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      >
        <CardFace member={memberFront} />
        <CardFace member={memberBack} isBack={true} />
      </motion.div>
    </motion.div>
  );
}
