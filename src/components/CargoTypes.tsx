'use client';

import React from 'react';

const CARGO_TYPES = [
  {
    title: 'Contenedores Estándar: Eficiencia para su stock',
    code: 'DRY / 20–40',
    desc: 'Equipos dry de 20 y 40 pies para el traslado rápido de mercancía general.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="2" y1="10" x2="22" y2="10"></line>
        <line x1="12" y1="3" x2="12" y2="17"></line>
        <path d="M12 17h.01"></path>
      </svg>
    ),
  },
  {
    title: 'Carga Proyecto: Logística para grandes dimensiones',
    code: 'OOG / PROJECT',
    desc: 'Manipulación experta e ingeniería de transporte para maquinaria pesada y sobredimensionada.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    ),
  },
  {
    title: 'Vehículos Ro-Ro: Conectividad para su flota',
    code: 'RO-RO / ROLLING',
    desc: 'Embarque eficiente de automóviles, camiones y maquinaria rodante en buques especializados.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2" ry="2"></rect>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
        <circle cx="5.5" cy="18.5" r="2.5"></circle>
        <circle cx="18.5" cy="18.5" r="2.5"></circle>
      </svg>
    ),
  },
  {
    title: 'Productos Refrigerados: Control de cadena de frío',
    code: 'REEFER / COLD',
    desc: 'Contenedores reefer con monitoreo térmico para alimentos perecederos y productos farmacéuticos.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        <path d="M2 12h20"></path>
      </svg>
    ),
  },
  {
    title: 'Gas y Petróleo: Seguridad en hidrocarburos',
    code: 'TANK / ENERGY',
    desc: 'Transporte especializado de combustibles y derivados en buques tanque bajo estrictas normas.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2s-8 6-8 12c0 4.42 3.58 8 8 8s8-3.58 8-8c0-6-8-12-8-12z"></path>
      </svg>
    ),
  },
  {
    title: 'Carga Suelta: Flexibilidad a la medida',
    code: 'BREAK BULK / FLEX',
    desc: 'Logística adaptada para mercancías no contenedorizadas, paletizadas o embaladas según su naturaleza.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    ),
  },
];

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
            <article
              key={idx}
              className="relative flex min-h-[286px] max-[560px]:min-h-[260px] flex-col overflow-hidden p-[27px] border border-[rgba(80,111,145,0.32)] rounded-[18px] bg-[linear-gradient(145deg,#131b25,#10161e)] shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] transition-[border-color,transform,box-shadow] duration-[250ms] ease-[ease] motion-reduce:transition-none hover:border-[rgba(91,162,214,0.82)] hover:shadow-[0_18px_36px_rgba(0,0,0,0.22)] hover:-translate-y-[5px] before:absolute before:inset-y-0 before:right-0 before:w-1 before:bg-[linear-gradient(180deg,var(--color-primary-hover),transparent_72%)] before:content-[''] before:opacity-80"
            >
              <div className="flex justify-between items-start">
                <span className="grid w-12 h-12 place-items-center border border-[rgba(27,108,168,0.45)] rounded-[14px] bg-[rgba(15,76,129,0.16)] text-[#a7bed0] [&>svg]:w-6 [&>svg]:h-6">{cargo.icon}</span>
                <span className="text-[rgba(142,208,255,0.2)] font-[family-name:var(--font-space-grotesk)] text-[29px] font-extrabold leading-none">{String(idx + 1).padStart(2, '0')}</span>
              </div>
              <p className="m-0 mt-5 mb-2 text-[#8ed0ff] text-[10px] font-extrabold tracking-[0.13em]">{cargo.code}</p>
              <h3 className="m-0 mb-2.5 text-white font-[family-name:var(--font-space-grotesk)] text-[19px] leading-[1.2]">{cargo.title}</h3>
              <p className="m-0 text-text-gray text-[13px] leading-[1.6]">{cargo.desc}</p>
              <footer className="flex justify-between items-center mt-auto pt-[18px] border-t border-[rgba(140,150,158,0.12)] text-[#8aa3b8] text-[10px] font-extrabold tracking-[0.09em] uppercase">
                <span>Gestión especializada</span>
                <span aria-hidden="true" className="text-[#8ed0ff] text-[17px]">↗</span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
