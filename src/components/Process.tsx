'use client';

import React from 'react';

const STEPS = [
  {
    num: '01',
    title: 'Documentación y Aduanas',
    desc: 'Coordinamos con autoridades portuarias y aduanas para la tramitación ágil de certificados, permisos especiales y despachos arancelarios.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Carga y Descarga Portuaria',
    desc: 'Supervisión física minuciosa de las maniobras de estiba, desestiba y trincado en puerto, garantizando la integridad de la carga.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Almacenamiento Temporal',
    desc: 'Gestión y control de espacios de almacenamiento en terminales portuarias y depósitos francos autorizados bajo condiciones climáticas óptimas.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="5" rx="1" />
        <path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
        <line x1="10" y1="13" x2="14" y2="13" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Verificación y Entrega',
    desc: 'Verificación de calidad e inventario físico de las mercancías previo al despacho final, asegurando la satisfacción en destino.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <polyline points="9 14 11 16 15 12" />
      </svg>
    ),
  },
];

export default function Process() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573000000000';
  const whatsappUrl = `https://wa.me/${phone}?text=Hola%20GreyLion,%20quiero%20cotizar%20el%20envio%20de%20`;

  return (
    <section className="bg-background-dark text-text-white pt-[100px] relative overflow-hidden">
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5">
        <div className="grid grid-cols-[400px_1fr] gap-[80px] items-start max-[991px]:grid-cols-1 max-[991px]:gap-[60px]">
          {/* Left Column: copy, feature card, CTA */}
          <div className="relative flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="grid w-7 h-7 place-items-center rounded-md bg-primary/15 text-primary-hover [&>svg]:w-4 [&>svg]:h-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z" />
                </svg>
              </span>
              <span className="text-xs font-extrabold text-primary-hover uppercase tracking-[0.14em]">Gestión Portuaria Integral</span>
            </div>

            <h2 className="relative z-10 font-[family-name:var(--font-space-grotesk)] text-[clamp(32px,3.6vw,44px)] font-extrabold leading-[1.1] tracking-[-1px]">
              Gestión Integral <br />
              de Operaciones <br />
              <span className="text-primary-hover underline decoration-primary-hover/70 underline-offset-8">Portuarias</span>
            </h2>

            <p className="relative z-10 text-[15px] leading-[1.6] text-text-gray max-w-[380px]">
              Nuestro equipo gestiona todas las operaciones logísticas y documentales necesarias en puerto para el tránsito fluido de su mercancía.
            </p>

            <div className="relative z-10 flex items-start gap-3 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(6,13,26,0.6)] backdrop-blur-sm p-4 max-w-[320px]">
              <span className="shrink-0 grid w-9 h-9 place-items-center rounded-lg bg-primary/20 text-primary-hover [&>svg]:w-[18px] [&>svg]:h-[18px]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 21h20M19.3 14.8C21.1 13.5 22 11.7 22 9.5c0-3.3-2.7-6-6-6-2.1 0-3.9 1.1-5 2.8C9.9 4.6 8.1 3.5 6 3.5c-3.3 0-6 2.7-6 6 0 2.2.9 4 2.7 5.3" />
                  <path d="M4.5 10.5h15M6 10.5v6.5M18 10.5v6.5M12 10.5v10.5" />
                </svg>
              </span>
              <div>
                <h3 className="text-[13.5px] font-bold text-text-white m-0">Operaciones eficientes</h3>
                <p className="text-xs leading-[1.5] text-text-gray mt-1">Coordinación experta en cada etapa del proceso portuario para garantizar seguridad, cumplimiento y agilidad.</p>
              </div>
            </div>

            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="relative z-10 no-underline w-fit">
              <button className="flex items-center gap-2 bg-primary text-white border-0 rounded-full px-7 py-3.5 text-sm font-bold cursor-pointer transition-all duration-300 ease-[ease] shadow-[0_8px_24px_rgba(15,76,129,0.35)] hover:bg-primary-hover hover:-translate-y-0.5">
                Cotizar Envío
                <span aria-hidden="true">→</span>
              </button>
            </a>
          </div>

          {/* Right Column: numbered timeline */}
          <div className="relative pl-[70px] max-[560px]:pl-[56px]">
            {/* Timeline vertical bar, running through the numbered circles */}
            <div className="absolute left-6 top-6 bottom-6 w-px bg-[rgba(255,255,255,0.1)] z-0" />

            <div className="flex flex-col gap-8">
              {STEPS.map((step, idx) => (
                <div key={idx} className="relative flex items-center">
                  {/* Numbered circle */}
                  <div className="absolute -left-[70px] max-[560px]:-left-[56px] top-1/2 -translate-y-1/2 z-10 grid w-12 h-12 place-items-center rounded-full border-2 border-[rgba(255,255,255,0.15)] bg-background-dark font-[family-name:var(--font-space-grotesk)] text-lg font-extrabold text-text-white">
                    {step.num}
                  </div>
                  {/* Connector dot */}
                  <div className="absolute -left-[18px] top-1/2 -translate-y-1/2 z-10 w-2 h-2 rounded-full bg-primary-hover" />

                  {/* Card */}
                  <div className="relative w-full overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-6 flex items-start gap-5 transition-colors duration-300 hover:border-primary-hover/40">
                    <span className="absolute top-2 right-5 font-[family-name:var(--font-space-grotesk)] text-[56px] font-extrabold leading-none text-white/5 select-none">
                      {step.num}
                    </span>
                    <span className="relative z-10 shrink-0 grid w-14 h-14 place-items-center rounded-xl bg-primary/15 text-primary-hover [&>svg]:w-7 [&>svg]:h-7">
                      {step.icon}
                    </span>
                    <div className="relative z-10 flex-1">
                      <h3 className="text-[17px] font-bold text-text-white m-0">{step.title}</h3>
                      <p className="text-[13.5px] leading-[1.6] text-text-gray mt-1.5">{step.desc}</p>
                    </div>
                    <span className="relative z-10 shrink-0 grid w-8 h-8 place-items-center rounded-full border border-primary-hover/40 text-primary-hover">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom banner photo: full-bleed, pulled up to overlap the content above so it blends into the section instead of sitting as a separate block */}
      <div className="relative z-0 w-full min-h-[340px] -mt-45">
        <img
          src="/comprehensive_operations_management.png"
          alt="Operación portuaria de GreyLion Maritime"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-background-dark)_0%,rgba(11,18,32,0.7)_18%,transparent_45%)]" />
      </div>
    </section>
  );
}
