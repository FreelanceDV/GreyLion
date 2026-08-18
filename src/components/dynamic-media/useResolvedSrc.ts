import { useEffect, useState } from 'react';
import { fetchMediaConfig } from './mediaConfigCache';
import { resolveMediaSrc, withHourlyCacheBuster } from './resolveMediaSrc';

interface UseResolvedSrcArgs {
  assetId?: string;
  directSrc?: string;
  fallbackSrc?: string;
}

/** Resolves the live src for an assetId/directSrc by consulting the shared media config, with cache-busting for cloud URLs. */
export function useResolvedSrc({ assetId, directSrc, fallbackSrc }: UseResolvedSrcArgs): string {
  const [resolvedSrc, setResolvedSrc] = useState('');

  useEffect(() => {
    const lookupSrc = directSrc || assetId || '';
    if (!lookupSrc) return;

    fetchMediaConfig().then((config) => {
      const rawSrc = resolveMediaSrc({ config, lookupSrc, assetId, fallbackSrc });
      setResolvedSrc(withHourlyCacheBuster(rawSrc));
    });
  }, [assetId, directSrc, fallbackSrc]);

  return resolvedSrc;
}
