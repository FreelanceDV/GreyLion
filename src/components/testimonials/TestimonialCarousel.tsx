import React from 'react';
import TestimonialCard from './TestimonialCard';
import TestimonialDots from './TestimonialDots';
import { TESTIMONIALS } from './data';
import { useTestimonialCarousel } from './useTestimonialCarousel';

export default function TestimonialCarousel() {
  const { activeIndex, setActiveIndex, pause, resume } = useTestimonialCarousel();
  const testimonial = TESTIMONIALS[activeIndex];

  return (
    <div
      className="max-w-[510px] mt-[23px] max-[850px]:max-w-[600px]"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
    >
      <TestimonialCard key={activeIndex} testimonial={testimonial} />
      <TestimonialDots activeIndex={activeIndex} onSelect={setActiveIndex} />
    </div>
  );
}
