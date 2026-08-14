'use client';

import React from 'react';
import DynamicMedia from './DynamicMedia';

export default function Hero() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573000000000';
  const whatsappUrl = `https://wa.me/${phone}?text=Hola%20GreyLion,%20quiero%20cotizar%20el%20envio%20de%20`;

  return (
    <div
      id="inicio"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        backgroundColor: '#070b12',
      }}
    >
      {/* Background Image Container */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '55%',
          zIndex: 0,
          opacity: 0.95,
          overflow: 'hidden',
        }}
      >
        <DynamicMedia assetId="hero_ship" fallbackSrc="/hero_ship_oceanis.jpg" />
        {/* Soft Radial and Linear Gradients to blend image to background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'linear-gradient(to right, #070b12 0%, rgba(7, 11, 18, 0.8) 25%, rgba(7, 11, 18, 0.2) 70%, transparent 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'linear-gradient(to top, #070b12 0%, transparent 20%, transparent 80%, rgba(7, 11, 18, 0.4) 100%)',
          }}
        />
      </div>

      {/* Decorative Radial Glows */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '50%',
          height: '60%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(27, 108, 168, 0.15) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Hero Main Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          paddingTop: '120px',
          paddingBottom: '40px',
        }}
      >
        <div
          style={{
            maxWidth: '650px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            alignItems: 'flex-start',
            textAlign: 'left',
          }}
        >
          {/* Badge / Kicker with thin horizontal line */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              width: '100%',
            }}
          >
            <span
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--text-muted)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              Conectamos el mundo
            </span>
            <div
              style={{
                height: '1px',
                flexGrow: 1,
                maxWidth: '120px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            />
          </div>

          {/* Large Stacked Title */}
          <h1
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(44px, 6.5vw, 84px)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <span>NAVEGAMOS</span>
            <span style={{ color: '#00a3ff' }}>CARGAMOS</span>
            <span>ENTREGAMOS</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              color: 'var(--text-gray)',
              maxWidth: '520px',
              lineHeight: 1.6,
            }}
          >
            Soluciones logísticas marítimas confiables, eficientes y sostenibles para un mundo en movimiento.
          </p>

          {/* Action Button */}
          <div style={{ marginTop: '12px' }}>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button
                className="discover-btn"
                style={{
                  backgroundColor: '#0070f3',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '16px 32px',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 24px rgba(0, 112, 243, 0.35)',
                }}
              >
                <span>→</span>
                <span>DESCUBRIR MÁS</span>
              </button>
            </a>
          </div>
        </div>

        {/* Section indicator "01" on the right side */}
        <div
          className="side-indicator"
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            color: 'rgba(255,255,255,0.4)',
            fontSize: '14px',
            fontWeight: 700,
            pointerEvents: 'none',
          }}
        >
          <span style={{ color: '#00a3ff' }}>01</span>
          <div style={{ width: '1px', height: '60px', backgroundColor: 'rgba(255,255,255,0.15)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: '-2px', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#00a3ff' }} />
            <div style={{ position: 'absolute', top: '20px', left: '-2px', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.3)' }} />
            <div style={{ position: 'absolute', top: '40px', left: '-2px', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.3)' }} />
            <div style={{ position: 'absolute', top: '60px', left: '-2px', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.3)' }} />
          </div>
        </div>
      </div>

      {/* Stats Bar Container (Glassmorphism) & Divider */}
      <div style={{ position: 'relative', width: '100%', zIndex: 10 }}>
        {/* Stats Glass Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(7, 11, 18, 0.65)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            width: '100%',
            padding: '24px 0 54px 0',
          }}
        >
          <div
            className="container stats-bar"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            {/* Stat 1 */}
            <div className="stat-item">
              <span className="stat-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </span>
              <div className="stat-text">
                <span className="stat-number">120+</span>
                <span className="stat-label">Rutas Globales</span>
              </div>
            </div>

            <div className="stat-divider" />

            {/* Stat 2 */}
            <div className="stat-item">
              <span className="stat-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 21h20M19.3 14.8C21.1 13.5 22 11.7 22 9.5c0-3.3-2.7-6-6-6-2.1 0-3.9 1.1-5 2.8C9.9 4.6 8.1 3.5 6 3.5c-3.3 0-6 2.7-6 6 0 2.2.9 4 2.7 5.3" />
                  <path d="M4.5 10.5h15M6 10.5v6.5M18 10.5v6.5M12 10.5v10.5" />
                </svg>
              </span>
              <div className="stat-text">
                <span className="stat-number">80+</span>
                <span className="stat-label">Buques en Flota</span>
              </div>
            </div>

            <div className="stat-divider" />

            {/* Stat 3 */}
            <div className="stat-item">
              <span className="stat-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                  <line x1="12" y1="3" x2="12" y2="17" />
                </svg>
              </span>
              <div className="stat-text">
                <span className="stat-number">2M+</span>
                <span className="stat-label">TEUs Transportados</span>
              </div>
            </div>

            <div className="stat-divider" />

            {/* Stat 4 */}
            <div className="stat-item">
              <span className="stat-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>
              <div className="stat-text">
                <span className="stat-number">500+</span>
                <span className="stat-label">Clientes Satisfechos</span>
              </div>
            </div>

            <div className="stat-divider" />

            {/* Stat 5 */}
            <div className="stat-item">
              <span className="stat-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.58 2 8a9 9 0 0 1-10 10z" />
                  <path d="M9.8 6.1C9 8 9.5 12 11 13" />
                </svg>
              </span>
              <div className="stat-text">
                <span className="stat-label" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Comprometidos</span>
                <span className="stat-label" style={{ fontSize: '12px', color: '#00a3ff', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>Con el Planeta</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wavy bottom divider using inline SVG */}
        <div style={{ position: 'absolute', bottom: '-4px', left: 0, width: '100%', overflow: 'hidden', lineHeight: 0, zIndex: 12 }}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ position: 'relative', display: 'block', width: 'calc(100% + 1.3px)', height: '40px' }}>
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="#0a0b0d"></path>
          </svg>
        </div>
      </div>

      <style jsx>{`
        .discover-btn:hover {
          background-color: #005ccb !important;
          transform: translateY(-2px);
        }
        .stat-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .stat-icon {
          display: flex;
          align-items: center;
          justifyContent: center;
          color: #00a3ff;
        }
        .stat-text {
          display: flex;
          flex-direction: column;
        }
        .stat-number {
          font-family: var(--font-space-grotesk);
          font-size: 24px;
          font-weight: 800;
          line-height: 1;
          color: #FFFFFF;
        }
        .stat-label {
          font-size: 11px;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 2px;
        }
        .stat-divider {
          width: 1px;
          height: 36px;
          background-color: rgba(255, 255, 255, 0.1);
        }
        @media (max-width: 991px) {
          .stats-bar {
            justify-content: center !important;
            gap: 32px !important;
          }
          .stat-divider {
            display: none;
          }
          .side-indicator {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .container {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
