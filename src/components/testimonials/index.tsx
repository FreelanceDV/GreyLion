'use client';

import React from 'react';
import TestimonialsIntro from './TestimonialsIntro';
import TestimonialCarousel from './TestimonialCarousel';
import OperationPanel from './OperationPanel';

export default function Testimonials() {
  return (
    <section
      className="relative overflow-hidden py-[92px] bg-[radial-gradient(ellipse_75%_130%_at_91%_51%,rgba(7,76,137,0.45),transparent_66%),linear-gradient(108deg,#020f20_0%,#03172d_47%,#041a31_100%)] text-[#f1f8ff] max-[520px]:py-[70px]"
      id="opiniones"
      aria-labelledby="testimonials-title"
    >
      <div
        className="absolute inset-0 opacity-[0.24] pointer-events-none bg-[radial-gradient(circle_at_83%_26%,rgba(54,153,232,0.5)_0_1px,transparent_1.8px),linear-gradient(132deg,transparent_42%,rgba(70,172,240,0.12)_42.2%,transparent_42.6%)] bg-[length:12px_12px,190px_170px] [mask-image:radial-gradient(ellipse_at_80%_20%,#000_0,transparent_55%)] [-webkit-mask-image:radial-gradient(ellipse_at_80%_20%,#000_0,transparent_55%)]"
        aria-hidden="true"
      />
      <div className="w-full max-w-[1280px] mx-auto px-5 relative grid grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] gap-[clamp(46px,8vw,126px)] max-[850px]:grid-cols-1 max-[850px]:gap-[54px]">
        <div>
          <TestimonialsIntro />
          <TestimonialCarousel />
        </div>

        <OperationPanel />
      </div>
    </section>
  );
}
