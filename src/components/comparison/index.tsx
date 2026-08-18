'use client';

import React, { useState } from 'react';
import ComparisonCard from './ComparisonCard';
import { SERVICES } from './data';

export default function Comparison() {
  // Default to first card expanded
  const [activeIndex, setActiveIndex] = useState(0);
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573000000000';
  const whatsappUrl = `https://wa.me/${phone}?text=Hola%20GreyLion,%20quiero%20cotizar%20el%20servicio%20de%20`;

  return (
    <section
      id="servicios-medida"
      className="bg-[#010c1c] text-white py-[100px] relative overflow-hidden"
    >
      <div className="w-full max-w-[1280px] mx-auto px-5 relative z-10">
        {/* Header Title */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <span className="text-[13px] font-extrabold text-[#00a3ff] uppercase tracking-[0.15em]">
            Nuestros Servicios
          </span>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(32px,5vw,54px)] font-extrabold leading-[1.1] tracking-[-1.5px]">
            SOLUCIONES A LA MEDIDA
          </h2>
          <p className="text-base text-text-gray max-w-[680px] leading-[1.6] mt-1">
            Ofrecemos un servicio integral de transporte marítimo diseñado para impulsar tu negocio sin fronteras.
          </p>
        </div>

        {/* Expanding Cards Container */}
        <div className="flex gap-6 w-full min-h-[600px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] max-[991px]:flex-col max-[991px]:min-h-[auto]">
          {SERVICES.map((service, index) => (
            <ComparisonCard
              key={service.id}
              service={service}
              isExpanded={activeIndex === index}
              onHover={() => setActiveIndex(index)}
              whatsappUrl={whatsappUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
