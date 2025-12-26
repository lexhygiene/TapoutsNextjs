
export enum ViewState {
  CLOSED = 'CLOSED',
  MENU = 'MENU',
  TEXT_CHAT = 'TEXT_CHAT',
  VOICE_CHAT = 'VOICE_CHAT',
  CALLBACK = 'CALLBACK'
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum VoiceState {
  IDLE = 'IDLE',
  CONNECTING = 'CONNECTING',
  LISTENING = 'LISTENING',
  SPEAKING = 'SPEAKING',
  ERROR = 'ERROR'
}

// Retell SDK minimal type definition assumption
export interface RetellWebClient {
  startCall: (config: { accessToken: string }) => Promise<void>;
  stopCall: () => void;
  on: (event: string, callback: (data?: any) => void) => void;
  off: (event: string, callback: (data?: any) => void) => void;
}
