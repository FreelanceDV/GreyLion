import React from 'react';
import MediaElement from './MediaElement';
import { isVideoSrc } from './isVideoSrc';

interface LocalBackdropLayerProps {
  src: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
  loading?: 'lazy' | 'eager';
}

/** Layer 1 of the dual-layer crossfade: the local default file, visible instantly and until the cloud asset is ready. */
export default function LocalBackdropLayer({ src, ...mediaProps }: LocalBackdropLayerProps) {
  return (
    <div className="absolute inset-0 z-[1]">
      <MediaElement src={src} isVideo={isVideoSrc(src)} {...mediaProps} />
    </div>
  );
}
