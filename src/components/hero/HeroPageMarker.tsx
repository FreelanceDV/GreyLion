import React from 'react';

/** Decorative "01" rail marker on the right side of the hero content. */
export default function HeroPageMarker() {
  return (
    <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 text-[rgba(255,255,255,0.4)] text-sm font-bold pointer-events-none animate-indicator-in max-[991px]:hidden motion-reduce:animate-none">
      <span className="text-[#00a3ff]">01</span>
      <div className="relative w-px h-[60px] bg-[rgba(255,255,255,0.15)]">
        <div className="absolute top-0 left-[-2px] w-[5px] h-[5px] rounded-full bg-[#00a3ff]" />
        <div className="absolute top-5 left-[-2px] w-[5px] h-[5px] rounded-full bg-[rgba(255,255,255,0.3)]" />
        <div className="absolute top-10 left-[-2px] w-[5px] h-[5px] rounded-full bg-[rgba(255,255,255,0.3)]" />
        <div className="absolute top-[60px] left-[-2px] w-[5px] h-[5px] rounded-full bg-[rgba(255,255,255,0.3)]" />
      </div>
    </div>
  );
}
