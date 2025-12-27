'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import EnquiryForm from './EnquiryForm';

const SidebarForm: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();



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

                    <EnquiryForm onSuccess={() => setIsOpen(false)} />
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
                    aria-hidden="true"
                ></div>
            )}
        </>
    );
};

export default SidebarForm;
