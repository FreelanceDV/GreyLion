'use client';

import React from 'react';
import DynamicMedia from './DynamicMedia';

export default function AboutCompany() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573000000000';
  const whatsappUrl = `https://wa.me/${phone}?text=Hola%20GreyLion,%20quiero%20cotizar%20el%20envio%20de%20`;

  return (
    <section
      style={{
        backgroundColor: 'var(--background-dark)',
        color: 'var(--text-white)',
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 0',
      }}
    >
      {/* Background Video */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        <DynamicMedia assetId="background_video" fallbackSrc="/charger_boat.mp4" style={{ opacity: 0.12 }} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, var(--background-dark) 0%, rgba(18, 20, 23, 0.85) 50%, var(--background-dark) 100%)',
          }}
        />
      </div>

      {/* Decorative Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '50%',
          height: '40%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(15, 76, 129, 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div className="w-full max-w-[1280px] mx-auto px-5" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* ================= SECTION 1: MISSION / VISION ================= */}
        <div id="mision-vision" style={{ scrollMarginTop: '100px', marginBottom: '100px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '16px',
              marginBottom: '48px',
            }}
          >
            <span
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--accent)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Nuestra Identidad
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(28px, 3.5vw, 48px)',
                fontWeight: 800,
                lineHeight: 1.2,
              }}
            >
              Misión <span style={{ color: 'var(--primary)' }}>& Visión</span>
            </h2>
            <p
              style={{
                fontSize: '15px',
                color: 'var(--text-gray)',
                maxWidth: '600px',
                lineHeight: 1.5,
              }}
            >
              Los pilares fundamentales que guían nuestras operaciones diarias y definen nuestro rumbo estratégico en el comercio internacional.
            </p>
          </div>

          <div className="mission-vision-grid">
            <article className="mv-card">
              <span className="mv-monogram" aria-hidden="true">M</span>
              <div className="mv-heading">
                <span className="mv-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" />
                  </svg>
                </span>
                <div><p className="mv-kicker">01 / PROPÓSITO</p><h3>Nuestra Misión</h3></div>
              </div>
              <blockquote>“Simplificamos el comercio internacional para que su carga avance con seguridad, puntualidad y eficiencia.”</blockquote>
              <ul>
                <li>Procesos logísticos y aduaneros simplificados</li>
                <li>Coordinación portuaria de principio a fin</li>
                <li>Soluciones ajustadas a cada operación</li>
              </ul>
            </article>

            <article className="mv-card">
              <span className="mv-monogram" aria-hidden="true">V</span>
              <div className="mv-heading">
                <span className="mv-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3.7-6 10-6 10 6 10 6-3.7 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="2.5" />
                  </svg>
                </span>
                <div><p className="mv-kicker">02 / RUMBO 2030</p><h3>Nuestra Visión</h3></div>
              </div>
              <blockquote>“Conectamos empresas y mercados con operaciones marítimas más inteligentes, visibles y confiables.”</blockquote>
              <ul>
                <li>Tecnología avanzada para rastreo de carga</li>
                <li>Red global de puertos y aliados estratégicos</li>
                <li>Respaldo experto para crecer con confianza</li>
              </ul>
            </article>
          </div>
        </div>

        {/* ================= SECTION 2: OBJECTIVES ================= */}
        <div id="objetivos" style={{ scrollMarginTop: '100px', marginBottom: '100px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '80px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '16px',
              marginBottom: '48px',
            }}
          >
            <span
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--accent)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Metas y Propósitos
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(28px, 3.5vw, 48px)',
                fontWeight: 800,
                lineHeight: 1.2,
              }}
            >
              Objetivos de la <span style={{ color: 'var(--primary)' }}>empresa</span>
            </h2>
            <p
              style={{
                fontSize: '15px',
                color: 'var(--text-gray)',
                maxWidth: '600px',
                lineHeight: 1.5,
              }}
            >
              Nuestra estrategia empresarial está orientada a cumplir metas claras y medibles que aseguren el éxito comercial de nuestros aliados.
            </p>
          </div>

          <div className="objectives-grid">
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
              <article key={i} className="objective-card">
                <div className="objective-top"><span className="objective-icon" aria-hidden="true">
                  {obj.icon === 'route' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 17c2.5-3 3-7 6-9s5 .5 8-3" /><path d="M16 5h3v3" /><circle cx="5" cy="17" r="1.5" /></svg>}
                  {obj.icon === 'value' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 17 10 11l4 4 6-8" /><path d="M17 7h3v3" /></svg>}
                  {obj.icon === 'shield' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-4.8" /></svg>}
                  {obj.icon === 'guide' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="8" /><path d="m9.5 9.5 5 5M14.5 9.5v5h-5" /></svg>}
                </span><span className="objective-number">{obj.num}</span></div>
                <h4>{obj.title}</h4>
                <p>{obj.desc}</p>
                <footer>{obj.label}<span aria-hidden="true">→</span></footer>
              </article>
            ))}
          </div>
        </div>

        {/* ================= SECTION 3: WHY CHOOSE US ================= */}
        <div id="porque-elegirnos" style={{ scrollMarginTop: '100px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '80px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: '64px',
              alignItems: 'center',
            }}
            className="choose-grid"
          >
            {/* Left Content Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  Valores Agregados
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-space-grotesk)',
                    fontSize: 'clamp(28px, 3.5vw, 46px)',
                    fontWeight: 800,
                    lineHeight: 1.15,
                  }}
                >
                  ¿Por qué elegir a <br />
                  <span className="bg-[linear-gradient(90deg,#FFFFFF_0%,#FFFFFF_20%,var(--color-primary)_50%,#FFFFFF_80%,#FFFFFF_100%)] bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-flow">GreyLion Maritime?</span>
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <p
                  style={{
                    fontSize: '16px',
                    lineHeight: 1.6,
                    color: 'var(--text-gray)',
                  }}
                >
                  Optimizamos su cadena de suministro combinando tecnología avanzada para el seguimiento en tiempo real con tarifas competitivas gracias a nuestros acuerdos navieros directos.
                </p>
                <p
                  style={{
                    fontSize: '16px',
                    lineHeight: 1.6,
                    color: 'var(--text-gray)',
                  }}
                >
                  Garantizamos la máxima seguridad de su carga con pólizas incluidas y gestionamos de forma integral todo el papeleo aduanero bajo normativas internacionales. Con nosotros, obtiene el respaldo de un equipo experto dedicado exclusivamente a brindarle asesoría personalizada de principio a fin.
                </p>
              </div>

              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', width: 'fit-content' }}>
                <button
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--text-white)',
                    border: 'none',
                    borderRadius: '30px',
                    padding: '16px 36px',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 20px rgba(15, 76, 129, 0.25)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--primary)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Recibir Propuesta Personalizada
                </button>
              </a>
            </div>

            {/* Right Pillars List Column */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
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
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px',
                    padding: '24px 28px',
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'flex-start',
                    transition: 'all 0.3s ease',
                  }}
                  className="relative rounded-[14px] overflow-hidden transition-all duration-300 before:content-[''] before:absolute before:inset-0 before:rounded-[14px] before:p-[1.5px] before:[background:linear-gradient(135deg,rgba(90,110,216,0.4)_0%,transparent_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[mask-composite:exclude] before:[-webkit-mask-composite:xor] before:pointer-events-none hover:before:[background:linear-gradient(135deg,var(--color-primary)_0%,var(--color-accent)_100%)]"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(15, 76, 129, 0.3)';
                    e.currentTarget.style.transform = 'translateX(6px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(15, 76, 129, 0.1)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-white)' }}>{pillar.title}</h3>
                    <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--text-gray)' }}>{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        .mission-vision-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px; }
        .mv-card { position: relative; min-height: 308px; overflow: hidden; padding: 36px 32px 30px; border: 1px solid rgba(70, 117, 163, .45); border-radius: 18px; background: linear-gradient(145deg, #101722 0%, #0b1018 100%); box-shadow: 0 18px 42px rgba(0, 0, 0, .18); transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease; }
        .mv-card::before { position: absolute; top: 0; right: 0; left: 0; height: 3px; content: ''; background: linear-gradient(90deg, var(--primary), var(--primary-hover), #8c969e); }
        .mv-card:hover { border-color: rgba(78, 146, 204, .8); box-shadow: 0 24px 54px rgba(4, 25, 43, .46); transform: translateY(-5px); }
        .mv-monogram { position: absolute; right: -2px; bottom: -30px; color: rgba(140, 150, 158, .055); font-family: var(--font-space-grotesk); font-size: 180px; font-weight: 800; line-height: .9; pointer-events: none; }
        .mv-heading { position: relative; display: flex; gap: 15px; align-items: center; }
        .mv-icon { display: grid; width: 64px; height: 64px; flex: 0 0 auto; place-items: center; border: 1px solid rgba(27, 108, 168, .55); border-radius: 17px; background: rgba(15, 76, 129, .2); color: #8ed0ff; }
        .mv-icon svg { width: 29px; height: 29px; }
        .mv-kicker { margin: 0 0 4px; color: #8ed0ff; font-size: 11px; font-weight: 800; letter-spacing: .12em; }
        .mv-heading h3 { margin: 0; color: var(--text-white); font-family: var(--font-space-grotesk); font-size: 27px; font-weight: 800; line-height: 1.1; }
        .mv-card blockquote { position: relative; margin: 24px 0 21px; padding-left: 16px; border-left: 2px solid var(--primary-hover); color: var(--text-gray); font-size: 14px; font-style: italic; line-height: 1.65; }
        .mv-card ul { position: relative; display: grid; gap: 11px; margin: 0; padding: 0; list-style: none; color: var(--text-gray); font-size: 13px; line-height: 1.35; }
        .mv-card li { display: flex; gap: 10px; align-items: center; }
        .mv-card li::before { display: grid; width: 17px; height: 17px; flex: 0 0 auto; place-items: center; border-radius: 50%; background: var(--primary-hover); color: #fff; content: '✓'; font-size: 11px; font-weight: 900; }
        .objectives-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; }
        .objective-card { position: relative; display: flex; min-height: 296px; flex-direction: column; padding: 24px; overflow: hidden; border: 1px solid rgba(140, 150, 158, .16); border-radius: 18px; background: linear-gradient(155deg, rgba(255,255,255,.045), rgba(255,255,255,.012)); transition: transform .25s ease, border-color .25s ease, background .25s ease, box-shadow .25s ease; }
        .objective-card::after { position: absolute; right: 0; bottom: 0; left: 0; height: 3px; background: linear-gradient(90deg, var(--primary), var(--primary-hover)); content: ''; opacity: .7; transform: scaleX(.28); transform-origin: left; transition: transform .25s ease; }
        .objective-card:hover { border-color: rgba(56, 133, 192, .7); background: linear-gradient(155deg, rgba(15,76,129,.19), rgba(255,255,255,.02)); box-shadow: 0 18px 38px rgba(0,0,0,.2); transform: translateY(-6px); }
        .objective-card:hover::after { transform: scaleX(1); }
        .objective-top { display: flex; justify-content: space-between; align-items: start; margin-bottom: 26px; }
        .objective-icon { display: grid; width: 43px; height: 43px; place-items: center; border: 1px solid rgba(27,108,168,.45); border-radius: 13px; background: rgba(15,76,129,.16); color: #8ed0ff; }
        .objective-icon svg { width: 22px; height: 22px; }
        .objective-number { color: rgba(27,108,168,.27); font-family: var(--font-space-grotesk); font-size: 31px; font-weight: 800; letter-spacing: -.05em; line-height: 1; }
        .objective-card h4 { max-width: 185px; margin: 0 0 12px; color: var(--text-white); font-family: var(--font-space-grotesk); font-size: 19px; line-height: 1.18; }
        .objective-card > p { margin: 0; color: var(--text-gray); font-size: 13px; line-height: 1.6; }
        .objective-card footer { display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 18px; color: #8ed0ff; font-size: 10px; font-weight: 800; letter-spacing: .07em; text-transform: uppercase; }
        .objective-card footer span { font-size: 17px; line-height: .5; }
        @media (max-width: 991px) {
          .mission-vision-grid { grid-template-columns: 1fr; gap: 20px; }
          .objectives-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .choose-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 520px) { .mv-card { min-height: auto; padding: 29px 23px 27px; } .mv-heading h3 { font-size: 23px; } .mv-icon { width: 54px; height: 54px; border-radius: 15px; } .mv-card blockquote { margin-top: 21px; font-size: 13px; } .objectives-grid { grid-template-columns: 1fr; } .objective-card { min-height: 264px; } }
        @media (prefers-reduced-motion: reduce) { .mv-card, .objective-card, .objective-card::after { transition: none; } }
      `}</style>
    </section>
  );
}
