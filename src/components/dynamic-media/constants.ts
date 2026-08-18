/** Default local fallback files per known assetId, used before any remote config has loaded. */
export const DEFAULT_FALLBACKS: Record<string, string> = {
  hero_ship: '/hero_ship_oceanis.jpg',
  maritime_transport: '/maritime_transport_card.jpg',
  integral_logistics: '/integral_logistics_card.jpg',
  bg_about: '/charger_boat.mp4',
  bg_comparison: '/charger_boat.mp4',
  bg_cta: '/charger_boat.mp4',
};

/**
 * Maps old assetId/src values (from before the admin media manager) to their current config key,
 * so previously-uploaded assets keep resolving after a naming migration.
 */
export const LEGACY_MAPPING: Record<string, string> = {
  '/hero_ship_oceanis.png': 'hero_ship',
  '/hero_ship_oceanis.jpg': 'hero_ship',
  '/maritime_transport_card.jpg': 'maritime_transport',
  '/integral_logistics_card.jpg': 'integral_logistics',
  bg_about: 'background_video',
  bg_comparison: 'background_video',
  bg_cta: 'bg_cta',
  '/charger_boat.mp4': 'background_video',
  '/ready_to_move_your_cargo.png': 'bg_cta',
};

export const MEDIA_CONFIG_BLOB_URL = 'https://77ydstadplufv4mf.public.blob.vercel-storage.com/media_config.json';
export const MEDIA_CONFIG_LOCAL_URL = '/media_config.json';

/** Fallback delay (seconds) before downloading a cloud asset, used when NEXT_PUBLIC_MEDIA_DELAY_SECONDS is unset/invalid. */
export const DEFAULT_CLOUD_LOAD_DELAY_SECONDS = 30;
