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
    <section className="relative overflow-hidden py-[92px] bg-[radial-gradient(ellipse_75%_130%_at_91%_51%,rgba(7,76,137,0.45),transparent_66%),linear-gradient(108deg,#020f20_0%,#03172d_47%,#041a31_100%)] text-[#f1f8ff] max-[520px]:py-[70px]" id="opiniones" aria-labelledby="testimonials-title">
      <div className="absolute inset-0 opacity-[0.24] pointer-events-none bg-[radial-gradient(circle_at_83%_26%,rgba(54,153,232,0.5)_0_1px,transparent_1.8px),linear-gradient(132deg,transparent_42%,rgba(70,172,240,0.12)_42.2%,transparent_42.6%)] bg-[length:12px_12px,190px_170px] [mask-image:radial-gradient(ellipse_at_80%_20%,#000_0,transparent_55%)] [-webkit-mask-image:radial-gradient(ellipse_at_80%_20%,#000_0,transparent_55%)]" aria-hidden="true" />
      <div className="w-full max-w-[1280px] mx-auto px-5 relative grid grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] gap-[clamp(46px,8vw,126px)] max-[850px]:grid-cols-1 max-[850px]:gap-[54px]">
        <div>
          <p className="m-0 mb-[9px] text-[#1b9cff] text-[11px] font-extrabold tracking-[0.13em] uppercase">Lo que dicen nuestros clientes</p>
          <h2 id="testimonials-title" className="m-0 font-[family-name:var(--font-space-grotesk)] font-bold tracking-[-0.045em] leading-[1.05] text-[clamp(34px,3.45vw,53px)]">
            Historias de <span className="text-[#1598ff]">Confianza</span><br />y Resultados
          </h2>

          <div
            className="max-w-[510px] mt-[23px] max-[850px]:max-w-[600px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={() => setIsPaused(false)}
          >
            <article
              className="relative flex min-h-[205px] max-[520px]:min-h-[230px] flex-col py-[21px] px-7 max-[520px]:px-[19px] border border-[rgba(81,165,235,0.25)] rounded-[10px] bg-[linear-gradient(125deg,rgba(4,29,54,0.84),rgba(1,19,38,0.62))] shadow-[inset_0_1px_rgba(180,227,255,0.05),0_20px_40px_rgba(0,0,0,0.18)] animate-testimonial-in motion-reduce:animate-none"
              key={activeIndex}
              aria-live="polite"
            >
              <span className="block h-[29px] text-[#1598ff] font-[Georgia,serif] text-[63px] font-bold leading-[0.7]" aria-hidden="true">&ldquo;</span>
              <blockquote className="max-w-[430px] mt-1 mb-[15px] ml-[35px] max-[520px]:ml-0 text-[#d5e7f8] text-[13px] italic leading-[1.65]">{testimonial.text}</blockquote>
              <footer className="flex gap-[11px] items-center mt-auto mb-0 ml-[35px] max-[520px]:ml-0">
                <span className="grid w-[37px] h-[37px] place-items-center border border-[rgba(130,205,255,0.65)] rounded-full bg-[linear-gradient(135deg,#8a633c,#213f68)] text-white text-[9px] font-extrabold" aria-hidden="true">{testimonial.name.split(' ').map((name) => name[0]).join('')}</span>
                <span className="grid gap-0.5">
                  <strong className="text-[#f2f8fd] text-xs">{testimonial.name}</strong>
                  <small className="text-[#91b4d4] text-[10px] not-italic leading-[1.35]">{testimonial.role}<br />{testimonial.company}</small>
                </span>
              </footer>
            </article>

            <div className="flex gap-[7px] justify-center mt-3" aria-label="Seleccionar testimonio">
              {TESTIMONIALS.map((item, index) => (
                <button
                  key={item.name}
                  className={`h-1.5 p-0 border-0 rounded-full bg-[#1b80cf] cursor-pointer transition-[width,opacity,background] duration-200 ease-[ease] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d6efff] focus-visible:outline-offset-[3px] motion-reduce:transition-none ${
                    index === activeIndex ? 'w-[21px] rounded-lg bg-[#1598ff] opacity-100' : 'w-1.5 opacity-50'
                  }`}
                  type="button"
                  aria-label={`Ver testimonio de ${item.name}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>

        <aside className="self-center max-w-[555px]" aria-labelledby="operation-title">
          <p className="m-0 mb-[9px] text-[#1b9cff] text-[11px] font-extrabold tracking-[0.13em] uppercase">Logística visible, decisiones seguras</p>
          <h3 id="operation-title" className="m-0 font-[family-name:var(--font-space-grotesk)] font-bold tracking-[-0.045em] leading-[1.05] text-[clamp(32px,3.15vw,48px)]">
            Operación en <span className="text-[#1598ff]">movimiento</span><br />desde el primer día
          </h3>
          <p className="max-w-[440px] mt-[18px] mb-0 text-[#a8c8e6] text-sm leading-[1.6]">Una coordinación clara para que cada etapa de su carga avance con control y respuesta humana.</p>
          <div className="grid grid-cols-3 gap-2 mt-6 max-[520px]:grid-cols-1">
            {[
              { value: '120+', label: 'Rutas activas' },
              { value: '24/7', label: 'Seguimiento humano' },
              { value: '98%', label: 'Entregas a tiempo' },
            ].map((stat) => (
              <div key={stat.label} className="relative min-h-[113px] max-[520px]:min-h-0 py-[19px] px-3.5 border border-[rgba(75,157,227,0.27)] rounded-[5px] bg-[linear-gradient(145deg,rgba(6,47,84,0.72),rgba(2,25,49,0.54))] before:absolute before:top-0 before:right-4 before:left-4 before:h-0.5 before:content-[''] before:bg-[linear-gradient(90deg,transparent,#1b9cff,transparent)]">
                <strong className="block text-[#eef8ff] font-[family-name:var(--font-space-grotesk)] text-[clamp(23px,2.2vw,34px)] tracking-[-0.06em] leading-none">{stat.value}</strong>
                <span className="block mt-[11px] text-[#8eb9df] text-[10px] font-bold leading-[1.35] uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
          <a className="inline-flex gap-3 items-center mt-[17px] text-[#d3edff] text-xs font-extrabold tracking-[0.02em] uppercase no-underline transition-[color,transform] duration-200 ease-[ease] hover:text-[#54b8ff] focus-visible:text-[#54b8ff] focus-visible:outline-none hover:translate-x-[3px] focus-visible:translate-x-[3px] motion-reduce:transition-none" href="#servicios">
            Conocer nuestros servicios <span className="grid w-[29px] h-[29px] place-items-center border border-[rgba(147,213,255,0.62)] rounded-full text-white text-[17px]" aria-hidden="true">→</span>
          </a>
        </aside>
      </div>
    </section>
  );
}
