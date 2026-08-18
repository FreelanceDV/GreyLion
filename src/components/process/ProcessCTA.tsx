import React from 'react';

interface ProcessCTAProps {
  whatsappUrl: string;
}

export default function ProcessCTA({ whatsappUrl }: ProcessCTAProps) {
  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="relative z-10 no-underline w-fit">
      <button className="flex items-center gap-2 bg-primary text-white border-0 rounded-full px-7 py-3.5 text-sm font-bold cursor-pointer transition-all duration-300 ease-[ease] shadow-[0_8px_24px_rgba(15,76,129,0.35)] hover:bg-primary-hover hover:-translate-y-0.5">
        Cotizar Envío
        <span aria-hidden="true">→</span>
      </button>
    </a>
  );
}
