'use client';

import React from 'react';

const STEPS = [
  {
    num: '01',
    title: 'Documentación y Aduanas',
    desc: 'Coordinamos con autoridades portuarias y aduanas para la tramitación ágil de certificados, permisos especiales y despachos arancelarios.',
  },
  {
    num: '02',
    title: 'Carga y Descarga Portuaria',
    desc: 'Supervisión física minuciosa de las maniobras de estiba, desestiba y trincado en puerto, garantizando la integridad de la carga.',
  },
  {
    num: '03',
    title: 'Almacenamiento Temporal',
    desc: 'Gestión y control de espacios de almacenamiento en terminales portuarias y depósitos francos autorizados bajo condiciones climáticas óptimas.',
  },
  {
    num: '04',
    title: 'Verificación y Entrega',
    desc: 'Verificación de calidad e inventario físico de las mercancías previo al despacho final, asegurando la satisfacción en destino.',
  },
];

export default function Process() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573000000000';
  const whatsappUrl = `https://wa.me/${phone}?text=Hola%20GreyLion,%20quiero%20cotizar%20el%20envio%20de%20`;

  return (
    <section className="bg-[#FAFAFA] text-background-dark py-[100px] relative">
      <div className="w-full max-w-[1280px] mx-auto px-5">
        {/* Main Grid */}
        <div className="process-grid grid grid-cols-[400px_1fr] gap-[80px] items-start max-[991px]:grid-cols-1 max-[991px]:gap-[60px]">
          {/* Left Column (Sticky) */}
          <div className="process-sidebar sticky top-[120px] flex flex-col gap-6 max-[991px]:static max-[991px]:top-0 max-[991px]:items-center max-[991px]:text-center">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(36px,4vw,54px)] font-extrabold leading-[1.1] text-background-dark tracking-[-1.5px]">
              Gestión Integral <br />
              de Operaciones <span className="text-primary-dark">Portuarias</span>
            </h2>
            <p className="text-base leading-[1.6] text-[#667085] max-w-[380px] max-[991px]:max-w-full">
              Nuestro equipo gestiona todas las operaciones logísticas y documentales necesarias en puerto para el tránsito fluido de su mercancía.
            </p>

            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="no-underline">
              <button className="bg-primary-dark text-white border-0 rounded-[30px] px-9 py-4 text-[15px] font-bold cursor-pointer w-fit transition-all duration-200 ease-[ease] shadow-[0_8px_24px_rgba(90,110,216,0.2)] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(90,110,216,0.3)]">
                Cotizar Envío
              </button>
            </a>
          </div>

          {/* Right Column */}
          <div className="relative pl-8">
            {/* Timeline Vertical bar */}
            <div className="absolute left-[6px] top-3 bottom-3 w-[2px] bg-[#E7E7E7] z-0" />

            {/* Steps loop */}
            <div className="flex flex-col gap-12">
              {STEPS.map((step, idx) => (
                <div key={idx} className="step-item relative flex flex-col gap-3">
                  <div className="absolute -left-8 top-2 w-3.5 h-3.5 rounded-full bg-primary-dark border-4 border-[#FAFAFA] z-10 shadow-[0_0_0_1px_var(--color-primary-dark)]" />

                  <span className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-primary-dark">
                    {step.num}
                  </span>

                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-background-dark">
                    {step.title}
                  </h3>

                  <p className="text-[15px] leading-[1.6] text-[#475467] max-w-[560px]">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
