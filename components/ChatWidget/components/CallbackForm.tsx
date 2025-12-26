
import React, { useState } from 'react';
import { GRADIENT_FROM, GRADIENT_TO } from '../constants';
import { requestCallback } from '../services/retellService';
import { ArrowLeft, Check, AlertCircle, Loader2, ArrowRight, Phone } from 'lucide-react';

interface CallbackFormProps {
  onBack: () => void;
}

export const CallbackForm: React.FC<CallbackFormProps> = ({ onBack }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Explicit validation
    if (!firstName.trim() || !lastName.trim() || !phone.trim()) {
      setErrorMsg("Please fill in all fields.");
      setStatus('error');
      return;
    }

    if (!agreed) {
      setErrorMsg("You must agree to the privacy policy to proceed.");
      setStatus('error');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setStatus('idle');

    try {
      await requestCallback(phone, firstName, lastName);
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || "Failed to schedule call.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className={`flex items-center p-4 bg-gradient-to-r ${GRADIENT_FROM} ${GRADIENT_TO} text-white rounded-t-2xl shadow-sm shrink-0`}>
        <button onClick={onBack} className="mr-4 p-2 hover:bg-white/20 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h3 className="font-bold">Request Callback</h3>
          <p className="text-xs text-blue-100">We'll call you right away</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col overflow-y-auto">
        {status === 'success' ? (
          <div className="flex-1 flex flex-col justify-center items-center animate-fade-in text-center">
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
              <Check className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Call Requested!</h3>
            <p className="text-gray-600 mb-6">Hi {firstName}, our AI agent is dialing your number ({phone}) now.</p>
            <button
              onClick={onBack}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium text-gray-700 transition-colors"
            >
              Back to Menu
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center mb-2">
              <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Phone className="w-6 h-6" />
              </div>
              <p className="text-sm text-gray-600">Please fill in your details below.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+1 234 555 6789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
              />
              <p className="text-[10px] text-gray-400 mt-1">Format: +[Country Code][Number]</p>
            </div>

            <div className="flex items-start space-x-3 pt-2">
              <input
                id="terms"
                type="checkbox"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded shrink-0 cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-gray-500 leading-tight cursor-pointer select-none">
                I agree to the <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and consent to be contacted by AI. <span className="text-red-500">*</span>
              </label>
            </div>

            {status === 'error' && (
              <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg flex items-center animate-fade-in">
                <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl text-white font-semibold shadow-md transition-all transform active:scale-95 flex items-center justify-center mt-2 ${loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : `bg-gradient-to-r ${GRADIENT_FROM} ${GRADIENT_TO} hover:shadow-lg`
                }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  Call Me Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
