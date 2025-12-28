'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import Button from '../../components/Button';

export default function ThankYou() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden px-4">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-tapoutsPurple opacity-10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-xl w-full bg-white relative z-10 text-center p-8 rounded-3xl shadow-xl border border-gray-100">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                </div>

                <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
                    Message Received!
                </h1>

                <p className="text-xl text-gray-500 mb-8 leading-relaxed">
                    Thank you for reaching out. Our team has received your enquiry and will be in touch with you shortly.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/" prefetch={false}>
                        <Button variant="primary" size="lg" className="w-full sm:w-auto">
                            <Home className="w-4 h-4 mr-2" />
                            Back to Home
                        </Button>
                    </Link>

                    <Link href="/blog" prefetch={false}>
                        <Button variant="outline" size="lg" className="w-full sm:w-auto">
                            Read Our Blog
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
