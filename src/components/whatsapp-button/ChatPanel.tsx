import React from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInputBar from './ChatInputBar';

interface ChatPanelProps {
  onClose: () => void;
  selectedMessage: string | null;
  activeMessage: string | null;
  onSelectReply: (message: string) => void;
  customMessage: string;
  onChangeMessage: (value: string) => void;
  whatsappUrl?: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  sendLinkRef: React.RefObject<HTMLAnchorElement | null>;
}

export default function ChatPanel({
  onClose,
  selectedMessage,
  activeMessage,
  onSelectReply,
  customMessage,
  onChangeMessage,
  whatsappUrl,
  inputRef,
  sendLinkRef,
}: ChatPanelProps) {
  return (
    <>
      <button
        className="fixed inset-0 z-0 border-0 bg-[rgba(3,7,12,.68)] backdrop-blur-[9px]"
        type="button"
        onClick={onClose}
        aria-label="Cerrar chat"
      />

      <div className="absolute right-0 bottom-[calc(100%+14px)] z-[1] w-[min(390px,calc(100vw-32px))] max-[520px]:w-[calc(100vw-32px)]">
        <section
          className="w-full overflow-hidden rounded-[20px] border border-[rgba(140,150,158,.28)] bg-background-black shadow-[0_20px_55px_rgba(0,0,0,.52)] animate-whatsapp-reveal motion-reduce:animate-none"
          role="dialog"
          aria-labelledby="whatsapp-title"
        >
          <div className="h-[3px] bg-[linear-gradient(90deg,var(--color-primary-dark),var(--color-primary),var(--color-accent))]" />
          <ChatHeader onClose={onClose} />
          <ChatMessages selectedMessage={selectedMessage} activeMessage={activeMessage} onSelectReply={onSelectReply} />
          <ChatInputBar
            customMessage={customMessage}
            onChangeMessage={onChangeMessage}
            whatsappUrl={whatsappUrl}
            inputRef={inputRef}
            sendLinkRef={sendLinkRef}
          />
        </section>
      </div>
    </>
  );
}
