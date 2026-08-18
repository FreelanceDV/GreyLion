interface MobileMenuButtonProps {
  isOpen: boolean;
  onOpen: () => void;
}

export default function MobileMenuButton({ isOpen, onOpen }: MobileMenuButtonProps) {
  return (
    <button
      className="hidden h-[42px] w-[42px] justify-self-end rounded-xl border border-[rgba(255,255,255,.13)] bg-[rgba(6,13,26,.58)] p-[10px] max-[991px]:block"
      type="button"
      onClick={onOpen}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      aria-label="Abrir menú"
    >
      <span className="my-1 block h-0.5 rounded-[1px] bg-white" />
      <span className="my-1 block h-0.5 rounded-[1px] bg-white" />
      <span className="my-1 block h-0.5 rounded-[1px] bg-white" />
    </button>
  );
}
