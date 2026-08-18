'use client';

import React from 'react';
import MissionVisionSection from './MissionVisionSection';
import ObjectivesSection from './ObjectivesSection';
import WhyChooseSection from './WhyChooseSection';

export default function AboutCompany() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573000000000';
  const whatsappUrl = `https://wa.me/${phone}?text=Hola%20GreyLion,%20quiero%20cotizar%20el%20envio%20de%20`;

  return (
    <section className="relative overflow-hidden bg-[#020d1c] text-white py-20">
      {/* Decorative Radial Glow */}
      <div className="absolute top-[20%] left-[-10%] w-1/2 h-2/5 rounded-full bg-[radial-gradient(circle,rgba(15,76,129,0.08)_0%,transparent_70%)] blur-[100px] pointer-events-none z-[1]" />

      <div className="w-full max-w-[1280px] mx-auto px-5 relative z-10">
        <MissionVisionSection />
        <ObjectivesSection />
      </div>

      <WhyChooseSection whatsappUrl={whatsappUrl} />
    </section>
  );
}
