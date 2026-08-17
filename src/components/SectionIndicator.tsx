'use client';

import React, { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'mision-vision', label: 'Misión & Visión' },
  { id: 'objetivos', label: 'Objetivos' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'maquinaria', label: 'Maquinaria' },
];

export default function SectionIndicator() {
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      let currentActive = 'inicio';
      // Use middle of viewport as the scroll pointer
      const scrollPosition = window.scrollY + window.innerHeight / 2.5;

      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const height = rect.height;
          
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentActive = section.id;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY - 90; // Subtract 90px to prevent fixed navbar overlay
      window.scrollTo({
        top: Math.max(0, top),
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="fixed top-1/2 right-8 z-[99] flex -translate-y-1/2 flex-col items-center pointer-events-none max-[991px]:hidden">
      <div className="absolute top-[10px] bottom-[10px] z-[1] w-px bg-white/[0.08]" />
      <div className="relative z-[2] flex flex-col gap-7">
        {SECTIONS.map((sec, idx) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className="group relative flex h-3 w-3 items-center border-none bg-transparent p-0 pointer-events-auto outline-none cursor-pointer"
              aria-label={`Ir a sección ${sec.label}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.6] group-hover:bg-[#00a3ff] group-hover:shadow-[0_0_10px_rgba(0,163,255,0.6)] ${
                  isActive ? 'scale-[1.6] bg-[#00a3ff] shadow-[0_0_10px_rgba(0,163,255,0.6)]' : 'bg-white/25'
                }`}
              />
              <span className="pointer-events-none absolute right-7 translate-x-2.5 whitespace-nowrap rounded border border-white/[0.08] bg-[rgba(10,11,19,0.85)] px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 backdrop-blur-[8px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100">
                {sec.label}
              </span>
              <span
                className={`absolute left-6 font-[family-name:var(--font-space-grotesk)] text-[10px] font-extrabold transition-colors duration-300 ease-in-out ${
                  isActive ? 'text-[#00a3ff]' : 'text-white/15'
                }`}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
