import React from 'react';

interface FaqSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function FaqSearch({ value, onChange }: FaqSearchProps) {
  return (
    <div className="relative mb-8">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-hover pointer-events-none"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar una pregunta..."
        className="w-full rounded-lg border border-[#0e3d5e] py-3.5 pl-11 pr-7 text-sm text-text-white outline-none transition-colors duration-200 ease-[ease] placeholder:text-text-muted focus:border-primary-hover text-xl"
      />
    </div>
  );
}
