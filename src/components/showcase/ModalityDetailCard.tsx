import React from 'react';
import { Modality } from './data';

interface ModalityDetailCardProps {
  modality: Modality;
}

export default function ModalityDetailCard({ modality }: ModalityDetailCardProps) {
  return (
    <div className="relative rounded-[14px] overflow-hidden transition-colors duration-300 bg-gray-900 border-[1.5px] border-[rgba(15,76,129,0.25)] hover:border-primary-hover/60 p-8 shadow-[0_15px_40px_rgba(15,76,129,0.06)] flex flex-col gap-1">
      <div className="border-b border-[rgba(255,255,255,0.08)] pb-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-text-white uppercase font-[family-name:var(--font-space-grotesk)]">
            {modality.name}
          </h3>
          <div className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center font-bold text-xs text-white ${modality.accentClass}`}>
            {modality.logoText}
          </div>
        </div>
      </div>

      {/* Tagline & Description */}
      <div className="flex flex-col gap-2">
        <h4 className="text-[15px] font-bold text-primary-hover">{modality.tagline}</h4>
        <p className="text-[13.5px] leading-[1.6] text-text-gray">{modality.desc}</p>
      </div>

      <div className="flex flex-col gap-2.5">
        {modality.details.map((detail, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center px-3.5 py-2.5 bg-[rgba(255,255,255,0.02)] rounded-lg border border-[rgba(255,255,255,0.04)]"
          >
            <span className="text-[12.5px] text-[rgba(255,255,255,0.5)]">{detail.label}</span>
            <span className="text-[12.5px] font-semibold text-text-white text-right">{detail.value}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        {modality.badges.map((b, idx) => (
          <span
            key={idx}
            className={`text-[11px] font-semibold border rounded px-2.5 py-1 ${
              b === 'Seguro de Carga'
                ? 'bg-[rgba(90,110,216,0.12)] border-[rgba(90,110,216,0.25)] text-primary'
                : 'bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.1)] text-text-white'
            }`}
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}
