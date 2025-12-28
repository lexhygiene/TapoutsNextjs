'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface FeatureSectionProps {
    title: string;
    description: string | React.ReactNode;
    features: string[];
    imageSrc: string;
    imageAlt: string;
    reversed?: boolean;
    badge?: string;
    className?: string;
    ctaLink?: string;
    ctaText?: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
    title,
    description,
    features,
    imageSrc,
    imageAlt,
    reversed = false,
    badge,
    className,
    ctaLink = '/services', // Default fallback
    ctaText = 'Learn more'
}) => {
    return (
        <div className={`py-24 overflow-hidden ${className || 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex flex-col lg:flex-row items-center gap-16 ${reversed ? 'lg:flex-row-reverse' : ''}`}>

                    {/* Content */}
                    <div className="flex-1 space-y-8">
                        {badge && (
                            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-bold uppercase tracking-wide">
                                {badge}
                            </span>
                        )}
                        <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                            {title}
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            {description}
                        </p>

                        <ul className="space-y-4">
                            {features.map((feature, idx) => (
                                <li key={idx} className="flex items-start">
                                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700 font-medium">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {ctaLink && (
                            <Link href={ctaLink} prefetch={false} className="group inline-flex items-center text-tapoutsPurple font-bold hover:text-opacity-80 transition-colors">
                                {ctaText} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        )}
                    </div>

                    {/* Image */}
                    <div className="flex-1 w-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50"
                        >
                            <Image
                                src={imageSrc}
                                alt={imageAlt}
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover"
                            />
                            {/* Decorative blob */}
                            <div className={`absolute -z-10 w-full h-full top-10 ${reversed ? 'left-10' : 'right-10'} bg-gray-100 rounded-3xl`}></div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FeatureSection;
