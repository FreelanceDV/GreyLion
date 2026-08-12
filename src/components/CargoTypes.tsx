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
    <section
      style={{
        backgroundColor: 'var(--background-dark)',
        color: 'var(--text-white)',
        padding: '100px 0',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '20px',
            marginBottom: '64px',
          }}
        >
          <span
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Qué Transportamos
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(32px, 4vw, 54px)',
              fontWeight: 800,
              lineHeight: 1.15,
              maxWidth: '800px',
            }}
          >
            Tipos de Carga <span style={{ color: 'var(--accent)' }}>Especializada</span>
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: 'var(--text-gray)',
              maxWidth: '640px',
              lineHeight: 1.6,
            }}
          >
            Gestionamos y coordinamos el fletamento marítimo adaptándonos a las especificaciones técnicas e industriales de cada tipo de mercancía.
          </p>
        </div>

        {/* Cargo Types Grid */}
        <div className="cargo-grid">
          {CARGO_TYPES.map((cargo, idx) => (
            <article
              key={idx}
              className="cargo-card"
            >
              <div className="cargo-card-top"><span className="cargo-icon">{cargo.icon}</span><span className="cargo-number">{String(idx + 1).padStart(2, '0')}</span></div>
              <p className="cargo-code">{cargo.code}</p>
              <h3>{cargo.title}</h3>
              <p className="cargo-description">{cargo.desc}</p>
              <footer><span>Gestión especializada</span><span aria-hidden="true">↗</span></footer>
            </article>
          ))}
        </div>
      </div>
      <style jsx>{`
        .cargo-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
        .cargo-card { position: relative; display: flex; min-height: 286px; flex-direction: column; overflow: hidden; padding: 27px; border: 1px solid rgba(80,111,145,.32); border-radius: 18px; background: linear-gradient(145deg, #131b25, #10161e); box-shadow: inset 0 1px 0 rgba(255,255,255,.025); transition: border-color .25s ease, transform .25s ease, box-shadow .25s ease; }
        .cargo-card::before { position: absolute; top: 0; right: 0; bottom: 0; width: 4px; background: linear-gradient(180deg, var(--primary-hover), transparent 72%); content: ''; opacity: .8; }
        .cargo-card:hover { border-color: rgba(91,162,214,.82); box-shadow: 0 18px 36px rgba(0,0,0,.22); transform: translateY(-5px); }
        .cargo-card-top { display: flex; justify-content: space-between; align-items: start; }
        .cargo-icon { display: grid; width: 48px; height: 48px; place-items: center; border: 1px solid rgba(27,108,168,.45); border-radius: 14px; background: rgba(15,76,129,.16); color: #a7bed0; }
        .cargo-icon :global(svg) { width: 24px; height: 24px; }
        .cargo-number { color: rgba(142,208,255,.2); font-family: var(--font-space-grotesk); font-size: 29px; font-weight: 800; line-height: 1; }
        .cargo-code { margin: 20px 0 8px; color: #8ed0ff; font-size: 10px; font-weight: 800; letter-spacing: .13em; }
        .cargo-card h3 { margin: 0 0 10px; color: #fff; font-family: var(--font-space-grotesk); font-size: 19px; line-height: 1.2; }
        .cargo-description { margin: 0; color: var(--text-gray); font-size: 13px; line-height: 1.6; }
        .cargo-card footer { display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 18px; border-top: 1px solid rgba(140,150,158,.12); color: #8aa3b8; font-size: 10px; font-weight: 800; letter-spacing: .09em; text-transform: uppercase; }
        .cargo-card footer span:last-child { color: #8ed0ff; font-size: 17px; }
        @media (max-width: 900px) { .cargo-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 560px) { .cargo-grid { grid-template-columns: 1fr; } .cargo-card { min-height: 260px; } }
        @media (prefers-reduced-motion: reduce) { .cargo-card { transition: none; } }
      `}</style>
    </section>
  );
}
