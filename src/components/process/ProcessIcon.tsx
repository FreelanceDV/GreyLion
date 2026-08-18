import React from 'react';

export type ProcessIconName = 'shield' | 'network' | 'document' | 'crate' | 'archive' | 'checklist' | 'chevron-right';

const PATHS: Record<ProcessIconName, React.ReactNode> = {
  shield: <path d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z" />,
  network: (
    <>
      <path d="M2 21h20M19.3 14.8C21.1 13.5 22 11.7 22 9.5c0-3.3-2.7-6-6-6-2.1 0-3.9 1.1-5 2.8C9.9 4.6 8.1 3.5 6 3.5c-3.3 0-6 2.7-6 6 0 2.2.9 4 2.7 5.3" />
      <path d="M4.5 10.5h15M6 10.5v6.5M18 10.5v6.5M12 10.5v10.5" />
    </>
  ),
  document: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </>
  ),
  crate: (
    <>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </>
  ),
  archive: (
    <>
      <rect x="2" y="4" width="20" height="5" rx="1" />
      <path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
      <line x1="10" y1="13" x2="14" y2="13" />
    </>
  ),
  checklist: (
    <>
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <polyline points="9 14 11 16 15 12" />
    </>
  ),
  'chevron-right': <polyline points="9 18 15 12 9 6" />,
};

export default function ProcessIcon({
  name,
  className,
  strokeWidth = 2,
}: {
  name: ProcessIconName;
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
