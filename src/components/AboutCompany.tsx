'use client';

import React from 'react';
import DynamicMedia from './DynamicMedia';

export default function AboutCompany() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573000000000';
  const whatsappUrl = `https://wa.me/${phone}?text=Hola%20GreyLion,%20quiero%20cotizar%20el%20envio%20de%20`;

  return (
    <section className="relative overflow-hidden bg-background-dark text-white py-20">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <DynamicMedia assetId="background_video" fallbackSrc="/charger_boat.mp4" className="opacity-[0.12]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-background-dark)_0%,rgba(18,20,23,0.85)_50%,var(--color-background-dark)_100%)]" />
      </div>

      {/* Decorative Radial Glow */}
      <div className="absolute top-[20%] left-[-10%] w-1/2 h-2/5 rounded-full bg-[radial-gradient(circle,rgba(15,76,129,0.08)_0%,transparent_70%)] blur-[100px] pointer-events-none z-[1]" />

      <div className="w-full max-w-[1280px] mx-auto px-5 relative z-10">

        {/* ================= SECTION 1: MISSION / VISION ================= */}
        <div id="mision-vision" className="scroll-mt-[100px] mb-[100px]">
          <div className="flex flex-col items-center text-center gap-4 mb-12">
            <span className="text-[13px] font-semibold text-accent uppercase tracking-[0.08em]">
              Nuestra Identidad
            </span>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(28px,3.5vw,48px)] font-extrabold leading-[1.2]">
              Misión <span className="text-primary">& Visión</span>
            </h2>
            <p className="text-[15px] text-text-gray max-w-[600px] leading-[1.5]">
              Los pilares fundamentales que guían nuestras operaciones diarias y definen nuestro rumbo estratégico en el comercio internacional.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 max-[991px]:grid-cols-1 max-[991px]:gap-5">
            <article className="relative min-h-[308px] overflow-hidden pt-9 px-8 pb-[30px] border border-[rgba(70,117,163,0.45)] rounded-[18px] bg-[linear-gradient(145deg,#101722_0%,#0b1018_100%)] shadow-[0_18px_42px_rgba(0,0,0,0.18)] transition-[transform,border-color,box-shadow] duration-[250ms] ease-[ease] before:content-[''] before:absolute before:top-0 before:right-0 before:left-0 before:h-[3px] before:bg-[linear-gradient(90deg,var(--color-primary),var(--color-primary-hover),#8c969e)] hover:border-[rgba(78,146,204,0.8)] hover:shadow-[0_24px_54px_rgba(4,25,43,0.46)] hover:-translate-y-[5px] max-[520px]:min-h-0 max-[520px]:pt-[29px] max-[520px]:px-[23px] max-[520px]:pb-[27px] motion-reduce:transition-none">
              <span className="absolute right-[-2px] bottom-[-30px] text-[rgba(140,150,158,0.055)] font-[family-name:var(--font-space-grotesk)] text-[180px] font-extrabold leading-[0.9] pointer-events-none" aria-hidden="true">M</span>
              <div className="relative flex gap-[15px] items-center">
                <span className="grid w-16 h-16 flex-none place-items-center border border-[rgba(27,108,168,0.55)] rounded-[17px] bg-[rgba(15,76,129,0.2)] text-[#8ed0ff] [&>svg]:w-[29px] [&>svg]:h-[29px]" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" />
                  </svg>
                </span>
                <div>
                  <p className="m-0 mb-1 text-[#8ed0ff] text-[11px] font-extrabold tracking-[0.12em]">01 / PROPÓSITO</p>
                  <h3 className="m-0 text-white font-[family-name:var(--font-space-grotesk)] text-[27px] font-extrabold leading-[1.1] max-[520px]:text-[23px]">Nuestra Misión</h3>
                </div>
              </div>
              <blockquote className="relative mt-6 mb-[21px] pl-4 border-l-2 border-primary-hover text-text-gray text-[14px] italic leading-[1.65] max-[520px]:mt-[21px] max-[520px]:text-[13px]">“Simplificamos el comercio internacional para que su carga avance con seguridad, puntualidad y eficiencia.”</blockquote>
              <ul className="relative grid gap-[11px] m-0 p-0 list-none text-text-gray text-[13px] leading-[1.35]">
                <li className="flex gap-2.5 items-center before:content-['✓'] before:grid before:w-[17px] before:h-[17px] before:flex-none before:place-items-center before:rounded-full before:bg-primary-hover before:text-white before:text-[11px] before:font-black">Procesos logísticos y aduaneros simplificados</li>
                <li className="flex gap-2.5 items-center before:content-['✓'] before:grid before:w-[17px] before:h-[17px] before:flex-none before:place-items-center before:rounded-full before:bg-primary-hover before:text-white before:text-[11px] before:font-black">Coordinación portuaria de principio a fin</li>
                <li className="flex gap-2.5 items-center before:content-['✓'] before:grid before:w-[17px] before:h-[17px] before:flex-none before:place-items-center before:rounded-full before:bg-primary-hover before:text-white before:text-[11px] before:font-black">Soluciones ajustadas a cada operación</li>
              </ul>
            </article>

            <article className="relative min-h-[308px] overflow-hidden pt-9 px-8 pb-[30px] border border-[rgba(70,117,163,0.45)] rounded-[18px] bg-[linear-gradient(145deg,#101722_0%,#0b1018_100%)] shadow-[0_18px_42px_rgba(0,0,0,0.18)] transition-[transform,border-color,box-shadow] duration-[250ms] ease-[ease] before:content-[''] before:absolute before:top-0 before:right-0 before:left-0 before:h-[3px] before:bg-[linear-gradient(90deg,var(--color-primary),var(--color-primary-hover),#8c969e)] hover:border-[rgba(78,146,204,0.8)] hover:shadow-[0_24px_54px_rgba(4,25,43,0.46)] hover:-translate-y-[5px] max-[520px]:min-h-0 max-[520px]:pt-[29px] max-[520px]:px-[23px] max-[520px]:pb-[27px] motion-reduce:transition-none">
              <span className="absolute right-[-2px] bottom-[-30px] text-[rgba(140,150,158,0.055)] font-[family-name:var(--font-space-grotesk)] text-[180px] font-extrabold leading-[0.9] pointer-events-none" aria-hidden="true">V</span>
              <div className="relative flex gap-[15px] items-center">
                <span className="grid w-16 h-16 flex-none place-items-center border border-[rgba(27,108,168,0.55)] rounded-[17px] bg-[rgba(15,76,129,0.2)] text-[#8ed0ff] [&>svg]:w-[29px] [&>svg]:h-[29px]" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3.7-6 10-6 10 6 10 6-3.7 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="2.5" />
                  </svg>
                </span>
                <div>
                  <p className="m-0 mb-1 text-[#8ed0ff] text-[11px] font-extrabold tracking-[0.12em]">02 / RUMBO 2030</p>
                  <h3 className="m-0 text-white font-[family-name:var(--font-space-grotesk)] text-[27px] font-extrabold leading-[1.1] max-[520px]:text-[23px]">Nuestra Visión</h3>
                </div>
              </div>
              <blockquote className="relative mt-6 mb-[21px] pl-4 border-l-2 border-primary-hover text-text-gray text-[14px] italic leading-[1.65] max-[520px]:mt-[21px] max-[520px]:text-[13px]">“Conectamos empresas y mercados con operaciones marítimas más inteligentes, visibles y confiables.”</blockquote>
              <ul className="relative grid gap-[11px] m-0 p-0 list-none text-text-gray text-[13px] leading-[1.35]">
                <li className="flex gap-2.5 items-center before:content-['✓'] before:grid before:w-[17px] before:h-[17px] before:flex-none before:place-items-center before:rounded-full before:bg-primary-hover before:text-white before:text-[11px] before:font-black">Tecnología avanzada para rastreo de carga</li>
                <li className="flex gap-2.5 items-center before:content-['✓'] before:grid before:w-[17px] before:h-[17px] before:flex-none before:place-items-center before:rounded-full before:bg-primary-hover before:text-white before:text-[11px] before:font-black">Red global de puertos y aliados estratégicos</li>
                <li className="flex gap-2.5 items-center before:content-['✓'] before:grid before:w-[17px] before:h-[17px] before:flex-none before:place-items-center before:rounded-full before:bg-primary-hover before:text-white before:text-[11px] before:font-black">Respaldo experto para crecer con confianza</li>
              </ul>
            </article>
          </div>
        </div>

        {/* ================= SECTION 2: OBJECTIVES ================= */}
        <div id="objetivos" className="scroll-mt-[100px] mb-[100px] border-t border-[rgba(255,255,255,0.06)] pt-20">
          <div className="flex flex-col items-center text-center gap-4 mb-12">
            <span className="text-[13px] font-semibold text-accent uppercase tracking-[0.08em]">
              Metas y Propósitos
            </span>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(28px,3.5vw,48px)] font-extrabold leading-[1.2]">
              Objetivos de la <span className="text-primary">empresa</span>
            </h2>
            <p className="text-[15px] text-text-gray max-w-[600px] leading-[1.5]">
              Nuestra estrategia empresarial está orientada a cumplir metas claras y medibles que aseguren el éxito comercial de nuestros aliados.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-[18px] max-[991px]:grid-cols-2 max-[520px]:grid-cols-1">
            {[
              {
                num: '01',
                title: 'Optimización de Tiempos',
                desc: 'Minimizar los tiempos de entrega mediante una planificación de rutas inteligente y el flete de buques de última generación.',
                label: 'Planificación de ruta',
                icon: 'route',
              },
              {
                num: '02',
                title: 'Tarifas Competitivas',
                desc: 'Garantizar márgenes económicos favorables para su negocio con base en nuestros acuerdos navieros directos y exclusivos.',
                label: 'Acuerdos navieros',
                icon: 'value',
              },
              {
                num: '03',
                title: 'Seguridad Total',
                desc: 'Alcanzar una tasa de cero incidentes implementando rigurosas inspecciones de estiba y pólizas de seguro de carga incluidas.',
                label: 'Control de riesgo',
                icon: 'shield',
              },
              {
                num: '04',
                title: 'Asesoría Integral',
                desc: 'Brindar acompañamiento personalizado de principio a fin, liberándolo de la complejidad burocrática y aduanera.',
                label: 'Acompañamiento experto',
                icon: 'guide',
              }
            ].map((obj, i) => (
              <article key={i} className="relative flex min-h-[296px] flex-col p-6 overflow-hidden border border-[rgba(140,150,158,0.16)] rounded-[18px] bg-[linear-gradient(155deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012))] transition-[transform,border-color,background,box-shadow] duration-[250ms] ease-[ease] after:absolute after:right-0 after:bottom-0 after:left-0 after:h-[3px] after:bg-[linear-gradient(90deg,var(--color-primary),var(--color-primary-hover))] after:content-[''] after:opacity-70 after:origin-left after:scale-x-[0.28] after:transition-transform after:duration-[250ms] after:ease-[ease] hover:border-[rgba(56,133,192,0.7)] hover:bg-[linear-gradient(155deg,rgba(15,76,129,0.19),rgba(255,255,255,0.02))] hover:shadow-[0_18px_38px_rgba(0,0,0,0.2)] hover:-translate-y-1.5 hover:after:scale-x-100 max-[520px]:min-h-[264px] motion-reduce:transition-none motion-reduce:after:transition-none">
                <div className="flex justify-between items-start mb-[26px]">
                  <span className="grid w-[43px] h-[43px] place-items-center border border-[rgba(27,108,168,0.45)] rounded-[13px] bg-[rgba(15,76,129,0.16)] text-[#8ed0ff] [&>svg]:w-[22px] [&>svg]:h-[22px]" aria-hidden="true">
                    {obj.icon === 'route' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 17c2.5-3 3-7 6-9s5 .5 8-3" /><path d="M16 5h3v3" /><circle cx="5" cy="17" r="1.5" /></svg>}
                    {obj.icon === 'value' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 17 10 11l4 4 6-8" /><path d="M17 7h3v3" /></svg>}
                    {obj.icon === 'shield' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-4.8" /></svg>}
                    {obj.icon === 'guide' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="8" /><path d="m9.5 9.5 5 5M14.5 9.5v5h-5" /></svg>}
                  </span>
                  <span className="text-[rgba(27,108,168,0.27)] font-[family-name:var(--font-space-grotesk)] text-[31px] font-extrabold tracking-[-0.05em] leading-none">{obj.num}</span>
                </div>
                <h4 className="max-w-[185px] m-0 mb-3 text-white font-[family-name:var(--font-space-grotesk)] text-[19px] leading-[1.18]">{obj.title}</h4>
                <p className="m-0 text-text-gray text-[13px] leading-[1.6]">{obj.desc}</p>
                <footer className="flex justify-between items-center mt-auto pt-[18px] text-[#8ed0ff] text-[10px] font-extrabold tracking-[0.07em] uppercase [&>span]:text-[17px] [&>span]:leading-[0.5]">{obj.label}<span aria-hidden="true">→</span></footer>
              </article>
            ))}
          </div>
        </div>

        {/* ================= SECTION 3: WHY CHOOSE US ================= */}
        <div id="porque-elegirnos" className="scroll-mt-[100px] border-t border-[rgba(255,255,255,0.06)] pt-20">
          <div className="grid grid-cols-[1.2fr_1fr] gap-16 items-center max-[991px]:grid-cols-1 max-[991px]:gap-12">
            {/* Left Content Column */}
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-4">
                <span className="text-[13px] font-semibold text-primary uppercase tracking-[0.08em]">
                  Valores Agregados
                </span>
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(28px,3.5vw,46px)] font-extrabold leading-[1.15]">
                  ¿Por qué elegir a <br />
                  <span className="bg-[linear-gradient(90deg,#FFFFFF_0%,#FFFFFF_20%,var(--color-primary)_50%,#FFFFFF_80%,#FFFFFF_100%)] bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-flow">GreyLion Maritime?</span>
                </h2>
              </div>

              <div className="flex flex-col gap-5">
                <p className="text-[16px] leading-[1.6] text-text-gray">
                  Optimizamos su cadena de suministro combinando tecnología avanzada para el seguimiento en tiempo real con tarifas competitivas gracias a nuestros acuerdos navieros directos.
                </p>
                <p className="text-[16px] leading-[1.6] text-text-gray">
                  Garantizamos la máxima seguridad de su carga con pólizas incluidas y gestionamos de forma integral todo el papeleo aduanero bajo normativas internacionales. Con nosotros, obtiene el respaldo de un equipo experto dedicado exclusivamente a brindarle asesoría personalizada de principio a fin.
                </p>
              </div>

              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="no-underline w-fit">
                <button className="bg-primary text-white border-0 rounded-[30px] py-4 px-9 text-[15px] font-bold cursor-pointer transition-all duration-300 ease-[ease] shadow-[0_8px_20px_rgba(15,76,129,0.25)] hover:bg-primary-hover hover:-translate-y-0.5">
                  Recibir Propuesta Personalizada
                </button>
              </a>
            </div>

            {/* Right Pillars List Column */}
            <div className="flex flex-col gap-5">
              {[
                {
                  title: 'Coordinación Portuaria y Aduanas',
                  desc: 'Enlace directo con autoridades aduaneras y portuarias en múltiples países para liberar su carga sin contratiempos.'
                },
                {
                  title: 'Supervisión de Operaciones',
                  desc: 'Control y supervisión física exhaustiva en las maniobras de estiba y desestiba para resguardar su mercancía.'
                },
                {
                  title: 'Gestión de Almacenamiento',
                  desc: 'Espacios de almacenamiento temporal controlados y seguros en depósitos aduaneros estratégicos.'
                },
                {
                  title: 'Control de Calidad y Verificación',
                  desc: 'Verificación física y control cuantitativo previo al despacho final, reduciendo discrepancias en origen.'
                }
              ].map((pillar, idx) => (
                <div
                  key={idx}
                  className="relative flex items-start gap-5 py-6 px-7 overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] transition-all duration-300 ease-[ease] before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:p-[1.5px] before:[background:linear-gradient(135deg,rgba(90,110,216,0.4)_0%,transparent_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[mask-composite:exclude] before:[-webkit-mask-composite:xor] before:pointer-events-none hover:border-[rgba(15,76,129,0.3)] hover:before:[background:linear-gradient(135deg,var(--color-primary)_0%,var(--color-accent)_100%)] hover:translate-x-1.5"
                >
                  <div className="w-9 h-9 rounded-full bg-[rgba(15,76,129,0.1)] text-primary flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[16px] font-bold text-white">{pillar.title}</h3>
                    <p className="text-[13px] leading-[1.5] text-text-gray">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
