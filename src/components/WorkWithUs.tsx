'use client';

import React from 'react';

const ADVANTAGES = [
  {
    title: 'Eficiencia Operativa',
    desc: 'Optimización de rutas y tiempos de tránsito mediante tecnología avanzada de planificación logística y seguimiento en tiempo real.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
  },
  {
    title: 'Seguridad Garantizada',
    desc: 'Protocolos rigurosos de manipulación, embalaje y estiba de mercancías con seguro de carga incluido en todos los servicios.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    ),
  },
  {
    title: 'Gestión Documental Completa',
    desc: 'Tramitación integral de documentación aduanera, certificados de origen y permisos especiales según normativa internacional.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    ),
  },
  {
    title: 'Tarifas Competitivas',
    desc: 'Acuerdos preferentes con navieras que nos permiten ofrecer las mejores tarifas del mercado sin comprometer la calidad del servicio.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    ),
  },
  {
    title: 'Atención Personalizada',
    desc: 'Equipo experto dedicado a cada cliente con asesoramiento especializado en comercio exterior y logística marítima internacional.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
  },
  {
    title: 'Trazabilidad Total',
    desc: 'Sistema de seguimiento avanzado que permite conocer la ubicación exacta de su mercancía en cualquier momento del trayecto.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
  },
];

export default function WorkWithUs() {
  return (
    <section
      style={{
        backgroundColor: '#FFFFFF',
        color: 'var(--background-dark)',
        padding: '100px 0',
        position: 'relative',
        borderTop: '1px solid #E4E7EC',
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '20px',
            marginBottom: '72px',
          }}
        >
          <span
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--primary-dark)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Ventajas Corporativas
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
            Ventajas de Trabajar con <br />
            <span style={{ color: 'var(--primary-dark)' }}>GreyLion Maritime</span>
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: '#475467',
              maxWidth: '680px',
              lineHeight: 1.6,
            }}
          >
            Ofrecemos excelencia operativa, seguridad y gestión aduanera simplificada para potenciar el crecimiento comercial de tu empresa.
          </p>
        </div>

        {/* Grid Items */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
          }}
        >
          {ADVANTAGES.map((adv, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FAFAFA',
                border: '1px solid #E4E7EC',
                borderRadius: '16px',
                padding: '36px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(90, 110, 216, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = '#FAFAFA';
                e.currentTarget.style.borderColor = '#E4E7EC';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Icon Container */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(90, 110, 216, 0.08)',
                  color: 'var(--primary-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {adv.icon}
              </div>

              {/* Title & Desc */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-space-grotesk)',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: 'var(--background-dark)',
                  }}
                >
                  {adv.title}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.6,
                    color: '#475467',
                  }}
                >
                  {adv.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
