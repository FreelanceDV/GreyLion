import React from 'react';
import QuickReplyButton from './QuickReplyButton';
import { QUICK_REPLIES } from './data';

interface QuickReplyListProps {
  selectedMessage: string | null;
  onSelect: (message: string) => void;
}

export default function QuickReplyList({ selectedMessage, onSelect }: QuickReplyListProps) {
  return (
    <div className="grid gap-2 mt-[2px]" aria-label="Opciones de contacto">
      {QUICK_REPLIES.map(({ icon, text }) => (
        <QuickReplyButton
          key={text}
          icon={icon}
          text={text}
          isSelected={selectedMessage === text}
          onSelect={() => onSelect(text)}
        />
      ))}
    </div>
  );
}
