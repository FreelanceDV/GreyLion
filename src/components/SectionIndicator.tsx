'use client';

import React, { useEffect, useState } from 'react';
import { Ship } from 'lucide-react';
import { PAGE_SECTIONS as SECTIONS } from './pageSections';

const LAST_INDEX = SECTIONS.length - 1;

export default function SectionIndicator() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Use middle of viewport as the scroll pointer
      const scrollPosition = window.scrollY + window.innerHeight / 2.5;

      // Walk sections top-to-bottom and keep the last one we've scrolled past.
      // (Not "are we strictly inside its rect" — gaps/margins between sections
      // would fall outside every rect and wrongly snap back to index 0.)
      let currentIndex = 0;
      for (let idx = 0; idx < SECTIONS.length; idx++) {
        const el = document.getElementById(SECTIONS[idx].id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (scrollPosition >= top) {
          currentIndex = idx;
        } else {
          break;
        }
      }
      setActiveIndex(currentIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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

  const shipPercent = (activeIndex / LAST_INDEX) * 100;

  return (
    <div className="fixed top-1/2 right-4 z-[99] -translate-y-1/2 max-[991px]:hidden 2xl:right-6">
      <div className="rounded-[20px] border border-white/[0.08] bg-[rgba(13,18,32,0.6)] px-[12px] py-6 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-[10px] 2xl:rounded-[28px] 2xl:px-[18px] 2xl:py-9">
        <div
          className="relative w-[2px] rounded-full bg-white/[0.08] h-[var(--rail-h-sm)] 2xl:w-[3px] 2xl:h-[var(--rail-h-lg)]"
          style={
            {
              '--rail-h-sm': `${SECTIONS.length * 28}px`,
              '--rail-h-lg': `${SECTIONS.length * 38}px`,
            } as React.CSSProperties
          }
        >
          {/* Route fill */}
          <div
            className="absolute left-0 top-0 w-full rounded-full bg-gradient-to-b from-[#00a3ff] to-[rgba(0,163,255,0.15)] transition-[height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ height: `${shipPercent}%` }}
          />

          {/* Ship marker — travels to the active port */}
          <div
            className="pointer-events-none absolute left-1/2 z-[2] flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-[top] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] 2xl:h-8 2xl:w-8"
            style={{ top: `${shipPercent}%` }}
          >
            <Ship
              className="h-4 w-4 text-[#00a3ff] drop-shadow-[0_0_8px_rgba(0,163,255,0.9)] 2xl:h-[22px] 2xl:w-[22px]"
              strokeWidth={2.25}
            />
          </div>

          {/* Ports */}
          {SECTIONS.map((section, idx) => {
            const isActive = idx === activeIndex;
            const isDone = idx < activeIndex;
            const percent = (idx / LAST_INDEX) * 100;
            const Icon = section.icon;

            const borderClass = isActive
              ? 'border-[#00a3ff] shadow-[0_0_16px_rgba(0,163,255,0.75)] scale-110'
              : isDone
                ? 'border-[rgba(0,163,255,0.5)]'
                : 'border-white/20 group-hover:border-white/45';
            const iconClass = isActive
              ? 'text-[#00a3ff]'
              : isDone
                ? 'text-[#00a3ff]/60'
                : 'text-white/40 group-hover:text-white/70';

            return (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`group absolute left-1/2 z-[1] flex h-[22px] w-[22px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 bg-[#0a0e1a] p-0 outline-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] 2xl:h-[30px] 2xl:w-[30px] ${borderClass}`}
                style={{ top: `${percent}%` }}
                aria-label={`Ir a sección ${section.label}`}
              >
                <Icon className={`h-3 w-3 transition-colors duration-300 2xl:h-4 2xl:w-4 ${iconClass}`} strokeWidth={2.25} />

                <span className="pointer-events-none absolute right-8 translate-x-2.5 whitespace-nowrap rounded-md border border-white/[0.08] bg-[rgba(10,11,19,0.92)] px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 backdrop-blur-[8px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100 2xl:right-10 2xl:px-3 2xl:py-1.5 2xl:text-[13px]">
                  {section.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
