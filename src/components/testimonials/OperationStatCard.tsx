import React from 'react';
import { OperationStat } from './data';

interface OperationStatCardProps {
  stat: OperationStat;
}

export default function OperationStatCard({ stat }: OperationStatCardProps) {
  return (
    <div className="relative min-h-[113px] max-[520px]:min-h-0 py-[19px] px-3.5 border border-[rgba(75,157,227,0.27)] rounded-[5px] bg-[linear-gradient(145deg,rgba(6,47,84,0.72),rgba(2,25,49,0.54))] before:absolute before:top-0 before:right-4 before:left-4 before:h-0.5 before:content-[''] before:bg-[linear-gradient(90deg,transparent,#1b9cff,transparent)]">
      <strong className="block text-[#eef8ff] font-[family-name:var(--font-space-grotesk)] text-[clamp(23px,2.2vw,34px)] tracking-[-0.06em] leading-none">{stat.value}</strong>
      <span className="block mt-[11px] text-[#8eb9df] text-[10px] font-bold leading-[1.35] uppercase">{stat.label}</span>
    </div>
  );
}
