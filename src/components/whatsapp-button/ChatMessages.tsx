import React from 'react';
import ChatMessage from './ChatMessage';
import QuickReplyList from './QuickReplyList';

interface ChatMessagesProps {
  selectedMessage: string | null;
  activeMessage: string | null;
  onSelectReply: (message: string) => void;
}

export default function ChatMessages({ selectedMessage, activeMessage, onSelectReply }: ChatMessagesProps) {
  return (
    <div className="flex flex-col gap-[10px] max-h-[min(430px,calc(100dvh-220px))] max-[520px]:max-h-[min(430px,calc(100dvh-154px))] overflow-y-auto p-4 bg-[radial-gradient(circle_at_5%_95%,rgba(15,76,129,.18),transparent_43%),#0d1014]">
      <ChatMessage variant="agent" text="¡Hola! Somos GreyLion Maritime. ¿Cómo podemos ayudarle?" />
      <p className="mt-[-6px] mb-[2px] ml-1 text-accent text-[10px]">GreyLion · ahora</p>
      <ChatMessage variant="agent" text="Elija una opción o escriba su propio mensaje." />

      <QuickReplyList selectedMessage={selectedMessage} onSelect={onSelectReply} />

      {activeMessage && <ChatMessage variant="user" text={activeMessage} />}
    </div>
  );
}
