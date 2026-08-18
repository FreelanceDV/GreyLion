import React from 'react';
import AboutIcon from './AboutIcon';
import { PILLARS } from './data';

export default function WhyChoosePillars() {
  return (
    <div className="flex flex-col gap-3 justify-center p-8 max-[991px]:p-8 max-[991px]:pt-0">
      {PILLARS.map((pillar, idx) => (
        <div
          key={idx}
          className="flex items-start gap-4 py-4 px-5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-gray-900 transition-colors duration-300 ease-[ease] hover:border-primary-hover/50"
        >
          <div className="w-11 h-11 rounded-lg border border-primary-hover/50 bg-[rgba(15,76,129,0.18)] text-primary-hover flex items-center justify-center shrink-0">
            <AboutIcon name="check" strokeWidth={2.5} className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-bold text-white">{pillar.title}</h3>
            <p className="text-sm leading-[1.5] text-text-gray">{pillar.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
