'use client';

import React from 'react';

interface LogoProps {
  size?: number;
  showText?: boolean;
  textSize?: string;
}

export default function Logo({ size = 36, showText = true, textSize = '20px' }: LogoProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {/* Premium SVG Icon: Lion & Anchor motif */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, filter: 'drop-shadow(0 2px 8px rgba(15, 76, 129, 0.25))' }}
      >
        {/* Outer Ring / Compass structure */}
        <circle cx="50" cy="50" r="44" stroke="var(--accent)" strokeWidth="3" strokeDasharray="3 3" opacity="0.6" />
        <circle cx="50" cy="50" r="40" stroke="var(--primary-hover)" strokeWidth="1.5" opacity="0.3" />
        
        {/* Anchor / Maritime base elements */}
        <path
          d="M50 15 V75 M32 60 C36 78, 64 78, 68 60 M26 60 H38 M62 60 H74"
          stroke="var(--primary-hover)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Stylized geometric lion head */}
        {/* Mane / Crown */}
        <path
          d="M50 25 L65 35 L60 45 L50 40 L40 45 L35 35 Z"
          fill="var(--primary)"
          stroke="var(--primary-hover)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Face structure */}
        <path
          d="M40 45 L50 40 L60 45 L55 58 L50 63 L45 58 Z"
          fill="var(--accent)"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Snout & Nose */}
        <path
          d="M47 52 L53 52 L50 56 Z"
          fill="#121417"
        />
        <path
          d="M50 56 V63 M47 61 H53"
          stroke="#121417"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Eyes */}
        <polygon points="44,48 48,49 46,51" fill="#FFFFFF" />
        <polygon points="56,48 52,49 54,51" fill="#FFFFFF" />
        
        {/* Waves at the bottom */}
        <path
          d="M20 82 Q35 78 50 82 T80 82"
          stroke="var(--primary-hover)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>

      {showText && (
        <span
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: textSize,
            fontWeight: 800,
            letterSpacing: '-0.7px',
            color: 'var(--text-white)',
            userSelect: 'none',
          }}
        >
          GreyLion <span style={{ color: 'var(--primary-hover)' }}>Maritime</span>
        </span>
      )}
    </div>
  );
}
