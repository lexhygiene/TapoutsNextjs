'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import BrandName from './BrandName';

const AnimatedHero: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

    return (
        <div ref={ref} className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden bg-[#0a0f2c]">
            {/* Background decoration - Network/Constellation effect */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/20 to-[#0a0f2c]"></div>
                {/* Animated Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <motion.div
                        style={{ opacity, y }}
                        className="text-left space-y-8"
                    >
                        <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-4">
                            <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                            <span className="text-sm text-gray-300 font-medium">New: AI-Powered Growth Engine</span>
                        </div>

                        <div className="mb-2">
                            <BrandName className="text-5xl md:text-6xl tracking-wide text-white" />
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight mb-6">
                            Stop guessing, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                                Start Scaling
                            </span>
                        </h1>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Drive 10x Growth with AI
                        </h2>

                        <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
                            Powered by <BrandName className="text-white" /> GenAI. Digital marketing services to personalize and replace human every step.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link href="/membership" prefetch={false} className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-tapoutsPurple font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-opacity-90">
                                Get Started
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Hero Image/Visual */}
                    <motion.div
                        style={{ scale }}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#1a1f3c]/50 backdrop-blur-md p-2">
                            <Image
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                                alt="Dashboard Interface"
                                width={1000}
                                height={600}
                                className="w-full h-auto rounded-xl opacity-90"
                            />

                            {/* Floating UI Elements */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                                        <ArrowRight className="w-6 h-6 text-green-400 -rotate-45" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Growth Rate</p>
                                        <p className="text-xl font-bold text-white">+127%</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                    <p className="text-sm font-medium text-white">System Optimal</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Decorative Glow */}
                        <div className="absolute -inset-4 bg-blue-500/20 blur-3xl -z-10 rounded-full"></div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default AnimatedHero;
