import React from 'react';
import MediaElement from './MediaElement';
import { isVideoSrc } from './isVideoSrc';

interface CloudFadeLayerProps {
  src: string;
  isVisible: boolean;
  isFailed: boolean;
  onLoad: () => void;
  onError: () => void;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
  loading?: 'lazy' | 'eager';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/** Layer 2 of the dual-layer crossfade: the cloud (Blob) asset, fading in smoothly once it finishes loading. */
export default function CloudFadeLayer({ src, isVisible, isFailed, onLoad, onError, ...mediaProps }: CloudFadeLayerProps) {
  return (
    <div
      className={`absolute inset-0 z-[2] transition-opacity duration-[800ms] ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={isFailed ? { display: 'none' } : undefined}
    >
      <MediaElement src={src} isVideo={isVideoSrc(src)} onLoad={onLoad} onError={onError} {...mediaProps} />
    </div>
  );
}
