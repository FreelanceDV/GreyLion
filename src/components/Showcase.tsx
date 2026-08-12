'use client';

import React, { useState } from 'react';

const MODALITIES = [
  {
    name: 'Contenedor Completo (FCL)',
    tagline: 'Proteja sus grandes operaciones',
    desc: 'Rapidez, exclusividad y total seguridad. Asignamos contenedores sellados de 20 y 40 pies exclusivos para su negocio, garantizando un tránsito directo y minimizando tiempos de entrega.',
    logoText: 'FC',
    accentColor: 'var(--primary)',
    details: [
      { label: 'Equipos', value: 'Contenedores de 20 y 40 pies' },
      { label: 'Exclusividad', value: 'Contenedor sellado único' },
      { label: 'Tránsito', value: 'Directo y prioritario' },
    ],
    badges: ['FCL', 'Seguro de Carga', 'Prioritario'],
  },
  {
    name: 'Carga Consolidada (LCL)',
    tagline: 'Flexibilidad económica para su negocio',
    desc: 'Logística flexible y rentable. Envíe mercancía fraccionada compartiendo contenedor de forma segura, divida gastos y pague únicamente por el espacio que utiliza.',
    logoText: 'LC',
    accentColor: 'var(--accent)',
    details: [
      { label: 'Modalidad de Envío', value: 'Compartido (Grupaje)' },
      { label: 'Optimización de Costos', value: 'Pague solo espacio ocupado' },
      { label: 'Logística', value: 'Consolidación propia' },
    ],
    badges: ['LCL', 'Económico', 'Flexible'],
  },
  {
    name: 'Transporte de Graneles',
    tagline: 'Infraestructura para grandes industrias',
    desc: 'Movilización experta de carga pesada, minerales y productos agrícolas. Gestionamos la logística compleja de materias primas con la precisión técnica y los buques de gran capacidad que su sector exige.',
    logoText: 'TG',
    accentColor: 'var(--primary-hover)',
    details: [
      { label: 'Tipos de Granel', value: 'Minerales, agro, carbón' },
      { label: 'Buques', value: 'Bulk Carriers de alta capacidad' },
      { label: 'Ingeniería', value: 'Logística compleja y precisa' },
    ],
    badges: ['Graneles', 'Industrial', 'Gran Capacidad'],
  },
];

const MARQUEE_ITEMS_1 = [
  { type: 'cargo', text: 'Contenedores Estándar (20\' / 40\')' },
  { type: 'cargo', text: 'Carga Proyecto Especial' },
  { type: 'cargo', text: 'Vehículos Rodantes Ro-Ro' },
];

const MARQUEE_ITEMS_2 = [
  { type: 'cargo', text: 'Productos Alimenticios Refrigerados' },
  { type: 'cargo', text: 'Hidrocarburos y Derivados' },
  { type: 'cargo', text: 'Carga Suelta y Paletizada' },
];

const MARQUEE_ITEMS_3 = [
  { type: 'cargo', text: 'Chatarra y Desechos Metálicos' },
  { type: 'cargo', text: 'Frutas y Hortalizas Frescas' },
  { type: 'cargo', text: 'Aceites y Grasas Alimentarias' },
];

const SERVICES_CATEGORIES = [
  {
    id: 'fletamento',
    title: '1. Fletamento Marítimo (Chartering)',
    subtitle: 'Conectamos sus grandes volúmenes de carga con la flota global adecuada. Encontramos el buque óptimo bajo las mejores condiciones del mercado internacional.',
    items: [
      {
        title: 'Fletamento por Viaje (Voyage Charter)',
        desc: 'Conseguimos el buque ideal para trasladar un lote específico de mercancía en rutas exclusivas.',
      },
      {
        title: 'Fletamento por Tiempo (Time Charter)',
        desc: 'Arrendamiento de naves por periodos determinados para empresas con flujos constantes de importación o exportación.',
      },
      {
        title: 'Carga Proyecto y Sobredimensionada',
        desc: 'Logística y fletamento especializado para maquinaria pesada, estructuras industriales y equipos energéticos.',
      },
    ],
  },
  {
    id: 'logistica',
    title: '2. Logística de Comercio Exterior',
    subtitle: 'Optimizamos su cadena de suministro global, asegurando espacios y reduciendo los tiempos de tránsito de sus mercancías.',
    items: [
      {
        title: 'Reserva de Espacios (Booking de Carga)',
        desc: 'Gestión de contratos de volumen para garantizar cupos prioritarios en las principales líneas navieras.',
      },
      {
        title: 'Consolidación de Carga Industrial',
        desc: 'Coordinación logística para el envío eficiente de lotes de carga suelta (acero, tuberías, sacos) sin requerir un buque completo.',
      },
      {
        title: 'Ingeniería Logística Internacional',
        desc: 'Diseño integral de rutas puerta a puerta y puerto a puerta, sincronizando el transporte terrestre con el marítimo.',
      },
    ],
  },
  {
    id: 'agenciamiento',
    title: '3. Agenciamiento y Operaciones Portuarias',
    subtitle: 'Protegemos sus intereses comerciales y legales en el puerto, garantizando que su carga se manipule con los más altos estándares.',
    items: [
      {
        title: 'Supervisión de Estiba y Desestiba',
        desc: 'Control físico y operativo en el muelle para optimizar los ritmos de carga y descarga del buque.',
      },
      {
        title: 'Inspecciones y Peritajes',
        desc: 'Certificación del estado, peso y calidad de la mercancía antes del embarque y al momento del desembarque.',
      },
      {
        title: 'Gestión de Terminales y Ventanas de Atraque',
        desc: 'Coordinación directa con las autoridades portuarias para agilizar las operaciones y evitar costosas demoras.',
      },
    ],
  },
];

export default function Showcase() {
  const [activeModalityIndex, setActiveModalityIndex] = useState(0);
  const [activeServiceTab, setActiveServiceTab] = useState('fletamento');

  const renderIcon = () => {
    return (
      <span style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      </span>
    );
  };

  const activeServiceCategory = SERVICES_CATEGORIES.find((cat) => cat.id === activeServiceTab) || SERVICES_CATEGORIES[0];

  return (
    <section
      id="operaciones"
      style={{
        backgroundColor: 'var(--background-black)',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '50%',
          zIndex: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 80% 50%, rgba(90, 110, 216, 0.08) 0%, transparent 60%)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Title */}
        <h2
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 'clamp(32px, 4vw, 56px)',
            fontWeight: 800,
            textAlign: 'center',
            marginBottom: '72px',
          }}
        >
          Modalidades de <span style={{ color: 'var(--primary)' }}>Transporte Marítimo</span>
        </h2>

        {/* Core Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '64px',
            alignItems: 'center',
          }}
          className="showcase-grid"
        >
          {/* Left Column: Marquees */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              overflow: 'hidden',
              height: '380px',
              width: '100%',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              background: 'rgba(255, 255, 255, 0.01)',
              padding: '24px 0',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '40px',
                background: 'linear-gradient(to bottom, var(--background-black), transparent)',
                zIndex: 5,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '40px',
                background: 'linear-gradient(to top, var(--background-black), transparent)',
                zIndex: 5,
              }}
            />

            {/* Marquee Row 1 */}
            <div className="marquee-wrapper">
              <div className="marquee-container speed-normal">
                {MARQUEE_ITEMS_1.concat(MARQUEE_ITEMS_1).map((item, idx) => (
                  <div key={idx} className="marquee-item">
                    {renderIcon()}
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-white)' }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Marquee Row 2 */}
            <div className="marquee-wrapper">
              <div className="marquee-container speed-slow reverse">
                {MARQUEE_ITEMS_2.concat(MARQUEE_ITEMS_2).map((item, idx) => (
                  <div key={idx} className="marquee-item">
                    {renderIcon()}
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-white)' }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Marquee Row 3 */}
            <div className="marquee-wrapper">
              <div className="marquee-container speed-normal">
                {MARQUEE_ITEMS_3.concat(MARQUEE_ITEMS_3).map((item, idx) => (
                  <div key={idx} className="marquee-item">
                    {renderIcon()}
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-white)' }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Cards */}
          <div style={{ position: 'relative', width: '100%' }}>
            {/* Top Selector Tabs */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '16px',
                overflowX: 'auto',
                paddingBottom: '8px',
              }}
            >
              {MODALITIES.map((mod, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveModalityIndex(idx)}
                  style={{
                    backgroundColor: activeModalityIndex === idx ? 'rgba(90, 110, 216, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid',
                    borderColor: activeModalityIndex === idx ? 'var(--primary)' : 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '30px',
                    padding: '8px 16px',
                    color: activeModalityIndex === idx ? 'var(--primary)' : 'rgba(255, 255, 255, 0.6)',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {mod.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Active Details Card */}
            <div
              style={{
                background: 'rgba(18, 20, 23, 0.8)',
                border: '1.5px solid rgba(15, 76, 129, 0.25)',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 15px 40px rgba(15, 76, 129, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
              className="glow-card"
            >
              <div
                style={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingBottom: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: MODALITIES[activeModalityIndex].accentColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '14px',
                      color: '#FFF',
                    }}
                  >
                    {MODALITIES[activeModalityIndex].logoText}
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Modalidad de Tránsito
                    </span>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-white)', marginTop: '2px', fontFamily: 'var(--font-space-grotesk)' }}>
                      {MODALITIES[activeModalityIndex].name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Tagline & Description */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary-hover)' }}>
                  {MODALITIES[activeModalityIndex].tagline}
                </h4>
                <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: 'var(--text-gray)' }}>
                  {MODALITIES[activeModalityIndex].desc}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {MODALITIES[activeModalityIndex].details.map((detail, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 14px',
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.04)'
                    }}
                  >
                    <span style={{ fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.5)' }}>{detail.label}</span>
                    <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-white)', textAlign: 'right' }}>
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {MODALITIES[activeModalityIndex].badges.map((b, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      backgroundColor: b === 'Seguro de Carga' ? 'rgba(90, 110, 216, 0.12)' : 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid',
                      borderColor: b === 'Seguro de Carga' ? 'rgba(90, 110, 216, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                      color: b === 'Seguro de Carga' ? 'var(--primary)' : 'var(--text-white)',
                      padding: '4px 10px',
                      borderRadius: '4px',
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Industrial Supply Switcher Section */}
        <div
          id="servicios"
          style={{
            marginTop: '100px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '80px',
            scrollMarginTop: '100px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '20px',
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
              Soluciones Integrales
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 800,
                color: 'var(--text-white)',
              }}
            >
              Nuestros <span style={{ color: 'var(--primary-hover)' }}>Servicios</span>
            </h3>
            
            {/* Category Select Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {SERVICES_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveServiceTab(cat.id)}
                  style={{
                    backgroundColor: activeServiceTab === cat.id ? 'rgba(15, 76, 129, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid',
                    borderColor: activeServiceTab === cat.id ? 'var(--primary)' : 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '30px',
                    padding: '10px 24px',
                    color: activeServiceTab === cat.id ? 'var(--primary-hover)' : 'rgba(255, 255, 255, 0.6)',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {cat.title.split('. ')[1]}
                </button>
              ))}
            </div>

            {/* Category Subtitle */}
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.6,
                color: 'var(--text-gray)',
                maxWidth: '750px',
                marginTop: '8px',
              }}
            >
              {activeServiceCategory.subtitle}
            </p>
          </div>

          {/* Supply items grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px',
            }}
          >
            {activeServiceCategory.items.map((benefit, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.01)',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  borderRadius: '16px',
                  padding: '32px',
                  transition: 'all 0.3s ease',
                }}
                className="glow-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.01)';
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(15, 76, 129, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary-hover)',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-space-grotesk)',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'var(--text-white)',
                  }}
                >
                  {benefit.title}
                </h3>
                <p
                  style={{
                    fontSize: '13.5px',
                    lineHeight: 1.6,
                    color: 'rgba(255, 255, 255, 0.65)',
                  }}
                >
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-wrapper {
          width: 100%;
          overflow: hidden;
          padding: 4px 0;
        }
        .marquee-container {
          display: flex;
          gap: 16px;
          white-space: nowrap;
          width: max-content;
        }
        .speed-normal {
          animation: marquee 25s linear infinite;
        }
        .speed-slow {
          animation: marquee 35s linear infinite;
        }
        .reverse {
          animation: marquee-reverse 30s linear infinite;
        }
        .marquee-item {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          padding: 8px 16px;
          user-select: none;
        }
        @media (max-width: 991px) {
          .showcase-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
