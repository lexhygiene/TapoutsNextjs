'use client';

import React, { useState, useRef } from 'react';
import Button from './Button';
import ReCAPTCHA from 'react-google-recaptcha';

interface EnquiryFormProps {
    className?: string;
    onSuccess?: () => void;
}

const EnquiryForm: React.FC<EnquiryFormProps> = ({ className = '', onSuccess }) => {
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
        // @ts-ignore
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
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
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
                if (onSuccess) onSuccess();
            } else {
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Error sending message. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
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
                        <option>Web Development</option>
                        <option>Gen AI Services</option>
                        <option>PPC Marketing</option>
                        <option>Smart Maintenance</option>
                        <option>Reputation Management</option>
                        <option>Performance Marketing</option>
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
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
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
    );
};

export default EnquiryForm;
