'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Globe,
    Smartphone,
    Share2,
    FileText,
    Cpu,
    Zap,
    Users,
    ArrowRight
} from 'lucide-react';
import Button from '../../components/Button';
import BrandName from '../../components/BrandName';

const About: React.FC = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="bg-white min-h-screen font-sans overflow-hidden">
            {/* Hero Section */}
            <div className="relative bg-[#0a0f2c] text-white py-32 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-black mb-6">
                            <BrandName className="text-white tracking-wide" />
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
                            Redefining digital landscapes with AI-driven precision and human creativity.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Mission Statement - Kinetic Typography */}
            <div className="bg-[#0a0f2c] py-20 relative z-20 -mt-1 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="text-center"
                    >
                        <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold text-white mb-2">
                            OMNICHANNEL MARKETING
                        </motion.h2>
                        <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-tapoutsPurple to-pink-500">
                            #SIMPLIFIED
                        </motion.h2>
                    </motion.div>
                </div>
            </div>

            {/* Feature Grid - Glassmorphism */}
            <div className="py-24 bg-gray-50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: '#LOCAL', icon: Globe, desc: 'GPS targeted to audiences.', color: 'bg-blue-500' },
                            { title: '#MOBILE', icon: Smartphone, desc: 'Cross device & mobile ready.', color: 'bg-purple-500' },
                            { title: '#SOCIAL', icon: Share2, desc: 'Cross network & social ready.', color: 'bg-pink-500' },
                            { title: '#CONTENT', icon: FileText, desc: 'Omnichannel content ready.', color: 'bg-orange-500' }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden group"
                            >
                                <div className={`absolute top-0 right-0 w-24 h-24 ${item.color} opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-500`}></div>
                                <div className={`w-12 h-12 ${item.color} text-white rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600 font-medium">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Section - Dark Theme */}
            <div className="bg-nexusDark py-24 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                        {[
                            { label: 'Touchscreen Users', value: 90 },
                            { label: 'Local Searches', value: 57 },
                            { label: 'Social Engagements', value: 100 },
                            { label: 'Video Views', value: 73 }
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm"
                            >
                                <div className="flex justify-between items-end mb-4">
                                    <span className="text-xl font-bold text-gray-300">{stat.label}</span>
                                    <span className="text-4xl font-black text-tapoutsPurple">{stat.value}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${stat.value}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="bg-gradient-to-r from-tapoutsPurple to-blue-500 h-full rounded-full"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center max-w-4xl mx-auto">
                        <h3 className="text-2xl md:text-4xl font-bold leading-tight">
                            <BrandName className="text-tapoutsPurple" /> are omnichannel customer journeys touchpoints creating new experiences & enabling growth.
                        </h3>
                    </div>
                </div>
            </div>

            {/* Why Choose Us - GenAI Section */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-2 bg-tapoutsPurple/10 px-4 py-1.5 rounded-full text-tapoutsPurple font-bold text-sm mb-6">
                                <Cpu className="w-4 h-4" />
                                <span>POWERED BY GEN AI</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-nexusDark mb-6">
                                Future-Ready Marketing
                            </h2>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                We don't just follow trends; we set them. By leveraging the power of Generative AI and automation, we deliver marketing strategies that are smarter, faster, and more effective than ever before.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                <div className="flex items-start gap-3">
                                    <Zap className="w-6 h-6 text-yellow-500 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-gray-900">Instant Scalability</h4>
                                        <p className="text-sm text-gray-500">Grow without limits.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Users className="w-6 h-6 text-blue-500 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-gray-900">Hyper-Personalization</h4>
                                        <p className="text-sm text-gray-500">Connect on a deeper level.</p>
                                    </div>
                                </div>
                            </div>
                            <Button variant="primary">
                                Explore Our Tech <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                        <div className="flex-1 relative">
                            <div className="relative z-10 bg-gradient-to-br from-gray-900 to-nexusDark p-8 rounded-3xl shadow-2xl text-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="absolute top-0 right-0 p-8 opacity-20">
                                    <Cpu className="w-32 h-32" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">The Tapouts Advantage</h3>
                                <ul className="space-y-4">
                                    {[
                                        'AI-Driven Insights',
                                        'Automated Content Generation',
                                        'Real-Time Analytics',
                                        'Cross-Platform Integration'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-tapoutsPurple flex items-center justify-center text-xs font-bold">✓</div>
                                            <span className="text-lg">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="absolute inset-0 bg-tapoutsPurple transform -rotate-2 rounded-3xl opacity-20 scale-105 z-0"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
