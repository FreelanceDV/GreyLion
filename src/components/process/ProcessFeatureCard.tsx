import React from 'react';
import ProcessIcon from './ProcessIcon';

export default function ProcessFeatureCard() {
  return (
    <div className="relative z-10 flex items-start gap-3 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(6,13,26,0.6)] backdrop-blur-sm p-4 max-w-[320px]">
      <span className="shrink-0 grid w-9 h-9 place-items-center rounded-lg bg-primary/20 text-primary-hover [&>svg]:w-[18px] [&>svg]:h-[18px]">
        <ProcessIcon name="network" />
      </span>
      <div>
        <h3 className="text-[13.5px] font-bold text-text-white m-0">Operaciones eficientes</h3>
        <p className="text-xs leading-[1.5] text-text-gray mt-1">Coordinación experta en cada etapa del proceso portuario para garantizar seguridad, cumplimiento y agilidad.</p>
      </div>
    </div>
  );
}
