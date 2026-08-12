'use client';
import Image from 'next/image';
import logoImg from '@/app/logo.jpg';

interface LogoProps {
  size?: number;
  showText?: boolean;
  textSize?: string;
}

export default function Logo({ size = 36, showText = true, textSize = '20px' }: LogoProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Image
        src={logoImg}
        alt="GreyLion Maritime Logo"
        width={size}
        height={size}
        style={{
          borderRadius: '50%',
          objectFit: 'cover',
          flexShrink: 0,
        }}
      />

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
