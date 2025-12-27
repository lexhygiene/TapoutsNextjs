'use client';

import React, { useState, useRef } from 'react';
import Button from '../../components/Button';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        topic: 'Web Development',
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

        let token = recaptchaToken;

        // Auto-bypass for development/localhost if no token is present
        if (!token && process.env.NODE_ENV === 'development') {
            console.log("⚠️ Development mode: Using bypass reCAPTCHA token");
            token = 'bypass';
        }

        if (!token) {
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
                body: JSON.stringify({ ...formData, recaptchaToken: token }),
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
            } else {
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Error sending message. Please try again.');
        }
    };

    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Hero Section */}
            <div className="relative bg-[#0a0f2c] text-white py-24 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Get in Touch</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Have questions about membership or need immediate support? Our team and AI are here to help.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-50 p-4 rounded-full">
                                    <Mail className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Email Us</h3>
                                    <p className="text-gray-600 mb-1">Our friendly team is here to help.</p>
                                    <p className="text-blue-600 font-medium">info@tapouts.co</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-purple-50 p-4 rounded-full">
                                    <Phone className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Call Us</h3>
                                    <p className="text-gray-600 mb-1">Mon-Fri from 8am to 5pm.</p>
                                    <p className="text-purple-600 font-medium">+447400085510</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-red-50 p-4 rounded-full">
                                    <MapPin className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Visit Us</h3>
                                    <p className="text-gray-600 mb-1">Come say hello at our office HQ.</p>
                                    <p className="text-red-600 font-medium">London, United Kingdom</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 bg-gray-50 p-8 rounded-2xl border border-gray-100">
                            <h3 className="font-bold text-gray-900 text-lg mb-2">Need Instant Answers?</h3>
                            <p className="text-gray-600 mb-4">Our AI assistant speaks 20+ languages and is available 24/7.</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Click the chat bubble in the bottom right corner.</span>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-500"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-500"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-500"
                                        placeholder="+447400085510"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Topic</label>
                                    <select
                                        name="topic"
                                        value={formData.topic}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-500"
                                    >
                                        <option>Web Development</option>
                                        <option>Gen AI Services</option>
                                        <option>PPC Marketing</option>
                                        <option>Smart Maintenance</option>
                                        <option>Reputation Management</option>
                                        <option>Performance Marketing</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-gray-900 placeholder:text-gray-500"
                                    placeholder="How can we help?"
                                ></textarea>
                            </div>

                            <div className="space-y-3">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="gdprConsent"
                                        required
                                        checked={formData.gdprConsent}
                                        onChange={handleChange}
                                        className="mt-1 w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-600">
                                        I agree to the <a href="#" className="text-blue-600 hover:underline font-medium">UK GDPR laws</a> and privacy policy.
                                    </span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="newsletter"
                                        checked={formData.newsletter}
                                        onChange={handleChange}
                                        className="mt-1 w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-600">
                                        Subscribe to our newsletter for updates.
                                    </span>
                                </label>
                            </div>

                            <div className="flex justify-center">
                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                                    onChange={handleCaptchaChange}
                                />
                            </div>

                            <Button type="submit" className="w-full py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all" variant="primary">
                                Send Message <Send className="ml-2 w-5 h-5" />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
