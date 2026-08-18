import React from 'react';
import { messageBaseClasses } from './styles';

interface ChatMessageProps {
  text: string;
  variant: 'agent' | 'user';
}

export default function ChatMessage({ text, variant }: ChatMessageProps) {
  const variantClasses =
    variant === 'agent'
      ? 'self-start rounded-[14px_14px_14px_4px] bg-[#171b20] border-[rgba(255,255,255,.1)] text-[#e9ebef]'
      : 'self-end rounded-[14px_14px_4px_14px] bg-primary border-[rgba(140,150,158,.45)] text-white';

  return <div className={`${messageBaseClasses} ${variantClasses}`}>{text}</div>;
}
