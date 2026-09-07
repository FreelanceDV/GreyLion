import React from 'react';
import { ArrowRight } from 'lucide-react';
import AboutIcon from './AboutIcon';
import { OBJECTIVES } from './data';

export default function ObjectivesSection() {
  return (
    <div id="objetivos" className="scroll-mt-[100px] mb-[100px] border-t border-[rgba(255,255,255,0.06)] pt-14">
      <div className="flex flex-col items-center text-center gap-4 mb-12">
        <span className="text-[13px] font-semibold text-accent uppercase tracking-[0.08em]">
          Metas y Propósitos
        </span>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(28px,3.5vw,48px)] font-extrabold leading-[1.2]">
          Objetivos de la <span className="text-primary">empresa</span>
        </h2>
        <p className="text-[15px] text-text-gray max-w-[600px] leading-[1.5]">
          Nuestra estrategia empresarial está orientada a cumplir metas claras y medibles que aseguren el éxito comercial de nuestros aliados.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-[18px] max-[991px]:grid-cols-2 max-[520px]:grid-cols-1">
        {OBJECTIVES.map((obj, i) => (
          <article
            key={i}
            className="relative flex min-h-[296px] flex-col p-6 overflow-hidden border border-[rgba(140,150,158,0.16)] rounded-[18px] bg-[linear-gradient(155deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012))] transition-[transform,border-color,background,box-shadow] duration-[250ms] ease-[ease] after:absolute after:right-0 after:bottom-0 after:left-0 after:h-[3px] after:bg-[linear-gradient(90deg,var(--color-primary),var(--color-primary-hover))] after:content-[''] after:opacity-70 after:origin-left after:scale-x-[0.28] after:transition-transform after:duration-[250ms] after:ease-[ease] hover:border-[rgba(56,133,192,0.7)] hover:bg-[linear-gradient(155deg,rgba(15,76,129,0.19),rgba(255,255,255,0.02))] hover:shadow-[0_18px_38px_rgba(0,0,0,0.2)] hover:-translate-y-1.5 hover:after:scale-x-100 max-[520px]:min-h-[264px] motion-reduce:transition-none motion-reduce:after:transition-none"
          >
            <div className="flex justify-between items-start mb-[26px]">
              <span className="grid w-[43px] h-[43px] place-items-center border border-[rgba(27,108,168,0.45)] rounded-[13px] bg-[rgba(15,76,129,0.16)] text-[#8ed0ff] [&>svg]:w-[22px] [&>svg]:h-[22px]" aria-hidden="true">
                <AboutIcon name={obj.icon} />
              </span>
              <span className="text-[rgba(27,108,168,0.27)] font-[family-name:var(--font-space-grotesk)] text-[31px] font-extrabold tracking-[-0.05em] leading-none">{obj.num}</span>
            </div>
            <h4 className="max-w-[185px] m-0 mb-3 text-white font-[family-name:var(--font-space-grotesk)] text-[19px] leading-[1.18]">{obj.title}</h4>
            <p className="m-0 text-text-gray text-[13px] leading-[1.6]">{obj.desc}</p>
            <footer className="flex justify-between items-center mt-auto pt-[18px] text-[#8ed0ff] text-[10px] font-extrabold tracking-[0.07em] uppercase">{obj.label}<ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" /></footer>
          </article>
        ))}
      </div>
    </div>
  );
}
