import React from 'react';
import WorkWithUsIcon from './WorkWithUsIcon';
import { Advantage } from './data';

interface AdvantageCardProps {
  advantage: Advantage;
}

export default function AdvantageCard({ advantage }: AdvantageCardProps) {
  return (
    <div className="flex flex-col gap-5 bg-[#FAFAFA] border border-[#E4E7EC] rounded-2xl p-9 transition-all duration-300 ease-[ease] hover:-translate-y-1.5 hover:bg-white hover:border-primary hover:shadow-[0_12px_30px_rgba(90,110,216,0.08)]">
      {/* Icon Container */}
      <div className="w-12 h-12 rounded-xl bg-[rgba(90,110,216,0.08)] text-primary-dark flex items-center justify-center">
        <WorkWithUsIcon name={advantage.icon} />
      </div>

      {/* Title & Desc */}
      <div className="flex flex-col gap-2">
        <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-background-dark">
          {advantage.title}
        </h3>
        <p className="text-sm leading-[1.6] text-[#475467]">
          {advantage.desc}
        </p>
      </div>
    </div>
  );
}
