'use client';

import React from 'react';
import { Check, Zap, Rocket, Shield } from 'lucide-react';
import Button from '../../components/Button';
import { membershipPlans } from '../../lib/stripeConfig';
import Link from 'next/link';

const Membership: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-20 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-nexusDark mb-6 tracking-tight">
                        Fully Managed Growth Engines
                    </h1>
                    <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                        At Tapouts, we don’t just give you a login and wish you luck. Instead of hand-holding you through a software setup, we build, launch, and manage your systems for you.
                    </p>
                    <p className="text-lg text-gray-500 font-light max-w-3xl mx-auto">
                        We’ve taken the most powerful marketing infrastructure on the market and "supercharged" it with our internal team of experts so you can focus on running your business, not your software.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {membershipPlans.map((tier) => (
                        <div
                            key={tier.name}
                            className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col ${tier.recommended ? 'border-2 border-tapoutsPurple ring-4 ring-purple-50 transform scale-105 z-10' : 'border border-gray-100'
                                }`}
                        >
                            {tier.recommended && (
                                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                                    <div className="bg-blue-500 text-white text-xs font-bold uppercase tracking-wide px-4 py-1 rounded-bl-lg shadow-md">
                                        POPULAR
                                    </div>
                                </div>
                            )}

                            <div className="p-8 border-b border-gray-100 flex-grow-0 text-center">
                                {tier.icon && (
                                    <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                        {/* @ts-ignore */}
                                        <tier.icon className={`w-8 h-8 ${tier.recommended ? 'text-tapoutsPurple' : 'text-gray-600'}`} />
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">{tier.name}</h3>
                                {tier.subtitle && <p className="text-sm font-semibold text-tapoutsPurple mb-3">{tier.subtitle}</p>}
                                <p className="text-sm text-gray-600 font-medium mb-4 italic">"{tier.bestFor}"</p>
                                <div className="flex items-baseline justify-center mb-4">
                                    <span className="text-5xl font-black text-nexusDark">{tier.price}</span>
                                    <span className="text-gray-500 ml-2">{tier.period}</span>
                                </div>
                                {tier.description && (
                                    <p className="text-sm text-gray-500 leading-snug">{tier.description}</p>
                                )}
                            </div>

                            <div className="p-8 flex-grow">
                                <ul className="space-y-4">
                                    {tier.benefits.map((benefit, idx) => (
                                        <li key={idx} className="flex items-start text-sm text-gray-600">
                                            <Check className="w-5 h-5 text-tapoutsPurple mr-3 flex-shrink-0 mt-0.5" />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-8 pt-0 mt-auto">
                                {tier.stripeLink ? (
                                    <a href={tier.stripeLink} target="_blank" rel="noopener noreferrer" className="block w-full">
                                        <Button
                                            variant={tier.recommended ? 'primary' : 'outline'}
                                            className="w-full"
                                        >
                                            Get Started
                                        </Button>
                                    </a>
                                ) : (
                                    <Link href="/contact" className="block w-full">
                                        <Button
                                            variant={tier.recommended ? 'primary' : 'outline'}
                                            className="w-full"
                                        >
                                            Contact Sales
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <h3 className="text-2xl font-bold text-nexusDark mb-4">Why Tapouts?</h3>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
                        Most platforms are "Do It Yourself." We are "Done With You" (Core) and "Done For You" (Accelerator/Elite). You get the power of a world-class CRM with the service of a boutique agency.
                    </p>
                    <Button variant="secondary" onClick={() => window.location.href = '/contact'}>Contact Sales</Button>
                </div>
            </div>
        </div>
    );
};

export default Membership;
