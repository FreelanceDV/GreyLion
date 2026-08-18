import { useEffect, useRef, useState } from 'react';

/** Owns the WhatsApp chat widget's open/message state, focus management, and escape/scroll-lock behavior. */
export function useWhatsAppChat() {
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

  const toggleOpen = () => setOpen((current) => !current);
  const close = () => setOpen(false);

  const selectReply = (message: string) => {
    setSelectedMessage((current) => (current === message ? null : message));
    setCustomMessage('');
  };

  const updateCustomMessage = (value: string) => {
    setCustomMessage(value);
    if (value) setSelectedMessage(null);
  };

  return {
    open,
    toggleOpen,
    close,
    selectedMessage,
    customMessage,
    updateCustomMessage,
    selectReply,
    activeMessage,
    whatsappUrl,
    inputRef,
    sendLinkRef,
  };
}
