import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { controlClasses } from './styles';

interface WhatsAppFABProps {
  open: boolean;
  onToggle: () => void;
}

export default function WhatsAppFAB({ open, onToggle }: WhatsAppFABProps) {
  return (
    <button
      className={`relative z-[2] grid w-[60px] h-[60px] place-items-center border border-[rgba(255,255,255,.16)] rounded-full bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-dark))] text-white shadow-[0_10px_30px_rgba(15,76,129,.45)] text-[29px] hover:-translate-y-0.5 hover:scale-[1.04] ${controlClasses}`}
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="whatsapp-title"
      aria-label={open ? 'Cerrar chat de WhatsApp' : 'Contactar por WhatsApp'}
    >
      {!open && (
        <span
          className="absolute -inset-0.5 z-[-1] border-2 border-primary rounded-[inherit] animate-whatsapp-ripple motion-reduce:animate-none"
          aria-hidden="true"
        />
      )}
      {open ? '×' : <WhatsAppIcon name="chat" className="w-[29px] h-[29px]" />}
    </button>
  );
}
