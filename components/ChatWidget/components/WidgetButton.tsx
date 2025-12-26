import React from 'react';
import { GRADIENT_FROM, GRADIENT_TO } from '../constants';
import { MessageCircle, X } from 'lucide-react';

interface WidgetButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const WidgetButton: React.FC<WidgetButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r ${GRADIENT_FROM} ${GRADIENT_TO} text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 z-50 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
      aria-label="Toggle Chat Widget"
    >
      <div className={`absolute transition-all duration-300 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
        <MessageCircle className="w-6 h-6" />
      </div>
      <div className={`absolute transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
        <X className="w-6 h-6" />
      </div>
    </button>
  );
};