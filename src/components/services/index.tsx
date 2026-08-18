'use client';

import React, { useState } from 'react';
import ServicesHeader from './ServicesHeader';
import ServicesCardGrid from './ServicesCardGrid';
import { SERVICES_CATEGORIES } from './data';

export default function Services() {
  const [activeTab, setActiveTab] = useState('fletamento');
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573000000000';

  const activeCategory = SERVICES_CATEGORIES.find((cat) => cat.id === activeTab) || SERVICES_CATEGORIES[0];

  return (
    <section
      id="servicios"
      className="relative  text-text-white border-t border-white/5 scroll-mt-[100px] overflow-hidden"
    >
      <ServicesHeader activeCategory={activeCategory} onSelect={setActiveTab} />

      <div className="w-full max-w-[1280px] mx-auto px-5 pb-24">
        <ServicesCardGrid category={activeCategory} phone={phone} />
      </div>
    </section>
  );
}
