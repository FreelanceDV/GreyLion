import React from 'react';
import { controlClasses, sendBaseClasses } from './styles';

interface ChatInputBarProps {
  customMessage: string;
  onChangeMessage: (value: string) => void;
  whatsappUrl?: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  sendLinkRef: React.RefObject<HTMLAnchorElement | null>;
}

export default function ChatInputBar({ customMessage, onChangeMessage, whatsappUrl, inputRef, sendLinkRef }: ChatInputBarProps) {
  return (
    <>
      <div className="flex gap-2 pt-[13px] px-[13px] pb-2 border-t border-border-light bg-background-dark">
        <label className="sr-only" htmlFor="whatsapp-message">Mensaje para GreyLion Maritime</label>
        <input
          ref={inputRef}
          id="whatsapp-message"
          className={`min-w-0 flex-1 rounded-[11px] outline-none bg-[#1a1f25] text-white text-[12px] px-3 py-[10px] border border-[rgba(255,255,255,.14)] placeholder:text-accent ${controlClasses}`}
          type="text"
          value={customMessage}
          onChange={(event) => onChangeMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && whatsappUrl) sendLinkRef.current?.click();
          }}
          placeholder="Escriba un mensaje…"
        />
        {whatsappUrl ? (
          <a
            ref={sendLinkRef}
            className={sendBaseClasses}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enviar mensaje a WhatsApp"
          >
            ↗
          </a>
        ) : (
          <button className={sendBaseClasses} type="button" disabled aria-label="Escriba o seleccione un mensaje para enviar">
            ↗
          </button>
        )}
      </div>
      <p className="m-0 px-[13px] pb-3 bg-background-dark text-accent text-[10px] text-center">Abrirá WhatsApp con su mensaje.</p>
    </>
  );
}
