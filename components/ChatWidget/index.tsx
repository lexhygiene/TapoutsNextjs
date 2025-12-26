
import React, { useState } from 'react';
import { WidgetButton } from './components/WidgetButton';
import { Menu } from './components/Menu';
import { TextChat } from './components/TextChat';
import { VoiceChat } from './components/VoiceChat';
import { CallbackForm } from './components/CallbackForm';
import { ViewState } from './types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<ViewState>(ViewState.MENU);

  const toggleWidget = () => {
    if (isOpen) {
      setIsOpen(false);
      // Reset to menu after a short delay for transition
      setTimeout(() => setView(ViewState.MENU), 300);
    } else {
      setIsOpen(true);
    }
  };

  const handleBack = () => {
    setView(ViewState.MENU);
  };

  return (
    <div className="fixed z-[9999] bottom-0 right-0 pointer-events-none font-sans text-base antialiased">
      {/* Widget Container */}
      <div
        className={`fixed bottom-24 right-6 w-[90vw] max-w-[380px] h-[600px] max-h-[70vh] bg-white rounded-2xl shadow-2xl transform transition-all duration-300 origin-bottom-right overflow-hidden flex flex-col border border-gray-100 ${isOpen ? 'scale-100 opacity-100 translate-y-0 pointer-events-auto' : 'scale-95 opacity-0 translate-y-10 pointer-events-none'
          }`}
      >
        {view === ViewState.MENU && (
          <Menu onChangeView={setView} />
        )}
        {view === ViewState.TEXT_CHAT && (
          <TextChat onBack={handleBack} />
        )}
        {view === ViewState.VOICE_CHAT && (
          <VoiceChat onBack={handleBack} />
        )}
        {view === ViewState.CALLBACK && (
          <CallbackForm onBack={handleBack} />
        )}
      </div>

      {/* Launcher Button */}
      <div className="pointer-events-auto">
        <WidgetButton isOpen={isOpen} onClick={toggleWidget} />
      </div>
    </div>
  );
};

export default ChatWidget;
