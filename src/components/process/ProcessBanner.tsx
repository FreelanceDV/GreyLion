import React from 'react';
import DynamicMedia from '../DynamicMedia';

/** Bottom banner photo: full-bleed, pulled up to overlap the content above so it blends into the section instead of sitting as a separate block. */
export default function ProcessBanner() {
  return (
    <div className="relative z-0 w-full min-h-[340px] -mt-45">
      <DynamicMedia
        src="/comprehensive_operations_management.png"
        alt="Operación portuaria de GreyLion Maritime"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-background-dark)_0%,rgba(11,18,32,0.7)_18%,transparent_45%)]" />
    </div>
  );
}
