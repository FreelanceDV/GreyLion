import React from 'react';
import { FaqItem } from './data';

interface FaqAccordionListProps {
  items: FaqItem[];
}

export default function FaqAccordionList({ items }: FaqAccordionListProps) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-text-gray py-10 text-center border border-dashed border-[rgba(255,255,255,0.1)] rounded-2xl">
        No encontramos preguntas para tu búsqueda. Intenta con otra categoría o término.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, idx) => (
        <details
          key={item.id}
          className="group rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-6 py-5 open:border-primary-hover/50 open:bg-[rgba(15,76,129,0.08)]"
          open={idx === 0}
        >
          <summary className="flex justify-between items-center gap-6 cursor-pointer list-none outline-none select-none marker:hidden [&::-webkit-details-marker]:hidden">
            <h3 className="text-base font-bold text-text-white leading-[1.4] m-0">{item.question}</h3>
            <span className="relative w-8 h-8 rounded-full bg-primary/15 text-primary-hover flex items-center justify-center text-lg font-bold shrink-0 transition-colors duration-200 ease-[ease] group-open:bg-primary group-open:text-white">
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:inline">−</span>
            </span>
          </summary>
          <div className="pt-3 text-base leading-[1.6] text-text-gray">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
