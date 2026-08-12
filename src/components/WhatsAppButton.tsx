'use client';

import { useEffect, useRef, useState } from 'react';

const quickReplies = [
  { icon: '↗', text: 'Cotizar un envío' },
  { icon: '⌁', text: 'Consultar seguimiento' },
  { icon: '◫', text: 'Conocer nuestros servicios' },
  { icon: '⚙', text: 'Maquinaria pesada' },
];

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

    document.body.classList.add('overlay-open');
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.clearTimeout(focusInput);
      document.body.classList.remove('overlay-open');
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  const selectReply = (message: string) => {
    setSelectedMessage((current) => (current === message ? null : message));
    setCustomMessage('');
  };

  return (
    <div className="whatsapp-widget">
      {open && (
        <button className="backdrop" type="button" onClick={() => setOpen(false)} aria-label="Cerrar chat" />
      )}

      {open && (
        <div className="modal-layer">
          <section className="panel" role="dialog" aria-labelledby="whatsapp-title">
            <div className="accent-line" />
            <header className="header">
              <div className="brand">
                <span className="brand-mark" aria-hidden="true">◔</span>
                <div>
                  <h2 id="whatsapp-title">GreyLion Maritime</h2>
                  <p><span className="availability-dot" />Equipo disponible</p>
                </div>
              </div>
              <button className="close control" type="button" onClick={() => setOpen(false)} aria-label="Cerrar chat">×</button>
            </header>

            <div className="conversation">
              <div className="message message-company">¡Hola! Somos GreyLion Maritime. ¿Cómo podemos ayudarle?</div>
              <p className="timestamp">GreyLion · ahora</p>
              <div className="message message-company">Elija una opción o escriba su propio mensaje.</div>

              <div className="quick-replies" aria-label="Opciones de contacto">
              {quickReplies.map(({ icon, text }) => {
                const isSelected = selectedMessage === text;
                return (
                  <button
                    key={text}
                    className={`reply control${isSelected ? ' selected' : ''}`}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => selectReply(text)}
                  >
                    <span className="reply-icon" aria-hidden="true">{icon}</span>
                    {text}
                    {isSelected && <span className="check" aria-hidden="true">✓</span>}
                  </button>
                );
              })}
              </div>

              {activeMessage && <div className="message message-visitor">{activeMessage}</div>}
            </div>

            <div className="composer">
              <label className="sr-only" htmlFor="whatsapp-message">Mensaje para GreyLion Maritime</label>
              <input
                ref={inputRef}
                id="whatsapp-message"
                className="message-input control"
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
                <a ref={sendLinkRef} className="send control" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Enviar mensaje a WhatsApp">↗</a>
              ) : (
                <button className="send control" type="button" disabled aria-label="Escriba o seleccione un mensaje para enviar">↗</button>
              )}
            </div>
            <p className="privacy-note">Abrirá WhatsApp con su mensaje.</p>
          </section>
        </div>
      )}

      <button className="trigger control" type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-controls="whatsapp-title" aria-label={open ? 'Cerrar chat de WhatsApp' : 'Contactar por WhatsApp'}>
        {!open && <span className="ripple" aria-hidden="true" />}
        {open ? '×' : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
      </button>

      <style jsx>{`
        .whatsapp-widget { position: fixed; right: 32px; bottom: 32px; z-index: 100; font-family: var(--font-inter); }
        .backdrop { position: fixed; inset: 0; z-index: 0; border: 0; background: rgba(3, 7, 12, .68); backdrop-filter: blur(9px); -webkit-backdrop-filter: blur(9px); }
        .modal-layer { position: absolute; right: 0; bottom: calc(100% + 14px); z-index: 1; width: min(390px, calc(100vw - 32px)); }
        .panel { width: 100%; overflow: hidden; border: 1px solid rgba(140,150,158,.28); border-radius: 20px; background: #0a0b0d; box-shadow: 0 20px 55px rgba(0,0,0,.52); animation: reveal .2s ease-out; }
        .accent-line { height: 3px; background: linear-gradient(90deg, #082b4a, #0f4c81, #8c969e); }
        .header { display: flex; align-items: center; justify-content: space-between; padding: 15px 16px; border-bottom: 1px solid rgba(255,255,255,.08); background: #121417; }
        .brand { display: flex; gap: 11px; align-items: center; }
        .brand-mark { display: grid; width: 38px; height: 38px; place-items: center; border: 1px solid rgba(255,255,255,.16); border-radius: 12px; background: #0f4c81; color: white; font-size: 20px; }
        h2 { margin: 0; color: #fff; font-size: 14px; line-height: 1.2; }
        .brand p { display: flex; gap: 6px; align-items: center; margin: 4px 0 0; color: #41bd7b; font-size: 11px; font-weight: 600; }
        .availability-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
        .close { width: 30px; height: 30px; border: 1px solid rgba(255,255,255,.1); border-radius: 9px; background: #1a1f25; color: #cfd0d8; font-size: 22px; line-height: 1; }
        .conversation { display: flex; max-height: min(430px, calc(100dvh - 220px)); flex-direction: column; gap: 10px; overflow-y: auto; padding: 16px; background: radial-gradient(circle at 5% 95%, rgba(15,76,129,.18), transparent 43%), #0d1014; }
        .message { max-width: 250px; padding: 10px 12px; border: 1px solid rgba(255,255,255,.1); color: #e9ebef; font-size: 12px; line-height: 1.5; }
        .message-company { align-self: flex-start; border-radius: 14px 14px 14px 4px; background: #171b20; }
        .message-visitor { align-self: flex-end; border-color: rgba(140,150,158,.45); border-radius: 14px 14px 4px 14px; background: #0f4c81; color: #fff; }
        .timestamp { margin: -6px 0 2px 4px; color: #8c969e; font-size: 10px; }
        .quick-replies { display: grid; gap: 8px; margin-top: 2px; }
        .reply { display: flex; gap: 10px; align-items: center; width: 100%; padding: 10px 11px; border: 1px solid rgba(15,76,129,.55); border-radius: 11px; background: #121417; color: #e9ebef; font: inherit; font-size: 12px; font-weight: 600; text-align: left; }
        .reply:hover, .reply.selected { border-color: #8c969e; background: rgba(15,76,129,.25); }
        .reply-icon { display: grid; width: 23px; height: 23px; place-items: center; border-radius: 7px; background: #0f4c81; color: #e0efff; font-size: 13px; }
        .check { margin-left: auto; color: #dceeff; }
        .composer { display: flex; gap: 8px; padding: 13px 13px 8px; border-top: 1px solid rgba(255,255,255,.08); background: #121417; }
        .message-input { min-width: 0; flex: 1; border: 1px solid rgba(255,255,255,.14); border-radius: 11px; outline: none; background: #1a1f25; color: #fff; font: inherit; font-size: 12px; padding: 10px 12px; }
        .message-input::placeholder { color: #8c969e; }
        .send { display: grid; width: 40px; place-items: center; border: 0; border-radius: 11px; background: #0f4c81; color: white; font-size: 18px; text-decoration: none; }
        .send:disabled { cursor: not-allowed; background: #29323a; color: #8c969e; }
        .privacy-note { margin: 0; padding: 0 13px 12px; background: #121417; color: #8c969e; font-size: 10px; text-align: center; }
        .trigger { position: relative; z-index: 2; display: grid; width: 60px; height: 60px; place-items: center; border: 1px solid rgba(255,255,255,.16); border-radius: 50%; background: linear-gradient(135deg, #0f4c81, #082b4a); color: #fff; box-shadow: 0 10px 30px rgba(15,76,129,.45); font-size: 29px; }
        .trigger svg { width: 29px; height: 29px; }
        .ripple { position: absolute; inset: -2px; z-index: -1; border: 2px solid #0f4c81; border-radius: inherit; animation: ripple 2s infinite ease-out; }
        .control { cursor: pointer; transition: transform .18s ease, background-color .18s ease, border-color .18s ease; }
        .control:focus-visible { outline: 2px solid #8c969e; outline-offset: 3px; }
        .trigger:hover { transform: translateY(-2px) scale(1.04); }
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
        @keyframes ripple { from { transform: scale(.9); opacity: .7; } to { transform: scale(1.55); opacity: 0; } }
        @keyframes reveal { from { transform: translateY(10px) scale(.97); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }
        @media (max-width: 520px) { .whatsapp-widget { right: 16px; bottom: 16px; } .modal-layer { width: calc(100vw - 32px); } .conversation { max-height: min(430px, calc(100dvh - 154px)); } }
        @media (prefers-reduced-motion: reduce) { .trigger, .panel, .ripple, .control { animation: none; transition: none; } }
      `}</style>
    </div>
  );
}
