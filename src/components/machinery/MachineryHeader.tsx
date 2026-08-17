import React from 'react';

export default function MachineryHeader() {
  return (
    <div className="flex flex-col items-center text-center gap-5 mb-12">
      <span className="text-[13px] font-semibold text-primary-hover uppercase tracking-[0.05em]">
        Suministro Industrial
      </span>
      <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(32px,4vw,54px)] font-extrabold leading-[1.15] max-w-[850px]">
        Soluciones y Equipos <span className="text-primary-hover">Especializados</span>
      </h2>
      <p className="text-base text-text-gray max-w-[700px] leading-[1.6]">
        Explora nuestro catálogo de maquinaria pesada para excavación, compactación, carga, transporte y obras de infraestructura especializadas.
      </p>
    </div>
  );
}
