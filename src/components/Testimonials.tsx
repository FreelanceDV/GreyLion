'use client';

import React from 'react';

const TESTIMONIALS = [
  {
    name: 'Carlos Mendoza',
    role: 'Director de Operaciones',
    company: 'Importadora Metalúrgica del Norte',
    text: 'Trabajar con GreyLion Maritime ha transformado nuestra cadena de suministro. La eficiencia en el fletamento marítimo y la gestión aduanera nos ahorra semanas de retrasos portuarios innecesarios.',
    color: '#7DD3E8',
    spanRow: true,
  },
  {
    name: 'Valeria Santos',
    role: 'Gerente de Logística',
    company: 'Agroexportadora del Sur',
    text: 'Exportamos frutas frescas y la cadena de frío es vital. GreyLion nos asegura contenedores reefer confiables y espacio con las mejores navieras incluso en temporada alta. Son indispensables.',
    color: '#B5C4FF',
    spanRow: false,
  },
  {
    name: 'Alejandro Ruiz',
    role: 'Director de Infraestructura',
    company: 'Constructora Andina S.A.',
    text: 'No solo gestionan de manera excelente el transporte marítimo de insumos, el suministro de maquinaria especializada como excavadoras y compactadoras para nuestros proyectos viales ha sido impecable.',
    color: '#FFD6A5',
    spanRow: false,
  },
  {
    name: 'Marcus Vance',
    role: 'Especialista en Adquisición',
    company: 'Reciclajes Metálicos Globales',
    text: 'El comercio mayorista de chatarra y materiales metálicos para reciclaje fluye sin contratiempos. Los servicios de embalaje y almacenamiento portuario temporal que ofrecen son de primer nivel.',
    color: '#C5F5CA',
    spanRow: false,
  },
];

export default function Testimonials() {
  return (
    <section
      style={{
        backgroundColor: '#F2F3F4',
        color: 'var(--background-dark)',
        padding: '100px 0',
      }}
    >
      <div className="container">
        <header className="testimonials-heading">
          <div>
            <p>Confianza que navega con nosotros</p>
            <h2>Opiniones de nuestros<br />socios comerciales</h2>
          </div>
          <div className="testimonials-seal"><strong>+150</strong><span>puertos conectados<br />en nuestra red</span></div>
        </header>

        {/* Testimonials Grid Layout */}
        <div
          className="testimonials-grid"
        >
          {TESTIMONIALS.map((t, idx) => (
            <article
              key={idx}
              className="testi-card"
            >
              <div className="testi-topline"><span>Experiencia GreyLion</span><span aria-hidden="true">↗</span></div>
              <div className="testi-quote" aria-hidden="true">“</div>
              <p className="testi-copy">{t.text}</p>
              <footer className="testi-profile">
                <div
                  className="testi-avatar"
                  style={{
                    backgroundColor: t.color,
                  }}
                >
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="testi-person">
                  <h4>{t.name}</h4>
                  <p>{t.role}</p>
                  <p>{t.company}</p>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .testimonials-heading { display: flex; justify-content: space-between; align-items: end; gap: 30px; margin-bottom: 52px; }
        .testimonials-heading p { margin: 0 0 12px; color: #285b81; font-size: 12px; font-weight: 800; letter-spacing: .13em; text-transform: uppercase; }
        .testimonials-heading h2 { margin: 0; color: #101820; font-family: var(--font-space-grotesk); font-size: clamp(34px, 4vw, 58px); font-weight: 800; letter-spacing: -.04em; line-height: 1.03; }
        .testimonials-seal { display: flex; min-width: 205px; gap: 12px; align-items: center; padding: 14px 17px; border: 1px solid rgba(29, 76, 113, .15); border-radius: 14px; background: rgba(255, 255, 255, .65); color: #29465b; }
        .testimonials-seal strong { color: #0f4c81; font-family: var(--font-space-grotesk); font-size: 29px; line-height: 1; }
        .testimonials-seal span { font-size: 11px; font-weight: 700; line-height: 1.35; }
        .testimonials-grid { display: grid; grid-template-columns: 1.35fr 1fr 1fr; grid-template-rows: repeat(2, minmax(230px, auto)); gap: 22px; }
        .testi-card { position: relative; display: flex; min-width: 0; flex-direction: column; overflow: hidden; padding: 28px; border: 1px solid rgba(24, 43, 56, .14); border-radius: 18px; background: rgba(255, 255, 255, .84); box-shadow: 0 12px 26px rgba(24, 43, 56, .045); transition: transform .25s ease, box-shadow .25s ease; }
        .testi-card::before { position: absolute; top: 0; right: 0; left: 0; height: 3px; background: #b5c4ff; content: ''; }
        .testi-card:nth-child(1) { grid-row: span 2; padding: 39px; background: linear-gradient(145deg, #fff 0%, #f7fbfc 100%); }
        .testi-card:nth-child(1)::before { background: #7dd3e8; }
        .testi-card:nth-child(3)::before { background: #ffd6a5; }
        .testi-card:nth-child(4)::before { background: #c5f5ca; }
        .testi-card:hover { box-shadow: 0 20px 38px rgba(24, 43, 56, .11); transform: translateY(-5px); }
        .testi-topline { display: flex; justify-content: space-between; color: #6d8190; font-size: 10px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
        .testi-topline span:last-child { color: #0f4c81; font-size: 15px; line-height: .6; }
        .testi-quote { margin-top: auto; color: #d7e7ed; font-family: Georgia, serif; font-size: 82px; font-weight: 700; line-height: .55; }
        .testi-copy { margin: 17px 0 27px; color: #263640; font-size: 14px; font-weight: 520; line-height: 1.65; }
        .testi-card:first-child .testi-copy { max-width: 420px; font-size: 16px; line-height: 1.7; }
        .testi-profile { display: flex; gap: 12px; align-items: center; padding-top: 15px; border-top: 1px solid rgba(24, 43, 56, .1); }
        .testi-avatar { display: grid; width: 44px; height: 44px; flex: 0 0 auto; place-items: center; border-radius: 50%; color: #17232b; font-size: 13px; font-weight: 800; }
        .testi-person h4 { margin: 0 0 2px; color: #111d25; font-size: 14px; }
        .testi-person p { margin: 0; color: #748490; font-size: 11px; line-height: 1.35; }
        .testi-person p:last-child { font-weight: 650; }
        @media (max-width: 991px) {
          .testimonials-heading { align-items: start; flex-direction: column; }
          .testimonials-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-template-rows: auto;
          }
          .testi-card:first-child { grid-column: span 2; grid-row: auto; }
        }
        @media (max-width: 620px) { .testimonials-heading { margin-bottom: 35px; } .testimonials-seal { min-width: 0; } .testimonials-grid { grid-template-columns: 1fr; } .testi-card, .testi-card:first-child { grid-column: auto; padding: 25px; } .testi-card:first-child .testi-copy { font-size: 14px; } }
        @media (prefers-reduced-motion: reduce) { .testi-card { transition: none; } }
      `}</style>
    </section>
  );
}
