'use client';

import React from 'react';
import ServicesIcon from './ServicesIcon';
import { ServiceCategory } from './data';
import DynamicMedia from '../DynamicMedia';

interface ServicesCardGridProps {
  category: ServiceCategory;
  phone: string;
}

export default function ServicesCardGrid({ category, phone }: ServicesCardGridProps) {
  return (
    <div className="grid grid-cols-3 gap-6 max-[991px]:grid-cols-1" key={category.id}>
      {category.items.map((item, idx) => (
        <article
          key={item.title}
          className="group relative flex min-h-[380px] flex-col overflow-hidden rounded-2xl border border-white/5 p-7 opacity-0 animate-fade-in-up transition-[border-color,box-shadow,transform] duration-300 ease-[ease] hover:border-primary-hover/40 hover:shadow-[0_15px_35px_rgba(0,0,0,0.35)] hover:-translate-y-[5px] motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:transition-none"
          style={{ '--index': idx, animationDelay: `calc(var(--index) * 0.08s)` } as React.CSSProperties}
        >
          {/* Background photo for this service */}
          <div className="absolute inset-0 z-0">
            <DynamicMedia src={item.image} alt="" aria-hidden="true" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#0a0e16_18%,rgba(10,14,22,0.35)_55%,rgba(10,14,22,0.96)_100%)]" />
          </div>

          <span className="relative z-10 w-fit rounded-md bg-primary px-2.5 py-1 text-[11px] font-extrabold text-white">
            {String(idx + 1).padStart(2, '0')}
          </span>

          <div className="relative z-10 mt-5 flex items-start gap-3">
            <span className="shrink-0 grid w-11 h-11 place-items-center rounded-xl bg-primary/20 text-primary-hover [&>svg]:w-5 [&>svg]:h-5">
              <ServicesIcon name={item.icon} />
            </span>
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-[18px] font-bold leading-[1.25] text-text-white">
              {item.title}
            </h3>
          </div>

          <p className="relative z-10 mt-4 text-[13.5px] leading-[1.6] text-text-gray">
            {item.desc}
          </p>

          <ul className="relative z-10 mt-5 flex flex-col gap-2.5">
            {item.bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-2.5 text-[12.5px] text-text-gray">
                <ServicesIcon name="check" className="w-3.5 h-3.5 shrink-0 text-primary-hover" />
                {bullet}
              </li>
            ))}
          </ul>

          <a
            href={`https://wa.me/${phone}?text=${encodeURIComponent(`Hola GreyLion, quiero más información sobre ${item.title}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex items-center gap-1.5 w-fit mt-auto pt-6 text-primary-hover text-xs font-extrabold no-underline transition-[gap] duration-200 ease-[ease] hover:gap-2.5"
          >
            Conocer más
            <ServicesIcon name="arrow-right" className="w-3.5 h-3.5" />
          </a>
        </article>
      ))}
    </div>
  );
}
