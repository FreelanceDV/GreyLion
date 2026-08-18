import React from 'react';
import DynamicMedia from '../dynamic-media';

export default function WhyChooseImage() {
  return (
    <div className="relative min-h-[280px] max-[991px]:min-h-[220px]">
      <DynamicMedia
        src="/why_choose.png"
        alt="Grúa portuaria cargando contenedores de GreyLion Maritime"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,13,28,0.35)_0%,transparent_25%)] max-[991px]:hidden" />
    </div>
  );
}
