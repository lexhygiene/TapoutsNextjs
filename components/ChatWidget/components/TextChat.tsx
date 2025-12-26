import React, { useState, useEffect, useRef } from 'react';
import { Message, ViewState } from '../types';
import { streamGeminiResponse } from '../services/geminiService';
import { GRADIENT_FROM, GRADIENT_TO } from '../constants';
import { ArrowLeft, Send } from 'lucide-react';

interface TextChatProps {
  onBack: () => void;
}

export const TextChat: React.FC<TextChatProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init', role: 'model', text: 'Hello! How can I help you with our services today?', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue('');

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: userText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // Create a placeholder for the model response
    const responseId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: responseId, role: 'model', text: '', timestamp: new Date() }]);

    let fullResponse = '';

    const history = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    await streamGeminiResponse(
      history,
      userText,
      (chunk) => {
        fullResponse += chunk;
        setMessages(prev => prev.map(msg =>
          msg.id === responseId ? { ...msg, text: fullResponse } : msg
        ));
      }
    );

    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className={`flex items-center p-4 bg-gradient-to-r ${GRADIENT_FROM} ${GRADIENT_TO} text-white rounded-t-2xl shadow-sm`}>
        <button onClick={onBack} className="mr-4 p-2 hover:bg-white/20 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h3 className="font-bold">Chat Support</h3>
          <div className="flex items-center text-xs text-blue-100">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Online
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                  ? `bg-gradient-to-br ${GRADIENT_FROM} ${GRADIENT_TO} text-white rounded-br-none`
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                }`}
            >
              {msg.text || <span className="flex space-x-1 h-4 items-center"><span className="w-1 h-1 bg-current rounded-full animate-bounce"></span><span className="w-1 h-1 bg-current rounded-full animate-bounce delay-100"></span><span className="w-1 h-1 bg-current rounded-full animate-bounce delay-200"></span></span>}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100 rounded-b-2xl">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 border border-transparent focus-within:border-blue-500 focus-within:bg-white transition-all">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 bg-transparent outline-none text-sm text-gray-700"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            className={`ml-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${inputValue.trim() ? 'text-blue-600 hover:bg-blue-100' : 'text-gray-400'
              }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};