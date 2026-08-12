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
    <section
      style={{
        backgroundColor: '#FAFAFA',
        color: 'var(--background-dark)',
        padding: '100px 0',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Main Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '400px 1fr',
            gap: '80px',
            alignItems: 'start',
          }}
          className="process-grid"
        >
          {/* Left Column (Sticky) */}
          <div
            style={{
              position: 'sticky',
              top: '120px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
            className="process-sidebar"
          >
            <h2
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(36px, 4vw, 54px)',
                fontWeight: 800,
                lineHeight: 1.1,
                color: 'var(--background-dark)',
                letterSpacing: '-1.5px',
              }}
            >
              Gestión Integral <br />
              de Operaciones <span style={{ color: 'var(--primary-dark)' }}>Portuarias</span>
            </h2>
            <p
              style={{
                fontSize: '16px',
                lineHeight: 1.6,
                color: '#667085',
                maxWidth: '380px',
              }}
            >
              Nuestro equipo gestiona todas las operaciones logísticas y documentales necesarias en puerto para el tránsito fluido de su mercancía.
            </p>

            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  backgroundColor: 'var(--primary-dark)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '30px',
                  padding: '16px 36px',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  width: 'fit-content',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 8px 24px rgba(90, 110, 216, 0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(90, 110, 216, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(90, 110, 216, 0.2)';
                }}
              >
                Cotizar Envío
              </button>
            </a>
          </div>

          {/* Right Column */}
          <div
            style={{
              position: 'relative',
              paddingLeft: '32px',
            }}
          >
            {/* Timeline Vertical bar */}
            <div
              style={{
                position: 'absolute',
                left: '6px',
                top: '12px',
                bottom: '12px',
                width: '2px',
                backgroundColor: '#E7E7E7',
                zIndex: 0,
              }}
            />

            {/* Steps loop */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              {STEPS.map((step, idx) => (
                <div
                  key={idx}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                  className="step-item"
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: '-32px',
                      top: '8px',
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary-dark)',
                      border: '4px solid #FAFAFA',
                      zIndex: 10,
                      boxShadow: '0 0 0 1px var(--primary-dark)',
                    }}
                  />

                  <span
                    style={{
                      fontFamily: 'var(--font-space-grotesk)',
                      fontSize: '18px',
                      fontWeight: 700,
                      color: 'var(--primary-dark)',
                    }}
                  >
                    {step.num}
                  </span>

                  <h3
                    style={{
                      fontFamily: 'var(--font-space-grotesk)',
                      fontSize: '24px',
                      fontWeight: 700,
                      color: 'var(--background-dark)',
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '15px',
                      lineHeight: 1.6,
                      color: '#475467',
                      maxWidth: '560px',
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 991px) {
          .process-grid {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
          }
          .process-sidebar {
            position: relative !important;
            top: 0 !important;
            align-items: center !important;
            text-align: center !important;
          }
          .process-sidebar p {
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
