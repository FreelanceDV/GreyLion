'use client';

import React from 'react';
import DynamicMedia from './DynamicMedia';

export default function CTA() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573000000000';
  const whatsappUrl = `https://wa.me/${phone}?text=Hola%20GreyLion,%20quiero%20cotizar%20el%20envio%20de%20`;

  return (
    <section className="relative bg-white pb-[120px]">
      <div className="w-full max-w-[1280px] mx-auto px-5">
        {/* Glowing banner container */}
        <div className="relative overflow-hidden bg-primary rounded-[40px] py-20 px-[clamp(40px,8vw,120px)] shadow-[0_30px_60px_rgba(15,76,129,0.25)]">
          {/* Background Video */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <DynamicMedia assetId="background_video" fallbackSrc="/charger_boat.mp4" className="opacity-25" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-primary)_0%,rgba(15,76,129,0.75)_50%,rgba(10,11,13,0.95)_100%)]" />
          </div>

          {/* Subtle grid pattern background overlay in CSS */}
          <div className="absolute inset-0 z-[1] opacity-[0.08] pointer-events-none bg-[linear-gradient(rgba(0,0,0,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.15)_1px,transparent_1px)] bg-[size:24px_24px]" />

          {/* Content Wrapper */}
          <div className="relative z-10 flex flex-col gap-6 max-w-[900px]">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(28px,4.5vw,50px)] font-extrabold text-text-white leading-[1.15] tracking-[-1.5px]">
              Comience a Exportar e Importar con <br />
              GreyLion Maritime, su socio de confianza.
            </h2>
            <p className="text-[clamp(16px,1.8vw,22px)] leading-[1.5] text-white/80 max-w-[720px]">
              En GreyLion Maritime transformamos los desafíos del comercio internacional y la infraestructura en oportunidades de crecimiento para su empresa.
            </p>

            {/* Action buttons */}
            <div className="flex items-center gap-6 mt-4 flex-wrap">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="no-underline">
                <button className="bg-background-dark text-white border-0 rounded-[30px] py-4 px-9 text-base font-bold cursor-pointer transition-all duration-300 ease-[ease] shadow-[0_8px_24px_rgba(6,11,19,0.15)] hover:-translate-y-0.5 hover:bg-[#15223a]">
                  Cotizar Envío
                </button>
              </a>

              <button className="bg-transparent text-text-white border-[1.5px] border-text-white rounded-[30px] py-[15px] px-9 text-base font-bold cursor-pointer flex items-center gap-2 transition-all duration-300 ease-[ease] hover:bg-white/5 hover:-translate-y-0.5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Ver Catálogo de Maquinaria
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
