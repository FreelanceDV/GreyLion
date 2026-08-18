'use client';

import React from 'react';
import { DynamicMediaProps } from './types';
import { isVideoSrc } from './isVideoSrc';
import { getDefaultLocalSrc } from './resolveMediaSrc';
import { useResolvedSrc } from './useResolvedSrc';
import { useCloudAssetStatus } from './useCloudAssetStatus';
import { useLazyCloudTrigger } from './useLazyCloudTrigger';
import MediaPlaceholder from './MediaPlaceholder';
import MediaElement from './MediaElement';
import LocalBackdropLayer from './LocalBackdropLayer';
import CloudFadeLayer from './CloudFadeLayer';

export default function DynamicMedia({
  assetId,
  src: directSrc,
  fallbackSrc,
  className,
  style,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  preload = 'none', // Lazy-load videos by default to save bandwidth
  loading = 'lazy', // Lazy-load images by default
  skipDelay = false,
  ...props
}: DynamicMediaProps) {
  const resolvedSrc = useResolvedSrc({ assetId, directSrc, fallbackSrc });
  const defaultLocalSrc = getDefaultLocalSrc(assetId, directSrc, fallbackSrc);
  const isUsingCloud = Boolean(resolvedSrc && resolvedSrc.startsWith('http'));

  // Both hooks share this key so a new requested asset resets loaded/failed status and the lazy-load delay together.
  const resetKey = `${assetId ?? ''}|${directSrc ?? ''}|${fallbackSrc ?? ''}|${skipDelay}`;
  const { isCloudLoaded, isCloudFailed, markLoaded, markFailed } = useCloudAssetStatus(resetKey);
  const { containerRef, shouldLoadCloud } = useLazyCloudTrigger(isUsingCloud, resolvedSrc, resetKey, skipDelay);

  const videoProps = { autoPlay, loop, muted, playsInline, preload, loading };

  if (!resolvedSrc) {
    return <MediaPlaceholder containerRef={containerRef} className={className} style={style} />;
  }

  if (resolvedSrc === 'none') {
    return null;
  }

  // If NOT using a cloud asset, render the local fallback asset directly without layers
  if (!isUsingCloud) {
    return (
      <MediaElement
        src={resolvedSrc}
        isVideo={isVideoSrc(resolvedSrc)}
        className={className}
        style={style}
        {...videoProps}
        {...props}
      />
    );
  }

  // If using a cloud asset, render dual overlapping layers for a smooth fade-in swap:
  // the local default stays visible until the cloud asset finishes loading, then crossfades in.
  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden bg-[#070b12] ${className || ''}`} style={style}>
      {defaultLocalSrc && <LocalBackdropLayer src={defaultLocalSrc} {...videoProps} />}

      {shouldLoadCloud && (
        <CloudFadeLayer
          src={resolvedSrc}
          isVisible={isCloudLoaded && !isCloudFailed}
          isFailed={isCloudFailed}
          onLoad={markLoaded}
          onError={() => {
            const kind = isVideoSrc(resolvedSrc) ? 'video' : 'image';
            console.warn(`Cloud ${kind} failed to load, falling back to local asset: ${resolvedSrc}`);
            markFailed();
          }}
          {...videoProps}
          {...props}
        />
      )}
    </div>
  );
}
