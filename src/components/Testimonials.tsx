'use client';

import { useEffect, useState } from 'react';

const TESTIMONIALS = [
  {
    name: 'Carlos Mendoza',
    role: 'Director de Operaciones',
    company: 'Importadora Metalúrgica del Norte',
    text: 'Trabajar con GreyLion Maritime ha transformado nuestra cadena de suministro. La eficiencia en el fletamento marítimo y la gestión aduanera nos ahorra semanas de retrasos portuarios innecesarios.',
  },
  {
    name: 'Valeria Santos',
    role: 'Gerente de Logística',
    company: 'Agroexportadora del Sur',
    text: 'Exportamos frutas frescas y la cadena de frío es vital. GreyLion nos asegura contenedores reefer confiables y espacio con las mejores navieras incluso en temporada alta.',
  },
  {
    name: 'Alejandro Ruiz',
    role: 'Director de Infraestructura',
    company: 'Constructora Andina S.A.',
    text: 'La coordinación de maquinaria especializada y materiales para nuestros proyectos viales ha sido impecable. Siempre recibimos información clara y soluciones oportunas.',
  },
  {
    name: 'Marcus Vance',
    role: 'Especialista en Adquisición',
    company: 'Reciclajes Metálicos Globales',
    text: 'El comercio de materiales metálicos para reciclaje fluye sin contratiempos. Sus servicios de embalaje y almacenamiento portuario temporal son de primer nivel.',
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const testimonial = TESTIMONIALS[activeIndex];

  useEffect(() => {
    if (isPaused) return;

    const carouselInterval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % TESTIMONIALS.length);
    }, 5600);

    return () => window.clearInterval(carouselInterval);
  }, [isPaused]);

  return (
    <section className="testimonials" id="opiniones" aria-labelledby="testimonials-title">
      <div className="route-map" aria-hidden="true" />
      <div className="w-full max-w-[1280px] mx-auto px-5 testimonials-layout">
        <div className="testimonials-stories">
          <p className="section-kicker">Lo que dicen nuestros clientes</p>
          <h2 id="testimonials-title">Historias de <span>Confianza</span><br />y Resultados</h2>

          <div
            className="testimonial-carousel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={() => setIsPaused(false)}
          >
            <article className="testimonial-spotlight" key={activeIndex} aria-live="polite">
              <span className="quote-mark" aria-hidden="true">“</span>
              <blockquote>{testimonial.text}</blockquote>
              <footer className="testimonial-author">
                <span className="author-avatar" aria-hidden="true">{testimonial.name.split(' ').map((name) => name[0]).join('')}</span>
                <span><strong>{testimonial.name}</strong><small>{testimonial.role}<br />{testimonial.company}</small></span>
              </footer>
            </article>

            <div className="story-dots" aria-label="Seleccionar testimonio">
              {TESTIMONIALS.map((item, index) => (
                <button
                  key={item.name}
                  className={index === activeIndex ? 'active' : ''}
                  type="button"
                  aria-label={`Ver testimonio de ${item.name}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>

        <aside className="operation-panel" aria-labelledby="operation-title">
          <p className="section-kicker">Logística visible, decisiones seguras</p>
          <h3 id="operation-title">Operación en <span>movimiento</span><br />desde el primer día</h3>
          <p className="operation-copy">Una coordinación clara para que cada etapa de su carga avance con control y respuesta humana.</p>
          <div className="operation-dashboard">
            <div><strong>120+</strong><span>Rutas activas</span></div>
            <div><strong>24/7</strong><span>Seguimiento humano</span></div>
            <div><strong>98%</strong><span>Entregas a tiempo</span></div>
          </div>
          <a className="operation-link" href="#servicios">Conocer nuestros servicios <span aria-hidden="true">→</span></a>
        </aside>
      </div>

      <style jsx>{`
        .testimonials { position: relative; overflow: hidden; padding: 92px 0; background: radial-gradient(ellipse 75% 130% at 91% 51%, rgba(7, 76, 137, .45), transparent 66%), linear-gradient(108deg, #020f20 0%, #03172d 47%, #041a31 100%); color: #f1f8ff; }
        .route-map { position: absolute; inset: 0; opacity: .24; pointer-events: none; background-image: radial-gradient(circle at 83% 26%, rgba(54, 153, 232, .5) 0 1px, transparent 1.8px), linear-gradient(132deg, transparent 42%, rgba(70, 172, 240, .12) 42.2%, transparent 42.6%); background-size: 12px 12px, 190px 170px; -webkit-mask-image: radial-gradient(ellipse at 80% 20%, #000 0, transparent 55%); mask-image: radial-gradient(ellipse at 80% 20%, #000 0, transparent 55%); }
        .testimonials-layout { position: relative; display: grid; grid-template-columns: minmax(0, 1.04fr) minmax(0, .96fr); gap: clamp(46px, 8vw, 126px); }
        .section-kicker { margin: 0 0 9px; color: #1b9cff; font-size: 11px; font-weight: 800; letter-spacing: .13em; text-transform: uppercase; }
        h2, h3 { margin: 0; font-family: var(--font-space-grotesk); font-weight: 700; letter-spacing: -.045em; line-height: 1.05; }
        h2 { font-size: clamp(34px, 3.45vw, 53px); }
        h3 { font-size: clamp(32px, 3.15vw, 48px); }
        h2 span, h3 span { color: #1598ff; }
        .testimonial-carousel { max-width: 510px; margin-top: 23px; }
        .testimonial-spotlight { position: relative; display: flex; min-height: 205px; flex-direction: column; padding: 21px 28px; border: 1px solid rgba(81, 165, 235, .25); border-radius: 10px; background: linear-gradient(125deg, rgba(4, 29, 54, .84), rgba(1, 19, 38, .62)); box-shadow: inset 0 1px rgba(180, 227, 255, .05), 0 20px 40px rgba(0, 0, 0, .18); animation: testimonialIn .42s ease-out both; }
        .quote-mark { display: block; height: 29px; color: #1598ff; font-family: Georgia, serif; font-size: 63px; font-weight: 700; line-height: .7; }
        blockquote { max-width: 430px; margin: 4px 0 15px 35px; color: #d5e7f8; font-size: 13px; font-style: italic; line-height: 1.65; }
        .testimonial-author { display: flex; gap: 11px; align-items: center; margin: auto 0 0 35px; }
        .author-avatar { display: grid; width: 37px; height: 37px; place-items: center; border: 1px solid rgba(130, 205, 255, .65); border-radius: 50%; background: linear-gradient(135deg, #8a633c, #213f68); color: #fff; font-size: 9px; font-weight: 800; }
        .testimonial-author > span:last-child { display: grid; gap: 2px; }
        .testimonial-author strong { color: #f2f8fd; font-size: 12px; }
        .testimonial-author small { color: #91b4d4; font-size: 10px; font-style: normal; line-height: 1.35; }
        .story-dots { display: flex; gap: 7px; justify-content: center; margin-top: 12px; }
        .story-dots button { width: 6px; height: 6px; padding: 0; border: 0; border-radius: 50%; background: #1b80cf; cursor: pointer; opacity: .5; transition: width .2s ease, opacity .2s ease, background .2s ease; }
        .story-dots button.active { width: 21px; border-radius: 8px; background: #1598ff; opacity: 1; }
        .story-dots button:focus-visible { outline: 2px solid #d6efff; outline-offset: 3px; }
        .operation-panel { align-self: center; max-width: 555px; }
        .operation-copy { max-width: 440px; margin: 18px 0 0; color: #a8c8e6; font-size: 14px; line-height: 1.6; }
        .operation-dashboard { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin-top: 24px; }
        .operation-dashboard div { position: relative; min-height: 113px; padding: 19px 14px; border: 1px solid rgba(75, 157, 227, .27); border-radius: 5px; background: linear-gradient(145deg, rgba(6, 47, 84, .72), rgba(2, 25, 49, .54)); }
        .operation-dashboard div::before { position: absolute; top: 0; right: 16px; left: 16px; height: 2px; content: ''; background: linear-gradient(90deg, transparent, #1b9cff, transparent); }
        .operation-dashboard strong, .operation-dashboard span { display: block; }
        .operation-dashboard strong { color: #eef8ff; font-family: var(--font-space-grotesk); font-size: clamp(23px, 2.2vw, 34px); letter-spacing: -.06em; line-height: 1; }
        .operation-dashboard span { margin-top: 11px; color: #8eb9df; font-size: 10px; font-weight: 700; line-height: 1.35; text-transform: uppercase; }
        .operation-link { display: inline-flex; gap: 12px; align-items: center; margin-top: 17px; color: #d3edff; font-size: 12px; font-weight: 800; letter-spacing: .02em; text-decoration: none; text-transform: uppercase; transition: color .2s ease, transform .2s ease; }
        .operation-link span { display: grid; width: 29px; height: 29px; place-items: center; border: 1px solid rgba(147, 213, 255, .62); border-radius: 50%; color: #fff; font-size: 17px; }
        .operation-link:hover, .operation-link:focus-visible { color: #54b8ff; outline: none; transform: translateX(3px); }
        @keyframes testimonialIn { from { opacity: 0; transform: translateY(9px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 850px) { .testimonials-layout { grid-template-columns: 1fr; gap: 54px; } .testimonial-carousel, .operation-panel { max-width: 600px; } }
        @media (max-width: 520px) { .testimonials { padding: 70px 0; } .testimonial-spotlight { min-height: 230px; padding: 21px 19px; } blockquote, .testimonial-author { margin-left: 0; } .operation-dashboard { grid-template-columns: 1fr; } .operation-dashboard div { min-height: auto; } }
        @media (prefers-reduced-motion: reduce) { .testimonial-spotlight, .story-dots button, .operation-link { animation: none; transition: none; } }
      `}</style>
    </section>
  );
}
