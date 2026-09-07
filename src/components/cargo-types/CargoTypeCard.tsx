import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import CargoTypeIcon from './CargoTypeIcon';
import { CargoType } from './data';

interface CargoTypeCardProps {
  cargo: CargoType;
  index: number;
}

export default function CargoTypeCard({ cargo, index }: CargoTypeCardProps) {
  return (
    <article className="relative flex min-h-[286px] max-[560px]:min-h-[260px] flex-col overflow-hidden p-[27px] border border-[rgba(80,111,145,0.32)] rounded-[18px] bg-[linear-gradient(145deg,#131b25,#10161e)] shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] transition-[border-color,transform,box-shadow] duration-[250ms] ease-[ease] motion-reduce:transition-none hover:border-[rgba(91,162,214,0.82)] hover:shadow-[0_18px_36px_rgba(0,0,0,0.22)] hover:-translate-y-[5px] before:absolute before:inset-y-0 before:right-0 before:w-1 before:bg-[linear-gradient(180deg,var(--color-primary-hover),transparent_72%)] before:content-[''] before:opacity-80">
      <div className="flex justify-between items-start">
        <span className="grid w-12 h-12 place-items-center border border-[rgba(27,108,168,0.45)] rounded-[14px] bg-[rgba(15,76,129,0.16)] text-[#a7bed0] [&>svg]:w-6 [&>svg]:h-6">
          <CargoTypeIcon name={cargo.icon} />
        </span>
        <span className="text-[rgba(142,208,255,0.2)] font-[family-name:var(--font-space-grotesk)] text-[29px] font-extrabold leading-none">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <p className="m-0 mt-5 mb-2 text-[#8ed0ff] text-[10px] font-extrabold tracking-[0.13em]">{cargo.code}</p>
      <h3 className="m-0 mb-2.5 text-white font-[family-name:var(--font-space-grotesk)] text-[19px] leading-[1.2]">{cargo.title}</h3>
      <p className="m-0 text-text-gray text-[13px] leading-[1.6]">{cargo.desc}</p>
      <footer className="flex justify-between items-center mt-auto pt-[18px] border-t border-[rgba(140,150,158,0.12)] text-[#8aa3b8] text-[10px] font-extrabold tracking-[0.09em] uppercase">
        <span>Gestión especializada</span>
        <ArrowUpRight aria-hidden="true" className="text-[#8ed0ff] h-4 w-4" strokeWidth={2.5} />
      </footer>
    </article>
  );
}
