'use client';

import React, { useState } from 'react';

const CATEGORIES = [
  {
    id: 'excavacion',
    title: 'Excavación y Movimiento de Tierras',
    items: [
      { name: 'Excavadoras de cadenas', desc: 'Máxima potencia para movimiento de volumen masivo en terrenos difíciles.' },
      { name: 'Excavadoras de ruedas', desc: 'Versatilidad y movilidad para proyectos urbanos e infraestructura.' },
      { name: 'Excavadoras eléctricas', desc: 'Cero emisiones y bajo ruido para proyectos en espacios confinados.' },
      { name: 'Palas de cadena', desc: 'Excelente empuje y tracción para excavación pesada y canteras.' },
      { name: 'Palas de ruedas', desc: 'Carga rápida y transporte eficiente de agregados en plantas y obras.' },
      { name: 'Retropalas', desc: 'Equipos compactos multifunción para excavación y zanjeo rápido.' },
      { name: 'Dragalinas', desc: 'Excavación a gran escala de largo alcance para minería a cielo abierto.' },
    ],
  },
  {
    id: 'compactacion',
    title: 'Compactación y Nivelación',
    items: [
      { name: 'Compactadoras de rodillo', desc: 'Compactación eficiente de suelos y mezclas asfálticas.' },
      { name: 'Motoniveladoras', desc: 'Nivelación de precisión para bases de carreteras y taludes.' },
      { name: 'Perfiladoras', desc: 'Fresado y perfilado de pavimentos para mantenimiento vial.' },
      { name: 'Extendedoras de asfalto', desc: 'Colocación homogénea y compacta de capas de rodadura.' },
    ],
  },
  {
    id: 'carga',
    title: 'Carga y Manipulación',
    items: [
      { name: 'Cargadores forestales', desc: 'Manipulación rápida de troncos con pinzas especializadas.' },
      { name: 'Cargadoras compactas', desc: 'Agilidad en espacios reducidos con gran variedad de implementos.' },
      { name: 'Manipuladoras telescópicas', desc: 'Alcance vertical y capacidad de carga excepcional para elevación.' },
    ],
  },
  {
    id: 'transporte',
    title: 'Transporte de Obra',
    items: [
      { name: 'Dumpers articulados', desc: 'Transporte todoterreno en condiciones de suelo extremadamente blandas.' },
      { name: 'Dumpers rígidos', desc: 'Gran capacidad de carga y alta velocidad en minas y canteras.' },
      { name: 'Mototraillas', desc: 'Carga, transporte y esparcido de tierras de forma autónoma.' },
      { name: 'Tractores de ruedas', desc: 'Arrastre pesado de implementos y tolvas de transporte en obra.' },
    ],
  },
  {
    id: 'especializada',
    title: 'Maquinaria Especializada',
    items: [
      { name: 'Perforadoras', desc: 'Perforación de cimentaciones, pozos y voladuras de roca.' },
      { name: 'Taladoras apiladoras', desc: 'Corte y apilado rápido de árboles para silvicultura.' },
      { name: 'Tiendetubos', desc: 'Tendido y colocación de tuberías de gran diámetro en zanjas.' },
      { name: 'Recicladoras de asfalto', desc: 'Rehabilitación sostenible de pavimentos in situ.' },
      { name: 'Plantas picapiedra', desc: 'Trituración y clasificación móvil de agregados y roca.' },
    ],
  },
];

export default function MachineryCatalog() {
  const [activeTab, setActiveTab] = useState('excavacion');
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573000000000';

  const activeCategory = CATEGORIES.find((cat) => cat.id === activeTab) || CATEGORIES[0];

  return (
    <section
      id="maquinaria"
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
            marginBottom: '56px',
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
            Suministro Industrial
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(32px, 4vw, 54px)',
              fontWeight: 800,
              lineHeight: 1.15,
              maxWidth: '850px',
            }}
          >
            Soluciones y Equipos <span style={{ color: 'var(--accent)' }}>Especializados</span>
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: 'var(--text-gray)',
              maxWidth: '700px',
              lineHeight: 1.6,
            }}
          >
            Explora nuestro catálogo de maquinaria pesada para excavación, compactación, carga, transporte y obras de infraestructura especializadas.
          </p>
        </div>

        {/* Categories Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
            marginBottom: '48px',
            overflowX: 'auto',
            paddingBottom: '12px',
            width: '100%',
          }}
          className="tabs-scroll"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              style={{
                backgroundColor: activeTab === cat.id ? 'rgba(15, 76, 129, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                border: '1px solid',
                borderColor: activeTab === cat.id ? 'var(--primary)' : 'rgba(255, 255, 255, 0.08)',
                borderRadius: '30px',
                padding: '10px 24px',
                color: activeTab === cat.id ? 'var(--primary-hover)' : 'rgba(255, 255, 255, 0.65)',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease',
              }}
            >
              {cat.title.split(' y ')[0]}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="equipment-grid">
          {activeCategory.items.map((item, idx) => (
            <article key={idx} className="equipment-card">
              <div className="equipment-meta"><span>Equipo {String(idx + 1).padStart(2, '0')}</span><span>{activeCategory.id}</span></div>
              <div className="equipment-copy"><h3>{item.name}</h3><p>{item.desc}</p></div>

              <a
                href={`https://wa.me/${phone}?text=Hola%20GreyLion,%20quiero%20cotizar%20el%20envio%20de%20${encodeURIComponent(item.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="equipment-link"
              >
                Cotizar Equipo
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
      <style jsx>{`
        .equipment-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
        .equipment-card { position: relative; display: flex; min-height: 200px; flex-direction: column; overflow: hidden; padding: 24px; border: 1px solid rgba(140,150,158,.15); border-radius: 18px; background: linear-gradient(145deg, rgba(255,255,255,.04), rgba(255,255,255,.012)); transition: border-color .25s ease, box-shadow .25s ease, transform .25s ease; }
        .equipment-card::before { position: absolute; top: 0; right: 0; left: 0; height: 3px; background: linear-gradient(90deg, var(--primary), transparent 70%); content: ''; opacity: .9; }
        .equipment-card:hover { border-color: rgba(65,137,192,.7); box-shadow: 0 18px 42px rgba(0,0,0,.24); transform: translateY(-5px); }
        .equipment-meta { display: flex; justify-content: space-between; color: #8ed0ff; font-size: 10px; font-weight: 800; letter-spacing: .11em; text-transform: uppercase; }
        .equipment-meta span:last-child { color: rgba(140,150,158,.6); }
        .equipment-copy { margin-top: 25px; }
        .equipment-copy h3 { margin: 0 0 9px; color: var(--text-white); font-family: var(--font-space-grotesk); font-size: 19px; line-height: 1.2; }
        .equipment-copy p { margin: 0; color: var(--text-gray); font-size: 13px; line-height: 1.58; }
        .equipment-link { display: inline-flex; gap: 7px; align-items: center; width: fit-content; margin-top: auto; padding-top: 19px; color: #8ed0ff; font-size: 12px; font-weight: 800; text-decoration: none; transition: color .2s ease, gap .2s ease; }
        .equipment-link:hover { gap: 11px; color: #fff; }
        @media (max-width: 900px) { .equipment-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 560px) { .equipment-grid { grid-template-columns: 1fr; } .equipment-card { min-height: 245px; } }
        @media (prefers-reduced-motion: reduce) { .equipment-card, .equipment-link { transition: none; } }
      `}</style>
    </section>
  );
}
