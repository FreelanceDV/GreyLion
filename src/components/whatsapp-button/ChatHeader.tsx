import React from 'react';
import { controlClasses } from './styles';

interface ChatHeaderProps {
  onClose: () => void;
}

export default function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between py-[15px] px-4 border-b border-border-light bg-background-dark">
      <div className="flex gap-[11px] items-center">
        <span className="grid w-[38px] h-[38px] place-items-center border border-[rgba(255,255,255,.16)] rounded-xl bg-primary text-white text-[20px]" aria-hidden="true">◔</span>
        <div>
          <h2 id="whatsapp-title" className="m-0 text-white text-[14px] leading-[1.2]">GreyLion Maritime</h2>
          <p className="flex gap-[6px] items-center mt-1 mb-0 text-[#41bd7b] text-[11px] font-semibold">
            <span className="w-[6px] h-[6px] rounded-full bg-current" />
            Equipo disponible
          </p>
        </div>
      </div>
      <button
        className={`grid w-[30px] h-[30px] place-items-center border border-[rgba(255,255,255,.1)] rounded-[9px] bg-[#1a1f25] text-text-gray text-[22px] leading-none ${controlClasses}`}
        type="button"
        onClick={onClose}
        aria-label="Cerrar chat"
      >
        ×
      </button>
    </header>
  );
}
