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
    <div className="flex items-center gap-[10px]">
      <Image
        src={logoImg}
        alt="GreyLion Maritime Logo"
        width={size}
        height={size}
        className="rounded-full object-cover shrink-0"
      />

      {showText && (
        <span
          className="font-space-grotesk font-extrabold tracking-[-0.7px] text-text-white select-none"
          style={{ fontSize: textSize }}
        >
          GreyLion <span className="text-primary-hover">Maritime</span>
        </span>
      )}
    </div>
  );
}
