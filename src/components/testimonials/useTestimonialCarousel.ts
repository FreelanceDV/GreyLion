import { useEffect, useState } from 'react';
import { TESTIMONIALS } from './data';

/** Auto-advancing testimonial index, pausable on hover/focus. */
export function useTestimonialCarousel(intervalMs = 5600) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const carouselInterval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % TESTIMONIALS.length);
    }, intervalMs);

    return () => window.clearInterval(carouselInterval);
  }, [isPaused, intervalMs]);

  return {
    activeIndex,
    setActiveIndex,
    pause: () => setIsPaused(true),
    resume: () => setIsPaused(false),
  };
}
