
import React from 'react';
import { ViewState } from '../types';
import { GRADIENT_FROM, GRADIENT_TO, WIDGET_SUBTITLE, WIDGET_TITLE } from '../constants';
import { Mic, MessageSquare, Phone } from 'lucide-react';

interface MenuProps {
  onChangeView: (view: ViewState) => void;
}

export const Menu: React.FC<MenuProps> = ({ onChangeView }) => {
  return (
    <div className="flex flex-col h-full">
      <div className={`bg-gradient-to-r ${GRADIENT_FROM} ${GRADIENT_TO} p-6 rounded-t-2xl text-white text-center shadow-md`}>
        <h1 className="text-xl font-bold">{WIDGET_TITLE}</h1>
        <p className="text-blue-100 text-sm mt-1">{WIDGET_SUBTITLE}</p>
      </div>

      <div className="flex-1 p-6 flex flex-col justify-center space-y-3 bg-white overflow-y-auto">
        <button
          onClick={() => onChangeView(ViewState.VOICE_CHAT)}
          className="group relative w-full p-4 rounded-xl border-2 border-blue-50 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 text-left flex items-center space-x-4 shadow-sm hover:shadow-md"
        >
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 group-hover:text-blue-700">Voice Call</h3>
            <p className="text-xs text-gray-500">Talk directly to our AI agent</p>
          </div>
        </button>

        <button
          onClick={() => onChangeView(ViewState.TEXT_CHAT)}
          className="group relative w-full p-4 rounded-xl border-2 border-purple-50 hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 text-left flex items-center space-x-4 shadow-sm hover:shadow-md"
        >
          <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 group-hover:text-purple-700">Live Chat</h3>
            <p className="text-xs text-gray-500">Text with our support bot</p>
          </div>
        </button>

        <button
          onClick={() => onChangeView(ViewState.CALLBACK)}
          className="group relative w-full p-4 rounded-xl border-2 border-orange-50 hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 text-left flex items-center space-x-4 shadow-sm hover:shadow-md"
        >
          <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 group-hover:text-orange-700">Request Callback</h3>
            <p className="text-xs text-gray-500">We'll call your phone</p>
          </div>
        </button>
      </div>

      <div className="p-4 text-center bg-gray-50 rounded-b-2xl border-t border-gray-100">
        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Powered by Gemini & Retell</p>
      </div>
    </div>
  );
};
