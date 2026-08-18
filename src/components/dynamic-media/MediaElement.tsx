import React from 'react';

export interface MediaElementProps {
  src: string;
  isVideo: boolean;
  className?: string;
  style?: React.CSSProperties;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const BASE_MEDIA_CLASSES = 'w-full h-full object-cover object-center block';

/**
 * Renders a single <video> or <img> for a resolved media src — the shared atomic building block
 * every DynamicMedia render path (direct render, backdrop layer, cloud layer) is built from.
 * Change how a single media tag renders here and every path picks it up.
 */
export default function MediaElement({
  src,
  isVideo,
  className,
  style,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  preload = 'none',
  loading = 'lazy',
  onLoad,
  onError,
  ...props
}: MediaElementProps) {
  const combinedClassName = `${BASE_MEDIA_CLASSES} ${className || ''}`.trim();

  if (isVideo) {
    return (
      <video
        src={src}
        className={combinedClassName}
        style={style}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        preload={preload}
        onLoadedData={onLoad}
        onCanPlay={onLoad}
        onError={onError}
        {...props}
      />
    );
  }

  return (
    <img
      src={src}
      alt=""
      className={combinedClassName}
      style={style}
      loading={loading}
      onLoad={onLoad}
      onError={onError}
      {...props}
    />
  );
}
