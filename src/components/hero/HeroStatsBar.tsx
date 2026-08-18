import React from 'react';
import HeroStatItem from './HeroStatItem';
import { HERO_STATS } from './data';

export default function HeroStatsBar() {
  return (
    <div className="relative w-full z-10 animate-stats-rise motion-reduce:animate-none">
      {/* Stats Glass Bar */}
      <div className="w-full border-t border-b border-[rgba(255,255,255,0.08)] bg-[rgba(6,13,28,0.65)] backdrop-blur-[20px] pt-6 pb-[54px]">
        <div className="w-full max-w-[1280px] mx-auto px-5 flex justify-between items-center flex-wrap gap-6 max-[991px]:justify-center max-[991px]:gap-8 max-[768px]:px-6!">
          {HERO_STATS.map((stat, idx) => (
            <React.Fragment key={idx}>
              <HeroStatItem stat={stat} />
              {idx < HERO_STATS.length - 1 && (
                <div className="w-px h-9 bg-[rgba(255,255,255,0.1)] max-[991px]:hidden" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Wavy bottom divider using inline SVG */}
      <div className="absolute bottom-[-4px] left-0 w-full overflow-hidden leading-none z-[12]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-10">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="#060b16"></path>
        </svg>
      </div>
    </div>
  );
}
