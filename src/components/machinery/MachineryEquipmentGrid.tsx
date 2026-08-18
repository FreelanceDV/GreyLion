'use client';

import React from 'react';
import MachineryIcon from './MachineryIcon';
import { MachineryCategory } from './data';
import DynamicMedia from '../dynamic-media';

interface MachineryEquipmentGridProps {
  category: MachineryCategory;
  phone: string;
}

// Mousemove handler for the card spotlight effect
const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  card.style.setProperty('--mouse-x', `${x}px`);
  card.style.setProperty('--mouse-y', `${y}px`);
};

export default function MachineryEquipmentGrid({ category, phone }: MachineryEquipmentGridProps) {
  return (
    <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1" key={category.id}>
      {category.items.map((item, idx) => {
        const cardImage = item.image || category.image;
        return (
        <article
          key={idx}
          className="group relative flex min-h-[220px] max-[560px]:min-h-[245px] flex-col overflow-hidden p-6 border border-[rgba(255,255,255,0.05)] rounded-[18px] bg-[linear-gradient(145deg,#0f131a,#0a0b0d)] transition-[border-color,box-shadow,transform] duration-300 ease-[ease] opacity-0 animate-fade-in-up hover:border-primary-hover/40 hover:shadow-[0_15px_35px_rgba(0,0,0,0.35)] hover:-translate-y-[5px] before:absolute before:top-0 before:right-0 before:left-0 before:h-[3px] before:bg-[linear-gradient(90deg,var(--color-primary-hover),transparent_70%)] before:content-[''] before:opacity-80 before:z-[2] motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:transition-none"
          onMouseMove={handleMouseMove}
          style={{ '--index': idx, animationDelay: `calc(var(--index) * 0.06s)` } as React.CSSProperties}
        >
          {/* Background photo: representative photo for the active category */}
          <div className="absolute inset-0 z-0">
            <DynamicMedia src={cardImage} alt="" aria-hidden="true" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#0a0b0d_0%,rgba(10,11,13,0.78)_42%,rgba(10,11,13,0.3)_100%)]" />
          </div>

          <div className="relative z-[3] flex justify-between items-center text-[10px] font-extrabold tracking-[0.11em] uppercase">
            <span className="text-primary-hover">Equipo {String(idx + 1).padStart(2, '0')}</span>
            <span className="text-[rgba(255,255,255,0.4)]">{category.shortLabel}</span>
          </div>
          <div className="relative z-[3] mt-[25px]">
            <h3 className="m-0 mb-[9px] text-text-white font-[family-name:var(--font-space-grotesk)] text-[19px] leading-[1.2]">{item.name}</h3>
            <p className="m-0 text-text-gray text-[13px] leading-[1.58] max-w-[240px]">{item.desc}</p>
          </div>

          <a
            href={`https://wa.me/${phone}?text=Hola%20GreyLion,%20quiero%20cotizar%20el%20envio%20de%20${encodeURIComponent(item.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-[3] inline-flex gap-[7px] items-center w-fit mt-auto pt-[19px] text-primary-hover text-xs font-extrabold no-underline transition-[color,gap] duration-200 ease-[ease] hover:gap-[11px] hover:text-white"
          >
            Cotizar Equipo
            <MachineryIcon name="arrow-right" className="w-3.5 h-3.5" />
          </a>
        </article>
        );
      })}
    </div>
  );
}
