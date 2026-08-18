import { DEFAULT_FALLBACKS, LEGACY_MAPPING } from './constants';

interface ResolveMediaSrcArgs {
  config: Record<string, string>;
  lookupSrc: string;
  assetId?: string;
  fallbackSrc?: string;
}

/** Resolves the raw media URL for a lookup key: live config first, then its legacy alias, then fallbacks. */
export function resolveMediaSrc({ config, lookupSrc, assetId, fallbackSrc }: ResolveMediaSrcArgs): string {
  const legacyKey = LEGACY_MAPPING[lookupSrc] || '';
  return (
    config[lookupSrc] ||
    (legacyKey ? config[legacyKey] : '') ||
    fallbackSrc ||
    (assetId ? DEFAULT_FALLBACKS[assetId] : '') ||
    lookupSrc
  );
}

/** Appends an hourly cache-busting query param to cloud URLs, so updates roll out while CDN caching still helps. */
export function withHourlyCacheBuster(url: string): string {
  if (!url.startsWith('http')) return url;
  const hourlyBuster = Math.floor(Date.now() / (1000 * 60 * 60));
  const connector = url.includes('?') ? '&' : '?';
  return `${url}${connector}v=${hourlyBuster}`;
}

/** The local file to show before/instead of the cloud asset: an explicit fallback, or the assetId's known default. */
export function getDefaultLocalSrc(assetId: string | undefined, directSrc: string | undefined, fallbackSrc: string | undefined): string {
  if (assetId) return fallbackSrc || DEFAULT_FALLBACKS[assetId] || '';
  return directSrc || fallbackSrc || '';
}
