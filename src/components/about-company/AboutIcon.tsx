import React from 'react';

export type AboutIconName = 'mission' | 'vision' | 'route' | 'value' | 'shield' | 'guide' | 'check';

const PATHS: Record<AboutIconName, React.ReactNode> = {
  mission: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  vision: (
    <>
      <path d="M2 12s3.7-6 10-6 10 6 10 6-3.7 6-10 6S2 12 2 12Z" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  route: (
    <>
      <path d="M5 17c2.5-3 3-7 6-9s5 .5 8-3" />
      <path d="M16 5h3v3" />
      <circle cx="5" cy="17" r="1.5" />
    </>
  ),
  value: (
    <>
      <path d="M4 17 10 11l4 4 6-8" />
      <path d="M17 7h3v3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z" />
      <path d="m8.5 12 2.2 2.2 4.8-4.8" />
    </>
  ),
  guide: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="m9.5 9.5 5 5M14.5 9.5v5h-5" />
    </>
  ),
  check: <polyline points="20 6 9 17 4 12" />,
};

export default function AboutIcon({
  name,
  className,
  strokeWidth = 2,
}: {
  name: AboutIconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[name]}
    </svg>
  );
}
