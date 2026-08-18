import React from 'react';
import HeroIcon from './HeroIcon';
import { HeroStat } from './data';

interface HeroStatItemProps {
  stat: HeroStat;
}

export default function HeroStatItem({ stat }: HeroStatItemProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex items-center text-[#00a3ff]">
        <HeroIcon name={stat.icon} />
      </span>
      <div className="flex flex-col">
        {stat.number ? (
          <>
            <span className="font-[family-name:var(--font-space-grotesk)] text-2xl font-extrabold leading-none text-white">
              {stat.number}
            </span>
            <span className="text-[11px] text-[rgba(255,255,255,0.5)] uppercase tracking-[0.05em] mt-0.5">
              {stat.label}
            </span>
          </>
        ) : (
          <>
            <span className="text-[10px] text-[rgba(255,255,255,0.4)] font-extrabold uppercase tracking-[0.05em]">
              {stat.topLabel}
            </span>
            <span className="text-[12px] text-[#00a3ff] font-bold uppercase tracking-[0.05em] mt-0.5">
              {stat.bottomLabel}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
