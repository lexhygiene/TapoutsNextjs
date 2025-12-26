'use client';

import React from 'react';
import { CheckCircle, Play, Globe, Server, Shield, Clock, BarChart } from 'lucide-react';
import Button from '../../components/Button';
import { useRouter } from 'next/navigation';
import BrandName from '../../components/BrandName';
import Testimonials from '../../components/Testimonials';

const WebDevelopment: React.FC = () => {
    const router = useRouter();

    return (
        <div className="bg-white font-sans">
            {/* Hero Section */}
            <div className="relative bg-[#0a0f2c] text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="mb-6">
                                <BrandName className="text-5xl md:text-6xl tracking-wide text-white" />
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                Website Maintenance <br />
                                <span className="text-white">#Simplified</span>
                            </h1>
                            <p className="text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
                                Powered by GenAI, we simplify your website management and maintenance.
                            </p>
                            <Button variant="primary" size="lg" className="bg-red-600 hover:bg-red-700 border-none px-8 py-4 text-lg rounded-full">
                                Get Started
                            </Button>
                        </div>
                        <div className="relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                                <img
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                                    alt="Dashboard"
                                    className="w-full h-auto"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/80 to-transparent flex items-center justify-center">
                                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg">
                                        <Play className="w-8 h-8 text-white fill-current ml-1" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SUM Banner */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-6">
                        <h3 className="text-white font-black text-2xl mb-1">SUM</h3>
                        <p className="text-white/90 font-medium text-lg">Smart Maintenance. Unified Approach. Exponential Results</p>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-90 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholder Logos */}
                        <div className="text-white font-bold text-2xl flex items-center gap-2"><div className="w-8 h-8 bg-white rounded-md"></div> Amazon</div>
                        <div className="text-white font-bold text-2xl flex items-center gap-2"><div className="w-8 h-8 bg-white rounded-full"></div> Samsung</div>
                        <div className="text-white font-bold text-2xl flex items-center gap-2"><div className="w-8 h-8 bg-white rounded-full border-2 border-gray-300"></div> BMW</div>
                        <div className="text-white font-bold text-2xl flex items-center gap-2"><div className="w-8 h-8 bg-white rounded-t-lg"></div> Apple</div>
                    </div>
                </div>
            </div>

            {/* Intro Text */}
            <div className="py-16 text-center max-w-4xl mx-auto px-4">
                <div className="mb-4 flex justify-center">
                    <BrandName className="text-3xl text-black" />
                </div>
                <h2 className="text-2xl md:text-3xl font-medium text-gray-800">
                    We eliminate technical glitches to ensure a seamless and effective user experience.
                </h2>
            </div>

            {/* Feature 1: Enhanced Customer Engagement */}
            <div className="py-20 bg-blue-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Enhanced Customer Engagement</h2>
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                A smooth, fast website keeps users engaged. Tapouts Maintenance ensures every click leads to a flawless experience—boosting credibility and trust.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {[
                                    "Seamless Browsing Experience",
                                    "Reduced Load Times",
                                    "Higher On-Site Interaction"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center text-gray-700 font-medium">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Button variant="primary" className="bg-red-600 hover:bg-red-700 border-none rounded-full px-8">
                                Read More
                            </Button>
                        </div>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                                alt="Customer Engagement"
                                className="rounded-2xl shadow-xl w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature 2: Actionable Data Interpretation */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
                        <div className="lg:order-2">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Actionable Data Interpretation</h2>
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                We don’t just maintain your site—we monitor it. Get full visibility into uptime, errors, and performance so you’re always in control.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {[
                                    "Real-Time Monitoring & Alerts",
                                    "Monthly Health Reports",
                                    "Performance & UX Audits"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center text-gray-700 font-medium">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Button variant="primary" className="bg-red-600 hover:bg-red-700 border-none rounded-full px-8">
                                Read More
                            </Button>
                        </div>
                        <div className="lg:order-1">
                            <img
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                                alt="Data Interpretation"
                                className="rounded-2xl shadow-xl w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature 3: Cost-Effective Advertising */}
            <div className="py-20 bg-blue-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Cost-Effective Advertising</h2>
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                Your site is your best marketing tool. Our maintenance plans keep it sharp, secure, and conversion-ready—no redesigns or downtime needed.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {[
                                    "Reliable Site Availability",
                                    "Lower Bounce Rates",
                                    "Built-In Conversion Support"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center text-gray-700 font-medium">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Button variant="primary" className="bg-red-600 hover:bg-red-700 border-none rounded-full px-8">
                                Read More
                            </Button>
                        </div>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
                                alt="Cost Effective"
                                className="rounded-2xl shadow-xl w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* How Tapouts Work */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">How Tapouts Work?</h2>
                        <div className="w-20 h-1 bg-red-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-center">
                        {[
                            { icon: <Globe className="w-8 h-8" />, title: "Site Health Audit", desc: "Comprehensive analysis of current performance." },
                            { icon: <Server className="w-8 h-8" />, title: "Monitoring & Backups", desc: "24/7 uptime checks and daily secure backups." },
                            { icon: <Shield className="w-8 h-8" />, title: "Patch & Protect", desc: "Regular security updates and vulnerability scanning." },
                            { icon: <Clock className="w-8 h-8" />, title: "Support & Reporting", desc: "Dedicated maintenance hours and monthly reports." },
                            { icon: <BarChart className="w-8 h-8" />, title: "Iterate on Data", desc: "Continuous improvement based on user analytics." }
                        ].map((step, idx) => (
                            <div key={idx} className="relative group">
                                <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-4 shadow-lg border border-gray-100 group-hover:border-red-600 transition-colors">
                                    <div className="text-gray-600 group-hover:text-red-600 transition-colors font-bold text-xs">{step.icon}</div>
                                </div>
                                <h3 className="font-bold text-gray-900 text-sm">{step.title}</h3>
                                {idx < 4 && (
                                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 -z-10 transform translate-x-1/2"></div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Button variant="primary" className="bg-red-600 hover:bg-red-700 border-none rounded-full px-10 py-3 text-lg">
                            Start Now
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats/Info Grid */}
            <div className="bg-gray-50 py-16 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <h4 className="font-bold text-gray-900 uppercase mb-2 text-sm tracking-wider">Insight Dashboard</h4>
                            <p className="text-gray-500 text-sm">Customised Dashboard to understand insights.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 uppercase mb-2 text-sm tracking-wider">Results Driven</h4>
                            <p className="text-gray-500 text-sm">Achieve 10x growth and create right visibility.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 uppercase mb-2 text-sm tracking-wider">Success Team</h4>
                            <p className="text-gray-500 text-sm">Focused to ensure you drive the right experiences.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 uppercase mb-2 text-sm tracking-wider">Data Driven</h4>
                            <p className="text-gray-500 text-sm">Simple dashboard enables you to make all decisions.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <Testimonials />

            {/* Footer Branding */}
            <div className="bg-black py-12 text-center">
                <BrandName className="text-5xl text-white tracking-wider" />
                <p className="text-gray-500 mt-4 text-sm">Smart Maintenance. Unified Approach. Exponential Results.</p>
            </div>
        </div>
    );
};

export default WebDevelopment;
