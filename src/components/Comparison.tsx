'use client';

import React, { useState } from 'react';
import DynamicMedia from './DynamicMedia';

const SERVICES = [
  {
    id: 'maritimo',
    title: 'TRANSPORTE MARÍTIMO',
    subtitle: 'Logística y Fletamento Global',
    desc: 'Llegamos a cualquier puerto del mundo a través de la mayor red de rutas marítimas comerciales. Coordinamos cada embarque con absoluta precisión técnica.',
    image: '/maritime_transport_card.jpg',
    features: [
      { name: 'Contenedor Completo (FCL)', detail: 'Exclusividad y rapidez para operaciones industriales.' },
      { name: 'Carga Consolidada (LCL)', detail: 'Soluciones económicas compartiendo espacio.' },
      { name: 'Fletamento de Buques (Chartering)', detail: 'Arrendamiento de naves a la medida de grandes volúmenes.' },
      { name: 'Carga Proyecto', detail: 'Ingeniería de transporte para piezas sobredimensionadas.' },
    ]
  },
  {
    id: 'integral',
    title: 'LOGÍSTICA INTEGRAL',
    subtitle: 'Operaciones Puerta a Puerta',
    desc: 'Sincronizamos de principio a fin su cadena de suministro. Nos encargamos de la complejidad operativa y legal para que usted se enfoque en su negocio.',
    image: '/integral_logistics_card.jpg',
    features: [
      { name: 'Agenciamiento de Aduanas', detail: 'Clasificación arancelaria, trámites y despacho rápido.' },
      { name: 'Almacenamiento y Depósitos', detail: 'Espacios estratégicos con control y seguridad total.' },
      { name: 'Supervisión Física (Estiba/Trincado)', detail: 'Control riguroso en puerto para mitigar riesgos.' },
      { name: 'Conexión Terrestre', detail: 'Transporte intermodal coordinado desde puerto hasta destino.' },
    ]
  }
];

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
      {/* Background Video/Image */}
      {/* <div className="absolute inset-0 z-0 overflow-hidden">
        <DynamicMedia assetId="bg_comparison" fallbackSrc="/charger_boat.mp4" className="opacity-15" /> */}
        {/* Sleek Dark Gradient Overlay */}
        {/* <div className="absolute inset-0 bg-[linear-gradient(180deg,#010c1c%,rgba(10,11,13,0.8)_50%,#0a0b0d_100%)]" />
      </div> */}

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
          {SERVICES.map((service, index) => {
            const isExpanded = activeIndex === index;
            const cardClass = `group relative rounded-[20px] overflow-hidden bg-[#121417] border border-white/5 flex transition-[flex,border-color,box-shadow] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[rgba(0,163,255,0.3)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] max-[991px]:flex-none! max-[991px]:w-full max-[991px]:h-auto max-[991px]:min-h-[380px] ${
              isExpanded ? 'flex-[3.5] cursor-default' : 'flex-1 cursor-pointer'
            }`;
            const collapsedTitleOverlayClass = `absolute inset-0 z-[3] flex flex-col items-center py-10 px-5 pointer-events-none transition-opacity duration-[400ms] ease-[ease] max-[991px]:hidden ${
              isExpanded ? 'opacity-0' : 'opacity-100'
            }`;
            const cardBgClass = `absolute inset-0 z-[1] overflow-hidden transition-[opacity,transform] duration-500 ease-[ease] ${
              isExpanded ? 'opacity-0 pointer-events-none scale-105' : 'opacity-60 max-[991px]:opacity-15'
            }`;
            const expandedContentClass = `relative w-full h-full z-[2] flex transition-opacity ease-[ease] max-[991px]:flex-col max-[991px]:opacity-100! max-[991px]:pointer-events-auto! ${
              isExpanded ? 'opacity-100 pointer-events-auto duration-500 delay-200' : 'opacity-0 pointer-events-none duration-300'
            }`;

            return (
              <div
                key={service.id}
                className={cardClass}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {/* Collapsed State Title Overlay (Vertical text, hidden when expanded) */}
                <div className={collapsedTitleOverlayClass}>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-extrabold tracking-[2px] text-white [writing-mode:vertical-rl] [text-orientation:mixed] rotate-180 whitespace-nowrap">
                    {service.title}
                  </h3>
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white flex items-center text-xl font-light transition-all duration-300 ease-[ease] group-hover:bg-[#00a3ff] group-hover:border-[#00a3ff] group-hover:rotate-90">
                    +
                  </div>
                </div>

                {/* Card Background Image/Video (Visible when collapsed) */}
                <div className={cardBgClass}>
                  <DynamicMedia
                    assetId={service.id === 'maritimo' ? 'maritime_transport' : 'integral_logistics'}
                    fallbackSrc={service.image}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,18,0.3)_0%,rgba(7,11,18,0.9)_100%)]" />
                </div>

                {/* Expanded State Content Wrapper (Visible when expanded) */}
                <div className={expandedContentClass}>
                  {/* Left Column: Text Content */}
                  <div className="flex-[1.2] p-12 flex flex-col z-[5] bg-[#0d1118] rounded-l-[20px] max-[991px]:flex-none max-[991px]:py-8 max-[991px]:px-6 max-[991px]:rounded-[20px] max-[991px]:bg-[rgba(18,20,23,0.85)] max-[991px]:backdrop-blur-[10px]">
                    <span className="text-[11px] font-extrabold text-[#00a3ff] tracking-[0.15em] uppercase mb-2">{service.subtitle}</span>
                    <h3 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(24px,3vw,36px)] font-extrabold text-white mb-4">{service.title}</h3>
                    <p className="text-sm leading-[1.6] text-text-gray mb-7 max-w-[480px]">{service.desc}</p>

                    <div className="grid grid-cols-2 gap-5 mb-8 max-[991px]:grid-cols-1 max-[991px]:gap-4">
                      {service.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex gap-3 items-start">
                          <div className="text-[#00a3ff] font-bold text-base shrink-0 mt-0.5">✓</div>
                          <div>
                            <h4 className="text-sm font-bold text-white mb-1">{feat.name}</h4>
                            <p className="text-xs text-white/50 leading-[1.4]">{feat.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <a
                      href={`${whatsappUrl}${encodeURIComponent(service.title.toLowerCase())}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#0070f3] text-white border-0 rounded-md py-3.5 px-7 text-sm font-bold cursor-pointer w-fit no-underline transition-all duration-300 ease-[ease] shadow-[0_8px_20px_rgba(0,112,243,0.2)] hover:bg-[#005ccb] hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,112,243,0.35)]"
                    >
                      Cotizar Servicio ↗
                    </a>
                  </div>

                  {/* Right Column: Visual Showcase */}
                  <div className="flex-1 relative overflow-hidden rounded-r-[20px] max-[991px]:hidden">
                    <DynamicMedia
                      assetId={service.id === 'maritimo' ? 'maritime_transport' : 'integral_logistics'}
                      fallbackSrc={service.image}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,#0d1118_0%,rgba(13,17,24,0.5)_20%,transparent_100%)]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
