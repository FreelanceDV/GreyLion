'use client';

import ChatPanel from './ChatPanel';
import WhatsAppFAB from './WhatsAppFAB';
import { useWhatsAppChat } from './useWhatsAppChat';

export default function WhatsAppButton() {
  const {
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
  } = useWhatsAppChat();

  return (
    <div className="fixed right-8 bottom-8 max-[520px]:right-4 max-[520px]:bottom-4 z-[100] font-[family-name:var(--font-inter)]">
      {open && (
        <ChatPanel
          onClose={close}
          selectedMessage={selectedMessage}
          activeMessage={activeMessage}
          onSelectReply={selectReply}
          customMessage={customMessage}
          onChangeMessage={updateCustomMessage}
          whatsappUrl={whatsappUrl}
          inputRef={inputRef}
          sendLinkRef={sendLinkRef}
        />
      )}

      <WhatsAppFAB open={open} onToggle={toggleOpen} />
    </div>
  );
}
