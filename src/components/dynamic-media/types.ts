import React from 'react';

export interface DynamicMediaProps {
  assetId?: string;
  /** Direct src to look up/render, as an alternative to assetId. */
  src?: string;
  fallbackSrc?: string;
  className?: string;
  style?: React.CSSProperties;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
  loading?: 'lazy' | 'eager';
  /** Skip the visibility delay before downloading the cloud asset (e.g. for previews or immediate loading). */
  skipDelay?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
