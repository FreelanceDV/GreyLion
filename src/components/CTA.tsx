'use client';

import React from 'react';
import DynamicMedia from './DynamicMedia';

export default function CTA() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573000000000';
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent('Hola GreyLion, quiero una cotización personalizada para mover mi carga.')}`;

  return (
    <section className="relative overflow-hidden">
      {/* Background photo + brand-blue gradient */}
      <div className="absolute inset-0 z-0">
        <DynamicMedia
          src="/ready_to_move_your_cargo.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,26,64,0.72)_0%,rgba(15,76,129,0.86)_45%,rgba(27,108,168,0.92)_100%)]" />
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 py-8 flex items-center justify-between gap-8 flex-wrap max-[850px]:flex-col max-[850px]:items-start max-[850px]:py-10">
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-white text-[clamp(19px,2.2vw,26px)] font-extrabold leading-[1.25]">
          ¿Listo para mover tu carga <br className="max-[550px]:hidden" />
          con confianza?
        </h2>

        <p className="text-white/80 text-base leading-[1.6] max-w-[360px]">
          Obtén una cotización personalizada y descubre por qué somos tu mejor aliado en logística marítima.
        </p>

        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="no-underline shrink-0">
          <button className="inline-flex items-center gap-2 border-2 text-white hover:text-primary border-0 rounded-full py-3 px-6 text-[13px] font-extrabold uppercase tracking-[0.03em] cursor-pointer transition-all duration-300 ease-[ease] hover:bg-white/90 hover:-translate-y-0.5">
            Cotizar Ahora
            <span aria-hidden="true">→</span>
          </button>
        </a>
      </div>
    </section>
  );
}
