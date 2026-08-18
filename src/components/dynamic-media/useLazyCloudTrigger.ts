import { useEffect, useRef, useState } from 'react';
import { DEFAULT_CLOUD_LOAD_DELAY_SECONDS } from './constants';

function getCloudLoadDelayMs(): number {
  const envDelay = process.env.NEXT_PUBLIC_MEDIA_DELAY_SECONDS;
  const delaySeconds = envDelay ? parseInt(envDelay, 10) : DEFAULT_CLOUD_LOAD_DELAY_SECONDS;
  return isNaN(delaySeconds) || delaySeconds < 0
    ? DEFAULT_CLOUD_LOAD_DELAY_SECONDS * 1000
    : delaySeconds * 1000;
}

/**
 * Defers downloading the cloud (Blob) asset until its container has been visible for a delay
 * (env-configurable via NEXT_PUBLIC_MEDIA_DELAY_SECONDS, default 30s), to avoid burning
 * free-tier bandwidth on assets nobody scrolls to. `skipDelay` bypasses this (e.g. for previews).
 * `resetKey` should match the one passed to useCloudAssetStatus, so both restart together
 * whenever the requested asset identity changes.
 */
export function useLazyCloudTrigger(isUsingCloud: boolean, resolvedSrc: string, resetKey: string, skipDelay: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadCloud, setShouldLoadCloud] = useState(skipDelay);

  useEffect(() => {
    setShouldLoadCloud(skipDelay);
  }, [resetKey]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isUsingCloud || shouldLoadCloud) return;

    const element = containerRef.current;
    if (!element) return;

    let timer: ReturnType<typeof setTimeout> | null = null;
    const delayMs = getCloudLoadDelayMs();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Container is visible: start delay timer
          timer = setTimeout(() => setShouldLoadCloud(true), delayMs);
        } else if (timer) {
          // Container is off screen: reset/cancel timer to save bandwidth
          clearTimeout(timer);
          timer = null;
        }
      },
      { threshold: 0.05 } // Trigger when at least 5% is visible
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      if (timer) clearTimeout(timer);
    };
  }, [isUsingCloud, resolvedSrc, shouldLoadCloud]);

  return { containerRef, shouldLoadCloud };
}
