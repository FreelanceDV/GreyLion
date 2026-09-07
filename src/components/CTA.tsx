'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import DynamicMedia from './dynamic-media';

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
          Conectamos sus operaciones <br className="max-[550px]:hidden" />
          con el mundo.
        </h2>

        <p className="text-white/80 text-sm leading-[1.6] max-w-[480px]">
          En GreyLion Maritime hacemos que el comercio internacional sea simple y eficiente. Combinamos décadas de experiencia en el sector marítimo con soluciones logísticas integrales que se adaptan exactamente a lo que su empresa necesita para crecer.
        </p>

        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="no-underline shrink-0">
          <button className="inline-flex items-center gap-2 border-2 text-white hover:text-primary border-0 rounded-full py-3 px-6 text-[13px] font-extrabold uppercase tracking-[0.03em] cursor-pointer transition-all duration-300 ease-[ease] hover:bg-white/90 hover:-translate-y-0.5">
            Cotizar Ahora
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
          </button>
        </a>
      </div>
    </section>
  );
}
