import React from 'react';
import ProcessIcon from './ProcessIcon';

export default function ProcessHeader() {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="grid w-7 h-7 place-items-center rounded-md bg-primary/15 text-primary-hover [&>svg]:w-4 [&>svg]:h-4">
          <ProcessIcon name="shield" />
        </span>
        <span className="text-xs font-extrabold text-primary-hover uppercase tracking-[0.14em]">Gestión Portuaria Integral</span>
      </div>

      <h2 className="relative z-10 font-[family-name:var(--font-space-grotesk)] text-[clamp(32px,3.6vw,44px)] font-extrabold leading-[1.1] tracking-[-1px]">
        Gestión Integral <br />
        de Operaciones <br />
        <span className="text-primary-hover underline decoration-primary-hover/70 underline-offset-8">Portuarias</span>
      </h2>

      <p className="relative z-10 text-[15px] leading-[1.6] text-text-gray max-w-[380px]">
        Nuestro equipo gestiona todas las operaciones logísticas y documentales necesarias en puerto para el tránsito fluido de su mercancía.
      </p>
    </>
  );
}
