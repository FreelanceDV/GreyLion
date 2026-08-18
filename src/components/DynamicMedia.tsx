'use client';

import React, { useEffect, useState, useRef } from 'react';

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
  preload?: 'auto' | 'metadata' | 'none';
  loading?: 'lazy' | 'eager';
  skipDelay?: boolean; // Skip the 30-second delay (useful for previews or immediate loading)
  [key: string]: any; // Allow any extra props like alt, width, height, etc.
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
  preload = 'none', // Lazy-load videos by default to save bandwidth
  loading = 'lazy', // Lazy-load images by default
  skipDelay = false,
  ...props
}: DynamicMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [resolvedSrc, setResolvedSrc] = useState<string>('');
  const [isCloudLoaded, setIsCloudLoaded] = useState(false);
  const [isCloudFailed, setIsCloudFailed] = useState(false);
  const [shouldLoadCloud, setShouldLoadCloud] = useState(skipDelay);

  useEffect(() => {
    setIsCloudLoaded(false); // Reset loaded flag when source changes
    setIsCloudFailed(false); // Reset failed flag when source changes
    setShouldLoadCloud(skipDelay); // Reset delay trigger with skipDelay state

    const lookupSrc = directSrc || assetId || '';
    if (lookupSrc) {
      fetchConfig().then((config) => {
        // Look up by assetId/directSrc first, fallback to fallbackSrc/defaults, then lookupSrc itself
        const rawSrc = config[lookupSrc] || fallbackSrc || (assetId ? DEFAULT_FALLBACKS[assetId] : '') || lookupSrc;
        
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
  }, [assetId, directSrc, fallbackSrc, skipDelay]);

  const defaultLocalSrc = assetId
    ? (fallbackSrc || DEFAULT_FALLBACKS[assetId] || '')
    : (directSrc || fallbackSrc || '');
  
  const isUsingCloud = resolvedSrc && resolvedSrc.startsWith('http');

  // IntersectionObserver to detect when component is visible on screen for 30s before downloading
  useEffect(() => {
    if (!isUsingCloud || shouldLoadCloud) return;

    const element = containerRef.current;
    if (!element) return;

    let timer: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Component is visible: start 30s timer
          timer = setTimeout(() => {
            setShouldLoadCloud(true);
          }, 30000); // 30,000 milliseconds = 30 seconds
        } else {
          // Component is off screen: reset/cancel timer to save bandwidth
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
        }
      },
      { threshold: 0.05 } // Trigger when at least 5% is visible
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isUsingCloud, resolvedSrc, shouldLoadCloud]);

  if (!resolvedSrc) {
    return (
      <div
        ref={containerRef}
        className={`w-full h-full bg-[#070b12] ${className || ''}`}
        style={style}
      />
    );
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
          preload={preload}
          {...props}
        />
      );
    }
    return (
      <img
        src={resolvedSrc}
        alt=""
        className={`w-full h-full object-cover object-center block ${className || ''}`}
        style={style}
        loading={loading}
        {...props}
      />
    );
  }

  // If using a cloud asset, render dual overlapping layers for a smooth fade-in swap:
  // the local default stays visible until the cloud asset finishes loading, then crossfades in.
  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-[#070b12] ${className || ''}`}
      style={style}
    >
      {/* Layer 1: Backdrop local default file (loads instantly, remains visible until cloud is ready) */}
      {defaultLocalSrc && (
        <div className="absolute inset-0 z-[1]">
          {isLocalVideo ? (
            <video
              src={defaultLocalSrc}
              className="w-full h-full object-cover object-center block"
              autoPlay={autoPlay}
              loop={loop}
              muted={muted}
              playsInline={playsInline}
              preload={preload}
            />
          ) : (
            <img
              src={defaultLocalSrc}
              alt=""
              className="w-full h-full object-cover object-center block"
              loading={loading}
            />
          )}
        </div>
      )}

      {/* Layer 2: Cloud Blob asset (loads in background, transitions to visible opacity smoothly) */}
      {/* ONLY rendered/downloaded if shouldLoadCloud is true (30 seconds on-screen threshold or skipDelay is true) */}
      {shouldLoadCloud && (
        <div
          className={`absolute inset-0 z-[2] transition-opacity duration-[800ms] ease-in-out ${isCloudLoaded && !isCloudFailed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          style={isCloudFailed ? { display: 'none' } : undefined}
        >
          {isVideo ? (
            <video
              src={resolvedSrc}
              className="w-full h-full object-cover object-center block"
              autoPlay={autoPlay}
              loop={loop}
              muted={muted}
              playsInline={playsInline}
              preload={preload}
              onLoadedData={() => setIsCloudLoaded(true)}
              onCanPlay={() => setIsCloudLoaded(true)}
              onError={() => {
                console.warn(`Cloud video failed to load, falling back to local asset: ${resolvedSrc}`);
                setIsCloudFailed(true);
              }}
              {...props}
            />
          ) : (
            <img
              src={resolvedSrc}
              alt=""
              className="w-full h-full object-cover object-center block"
              loading={loading}
              onLoad={() => setIsCloudLoaded(true)}
              onError={() => {
                console.warn(`Cloud image failed to load, falling back to local asset: ${resolvedSrc}`);
                setIsCloudFailed(true);
              }}
              {...props}
            />
          )}
        </div>
      )}
    </div>
  );
}
