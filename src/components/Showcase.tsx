'use client';

import React, { useState } from 'react';

const MODALITIES = [
  {
    name: 'Contenedor Completo (FCL)',
    tagline: 'Proteja sus grandes operaciones',
    desc: 'Rapidez, exclusividad y total seguridad. Asignamos contenedores sellados de 20 y 40 pies exclusivos para su negocio, garantizando un tránsito directo y minimizando tiempos de entrega.',
    logoText: 'FC',
    accentClass: 'bg-primary',
    details: [
      { label: 'Equipos', value: 'Contenedores de 20 y 40 pies' },
      { label: 'Exclusividad', value: 'Contenedor sellado único' },
      { label: 'Tránsito', value: 'Directo y prioritario' },
    ],
    badges: ['FCL', 'Seguro de Carga', 'Prioritario'],
  },
  {
    name: 'Carga Consolidada (LCL)',
    tagline: 'Flexibilidad económica para su negocio',
    desc: 'Logística flexible y rentable. Envíe mercancía fraccionada compartiendo contenedor de forma segura, divida gastos y pague únicamente por el espacio que utiliza.',
    logoText: 'LC',
    accentClass: 'bg-accent',
    details: [
      { label: 'Modalidad de Envío', value: 'Compartido (Grupaje)' },
      { label: 'Optimización de Costos', value: 'Pague solo espacio ocupado' },
      { label: 'Logística', value: 'Consolidación propia' },
    ],
    badges: ['LCL', 'Económico', 'Flexible'],
  },
  {
    name: 'Transporte de Graneles',
    tagline: 'Infraestructura para grandes industrias',
    desc: 'Movilización experta de carga pesada, minerales y productos agrícolas. Gestionamos la logística compleja de materias primas con la precisión técnica y los buques de gran capacidad que su sector exige.',
    logoText: 'TG',
    accentClass: 'bg-primary-hover',
    details: [
      { label: 'Tipos de Granel', value: 'Minerales, agro, carbón' },
      { label: 'Buques', value: 'Bulk Carriers de alta capacidad' },
      { label: 'Ingeniería', value: 'Logística compleja y precisa' },
    ],
    badges: ['Graneles', 'Industrial', 'Gran Capacidad'],
  },
];

const CARGO_LIST_ITEMS = [
  { name: "Contenedores Estándar", detail: "20' / 40' / 40' HC" },
  { name: 'Carga Proyecto Especial', detail: 'Sobredimensionada y pesada' },
  { name: 'Vehículos Ro-Ro', detail: 'Automóviles y maquinaria' },
  { name: 'Carga Refrigerada', detail: 'Control de temperatura' },
  { name: 'Granel Sólido y Líquido', detail: 'Materias primas y químicos' },
];

const EQUIPMENT_LIST_ITEMS = [
  { name: 'Excavadoras de Cadena', detail: 'Potencia y estabilidad' },
  { name: 'Grúas Móviles y Portuarias', detail: 'Alta capacidad de izaje' },
  { name: 'Montacargas y Reach Stackers', detail: 'Manejo de contenedores' },
  { name: 'Plataformas y Lowboys', detail: 'Transporte especializado' },
  { name: 'Equipos Auxiliares', detail: 'Generadores, compresores, más' },
];

export default function Showcase() {
  const [activeModalityIndex, setActiveModalityIndex] = useState(0);

  return (
    <section id="operaciones" className="bg-[#010c1c] relative overflow-hidden pb-20">
      {/* Background radial glow */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_80%_50%,rgba(90,110,216,0.08)_0%,transparent_60%)]" />

      <div className="w-full max-w-[1280px] mx-auto px-5  relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-8">
          <span className="text-[11px] font-extrabold text-primary uppercase tracking-[0.2em]">
            Modalidades
          </span>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(26px,3.2vw,40px)] font-extrabold">
            Modalidades de <span className="text-primary">Transporte Marítimo</span>
          </h2>

          {/* Modality Tabs */}
          <div className="flex gap-2 mt-2">
            {MODALITIES.map((mod, idx) => (
              <button
                key={idx}
                onClick={() => setActiveModalityIndex(idx)}
                className={`rounded-full px-5 py-2 text-[12px] font-bold uppercase tracking-[0.03em] cursor-pointer whitespace-nowrap transition-all duration-300 ease-[ease] border ${
                  activeModalityIndex === idx
                    ? 'bg-primary border-primary text-white'
                    : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.6)]'
                }`}
              >
                {mod.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Core Grid: image / detail card / image */}
        <div className="grid grid-cols-[1fr_1.3fr_1fr] gap-6 items-stretch mb-10 max-[991px]:grid-cols-1">
          {/* Left Image */}
          <div className="relative rounded-2xl overflow-hidden min-h-[300px] max-[991px]:min-h-[220px]">
            <img src="/modalities_container_1.png" alt="Buque portacontenedores en tránsito" className="absolute inset-0 w-full h-full object-cover" />
          </div>

          {/* Active Details Card */}
          <div
            className="relative rounded-[14px] overflow-hidden transition-colors duration-300 bg-gray-900 border-[1.5px] border-[rgba(15,76,129,0.25)] hover:border-primary-hover/60 p-8 shadow-[0_15px_40px_rgba(15,76,129,0.06)] flex flex-col gap-1"
          >
            <div className="border-b border-[rgba(255,255,255,0.08)] pb-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-bold text-text-white uppercase font-[family-name:var(--font-space-grotesk)]">
                  {MODALITIES[activeModalityIndex].name}
                </h3>
                <div
                  className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center font-bold text-xs text-white ${MODALITIES[activeModalityIndex].accentClass}`}
                >
                  {MODALITIES[activeModalityIndex].logoText}
                </div>
              </div>
            </div>

            {/* Tagline & Description */}
            <div className="flex flex-col gap-2">
              <h4 className="text-[15px] font-bold text-primary-hover">
                {MODALITIES[activeModalityIndex].tagline}
              </h4>
              <p className="text-[13.5px] leading-[1.6] text-text-gray">
                {MODALITIES[activeModalityIndex].desc}
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              {MODALITIES[activeModalityIndex].details.map((detail, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center px-3.5 py-2.5 bg-[rgba(255,255,255,0.02)] rounded-lg border border-[rgba(255,255,255,0.04)]"
                >
                  <span className="text-[12.5px] text-[rgba(255,255,255,0.5)]">{detail.label}</span>
                  <span className="text-[12.5px] font-semibold text-text-white text-right">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 flex-wrap">
              {MODALITIES[activeModalityIndex].badges.map((b, idx) => (
                <span
                  key={idx}
                  className={`text-[11px] font-semibold border rounded px-2.5 py-1 ${
                    b === 'Seguro de Carga'
                      ? 'bg-[rgba(90,110,216,0.12)] border-[rgba(90,110,216,0.25)] text-primary'
                      : 'bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.1)] text-text-white'
                  }`}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative rounded-2xl overflow-hidden min-h-[300px] max-[991px]:min-h-[220px]">
            <img src="/modalities_container_2.png" alt="Contenedores apilados en puerto" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>

        {/* Value Cards Row: promo panels + lists */}
        <div className="grid grid-cols-5 gap-4 max-[991px]:grid-cols-2 max-[560px]:grid-cols-1">
          {/* Panel 1: Tipos de Carga Especializada */}
          <div className="relative rounded-2xl overflow-hidden min-h-[220px] flex flex-col justify-end p-5">
            <img src="/types_of_cargo.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,13,28,0.35)_0%,rgba(6,13,28,0.92)_100%)]" />
            <div className="relative z-10 flex flex-col gap-2">
              <h4 className="font-[family-name:var(--font-space-grotesk)] text-[15px] font-extrabold text-white leading-[1.2] uppercase">Tipos de Carga Especializada</h4>
              <p className="text-[11.5px] leading-[1.5] text-white/70">Gestionamos y coordinamos el fletamento marítimo adaptándonos a las especificaciones técnicas e industriales de cada tipo de mercancía.</p>
              <a href="#servicios" className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary-hover no-underline mt-1">
                Ver todos <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* List 1: Cargo Types */}
          <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-4 flex flex-col gap-3.5">
            {CARGO_LIST_ITEMS.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <span className="shrink-0 grid place-items-center w-7 h-7 rounded-md bg-[rgba(15,76,129,0.18)] text-primary-hover">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <div>
                  <h5 className="text-[12.5px] font-bold text-white leading-[1.2]">{item.name}</h5>
                  <p className="text-[10.5px] text-text-gray leading-[1.3]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Panel 2: Soluciones y Equipos Especializados */}
          <div className="relative rounded-2xl overflow-hidden min-h-[220px] flex flex-col justify-end p-5">
            <img src="/customized_solutions_equipment.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,13,28,0.35)_0%,rgba(6,13,28,0.92)_100%)]" />
            <div className="relative z-10 flex flex-col gap-2">
              <h4 className="font-[family-name:var(--font-space-grotesk)] text-[15px] font-extrabold text-white leading-[1.2] uppercase">Soluciones y Equipos Especializados</h4>
              <p className="text-[11.5px] leading-[1.5] text-white/70">Contamos con maquinaria de última generación para garantizar eficiencia, seguridad y cumplimiento en cada operación.</p>
              <a href="#maquinaria" className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary-hover no-underline mt-1">
                Ver catálogo <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* List 2: Equipment Types */}
          <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-4 flex flex-col gap-3.5">
            {EQUIPMENT_LIST_ITEMS.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <span className="shrink-0 grid place-items-center w-7 h-7 rounded-md bg-[rgba(15,76,129,0.18)] text-primary-hover">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <div>
                  <h5 className="text-[12.5px] font-bold text-white leading-[1.2]">{item.name}</h5>
                  <p className="text-[10.5px] text-text-gray leading-[1.3]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Panel 3: Seguimiento Inteligente */}
          <div className="relative rounded-2xl overflow-hidden min-h-[220px] flex flex-col justify-end p-5">
            <img src="/intelligent_tracking.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,13,28,0.35)_0%,rgba(6,13,28,0.92)_100%)]" />
            <div className="relative z-10 flex flex-col gap-2">
              <h4 className="font-[family-name:var(--font-space-grotesk)] text-[15px] font-extrabold text-white leading-[1.2] uppercase">Seguimiento Inteligente</h4>
              <p className="text-[11.5px] leading-[1.5] text-white/70">Visibilidad 24/7 de su carga con tecnología de punta y alertas en tiempo real.</p>
              <a href="#maquinaria" className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary-hover no-underline mt-1">
                Rastrear ahora <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
