import React from 'react';
import OperationStatCard from './OperationStatCard';
import { OPERATION_STATS } from './data';

export default function OperationPanel() {
  return (
    <aside className="self-center max-w-[555px]" aria-labelledby="operation-title">
      <p className="m-0 mb-[9px] text-[#1b9cff] text-[11px] font-extrabold tracking-[0.13em] uppercase">Logística visible, decisiones seguras</p>
      <h3 id="operation-title" className="m-0 font-[family-name:var(--font-space-grotesk)] font-bold tracking-[-0.045em] leading-[1.05] text-[clamp(32px,3.15vw,48px)]">
        Operación en <span className="text-[#1598ff]">movimiento</span><br />desde el primer día
      </h3>
      <p className="max-w-[440px] mt-[18px] mb-0 text-[#a8c8e6] text-sm leading-[1.6]">Una coordinación clara para que cada etapa de su carga avance con control y respuesta humana.</p>
      <div className="grid grid-cols-3 gap-2 mt-6 max-[520px]:grid-cols-1">
        {OPERATION_STATS.map((stat) => (
          <OperationStatCard key={stat.label} stat={stat} />
        ))}
      </div>
      <a
        className="inline-flex gap-3 items-center mt-[17px] text-[#d3edff] text-xs font-extrabold tracking-[0.02em] uppercase no-underline transition-[color,transform] duration-200 ease-[ease] hover:text-[#54b8ff] focus-visible:text-[#54b8ff] focus-visible:outline-none hover:translate-x-[3px] focus-visible:translate-x-[3px] motion-reduce:transition-none"
        href="#servicios"
      >
        Conocer nuestros servicios <span className="grid w-[29px] h-[29px] place-items-center border border-[rgba(147,213,255,0.62)] rounded-full text-white text-[17px]" aria-hidden="true">→</span>
      </a>
    </aside>
  );
}
