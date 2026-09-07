'use client';
import Image from 'next/image';
import logoImg from '@/app/logo.png';

interface LogoProps {
  size?: number;
  showText?: boolean;
  textSize?: string;
}

export default function Logo({ size = 52, showText = true, textSize = '23px' }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="relative flex shrink-0 items-center justify-center transition-transform duration-300 ease-out group-hover:scale-[1.06]"
        style={{ width: size, height: size }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-[-35%] rounded-full bg-[radial-gradient(circle,rgba(27,108,168,0.55)_0%,rgba(27,108,168,0.18)_45%,transparent_72%)] blur-[6px]"
        />
        <Image
          src={logoImg}
          alt="GreyLion Maritime Logo"
          width={size}
          height={size}
          priority
          className="relative z-10 object-contain drop-shadow-[0_3px_14px_rgba(0,0,0,0.6)]"
        />
      </div>

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
