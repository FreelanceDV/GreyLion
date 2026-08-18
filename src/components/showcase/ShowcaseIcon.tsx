import React from 'react';

export type ShowcaseIconName = 'check';

const PATHS: Record<ShowcaseIconName, React.ReactNode> = {
  check: <polyline points="20 6 9 17 4 12" />,
};

export default function ShowcaseIcon({ name, className }: { name: ShowcaseIconName; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[name]}
    </svg>
  );
}
