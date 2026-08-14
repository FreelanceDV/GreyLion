'use client';

import React, { useState } from 'react';

const SERVICES = [
  {
    id: 'maritimo',
    title: 'TRANSPORTE MARÍTIMO',
    subtitle: 'Logística y Fletamento Global',
    desc: 'Llegamos a cualquier puerto del mundo a través de la mayor red de rutas marítimas comerciales. Coordinamos cada embarque con absoluta precisión técnica.',
    image: '/maritime_transport_card.jpg',
    features: [
      { name: 'Contenedor Completo (FCL)', detail: 'Exclusividad y rapidez para operaciones industriales.' },
      { name: 'Carga Consolidada (LCL)', detail: 'Soluciones económicas compartiendo espacio.' },
      { name: 'Fletamento de Buques (Chartering)', detail: 'Arrendamiento de naves a la medida de grandes volúmenes.' },
      { name: 'Carga Proyecto', detail: 'Ingeniería de transporte para piezas sobredimensionadas.' },
    ]
  },
  {
    id: 'integral',
    title: 'LOGÍSTICA INTEGRAL',
    subtitle: 'Operaciones Puerta a Puerta',
    desc: 'Sincronizamos de principio a fin su cadena de suministro. Nos encargamos de la complejidad operativa y legal para que usted se enfoque en su negocio.',
    image: '/integral_logistics_card.jpg',
    features: [
      { name: 'Agenciamiento de Aduanas', detail: 'Clasificación arancelaria, trámites y despacho rápido.' },
      { name: 'Almacenamiento y Depósitos', detail: 'Espacios estratégicos con control y seguridad total.' },
      { name: 'Supervisión Física (Estiba/Trincado)', detail: 'Control riguroso en puerto para mitigar riesgos.' },
      { name: 'Conexión Terrestre', detail: 'Transporte intermodal coordinado desde puerto hasta destino.' },
    ]
  }
];

export default function Comparison() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573000000000';
  const whatsappUrl = `https://wa.me/${phone}?text=Hola%20GreyLion,%20quiero%20cotizar%20el%20servicio%20de%20`;

  return (
    <section
      id="servicios-medida"
      style={{
        backgroundColor: '#0a0b0d',
        color: 'var(--text-white)',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
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
            opacity: 0.15, // Subtle background video presence
          }}
        >
          <source src="/charger_boat.mp4" type="video/mp4" />
        </video>
        {/* Sleek Dark Gradient Overlay for optimal readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, #0a0b0d 0%, rgba(10, 11, 13, 0.8) 50%, #0a0b0d 100%)',
          }}
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '16px',
            marginBottom: '64px',
          }}
        >
          <span
            style={{
              fontSize: '13px',
              fontWeight: 800,
              color: '#00a3ff',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}
          >
            Nuestros Servicios
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(32px, 5vw, 54px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-1.5px',
            }}
          >
            SOLUCIONES A LA MEDIDA
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: 'var(--text-gray)',
              maxWidth: '680px',
              lineHeight: 1.6,
              marginTop: '4px',
            }}
          >
            Ofrecemos un servicio integral de transporte marítimo diseñado para impulsar tu negocio sin fronteras.
          </p>
        </div>

        {/* Expanding Cards Container */}
        <div className="expanding-cards-wrapper">
          {SERVICES.map((service, index) => {
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;
            
            // Layout classes will handle width transitions
            let cardClass = "service-expand-card";
            if (isHovered) cardClass += " expanded";
            else if (isAnyHovered) cardClass += " collapsed";

            return (
              <div
                key={service.id}
                className={cardClass}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Collapsed State Title Overlay (Vertical text when collapsed) */}
                <div className="collapsed-title-overlay">
                  <h3 className="collapsed-title">{service.title}</h3>
                  <div className="expand-indicator-plus">+</div>
                </div>

                {/* Card Background Image with dark overlay */}
                <div
                  className="card-bg"
                  style={{ backgroundImage: `url(${service.image})` }}
                >
                  <div className="card-bg-overlay" />
                </div>

                {/* Expanded State Content Wrapper */}
                <div className="expanded-content">
                  {/* Left Column: Text Content */}
                  <div className="content-left">
                    <span className="service-kicker">{service.subtitle}</span>
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-desc">{service.desc}</p>

                    <div className="features-list">
                      {service.features.map((feat, fIdx) => (
                        <div key={fIdx} className="feature-item">
                          <div className="feature-check">✓</div>
                          <div>
                            <h4 className="feature-title">{feat.name}</h4>
                            <p className="feature-detail">{feat.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <a
                      href={`${whatsappUrl}${encodeURIComponent(service.title.toLowerCase())}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-button"
                    >
                      Cotizar Servicio ↗
                    </a>
                  </div>

                  {/* Right Column: Visual Showcase */}
                  <div
                    className="content-right"
                    style={{ backgroundImage: `url(${service.image})` }}
                  >
                    <div className="right-overlay" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .expanding-cards-wrapper {
          display: flex;
          gap: 24px;
          width: 100%;
          min-height: 600px;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .service-expand-card {
          position: relative;
          flex: 1;
          border-radius: 20px;
          overflow: hidden;
          background-color: #121417;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: flex 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          cursor: pointer;
        }

        .service-expand-card:hover {
          border-color: rgba(0, 163, 255, 0.3);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        /* Flex states */
        .service-expand-card.expanded {
          flex: 3.5;
          cursor: default;
        }

        .service-expand-card.collapsed {
          flex: 0.8;
        }

        /* Background image container & overlay */
        .card-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          z-index: 1;
          opacity: 0.6;
          transition: opacity 0.5s ease, transform 0.8s ease;
        }

        .service-expand-card.expanded .card-bg {
          opacity: 0;
          pointer-events: none;
          transform: scale(1.05);
        }

        .card-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(7, 11, 18, 0.3) 0%, rgba(7, 11, 18, 0.9) 100%);
        }

        /* Collapsed Title styling (vertical overlay) */
        .collapsed-title-overlay {
          position: absolute;
          inset: 0;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 40px 20px;
          opacity: 1;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }

        .service-expand-card.expanded .collapsed-title-overlay {
          opacity: 0;
        }

        .collapsed-title {
          font-family: var(--font-space-grotesk);
          font-size: 24px;
          font-weight: 800;
          letter-spacing: 2px;
          color: #ffffff;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          white-space: nowrap;
        }

        .expand-indicator-plus {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          display: flex;
          align-items: center;
          justifyContent: center;
          font-size: 20px;
          font-weight: 300;
          transition: all 0.3s ease;
        }

        .service-expand-card:hover .expand-indicator-plus {
          background: #00a3ff;
          border-color: #00a3ff;
          transform: rotate(90deg);
        }

        /* Expanded content container */
        .expanded-content {
          position: relative;
          width: 100%;
          height: 100%;
          z-index: 2;
          display: flex;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .service-expand-card.expanded .expanded-content {
          opacity: 1;
          pointer-events: auto;
          transition: opacity 0.5s ease 0.2s; /* Delayed fade in */
        }

        /* Left column (Text content) */
        .content-left {
          flex: 1.2;
          padding: 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          z-index: 5;
          background-color: #0d1118;
          border-radius: 20px 0 0 20px;
        }

        .service-kicker {
          font-size: 11px;
          font-weight: 800;
          color: #00a3ff;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .service-title {
          font-family: var(--font-space-grotesk);
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 16px;
        }

        .service-desc {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-gray);
          margin-bottom: 28px;
          max-width: 480px;
        }

        .features-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 32px;
        }

        .feature-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .feature-check {
          color: #00a3ff;
          font-weight: bold;
          font-size: 16px;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .feature-title {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 4px;
        }

        .feature-detail {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.4;
        }

        .cta-button {
          background-color: #0070f3;
          color: #ffffff;
          border: none;
          border-radius: 6px;
          padding: 14px 28px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          width: fit-content;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(0, 112, 243, 0.2);
        }

        .cta-button:hover {
          background-color: #005ccb;
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(0, 112, 243, 0.35);
        }

        /* Right column (Visual photo) */
        .content-right {
          flex: 1;
          background-size: cover;
          background-position: center;
          position: relative;
          border-radius: 0 20px 20px 0;
        }

        .right-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #0d1118 0%, rgba(13, 17, 24, 0.5) 20%, transparent 100%);
        }

        /* Responsive styling */
        @media (max-width: 991px) {
          .expanding-cards-wrapper {
            flex-direction: column;
            min-height: auto;
          }

          .service-expand-card {
            flex: none !important;
            width: 100%;
            height: auto;
            min-height: 380px;
          }

          .card-bg {
            opacity: 0.15;
          }

          .collapsed-title-overlay {
            display: none;
          }

          .expanded-content {
            opacity: 1;
            pointer-events: auto;
            flex-direction: column;
          }

          .content-left {
            flex: none;
            padding: 32px 24px;
            border-radius: 20px;
            background-color: rgba(18, 20, 23, 0.85);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }

          .content-right {
            display: none;
          }

          .features-list {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
}
