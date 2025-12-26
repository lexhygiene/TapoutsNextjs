import React, { useState, useRef } from 'react';
import Button from './Button';
import { X } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

const SidebarForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'General Enquiry',
    message: '',
    gdprConsent: false,
    newsletter: false
  });
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recaptchaToken) {
      alert('Please complete the reCAPTCHA verification.');
      return;
    }

    try {
      const baseUrl = import.meta.env.VITE_API_URL || '/api';
      const response = await fetch(`${baseUrl}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          topic: 'General Enquiry',
          message: '',
          gdprConsent: false,
          newsletter: false
        });
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
        setIsOpen(false);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message. Please try again.');
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed right-0 top-1/2 transform -translate-y-1/2 z-50 bg-tapoutsPurple text-white py-4 px-1 rounded-l-lg shadow-lg hover:bg-nexusDark transition-colors duration-300 flex items-center justify-center ${isOpen ? 'translate-x-full' : 'translate-x-0'}`}
        style={{ width: '40px', height: '160px' }}
      >
        <span
          className="text-xs font-bold uppercase tracking-widest whitespace-nowrap"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          {isOpen ? 'Close' : 'Enquire Now'}
        </span>
      </button>

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-20 bottom-0 right-0 w-[320px] bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out border-l border-gray-100 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6 overflow-y-auto h-full scrollbar-hide">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-nexusDark">Contact Us</h3>
              <div className="w-12 h-1 bg-tapoutsPurple mt-2"></div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded-md transition">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            Interested in membership or our services? Leave your details below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-tapoutsPurple focus:border-transparent outline-none transition-all text-sm"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-tapoutsPurple focus:border-transparent outline-none transition-all text-sm"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-tapoutsPurple focus:border-transparent outline-none transition-all text-sm"
                placeholder="+447400085510"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Topic</label>
              <div className="relative">
                <select
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-tapoutsPurple focus:border-transparent outline-none transition-all text-sm appearance-none"
                >
                  <option>General Enquiry</option>
                  <option>Membership</option>
                  <option>Business Services</option>
                  <option>Education & Wellbeing</option>
                  <option>Legal Guidance</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Message</label>
              <textarea
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-tapoutsPurple focus:border-transparent outline-none transition-all text-sm resize-none"
                placeholder="How can we help?"
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="gdprConsent"
                  required
                  checked={formData.gdprConsent}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-tapoutsPurple rounded border-gray-300 focus:ring-tapoutsPurple"
                />
                <span className="text-xs text-gray-600">
                  I agree to the <a href="#" className="text-tapoutsPurple hover:underline">UK GDPR laws</a> and privacy policy.
                </span>
              </label>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-tapoutsPurple rounded border-gray-300 focus:ring-tapoutsPurple"
                />
                <span className="text-xs text-gray-600">
                  Subscribe to our newsletter for updates.
                </span>
              </label>
            </div>

            <div className="flex justify-center my-4">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={handleCaptchaChange}
                size="compact"
              />
            </div>

            <Button type="submit" className="w-full" variant="primary">
              Send Message
            </Button>

            <p className="text-[10px] text-gray-400 text-center mt-4">
              Your data is secure. We never share your information with third parties.
            </p>
          </form>
        </div>

        {/* Footer of Sidebar */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-xs text-nexusDark font-bold">Or call us 24/7</p>
          <p className="text-sm text-tapoutsPurple font-bold mt-1">+447400085510</p>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default SidebarForm;