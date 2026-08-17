import React from 'react';
import MachineryIcon from './MachineryIcon';

interface MachineryAdvisoryBannerProps {
  phone: string;
}

export default function MachineryAdvisoryBanner({ phone }: MachineryAdvisoryBannerProps) {
  const advisorUrl = `https://wa.me/${phone}?text=${encodeURIComponent('Hola GreyLion, necesito asesoría para elegir el equipo ideal para mi proyecto.')}`;

  return (
    <div className="mt-8 flex items-center justify-between gap-6 flex-wrap rounded-2xl border border-[rgba(255,255,255,0.08)] bg-gray-950/70 p-6">
      <div className="flex items-center gap-4">
        <span className="shrink-0 grid w-12 h-12 place-items-center rounded-full bg-primary/15 text-primary-hover">
          <MachineryIcon name="headset" className="w-6 h-6" />
        </span>
        <div>
          <h3 className="text-[15px] font-bold text-text-white m-0">¿Necesitas asesoría para elegir el equipo ideal?</h3>
          <p className="text-[13px] text-text-gray m-0 mt-0.5">Nuestro equipo de expertos está listo para ayudarte.</p>
        </div>
      </div>

      <a href={advisorUrl} target="_blank" rel="noopener noreferrer" className="no-underline shrink-0">
        <button className="inline-flex items-center gap-2 bg-primary text-white border-0 rounded-full py-3 px-6 text-sm font-bold cursor-pointer transition-all duration-300 ease-[ease] hover:bg-primary-hover hover:-translate-y-0.5">
          Hablar con un asesor
          <MachineryIcon name="arrow-right" className="w-4 h-4" />
        </button>
      </a>
    </div>
  );
}
