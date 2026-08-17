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

  // Mousemove handler for card spotlight effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="maquinaria" className="relative bg-background-dark text-text-white py-[100px] border-t border-[rgba(255,255,255,0.05)]">
      <div className="w-full max-w-[1280px] mx-auto px-5">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-5 mb-14">
          <span className="text-[13px] font-semibold text-[#00a3ff] uppercase tracking-[0.05em]">
            Suministro Industrial
          </span>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(32px,4vw,54px)] font-extrabold leading-[1.15] max-w-[850px]">
            Soluciones y Equipos <span className="text-accent">Especializados</span>
          </h2>
          <p className="text-base text-text-gray max-w-[700px] leading-[1.6]">
            Explora nuestro catálogo de maquinaria pesada para excavación, compactación, carga, transporte y obras de infraestructura especializadas.
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex gap-2 justify-center mb-12 overflow-x-auto pb-3 w-full">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`rounded-[30px] px-6 py-2.5 text-sm font-semibold cursor-pointer whitespace-nowrap transition-all duration-300 ease-[ease] border ${
                activeTab === cat.id
                  ? 'bg-[rgba(0,163,255,0.12)] border-[#00a3ff] text-[#00a3ff]'
                  : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.65)]'
              }`}
            >
              {cat.title.split(' y ')[0]}
            </button>
          ))}
        </div>

        {/* Items Grid with Active Tab key to trigger animations */}
        <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1" key={activeTab}>
          {activeCategory.items.map((item, idx) => (
            <article
              key={idx}
              className="group relative flex min-h-[200px] max-[560px]:min-h-[245px] flex-col overflow-hidden p-6 border border-[rgba(255,255,255,0.05)] rounded-[18px] bg-[linear-gradient(145deg,#0f131a,#0a0b0d)] transition-[border-color,box-shadow,transform] duration-300 ease-[ease] opacity-0 animate-fade-in-up hover:border-[rgba(0,163,255,0.35)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.35)] hover:-translate-y-[5px] before:absolute before:top-0 before:right-0 before:left-0 before:h-[3px] before:bg-[linear-gradient(90deg,#00a3ff,transparent_70%)] before:content-[''] before:opacity-80 before:z-[2] after:content-[''] after:absolute after:inset-0 after:z-[1] after:bg-[radial-gradient(220px_circle_at_var(--mouse-x,0px)_var(--mouse-y,0px),rgba(0,163,255,0.08),transparent_80%)] after:opacity-0 after:transition-opacity after:duration-300 after:ease-[ease] after:pointer-events-none hover:after:opacity-100 motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:transition-none"
              onMouseMove={handleMouseMove}
              style={{ '--index': idx, animationDelay: `calc(var(--index) * 0.06s)` } as React.CSSProperties}
            >
              <div className="relative z-[3] flex justify-between text-[#00a3ff] text-[10px] font-extrabold tracking-[0.11em] uppercase">
                <span>Equipo {String(idx + 1).padStart(2, '0')}</span>
                <span className="text-[rgba(255,255,255,0.3)]">{activeCategory.id}</span>
              </div>
              <div className="relative z-[3] mt-[25px]">
                <h3 className="m-0 mb-[9px] text-text-white font-[family-name:var(--font-space-grotesk)] text-[19px] leading-[1.2]">{item.name}</h3>
                <p className="m-0 text-text-gray text-[13px] leading-[1.58]">{item.desc}</p>
              </div>

              <a
                href={`https://wa.me/${phone}?text=Hola%20GreyLion,%20quiero%20cotizar%20el%20envio%20de%20${encodeURIComponent(item.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-[3] inline-flex gap-[7px] items-center w-fit mt-auto pt-[19px] text-[#00a3ff] text-xs font-extrabold no-underline transition-[color,gap] duration-200 ease-[ease] hover:gap-[11px] hover:text-white"
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
    </section>
  );
}
