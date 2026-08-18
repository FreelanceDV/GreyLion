import React from 'react';
import DynamicMedia from '../dynamic-media';
import { PromoPanelData } from './data';

interface PromoPanelProps {
  panel: PromoPanelData;
}

export default function PromoPanel({ panel }: PromoPanelProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden min-h-[220px] flex flex-col justify-end p-5">
      <DynamicMedia src={panel.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,13,28,0.35)_0%,rgba(6,13,28,0.92)_100%)]" />
      <div className="relative z-10 flex flex-col gap-2">
        <h4 className="font-[family-name:var(--font-space-grotesk)] text-[15px] font-extrabold text-white leading-[1.2] uppercase">{panel.title}</h4>
        <p className="text-[11.5px] leading-[1.5] text-white/70">{panel.desc}</p>
        <a href={panel.linkHref} className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary-hover no-underline mt-1">
          {panel.linkLabel} <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
