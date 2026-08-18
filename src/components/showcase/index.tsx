'use client';

import React, { useState } from 'react';
import ModalityTabs from './ModalityTabs';
import ModalityDetailCard from './ModalityDetailCard';
import ModalityImagePanel from './ModalityImagePanel';
import ValueCardsRow from './ValueCardsRow';
import { MODALITIES } from './data';

export default function Showcase() {
  const [activeModalityIndex, setActiveModalityIndex] = useState(0);

  return (
    <section id="operaciones" className="bg-[#010c1c] relative overflow-hidden pb-20">
      {/* Background radial glow */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_80%_50%,rgba(90,110,216,0.08)_0%,transparent_60%)]" />

      <div className="w-full max-w-[1280px] mx-auto px-5 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-8">
          <span className="text-[11px] font-extrabold text-primary uppercase tracking-[0.2em]">
            Modalidades
          </span>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(26px,3.2vw,40px)] font-extrabold">
            Modalidades de <span className="text-primary">Transporte Marítimo</span>
          </h2>

          <ModalityTabs activeIndex={activeModalityIndex} onSelect={setActiveModalityIndex} />
        </div>

        {/* Core Grid: image / detail card / image */}
        <div className="grid grid-cols-[1fr_1.3fr_1fr] gap-6 items-stretch mb-10 max-[991px]:grid-cols-1">
          <ModalityImagePanel src="/modalities_container_1.png" alt="Buque portacontenedores en tránsito" />
          <ModalityDetailCard modality={MODALITIES[activeModalityIndex]} />
          <ModalityImagePanel src="/modalities_container_2.png" alt="Contenedores apilados en puerto" />
        </div>

        {/* Value Cards Row: promo panels + lists */}
        <ValueCardsRow />
      </div>
    </section>
  );
}
