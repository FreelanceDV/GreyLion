'use client';

import React from 'react';

export default function Comparison() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573000000000';
  const whatsappUrl = `https://wa.me/${phone}?text=Hola%20GreyLion,%20quiero%20cotizar%20el%20envio%20de%20`;

  return (
    <section
      style={{
        backgroundColor: 'var(--background-black)',
        color: 'var(--text-white)',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '60%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(90, 110, 216, 0.04) 0%, transparent 80%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header info */}
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
          <h2
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(32px, 5vw, 60px)',
              fontWeight: 800,
              letterSpacing: '-2px',
              maxWidth: '800px',
            }}
          >
            Dos Áreas Clave.{' '}
            <span style={{ color: 'var(--primary)' }}>Una Solución Logística Integral</span>
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: 'var(--text-gray)',
              maxWidth: '700px',
              lineHeight: 1.5,
            }}
          >
            Coordinamos el transporte marítimo global y proveemos maquinaria pesada especializada para los proyectos de infraestructura más exigentes.
          </p>

          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--text-white)',
                border: 'none',
                borderRadius: '30px',
                padding: '16px 36px',
                fontSize: '16px',
                fontWeight: 700,
                cursor: 'pointer',
                marginTop: '12px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                e.currentTarget.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--primary)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Póngase en Contacto
            </button>
          </a>
        </div>

        {/* Two Columns Sourcing Comparison Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
            gap: '32px',
            marginTop: '48px',
          }}
          className="comparison-grid"
        >
          {/* Card 1: Operación Marítima */}
          <div
            style={{
              borderRadius: '16px',
              padding: '40px',
              background: 'radial-gradient(circle at 0% 0%, rgba(90, 110, 216, 0.15) 0%, rgba(13, 13, 24, 0.8) 50%), #0D0D18',
              border: '1px solid rgba(90, 110, 216, 0.2)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
              transition: 'transform 0.3s ease',
            }}
            className="hover-card"
          >
            <div>
              <h3 style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'var(--font-space-grotesk)' }}>
                Operación Marítima
              </h3>
              <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.4)', marginTop: '4px' }}>
                Logística y Fletamento Global
              </p>
            </div>

            {/* Best for list */}
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>Ideal para:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'Exportadores e importadores de carga contenerizada o consolidada.',
                  'Proyectos industriales a gran escala que requieren fletamento de buques.',
                  'Empresas que buscan delegar la gestión portuaria y aduanera.',
                  'Tránsito de productos con requerimiento estricto de trazabilidad.',
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.4 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key features grid */}
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>Características Clave:</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="features-subgrid">
                {[
                  {
                    title: 'Fletamento de Buques',
                    desc: 'Coordinación eficiente mediante contratos de fletamento a medida.',
                  },
                  {
                    title: 'Presencia Global',
                    desc: 'Presencia operativa activa en los principales puertos mundiales.',
                  },
                  {
                    title: 'Gestión Documental',
                    desc: 'Despacho aduanero integral, certificados y seguros de carga.',
                  },
                  {
                    title: 'Trazabilidad Avanzada',
                    desc: 'Monitoreo constante del estado y ubicación de tu mercancía.',
                  },
                ].map((feat, idx) => (
                  <div key={idx} style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.04)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <h5 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)' }}>{feat.title}</h5>
                    <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.4)', lineHeight: 1.4 }}>{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Maquinaria Especializada */}
          <div
            style={{
              borderRadius: '16px',
              padding: '40px',
              background: 'radial-gradient(circle at 0% 0%, rgba(140, 150, 158, 0.15) 0%, rgba(13, 13, 24, 0.8) 50%), #0D0D18',
              border: '1px solid rgba(140, 150, 158, 0.2)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
              transition: 'transform 0.3s ease',
            }}
            className="hover-card"
          >
            <div>
              <h3 style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'var(--font-space-grotesk)' }}>
                Maquinaria Especializada
              </h3>
              <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.4)', marginTop: '4px' }}>
                Equipos y Soluciones de Infraestructura
              </p>
            </div>

            {/* Best for list */}
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>Ideal para:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'Constructoras, mineras y empresas agrícolas con proyectos viales.',
                  'Proyectos de compactación, nivelación, excavación y movimiento de tierras.',
                  'Empresas forestales que requieren cargadores y manipuladores.',
                  'Requerimientos técnicos específicos de perforadoras y extendedoras.',
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.4 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key features grid */}
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>Características Clave:</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="features-subgrid">
                {[
                  {
                    title: 'Movimiento de Tierras',
                    desc: 'Excavadoras (eléctricas/ruedas), palas de ruedas y retropalas.',
                  },
                  {
                    title: 'Compactación y Pavimento',
                    desc: 'Compactadoras, motoniveladoras y extendedoras de asfalto.',
                  },
                  {
                    title: 'Carga y Transporte',
                    desc: 'Cargadoras forestales, manipuladoras y dumpers rígidos/articulados.',
                  },
                  {
                    title: 'Equipos de Perforación',
                    desc: 'Perforadoras, taladoras y tiendetubos de marcas líderes.',
                  },
                ].map((feat, idx) => (
                  <div key={idx} style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.04)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <h5 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent)' }}>{feat.title}</h5>
                    <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.4)', lineHeight: 1.4 }}>{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hover-card:hover {
          transform: translateY(-8px);
        }
        @media (max-width: 991px) {
          .comparison-grid {
            grid-template-columns: 1fr !important;
          }
          .features-subgrid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
