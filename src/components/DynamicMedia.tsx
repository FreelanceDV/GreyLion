'use client';

import React, { useEffect, useState } from 'react';

// Shared module-level cache to prevent multiple fetches of the config file
let globalConfig: Record<string, string> | null = null;
let globalConfigPromise: Promise<Record<string, string>> | null = null;

const DEFAULT_FALLBACKS: Record<string, string> = {
  hero_ship: '/hero_ship_oceanis.jpg',
  maritime_transport: '/maritime_transport_card.jpg',
  integral_logistics: '/integral_logistics_card.jpg',
  background_video: '/charger_boat.mp4',
};

const fetchConfig = (): Promise<Record<string, string>> => {
  if (globalConfig) return Promise.resolve(globalConfig);
  if (globalConfigPromise) return globalConfigPromise;

  globalConfigPromise = fetch('/media_config.json')
    .then((res) => {
      if (!res.ok) throw new Error('Failed to load media config');
      return res.json();
    })
    .then((config) => {
      globalConfig = config;
      return config;
    })
    .catch((err) => {
      console.warn('Media config fetch failed, using default fallbacks:', err.message);
      globalConfig = DEFAULT_FALLBACKS;
      return DEFAULT_FALLBACKS;
    });

  return globalConfigPromise;
};

interface DynamicMediaProps {
  assetId?: string;
  src?: string; // Option to pass direct src if not using assetId
  fallbackSrc?: string;
  className?: string;
  style?: React.CSSProperties;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
}

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
  ...props
}: DynamicMediaProps) {
  const [resolvedSrc, setResolvedSrc] = useState<string>('');

  useEffect(() => {
    if (directSrc) {
      setResolvedSrc(directSrc);
      return;
    }

    if (assetId) {
      fetchConfig().then((config) => {
        setResolvedSrc(config[assetId] || fallbackSrc || DEFAULT_FALLBACKS[assetId] || '');
      });
    }
  }, [assetId, directSrc, fallbackSrc]);

  if (!resolvedSrc) {
    return (
      <div
        className={`w-full h-full bg-[#070b12] ${className || ''}`}
        style={style}
      />
    );
  }

  // Detect file type from file extension
  const cleanUrl = resolvedSrc.split('?')[0].toLowerCase();
  const isVideo = cleanUrl.endsWith('.mp4') || cleanUrl.endsWith('.webm') || cleanUrl.endsWith('.ogg') || cleanUrl.endsWith('.mov');

  if (isVideo) {
    return (
      <video
        src={resolvedSrc}
        className={`w-full h-full object-cover object-center block ${className || ''}`}
        style={style}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        preload="metadata"
        {...props}
      />
    );
  }

  // Fallback for image / gif / webp
  return (
    <img
      src={resolvedSrc}
      className={`w-full h-full object-cover object-center block ${className || ''}`}
      style={style}
      alt=""
      loading="lazy"
      {...props}
    />
  );
}
