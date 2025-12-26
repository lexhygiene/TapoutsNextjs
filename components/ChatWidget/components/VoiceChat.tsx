import React, { useEffect, useState, useRef } from 'react';
import { VoiceState } from '../types';
import { getRetellClient, fetchRetellAccessToken } from '../services/retellService';
import { RETELL_AGENT_ID, GRADIENT_FROM, GRADIENT_TO } from '../constants';
import { ChevronDown, Loader2, Mic, Phone, PhoneOff } from 'lucide-react';

interface VoiceChatProps {
  onBack: () => void;
}

export const VoiceChat: React.FC<VoiceChatProps> = ({ onBack }) => {
  const [state, setState] = useState<VoiceState>(VoiceState.IDLE);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [duration, setDuration] = useState(0);
  const timerRef = useRef<number | null>(null);
  const retellClient = getRetellClient();

  // Setup Retell listeners on mount
  useEffect(() => {
    retellClient.on('call_started', () => {
      setState(VoiceState.SPEAKING); // Simplified state for UI
      startTimer();
    });

    retellClient.on('call_ended', () => {
      setState(VoiceState.IDLE);
      stopTimer();
    });

    retellClient.on('error', (err: any) => {
      console.error('Retell Error:', err);
      setState(VoiceState.ERROR);
      setErrorMsg('Connection failed.');
      stopTimer();
    });

    // Update states for animation based on agent/user speaking
    retellClient.on('update', (update: any) => {
      // You could use update.transcript to show live subtitles here
    });

    return () => {
      // Cleanup
      if (state !== VoiceState.IDLE && state !== VoiceState.ERROR) {
        retellClient.stopCall();
      }
      retellClient.off('call_started', () => { });
      retellClient.off('call_ended', () => { });
      retellClient.off('error', () => { });
      stopTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startTimer = () => {
    stopTimer();
    setDuration(0);
    timerRef.current = window.setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleCall = async () => {
    if (state === VoiceState.IDLE || state === VoiceState.ERROR) {
      setState(VoiceState.CONNECTING);
      setErrorMsg('');
      try {
        // 1. Get Access Token
        const accessToken = await fetchRetellAccessToken(RETELL_AGENT_ID);

        // 2. Start Call
        await retellClient.startCall({
          accessToken: accessToken
        });
      } catch (err: any) {
        console.error(err);
        setState(VoiceState.ERROR);
        setErrorMsg(err.message || "Failed to connect.");
      }
    } else {
      // Stop Call
      retellClient.stopCall();
      setState(VoiceState.IDLE);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-6 absolute top-0 w-full z-10">
        <button onClick={onBack} className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
          <ChevronDown className="w-6 h-6" />
        </button>
        <div className="text-xs font-mono tracking-widest opacity-60">LIVE VOICE</div>
        <div className="w-10"></div>
      </div>

      {/* Visualizer Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        {/* Background Ambient Glow */}
        <div className={`absolute w-64 h-64 rounded-full bg-blue-500 blur-[100px] transition-opacity duration-700 ${state === VoiceState.SPEAKING ? 'opacity-40' : 'opacity-10'}`}></div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Main Orb */}
          <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${GRADIENT_FROM} ${GRADIENT_TO} flex items-center justify-center shadow-2xl transition-all duration-500 ${state === VoiceState.SPEAKING ? 'animate-active-pulse shadow-blue-500/50' : ''}`}>
            {state === VoiceState.CONNECTING ? (
              <Loader2 className="w-10 h-10 animate-spin" />
            ) : (
              <Mic className={`w-12 h-12 ${state === VoiceState.IDLE ? 'opacity-50' : 'opacity-100'}`} />
            )}
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-2xl font-light tracking-wide">
              {state === VoiceState.IDLE && "Ready to talk?"}
              {state === VoiceState.CONNECTING && "Connecting..."}
              {state === VoiceState.SPEAKING && "Listening..."}
              {state === VoiceState.ERROR && "Connection Error"}
            </h2>
            {state === VoiceState.SPEAKING && (
              <p className="mt-2 text-blue-300 font-mono">{formatTime(duration)}</p>
            )}
            {errorMsg && (
              <p className="mt-2 text-red-400 text-xs px-8">{errorMsg}</p>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-8 pb-10 flex justify-center items-center space-x-6 bg-gradient-to-t from-black/50 to-transparent">
        <button
          onClick={toggleCall}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-xl shadow-lg transition-all transform hover:scale-105 ${state === VoiceState.IDLE || state === VoiceState.ERROR
              ? 'bg-green-500 hover:bg-green-400 text-white'
              : 'bg-red-500 hover:bg-red-400 text-white'
            }`}
        >
          {state === VoiceState.IDLE || state === VoiceState.ERROR ? <Phone className="w-6 h-6" /> : <PhoneOff className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
};