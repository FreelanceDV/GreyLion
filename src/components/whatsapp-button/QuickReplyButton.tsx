import React from 'react';
import { Check, LucideIcon } from 'lucide-react';
import { replyBaseClasses } from './styles';

interface QuickReplyButtonProps {
  icon: LucideIcon;
  text: string;
  isSelected: boolean;
  onSelect: () => void;
}

export default function QuickReplyButton({ icon: Icon, text, isSelected, onSelect }: QuickReplyButtonProps) {
  return (
    <button
      className={`${replyBaseClasses} ${isSelected ? 'border-accent bg-[rgba(15,76,129,.25)]' : 'border-[rgba(15,76,129,.55)] bg-background-dark'}`}
      type="button"
      aria-pressed={isSelected}
      onClick={onSelect}
    >
      <span className="grid w-[23px] h-[23px] place-items-center rounded-[7px] bg-primary text-[#e0efff]" aria-hidden="true">
        <Icon className="h-3.5 w-3.5" strokeWidth={2} />
      </span>
      {text}
      {isSelected && <Check className="ml-auto text-[#dceeff] h-4 w-4" strokeWidth={2.5} aria-hidden="true" />}
    </button>
  );
}
