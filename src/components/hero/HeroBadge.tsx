import React from 'react';

export default function HeroBadge() {
  return (
    <div className="flex items-center gap-4 w-full">
      <span className="text-[13px] font-semibold text-text-muted tracking-[0.15em] uppercase">
        Conectamos el mundo
      </span>
      <div className="h-px grow max-w-[120px] bg-[rgba(255,255,255,0.2)]" />
    </div>
  );
}
