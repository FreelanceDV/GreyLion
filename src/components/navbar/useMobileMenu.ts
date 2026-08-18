import { useEffect, useState } from 'react';

/** Mobile menu open state, plus Escape-to-close and body scroll lock while open. */
export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.body.classList.add('overflow-hidden');
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.classList.remove('overflow-hidden');
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  return { isOpen, open, close };
}
