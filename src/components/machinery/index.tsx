'use client';

import React, { useState } from 'react';
import MachineryHeader from './MachineryHeader';
import MachineryCategoryTabs from './MachineryCategoryTabs';
import MachineryEquipmentGrid from './MachineryEquipmentGrid';
import MachineryAdvisoryBanner from './MachineryAdvisoryBanner';
import { CATEGORIES } from './data';
import DynamicMedia from '../dynamic-media';

export default function MachineryCatalog() {
  const [activeTab, setActiveTab] = useState('excavacion');
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573000000000';

  const activeCategory = CATEGORIES.find((cat) => cat.id === activeTab) || CATEGORIES[0];

  return (
    <section id="maquinaria" className="relative bg-background-dark text-text-white pt-[100px] border-t border-[rgba(255,255,255,0.05)] overflow-hidden">
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5">
        <MachineryHeader />
        <MachineryCategoryTabs activeCategory={activeTab} onSelect={setActiveTab} />
        <MachineryEquipmentGrid category={activeCategory} phone={phone} />
        <MachineryAdvisoryBanner phone={phone} />
      </div>

      {/* Bottom banner photo: full-bleed, pulled up to overlap the content above so it blends into the section */}
      <div className="relative z-0 w-full min-h-[370px] -mt-64">
        <DynamicMedia
          src="/specialized_solutions_equipment.png"
          alt="Maquinaria pesada especializada de GreyLion Maritime"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-background-dark)_0%,rgba(11,18,32,0.7)_18%,transparent_45%)]" />
      </div>
    </section>
  );
}
