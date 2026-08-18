import React from 'react';

export type GlobeMapMode = 'stylized' | 'live';

interface MapModeToggleProps {
  mode: GlobeMapMode;
  onChange: (mode: GlobeMapMode) => void;
}

export default function MapModeToggle({ mode, onChange }: MapModeToggleProps) {
  return (
    <div className="inline-flex gap-1.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-1 w-fit">
      <button
        onClick={() => onChange('stylized')}
        className={`rounded-full px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.03em] cursor-pointer transition-all duration-300 ease-[ease] ${
          mode === 'stylized' ? 'bg-primary text-white' : 'bg-transparent text-text-gray hover:text-white'
        }`}
      >
        🗺️ Mapa Interactivo
      </button>
      <button
        onClick={() => onChange('live')}
        className={`rounded-full px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.03em] cursor-pointer transition-all duration-300 ease-[ease] ${
          mode === 'live' ? 'bg-primary text-white' : 'bg-transparent text-text-gray hover:text-white'
        }`}
      >
        📡 Tracking AIS en Vivo
      </button>
    </div>
  );
}
