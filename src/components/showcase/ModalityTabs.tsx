import React from 'react';
import { MODALITIES } from './data';

interface ModalityTabsProps {
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function ModalityTabs({ activeIndex, onSelect }: ModalityTabsProps) {
  return (
    <div className="flex gap-2 mt-2">
      {MODALITIES.map((mod, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
          className={`rounded-full px-5 py-2 text-[12px] font-bold uppercase tracking-[0.03em] cursor-pointer whitespace-nowrap transition-all duration-300 ease-[ease] border ${
            activeIndex === idx
              ? 'bg-primary border-primary text-white'
              : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.6)]'
          }`}
        >
          {mod.name.split(' ')[0]}
        </button>
      ))}
    </div>
  );
}
