import React from 'react';
import CargoTypeCard from './CargoTypeCard';
import { CARGO_TYPES } from './data';

export default function CargoTypes() {
  return (
    <section className="relative bg-background-dark text-white py-[100px] border-t border-[rgba(255,255,255,0.05)]">
      <div className="w-full max-w-[1280px] mx-auto px-5">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-5 mb-16">
          <span className="text-[13px] font-semibold text-primary uppercase tracking-[0.05em]">
            Qué Transportamos
          </span>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(32px,4vw,54px)] font-extrabold leading-[1.15] max-w-[800px]">
            Tipos de Carga <span className="text-accent">Especializada</span>
          </h2>
          <p className="text-base text-text-gray max-w-[640px] leading-[1.6]">
            Gestionamos y coordinamos el fletamento marítimo adaptándonos a las especificaciones técnicas e industriales de cada tipo de mercancía.
          </p>
        </div>

        {/* Cargo Types Grid */}
        <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
          {CARGO_TYPES.map((cargo, idx) => (
            <CargoTypeCard key={idx} cargo={cargo} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
