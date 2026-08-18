import React from 'react';

interface MediaPlaceholderProps {
  containerRef?: React.Ref<HTMLDivElement>;
  className?: string;
  style?: React.CSSProperties;
}

/** Rendered while the media source hasn't resolved yet — an empty dark box matching the eventual media's footprint. */
export default function MediaPlaceholder({ containerRef, className, style }: MediaPlaceholderProps) {
  return <div ref={containerRef} className={`w-full h-full bg-[#070b12] ${className || ''}`} style={style} />;
}
