import React from 'react';

export default function HeroHeading() {
  return (
    <>
      {/* Large Stacked Title */}
      <h1 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(44px,6.5vw,84px)] font-extrabold leading-[0.95] tracking-[-0.02em] text-white flex flex-col gap-1 [text-shadow:0_10px_34px_rgba(0,0,0,.24)] max-[768px]:text-[clamp(43px,13vw,68px)]">
        <span>NAVEGAMOS</span>
        <span className="text-[#00a3ff]">CARGAMOS</span>
        <span>ENTREGAMOS</span>
      </h1>

      {/* Subtitle */}
      <p className="text-[clamp(15px,1.8vw,18px)] text-text-gray max-w-[520px] leading-[1.6] [text-shadow:0_2px_18px_rgba(0,0,0,.52)]">
        Soluciones logísticas marítimas confiables, eficientes y sostenibles para un mundo en movimiento.
      </p>
    </>
  );
}
