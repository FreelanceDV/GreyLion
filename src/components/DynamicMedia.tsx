'use client';

import React, { useEffect, useState } from 'react';

// Shared module-level cache to prevent multiple fetches of the config file
let globalConfig: Record<string, string> | null = null;
let globalConfigPromise: Promise<Record<string, string>> | null = null;

const DEFAULT_FALLBACKS: Record<string, string> = {
  hero_ship: '/hero_ship_oceanis.jpg',
  maritime_transport: '/maritime_transport_card.jpg',
  integral_logistics: '/integral_logistics_card.jpg',
  bg_about: '/charger_boat.mp4',
  bg_comparison: '/charger_boat.mp4',
  bg_cta: '/charger_boat.mp4',
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
  const [isCloudLoaded, setIsCloudLoaded] = useState(false);

  useEffect(() => {
    setIsCloudLoaded(false); // Reset loaded flag when source changes

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

  const defaultLocalSrc = assetId ? (fallbackSrc || DEFAULT_FALLBACKS[assetId] || '') : '';
  const isUsingCloud = resolvedSrc && resolvedSrc.startsWith('http');

  if (!resolvedSrc) {
    return <div style={{ width: '100%', height: '100%', backgroundColor: '#070b12', ...style }} className={className} />;
  }

  if (resolvedSrc === 'none') {
    return null;
  }

  // Detect file type from file extension for cloud asset
  const cleanUrl = resolvedSrc.split('?')[0].toLowerCase();
  const isVideo = cleanUrl.endsWith('.mp4') || cleanUrl.endsWith('.webm') || cleanUrl.endsWith('.ogg') || cleanUrl.endsWith('.mov');

  // Detect file type from file extension for local default asset
  const cleanLocalUrl = defaultLocalSrc.split('?')[0].toLowerCase();
  const isLocalVideo = cleanLocalUrl.endsWith('.mp4') || cleanLocalUrl.endsWith('.webm') || cleanLocalUrl.endsWith('.ogg') || cleanLocalUrl.endsWith('.mov');

  // If NOT using a cloud asset, render local fallback asset directly without layers
  if (!isUsingCloud) {
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
          preload="auto"
          {...props}
        />
      );
    }
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
        loading="eager"
        {...props}
      />
    );
  }

  // If using a cloud asset, render dual overlapping layers for a smooth fade-in swap
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#070b12',
        ...style,
      }}
    >
      {/* Layer 1: Backdrop local default file (loads instantly, remains visible until cloud is ready) */}
      {defaultLocalSrc && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          {isLocalVideo ? (
            <video
              src={defaultLocalSrc}
              style={{
                width: '100%',
                height: '100%',
                objectFit: style?.objectFit || 'cover',
                objectPosition: style?.objectPosition || 'center',
                display: 'block',
              }}
              autoPlay={autoPlay}
              loop={loop}
              muted={muted}
              playsInline={playsInline}
              preload="auto"
            />
          ) : (
            <img
              src={defaultLocalSrc}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: style?.objectFit || 'cover',
                objectPosition: style?.objectPosition || 'center',
                display: 'block',
              }}
              loading="eager"
            />
          )}
        </div>
      )}

      {/* Layer 2: Cloud Blob asset (loads in background, transitions to visible opacity smoothly) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          opacity: isCloudLoaded ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
        }}
      >
        {isVideo ? (
          <video
            src={resolvedSrc}
            style={{
              width: '100%',
              height: '100%',
              objectFit: style?.objectFit || 'cover',
              objectPosition: style?.objectPosition || 'center',
              display: 'block',
            }}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            playsInline={playsInline}
            preload="auto"
            onLoadedData={() => setIsCloudLoaded(true)}
            onCanPlay={() => setIsCloudLoaded(true)}
            {...props}
          />
        ) : (
          <img
            src={resolvedSrc}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: style?.objectFit || 'cover',
              objectPosition: style?.objectPosition || 'center',
              display: 'block',
            }}
            onLoad={() => setIsCloudLoaded(true)}
            {...props}
          />
        )}
      </div>
    </div>
  );
}
