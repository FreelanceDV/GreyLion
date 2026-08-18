import { DEFAULT_FALLBACKS, MEDIA_CONFIG_BLOB_URL, MEDIA_CONFIG_LOCAL_URL } from './constants';

// Shared module-level cache to prevent multiple fetches of the config file across all DynamicMedia instances.
let globalConfig: Record<string, string> | null = null;
let globalConfigPromise: Promise<Record<string, string>> | null = null;

/**
 * Fetches the site's media config: primarily from Vercel Blob (source of truth for admin-uploaded
 * assets), falling back to the locally bundled file, then to DEFAULT_FALLBACKS if both fail.
 * Cached at module scope so every DynamicMedia instance shares one fetch.
 */
export function fetchMediaConfig(): Promise<Record<string, string>> {
  if (globalConfig) return Promise.resolve(globalConfig);
  if (globalConfigPromise) return globalConfigPromise;

  // Primary: Fetch configuration file from Vercel Blob with cache-busting to bypass CDN caching
  const blobConfigUrl = `${MEDIA_CONFIG_BLOB_URL}?t=${Date.now()}`;

  globalConfigPromise = fetch(blobConfigUrl, { cache: 'no-store' })
    .then((res) => {
      if (!res.ok) throw new Error('Blob configuration not found');
      return res.json();
    })
    .catch((err) => {
      console.warn('Vercel Blob config failed, falling back to local bundle:', err.message);
      // Secondary: Fallback to locally bundled file for offline/dev configurations
      return fetch(MEDIA_CONFIG_LOCAL_URL).then((res) => {
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
}
