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

const MARQUEE_ITEMS_1 = [
  { type: 'cargo', text: 'Contenedores Estándar (20\' / 40\')' },
  { type: 'cargo', text: 'Carga Proyecto Especial' },
  { type: 'cargo', text: 'Vehículos Rodantes Ro-Ro' },
];

const MARQUEE_ITEMS_2 = [
  { type: 'cargo', text: 'Productos Alimenticios Refrigerados' },
  { type: 'cargo', text: 'Hidrocarburos y Derivados' },
  { type: 'cargo', text: 'Carga Suelta y Paletizada' },
];

const MARQUEE_ITEMS_3 = [
  { type: 'cargo', text: 'Chatarra y Desechos Metálicos' },
  { type: 'cargo', text: 'Frutas y Hortalizas Frescas' },
  { type: 'cargo', text: 'Aceites y Grasas Alimentarias' },
];

const SERVICES_CATEGORIES = [
  {
    id: 'fletamento',
    title: '1. Fletamento Marítimo (Chartering)',
    subtitle: 'Conectamos sus grandes volúmenes de carga con la flota global adecuada. Encontramos el buque óptimo bajo las mejores condiciones del mercado internacional.',
    items: [
      {
        title: 'Fletamento por Viaje (Voyage Charter)',
        desc: 'Conseguimos el buque ideal para trasladar un lote específico de mercancía en rutas exclusivas.',
      },
      {
        title: 'Fletamento por Tiempo (Time Charter)',
        desc: 'Arrendamiento de naves por periodos determinados para empresas con flujos constantes de importación o exportación.',
      },
      {
        title: 'Carga Proyecto y Sobredimensionada',
        desc: 'Logística y fletamento especializado para maquinaria pesada, estructuras industriales y equipos energéticos.',
      },
    ],
  },
  {
    id: 'logistica',
    title: '2. Logística de Comercio Exterior',
    subtitle: 'Optimizamos su cadena de suministro global, asegurando espacios y reduciendo los tiempos de tránsito de sus mercancías.',
    items: [
      {
        title: 'Reserva de Espacios (Booking de Carga)',
        desc: 'Gestión de contratos de volumen para garantizar cupos prioritarios en las principales líneas navieras.',
      },
      {
        title: 'Consolidación de Carga Industrial',
        desc: 'Coordinación logística para el envío eficiente de lotes de carga suelta (acero, tuberías, sacos) sin requerir un buque completo.',
      },
      {
        title: 'Ingeniería Logística Internacional',
        desc: 'Diseño integral de rutas puerta a puerta y puerto a puerta, sincronizando el transporte terrestre con el marítimo.',
      },
    ],
  },
  {
    id: 'agenciamiento',
    title: '3. Agenciamiento y Operaciones Portuarias',
    subtitle: 'Protegemos sus intereses comerciales y legales en el puerto, garantizando que su carga se manipule con los más altos estándares.',
    items: [
      {
        title: 'Supervisión de Estiba y Desestiba',
        desc: 'Control físico y operativo en el muelle para optimizar los ritmos de carga y descarga del buque.',
      },
      {
        title: 'Inspecciones y Peritajes',
        desc: 'Certificación del estado, peso y calidad de la mercancía antes del embarque y al momento del desembarque.',
      },
      {
        title: 'Gestión de Terminales y Ventanas de Atraque',
        desc: 'Coordinación directa con las autoridades portuarias para agilizar las operaciones y evitar costosas demoras.',
      },
    ],
  },
];

export default function Showcase() {
  const [activeModalityIndex, setActiveModalityIndex] = useState(0);
  const [activeServiceTab, setActiveServiceTab] = useState('fletamento');

  const renderIcon = () => {
    return (
      <span className="flex items-center text-primary">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      </span>
    );
  };

  const activeServiceCategory = SERVICES_CATEGORIES.find((cat) => cat.id === activeServiceTab) || SERVICES_CATEGORIES[0];

  return (
    <section id="operaciones" className="bg-background-black py-[100px] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_80%_50%,rgba(90,110,216,0.08)_0%,transparent_60%)]" />

      <div className="w-full max-w-[1280px] mx-auto px-5 relative z-10">
        {/* Title */}
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(32px,4vw,56px)] font-extrabold text-center mb-[72px]">
          Modalidades de <span className="text-primary">Transporte Marítimo</span>
        </h2>

        {/* Core Grid */}
        <div className="grid grid-cols-[1.2fr_1fr] gap-16 items-center max-[991px]:grid-cols-1 max-[991px]:gap-10">
          {/* Left Column: Marquees */}
          <div className="relative flex flex-col gap-4 overflow-hidden h-[380px] w-full rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)] py-6">
            <div className="absolute top-0 left-0 right-0 h-10 z-[5] bg-[linear-gradient(to_bottom,var(--color-background-black),transparent)]" />
            <div className="absolute bottom-0 left-0 right-0 h-10 z-[5] bg-[linear-gradient(to_top,var(--color-background-black),transparent)]" />

            {/* Marquee Row 1 */}
            <div className="w-full overflow-hidden py-1">
              <div className="flex gap-4 whitespace-nowrap w-max animate-marquee">
                {MARQUEE_ITEMS_1.concat(MARQUEE_ITEMS_1).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-lg px-4 py-2 select-none">
                    {renderIcon()}
                    <span className="text-[13px] font-semibold text-text-white">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Marquee Row 2 */}
            <div className="w-full overflow-hidden py-1">
              <div className="flex gap-4 whitespace-nowrap w-max animate-marquee-reverse">
                {MARQUEE_ITEMS_2.concat(MARQUEE_ITEMS_2).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-lg px-4 py-2 select-none">
                    {renderIcon()}
                    <span className="text-[13px] font-semibold text-text-white">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Marquee Row 3 */}
            <div className="w-full overflow-hidden py-1">
              <div className="flex gap-4 whitespace-nowrap w-max animate-marquee">
                {MARQUEE_ITEMS_3.concat(MARQUEE_ITEMS_3).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-lg px-4 py-2 select-none">
                    {renderIcon()}
                    <span className="text-[13px] font-semibold text-text-white">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Cards */}
          <div className="relative w-full">
            {/* Top Selector Tabs */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {MODALITIES.map((mod, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveModalityIndex(idx)}
                  className={`rounded-[30px] px-4 py-2 text-[13px] font-semibold cursor-pointer whitespace-nowrap transition-all duration-300 ease-[ease] border ${
                    activeModalityIndex === idx
                      ? 'bg-[rgba(90,110,216,0.1)] border-primary text-primary'
                      : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.6)]'
                  }`}
                >
                  {mod.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Active Details Card */}
            <div
              className="relative rounded-[14px] overflow-hidden transition-all duration-300 before:content-[''] before:absolute before:inset-0 before:rounded-[14px] before:p-[1.5px] before:[background:linear-gradient(135deg,rgba(90,110,216,0.4)_0%,transparent_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[mask-composite:exclude] before:[-webkit-mask-composite:xor] before:pointer-events-none hover:before:[background:linear-gradient(135deg,var(--color-primary)_0%,var(--color-accent)_100%)] bg-[rgba(18,20,23,0.8)] border-[1.5px] border-[rgba(15,76,129,0.25)] p-8 shadow-[0_15px_40px_rgba(15,76,129,0.06)] flex flex-col gap-5"
            >
              <div className="border-b border-[rgba(255,255,255,0.08)] pb-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-[42px] h-[42px] rounded-full flex items-center justify-center font-bold text-sm text-white ${MODALITIES[activeModalityIndex].accentClass}`}
                  >
                    {MODALITIES[activeModalityIndex].logoText}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-accent uppercase tracking-[0.05em]">
                      Modalidad de Tránsito
                    </span>
                    <h3 className="text-xl font-bold text-text-white mt-0.5 font-[family-name:var(--font-space-grotesk)]">
                      {MODALITIES[activeModalityIndex].name}
                    </h3>
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
          </div>
        </div>

        {/* Dynamic Industrial Supply Switcher Section */}
        <div id="servicios" className="mt-[100px] border-t border-[rgba(255,255,255,0.08)] pt-20 scroll-mt-[100px]">
          <div className="flex flex-col items-center text-center gap-5 mb-12">
            <span className="text-[13px] font-semibold text-accent uppercase tracking-[0.08em]">
              Soluciones Integrales
            </span>
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(28px,3.5vw,44px)] font-extrabold text-text-white">
              Nuestros <span className="text-primary-hover">Servicios</span>
            </h3>

            {/* Category Select Buttons */}
            <div className="flex gap-3 flex-wrap justify-center">
              {SERVICES_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveServiceTab(cat.id)}
                  className={`rounded-[30px] px-6 py-2.5 text-sm font-semibold cursor-pointer transition-all duration-300 ease-[ease] border ${
                    activeServiceTab === cat.id
                      ? 'bg-[rgba(15,76,129,0.15)] border-primary text-primary-hover'
                      : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.6)]'
                  }`}
                >
                  {cat.title.split('. ')[1]}
                </button>
              ))}
            </div>

            {/* Category Subtitle */}
            <p className="text-[15px] leading-[1.6] text-text-gray max-w-[750px] mt-2">
              {activeServiceCategory.subtitle}
            </p>
          </div>

          {/* Supply items grid */}
          <div className="grid [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))] gap-8">
            {activeServiceCategory.items.map((benefit, i) => (
              <div
                key={i}
                className="relative rounded-[14px] overflow-hidden transition-all duration-300 before:content-[''] before:absolute before:inset-0 before:rounded-[14px] before:p-[1.5px] before:[background:linear-gradient(135deg,rgba(90,110,216,0.4)_0%,transparent_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[mask-composite:exclude] before:[-webkit-mask-composite:xor] before:pointer-events-none hover:before:[background:linear-gradient(135deg,var(--color-primary)_0%,var(--color-accent)_100%)] flex flex-col gap-4 bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.04)] p-8 hover:-translate-y-1 hover:bg-[rgba(255,255,255,0.03)]"
              >
                <div className="w-10 h-10 rounded-xl bg-[rgba(15,76,129,0.08)] flex items-center justify-center text-primary-hover">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-text-white">
                  {benefit.title}
                </h3>
                <p className="text-[13.5px] leading-[1.6] text-[rgba(255,255,255,0.65)]">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
