'use client';

import React from 'react';
import ProcessHeader from './ProcessHeader';
import ProcessFeatureCard from './ProcessFeatureCard';
import ProcessCTA from './ProcessCTA';
import ProcessTimeline from './ProcessTimeline';
import ProcessBanner from './ProcessBanner';

export default function Process() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573000000000';
  const whatsappUrl = `https://wa.me/${phone}?text=Hola%20GreyLion,%20quiero%20cotizar%20el%20envio%20de%20`;

  return (
    <section id="proceso" className="bg-background-dark text-text-white pt-[100px] relative overflow-hidden scroll-mt-[100px]">
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5">
        <div className="grid grid-cols-[400px_1fr] gap-[80px] items-start max-[991px]:grid-cols-1 max-[991px]:gap-[60px]">
          {/* Left Column: copy, feature card, CTA */}
          <div className="relative flex flex-col gap-6">
            <ProcessHeader />
            <ProcessFeatureCard />
            <ProcessCTA whatsappUrl={whatsappUrl} />
          </div>

          {/* Right Column: numbered timeline */}
          <ProcessTimeline />
        </div>
      </div>

      <ProcessBanner />
    </section>
  );
}
