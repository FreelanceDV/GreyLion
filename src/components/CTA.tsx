'use client';

import React from 'react';

export default function CTA() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573000000000';
  const whatsappUrl = `https://wa.me/${phone}?text=Hola%20GreyLion,%20quiero%20cotizar%20el%20envio%20de%20`;

  return (
    <section
      style={{
        backgroundColor: '#FFFFFF',
        padding: '0 0 120px 0',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Glowing banner container */}
        <div
          style={{
            backgroundColor: 'var(--primary)',
            borderRadius: '40px',
            padding: '80px clamp(40px, 8vw, 120px)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 30px 60px rgba(15, 76, 129, 0.25)',
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
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.25,
              }}
            >
              <source src="/charger_boat.mp4" type="video/mp4" />
            </video>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, var(--primary) 0%, rgba(15, 76, 129, 0.75) 50%, rgba(10, 11, 13, 0.95) 100%)',
              }}
            />
          </div>

          {/* Subtle grid pattern background overlay in CSS */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.08,
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {/* Content Wrapper */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              maxWidth: '900px',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(28px, 4.5vw, 50px)',
                fontWeight: 800,
                color: 'var(--text-white)',
                lineHeight: 1.15,
                letterSpacing: '-1.5px',
              }}
            >
              Comience a Exportar e Importar con <br />
              GreyLion Maritime, su socio de confianza.
            </h2>
            <p
              style={{
                fontSize: 'clamp(16px, 1.8vw, 22px)',
                lineHeight: 1.5,
                color: 'rgba(255, 255, 255, 0.8)',
                maxWidth: '720px',
              }}
            >
              En GreyLion Maritime transformamos los desafíos del comercio internacional y la infraestructura en oportunidades de crecimiento para su empresa.
            </p>

            {/* Action buttons */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                marginTop: '16px',
                flexWrap: 'wrap',
              }}
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <button
                  style={{
                    backgroundColor: 'var(--background-dark)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '30px',
                    padding: '16px 36px',
                    fontSize: '16px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 24px rgba(6, 11, 19, 0.15)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.backgroundColor = '#15223a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.backgroundColor = 'var(--background-dark)';
                  }}
                >
                  Cotizar Envío
                </button>
              </a>

              <button
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--text-white)',
                  border: '1.5px solid var(--text-white)',
                  borderRadius: '30px',
                  padding: '15px 36px',
                  fontSize: '16px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Ver Catálogo de Maquinaria
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
