import React from 'react';
import WorkWithUsHeader from './WorkWithUsHeader';
import AdvantageCard from './AdvantageCard';
import { ADVANTAGES } from './data';

export default function WorkWithUs() {
  return (
    <section className="relative bg-white text-background-dark py-[100px] border-t border-[#E4E7EC]">
      <div className="w-full max-w-[1280px] mx-auto px-5">
        <WorkWithUsHeader />

        {/* Grid Items */}
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))] gap-8">
          {ADVANTAGES.map((advantage, idx) => (
            <AdvantageCard key={idx} advantage={advantage} />
          ))}
        </div>
      </div>
    </section>
  );
}
