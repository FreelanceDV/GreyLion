import React from 'react';
import DynamicMedia from '../DynamicMedia';

export default function HeroBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute z-[1] top-[-9%] right-[17%] w-[min(54vw,780px)] aspect-square opacity-[0.32] pointer-events-none bg-[radial-gradient(circle,rgba(99,186,255,.65)_1px,transparent_1.4px)] bg-[length:15px_15px] [mask-image:radial-gradient(circle,#000_0_39%,transparent_72%)] [-webkit-mask-image:radial-gradient(circle,#000_0_39%,transparent_72%)] rotate-[-8deg] animate-route-pulse max-[768px]:top-[13%] max-[768px]:right-[-27%] max-[768px]:w-[93vw] motion-reduce:animate-none"
      />
      <div
        aria-hidden="true"
        className="absolute z-[2] inset-x-0 bottom-[31%] h-[2px] pointer-events-none bg-[linear-gradient(90deg,transparent,rgba(99,185,248,.08)_30%,rgba(255,211,151,.86)_62%,rgba(53,165,255,.1)_80%,transparent)] shadow-[0_0_29px_rgba(106,191,255,.45)] animate-horizon-glow max-[768px]:bottom-[33%] motion-reduce:animate-none"
      />

      {/* Background Image Container */}
      <div className="absolute right-0 top-0 bottom-0 w-full z-0 opacity-95 overflow-hidden animate-visual-reveal max-[768px]:opacity-[0.54] motion-reduce:animate-none">
        <DynamicMedia
          className="w-full h-full block object-cover object-center [filter:saturate(1.08)_contrast(1.04)_drop-shadow(-24px_35px_36px_rgba(0,0,0,.57))] origin-[72%_75%] animate-[var(--animate-ship-arrival),var(--animate-ship-drift)] motion-reduce:animate-none"
          src="/hero_ship_oceanis.png"
          alt=""
          aria-hidden="true"
        />
        {/* Soft Radial and Linear Gradients to blend image to background */}
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(to_right,#060d1c_0%,rgba(6,13,28,0.8)_25%,rgba(6,13,28,0.2)_70%,transparent_100%)]" />
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(to_top,#060d1c_0%,transparent_20%,transparent_80%,rgba(6,13,28,0.4)_100%)]" />
      </div>

      {/* Decorative Radial Glows */}
      <div className="absolute top-[10%] left-[5%] w-1/2 h-3/5 rounded-full bg-[radial-gradient(circle,rgba(27,108,168,0.15)_0%,transparent_70%)] blur-[100px] pointer-events-none z-[1]" />
    </>
  );
}
