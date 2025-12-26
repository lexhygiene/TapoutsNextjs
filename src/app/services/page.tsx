'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    Monitor,
    Target,
    TrendingUp,
    BarChart3,
    Search,
    Megaphone,
    Share2,
    ShieldCheck,
    Zap,
    FileText,
    ArrowRight
} from 'lucide-react';
import Button from '../../components/Button';
import BrandName from '../../components/BrandName';

const Services: React.FC = () => {
    const router = useRouter();

    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Hero Section */}
            <div className="bg-[#0a0f2c] text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-tapoutsPurple opacity-20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                        COMPREHENSIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-tapoutsPurple to-blue-400">DIGITAL SERVICES</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        From strategic planning to flawless execution, <BrandName className="text-white" /> provides the end-to-end digital solutions you need to dominate your market.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

                {/* 1. Website Development - Highlighted */}
                <div className="mb-24">
                    <div className="bg-gray-900 rounded-3xl p-8 md:p-16 text-white relative overflow-hidden shadow-2xl group">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 z-0"></div>
                        <div className="absolute right-0 top-0 h-full w-1/2 bg-tapoutsPurple/10 transform skew-x-12 translate-x-20"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-2 bg-tapoutsPurple/20 px-4 py-1.5 rounded-full text-tapoutsPurple font-bold text-sm mb-6 border border-tapoutsPurple/30">
                                    <Monitor className="w-4 h-4" />
                                    <span>CORE SERVICE</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black mb-6">Website Development</h2>
                                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                                    We build high-performance, visually stunning websites that are optimized for conversions. Our development process ensures your digital presence is robust, secure, and scalable.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    {['Custom React & Next.js Builds', 'Responsive & Mobile-First Design', 'SEO-Optimized Architecture', 'High-Speed Performance'].map((item, i) => (
                                        <li key={i} className="flex items-center text-gray-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-tapoutsPurple mr-3"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <Button variant="primary" className="group-hover:translate-x-2 transition-transform duration-300">
                                    Start Your Build <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-tapoutsPurple blur-3xl opacity-30"></div>
                                    <Monitor className="w-64 h-64 text-white relative z-10 drop-shadow-2xl" strokeWidth={0.5} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Strategy Section */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-nexusDark mb-4">STRATEGY</h2>
                        <div className="w-24 h-1.5 bg-tapoutsPurple mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Improve Visibility', icon: Search, desc: 'Dominate search results and get seen by your ideal customers.' },
                            { title: 'Drive Traffic', icon: TrendingUp, desc: 'Targeted campaigns that bring high-quality traffic to your site.' },
                            { title: 'Grow Conversions', icon: Target, desc: 'Turn visitors into loyal customers with optimized user journeys.' }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform duration-300 group">
                                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-tapoutsPurple group-hover:text-white transition-colors duration-300 text-gray-900">
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Execution Section */}
                <div>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-nexusDark mb-4">EXECUTION</h2>
                        <div className="w-24 h-1.5 bg-tapoutsPurple mx-auto"></div>
                        <p className="mt-4 text-xl text-gray-600">Precision execution across all digital channels.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: 'Digital Marketing', icon: Megaphone, color: 'bg-blue-50 text-blue-600' },
                            { title: 'SEO Marketing', icon: Search, color: 'bg-green-50 text-green-600' },
                            { title: 'PPC Marketing', icon: Target, color: 'bg-red-50 text-red-600' },
                            { title: 'Social Media Marketing', icon: Share2, color: 'bg-pink-50 text-pink-600' },
                            { title: 'Reputation Management', icon: ShieldCheck, color: 'bg-purple-50 text-purple-600' },
                            { title: 'Performance Marketing', icon: Zap, color: 'bg-yellow-50 text-yellow-600' },
                            { title: 'Content Marketing', icon: FileText, color: 'bg-indigo-50 text-indigo-600' },
                        ].map((service, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col items-center text-center group">
                                <div className={`w-14 h-14 ${service.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <service.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
                            </div>
                        ))}

                        {/* CTA Card to fill the grid */}
                        <div className="bg-nexusDark p-8 rounded-xl shadow-sm flex flex-col items-center justify-center text-center text-white">
                            <h3 className="text-xl font-bold mb-2">Ready to Start?</h3>
                            <p className="text-gray-400 text-sm mb-4">Let's build something great.</p>
                            <Button variant="gold" size="sm" onClick={() => router.push('/contact')}>Get in Touch</Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Services;
