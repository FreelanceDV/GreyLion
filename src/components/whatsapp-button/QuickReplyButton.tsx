import React from 'react';
import { replyBaseClasses } from './styles';

interface QuickReplyButtonProps {
  icon: string;
  text: string;
  isSelected: boolean;
  onSelect: () => void;
}

export default function QuickReplyButton({ icon, text, isSelected, onSelect }: QuickReplyButtonProps) {
  return (
    <button
      className={`${replyBaseClasses} ${isSelected ? 'border-accent bg-[rgba(15,76,129,.25)]' : 'border-[rgba(15,76,129,.55)] bg-background-dark'}`}
      type="button"
      aria-pressed={isSelected}
      onClick={onSelect}
    >
      <span className="grid w-[23px] h-[23px] place-items-center rounded-[7px] bg-primary text-[#e0efff] text-[13px]" aria-hidden="true">{icon}</span>
      {text}
      {isSelected && <span className="ml-auto text-[#dceeff]" aria-hidden="true">✓</span>}
    </button>
  );
}
