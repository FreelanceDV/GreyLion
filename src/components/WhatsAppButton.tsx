'use client';

import { useEffect, useRef, useState } from 'react';

const quickReplies = [
  { icon: '↗', text: 'Cotizar un envío' },
  { icon: '⌁', text: 'Consultar seguimiento' },
  { icon: '◫', text: 'Conocer nuestros servicios' },
  { icon: '⚙', text: 'Maquinaria pesada' },
];

const controlClasses =
  'cursor-pointer transition-[transform,background-color,border-color] duration-[180ms] ease-[ease] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[3px] motion-reduce:transition-none';

const messageBaseClasses = 'max-w-[250px] px-3 py-[10px] border text-[12px] leading-[1.5]';

const replyBaseClasses = `flex items-center gap-[10px] w-full px-[11px] py-[10px] rounded-[11px] border text-[#e9ebef] text-[12px] font-semibold text-left hover:border-accent hover:bg-[rgba(15,76,129,.25)] ${controlClasses}`;

const sendBaseClasses = `grid w-10 place-items-center rounded-[11px] border-0 bg-primary text-white text-[18px] no-underline disabled:cursor-not-allowed disabled:bg-[#29323a] disabled:text-accent ${controlClasses}`;

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [customMessage, setCustomMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const sendLinkRef = useRef<HTMLAnchorElement>(null);
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573001234567';
  const activeMessage = customMessage.trim() || selectedMessage;
  const whatsappUrl = activeMessage
    ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(activeMessage)}`
    : undefined;

  useEffect(() => {
    if (!open) return;

    const focusInput = window.setTimeout(() => inputRef.current?.focus(), 150);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.body.classList.add('overflow-hidden');
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.clearTimeout(focusInput);
      document.body.classList.remove('overflow-hidden');
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  const selectReply = (message: string) => {
    setSelectedMessage((current) => (current === message ? null : message));
    setCustomMessage('');
  };

  return (
    <div className="fixed right-8 bottom-8 max-[520px]:right-4 max-[520px]:bottom-4 z-[100] font-[family-name:var(--font-inter)]">
      {open && (
        <button
          className="fixed inset-0 z-0 border-0 bg-[rgba(3,7,12,.68)] backdrop-blur-[9px]"
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Cerrar chat"
        />
      )}

      {open && (
        <div className="absolute right-0 bottom-[calc(100%+14px)] z-[1] w-[min(390px,calc(100vw-32px))] max-[520px]:w-[calc(100vw-32px)]">
          <section
            className="w-full overflow-hidden rounded-[20px] border border-[rgba(140,150,158,.28)] bg-background-black shadow-[0_20px_55px_rgba(0,0,0,.52)] animate-whatsapp-reveal motion-reduce:animate-none"
            role="dialog"
            aria-labelledby="whatsapp-title"
          >
            <div className="h-[3px] bg-[linear-gradient(90deg,var(--color-primary-dark),var(--color-primary),var(--color-accent))]" />
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
                onClick={() => setOpen(false)}
                aria-label="Cerrar chat"
              >
                ×
              </button>
            </header>

            <div className="flex flex-col gap-[10px] max-h-[min(430px,calc(100dvh-220px))] max-[520px]:max-h-[min(430px,calc(100dvh-154px))] overflow-y-auto p-4 bg-[radial-gradient(circle_at_5%_95%,rgba(15,76,129,.18),transparent_43%),#0d1014]">
              <div className={`${messageBaseClasses} self-start rounded-[14px_14px_14px_4px] bg-[#171b20] border-[rgba(255,255,255,.1)] text-[#e9ebef]`}>¡Hola! Somos GreyLion Maritime. ¿Cómo podemos ayudarle?</div>
              <p className="mt-[-6px] mb-[2px] ml-1 text-accent text-[10px]">GreyLion · ahora</p>
              <div className={`${messageBaseClasses} self-start rounded-[14px_14px_14px_4px] bg-[#171b20] border-[rgba(255,255,255,.1)] text-[#e9ebef]`}>Elija una opción o escriba su propio mensaje.</div>

              <div className="grid gap-2 mt-[2px]" aria-label="Opciones de contacto">
              {quickReplies.map(({ icon, text }) => {
                const isSelected = selectedMessage === text;
                return (
                  <button
                    key={text}
                    className={`${replyBaseClasses} ${isSelected ? 'border-accent bg-[rgba(15,76,129,.25)]' : 'border-[rgba(15,76,129,.55)] bg-background-dark'}`}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => selectReply(text)}
                  >
                    <span className="grid w-[23px] h-[23px] place-items-center rounded-[7px] bg-primary text-[#e0efff] text-[13px]" aria-hidden="true">{icon}</span>
                    {text}
                    {isSelected && <span className="ml-auto text-[#dceeff]" aria-hidden="true">✓</span>}
                  </button>
                );
              })}
              </div>

              {activeMessage && (
                <div className={`${messageBaseClasses} self-end rounded-[14px_14px_4px_14px] bg-primary border-[rgba(140,150,158,.45)] text-white`}>{activeMessage}</div>
              )}
            </div>

            <div className="flex gap-2 pt-[13px] px-[13px] pb-2 border-t border-border-light bg-background-dark">
              <label className="sr-only" htmlFor="whatsapp-message">Mensaje para GreyLion Maritime</label>
              <input
                ref={inputRef}
                id="whatsapp-message"
                className={`min-w-0 flex-1 rounded-[11px] outline-none bg-[#1a1f25] text-white text-[12px] px-3 py-[10px] border border-[rgba(255,255,255,.14)] placeholder:text-accent ${controlClasses}`}
                type="text"
                value={customMessage}
                onChange={(event) => {
                  setCustomMessage(event.target.value);
                  if (event.target.value) setSelectedMessage(null);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && whatsappUrl) sendLinkRef.current?.click();
                }}
                placeholder="Escriba un mensaje…"
              />
              {whatsappUrl ? (
                <a ref={sendLinkRef} className={sendBaseClasses} href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Enviar mensaje a WhatsApp">↗</a>
              ) : (
                <button className={sendBaseClasses} type="button" disabled aria-label="Escriba o seleccione un mensaje para enviar">↗</button>
              )}
            </div>
            <p className="m-0 px-[13px] pb-3 bg-background-dark text-accent text-[10px] text-center">Abrirá WhatsApp con su mensaje.</p>
          </section>
        </div>
      )}

      <button
        className={`relative z-[2] grid w-[60px] h-[60px] place-items-center border border-[rgba(255,255,255,.16)] rounded-full bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-dark))] text-white shadow-[0_10px_30px_rgba(15,76,129,.45)] text-[29px] hover:-translate-y-0.5 hover:scale-[1.04] ${controlClasses}`}
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls="whatsapp-title"
        aria-label={open ? 'Cerrar chat de WhatsApp' : 'Contactar por WhatsApp'}
      >
        {!open && <span className="absolute -inset-0.5 z-[-1] border-2 border-primary rounded-[inherit] animate-whatsapp-ripple motion-reduce:animate-none" aria-hidden="true" />}
        {open ? '×' : (
          <svg className="w-[29px] h-[29px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
      </button>
    </div>
  );
}
