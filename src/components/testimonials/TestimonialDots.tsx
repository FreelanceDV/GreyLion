import React from 'react';
import { TESTIMONIALS } from './data';

interface TestimonialDotsProps {
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function TestimonialDots({ activeIndex, onSelect }: TestimonialDotsProps) {
  return (
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
          onClick={() => onSelect(index)}
        />
      ))}
    </div>
  );
}
