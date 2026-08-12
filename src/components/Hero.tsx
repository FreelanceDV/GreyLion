'use client';

import React from 'react';

export default function Hero() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573000000000';
  const whatsappUrl = `https://wa.me/${phone}?text=Hola%20GreyLion,%20quiero%20cotizar%20el%20envio%20de%20`;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '80px',
        overflow: 'hidden',
        backgroundColor: 'var(--background-dark)',
      }}
    >
      {/* Background Video */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
          backgroundColor: '#00282A',
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
            opacity: 0.35,
          }}
        >
          <source src="https://assets.easesourcing.com/custom/video/banner2.mp4" type="video/mp4" />
        </video>
        {/* Sleek Gradient Overlay for Readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(0deg, rgba(18, 20, 23, 1) 0%, rgba(18, 20, 23, 0.4) 60%, rgba(18, 20, 23, 0.8) 100%)',
          }}
        />
      </div>

      {/* Decorative Radial Glows */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '20%',
          width: '60%',
          height: '50%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(90, 110, 216, 0.12) 0%, transparent 70%)',
          filter: 'blur(120px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '28px',
          paddingBottom: '40px',
        }}
      >
        {/* Badge */}
        <div
          style={{
            backgroundColor: 'rgba(90, 110, 216, 0.08)',
            border: '1px solid rgba(90, 110, 216, 0.2)',
            borderRadius: '30px',
            padding: '6px 16px',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--primary)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            animation: 'float 4s ease-in-out infinite',
          }}
        >
          Operador Logístico Global
        </div>

        {/* Headline */}
        <h1
          id="inicio"
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 'clamp(36px, 6vw, 76px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: 'var(--text-white)',
            maxWidth: '960px',
            margin: '0 auto',
          }}
        >
          Conectamos sus <br />
          <span className="text-gradient">operaciones con el mundo</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(15px, 1.8vw, 18px)',
            color: 'var(--text-gray)',
            maxWidth: '740px',
            lineHeight: 1.6,
            margin: '0 auto',
          }}
        >
          En GreyLion Maritime hacemos que el comercio internacional sea simple y eficiente. Combinamos décadas de experiencia en el sector marítimo con soluciones logísticas integrales que se adaptan exactamente a lo que su empresa necesita para crecer.
        </p>

        {/* CTA prompt text */}
        <p
          style={{
            fontSize: '15px',
            color: 'var(--accent)',
            maxWidth: '600px',
            lineHeight: 1.5,
            marginTop: '8px',
            fontWeight: 500,
          }}
        >
          ¿Listo para optimizar sus importaciones y exportaciones? Contacte a nuestro equipo comercial y reciba una propuesta personalizada para su necesidad.
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginTop: '4px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
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
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 20px rgba(90, 110, 216, 0.25)',
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
              Cotizar Envío
            </button>
          </a>

          <button
            style={{
              backgroundColor: 'transparent',
              color: 'var(--text-white)',
              border: '1.5px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '30px',
              padding: '15px 36px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Ver Operaciones
          </button>
        </div>
      </div>
    </div>
  );
}
