import { useEffect, useState } from 'react';

/**
 * Tracks whether the cloud (Blob) asset has finished loading or failed. `resetKey` should change
 * whenever the requested asset identity changes (assetId/src/fallbackSrc/skipDelay), so a new
 * asset always starts from a clean loaded/failed state.
 */
export function useCloudAssetStatus(resetKey: string) {
  const [isCloudLoaded, setIsCloudLoaded] = useState(false);
  const [isCloudFailed, setIsCloudFailed] = useState(false);

  useEffect(() => {
    setIsCloudLoaded(false);
    setIsCloudFailed(false);
  }, [resetKey]);

  return {
    isCloudLoaded,
    isCloudFailed,
    markLoaded: () => setIsCloudLoaded(true),
    markFailed: () => setIsCloudFailed(true),
  };
}
