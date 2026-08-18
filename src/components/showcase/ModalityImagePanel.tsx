import React from 'react';
import DynamicMedia from '../dynamic-media';

interface ModalityImagePanelProps {
  src: string;
  alt: string;
}

export default function ModalityImagePanel({ src, alt }: ModalityImagePanelProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden min-h-[300px] max-[991px]:min-h-[220px]">
      <DynamicMedia src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
    </div>
  );
}
