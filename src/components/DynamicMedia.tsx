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

  // Primary: Fetch configuration file from Vercel Blob with cache-busting to bypass CDN caching
  const blobConfigUrl = 'https://77ydstadplufv4mf.public.blob.vercel-storage.com/media_config.json?t=' + Date.now();

  globalConfigPromise = fetch(blobConfigUrl, { cache: 'no-store' })
    .then((res) => {
      if (!res.ok) throw new Error('Blob configuration not found');
      return res.json();
    })
    .catch((err) => {
      console.warn('Vercel Blob config failed, falling back to local bundle:', err.message);
      // Secondary: Fallback to locally bundled file for offline/dev configurations
      return fetch('/media_config.json')
        .then((res) => {
          if (!res.ok) throw new Error('Local configuration not found');
          return res.json();
        });
    })
    .then((config) => {
      globalConfig = config;
      return config;
    })
    .catch((err) => {
      console.warn('All configurations failed, using defaults:', err.message);
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
        const rawSrc = config[assetId] || fallbackSrc || DEFAULT_FALLBACKS[assetId] || '';
        
        if (rawSrc && rawSrc.startsWith('http')) {
          // Add hourly cache-buster for cloud resources to ensure updates roll out while preserving CDN caching
          const hourlyBuster = Math.floor(Date.now() / (1000 * 60 * 60));
          const connector = rawSrc.includes('?') ? '&' : '?';
          setResolvedSrc(`${rawSrc}${connector}v=${hourlyBuster}`);
        } else {
          setResolvedSrc(rawSrc);
        }
      });
    }
  }, [assetId, directSrc, fallbackSrc]);

  if (!resolvedSrc) {
    return <div style={{ width: '100%', height: '100%', backgroundColor: '#070b12', ...style }} className={className} />;
  }

  // Detect file type from file extension
  const cleanUrl = resolvedSrc.split('?')[0].toLowerCase();
  const isVideo = cleanUrl.endsWith('.mp4') || cleanUrl.endsWith('.webm') || cleanUrl.endsWith('.ogg') || cleanUrl.endsWith('.mov');

  if (isVideo) {
    return (
      <video
        src={resolvedSrc}
        className={className}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
          ...style,
        }}
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
      className={className}
      alt=""
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        display: 'block',
        ...style,
      }}
      loading="lazy"
      {...props}
    />
  );
}
