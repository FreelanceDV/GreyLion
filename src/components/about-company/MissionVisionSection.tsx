import React from 'react';
import AboutIcon from './AboutIcon';
import { MISSION_VISION_CARDS } from './data';

export default function MissionVisionSection() {
  return (
    <div id="mision-vision" className="scroll-mt-[100px] mb-[100px]">
      <div className="grid grid-cols-[0.8fr_1.2fr] gap-10 items-start max-[991px]:grid-cols-1 max-[991px]:gap-8">
        {/* Left: intro copy */}
        <div className="flex flex-col gap-3 max-[991px]:items-center max-[991px]:text-center">
          <span className="text-[13px] font-semibold text-accent uppercase tracking-[0.08em]">
            Nuestra Esencia
          </span>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(28px,3.2vw,42px)] font-extrabold leading-[1.2]">
            Misión <span className="text-primary">& Visión</span>
          </h2>
          <p className="text-[15px] text-text-gray leading-[1.6] max-[991px]:max-w-[500px]">
            Los pilares fundamentales que guían nuestras operaciones diarias y definen nuestro rumbo estratégico en el comercio internacional.
          </p>
        </div>

        {/* Right: mission / vision cards */}
        <div className="grid grid-cols-2 gap-5 max-[700px]:grid-cols-1">
          {MISSION_VISION_CARDS.map((card) => (
            <article
              key={card.title}
              className="relative overflow-hidden p-6 border border-[rgba(70,117,163,0.4)] rounded-2xl bg-[rgba(6,13,26,0.55)] transition-colors duration-300 hover:border-primary-hover/60"
            >
              <div className="flex gap-3 items-center mb-4">
                <span className="grid w-9 h-9 flex-none place-items-center rounded-full border border-primary-hover/50 bg-primary/15 text-primary-hover [&>svg]:w-[18px] [&>svg]:h-[18px]" aria-hidden="true">
                  <AboutIcon name={card.icon} />
                </span>
                <div>
                  <p className="m-0 text-primary-hover text-[10px] font-extrabold tracking-[0.1em]">{card.kicker}</p>
                  <h3 className="m-0 text-white font-[family-name:var(--font-space-grotesk)] text-lg font-extrabold leading-[1.15]">{card.title}</h3>
                </div>
              </div>
              <blockquote className="text-text-gray text-[13px] italic leading-[1.6] mb-4">{card.quote}</blockquote>
              <ul className="grid gap-2.5 m-0 p-0 list-none text-text-gray text-[12.5px] leading-[1.3]">
                {card.items.map((item) => (
                  <li key={item} className="flex gap-2.5 items-center">
                    <span className="grid w-4 h-4 flex-none place-items-center rounded-full bg-primary-hover/20 text-primary-hover">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
