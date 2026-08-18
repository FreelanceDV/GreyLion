import React from 'react';
import { Testimonial } from './data';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const initials = testimonial.name.split(' ').map((name) => name[0]).join('');

  return (
    <article
      className="relative flex min-h-[205px] max-[520px]:min-h-[230px] flex-col py-[21px] px-7 max-[520px]:px-[19px] border border-[rgba(81,165,235,0.25)] rounded-[10px] bg-[linear-gradient(125deg,rgba(4,29,54,0.84),rgba(1,19,38,0.62))] shadow-[inset_0_1px_rgba(180,227,255,0.05),0_20px_40px_rgba(0,0,0,0.18)] animate-testimonial-in motion-reduce:animate-none"
      aria-live="polite"
    >
      <span className="block h-[29px] text-[#1598ff] font-[Georgia,serif] text-[63px] font-bold leading-[0.7]" aria-hidden="true">&ldquo;</span>
      <blockquote className="max-w-[430px] mt-1 mb-[15px] ml-[35px] max-[520px]:ml-0 text-[#d5e7f8] text-[13px] italic leading-[1.65]">{testimonial.text}</blockquote>
      <footer className="flex gap-[11px] items-center mt-auto mb-0 ml-[35px] max-[520px]:ml-0">
        <span className="grid w-[37px] h-[37px] place-items-center border border-[rgba(130,205,255,0.65)] rounded-full bg-[linear-gradient(135deg,#8a633c,#213f68)] text-white text-[9px] font-extrabold" aria-hidden="true">
          {initials}
        </span>
        <span className="grid gap-0.5">
          <strong className="text-[#f2f8fd] text-xs">{testimonial.name}</strong>
          <small className="text-[#91b4d4] text-[10px] not-italic leading-[1.35]">{testimonial.role}<br />{testimonial.company}</small>
        </span>
      </footer>
    </article>
  );
}
