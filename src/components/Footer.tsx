import React from 'react';
import Link from 'next/link';
import { Globe, Users, Linkedin, MapPin } from 'lucide-react';
import BrandName from './BrandName';
import { CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#0a0f2c] text-white relative overflow-hidden">
            {/* CTA Strip */}
            <div className="bg-tapoutsPurple text-white py-4 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <div>
                        <span className="font-bold uppercase tracking-wider text-xs opacity-80 block mb-1">National Coverage</span>
                        <p className="font-bold text-lg">Serving businesses across the UK. See if we cover your area.</p>
                    </div>
                    <Link
                        href="/service-areas"
                        prefetch={false}
                        className="bg-white text-tapoutsPurple px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2"
                    >
                        View Service Areas <Globe className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            <div className="pt-16 pb-8 relative">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <Link href="/" prefetch={false} className="hover:opacity-80 transition-opacity">
                                    <BrandName className="text-3xl tracking-wide text-white" />
                                </Link>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                Smart Maintenance. Unified Approach. Exponential Results.
                            </p>
                            <div className="flex space-x-4">
                                <a
                                    href={SOCIAL_LINKS.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-tapoutsPurple transition cursor-pointer"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="w-4 h-4" />
                                </a>
                                <a
                                    href={SOCIAL_LINKS.google}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-tapoutsPurple transition cursor-pointer"
                                    aria-label="Google Profile"
                                >
                                    <MapPin className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-bold mb-6 text-tapoutsPurple">Quick Links</h4>
                            <ul className="space-y-3 text-sm text-gray-300">
                                <li><Link href="/about" prefetch={false} className="hover:text-white transition">About</Link></li>
                                <li><Link href="/membership" prefetch={false} className="hover:text-white transition">Plans</Link></li>
                                <li><Link href="/services" prefetch={false} className="hover:text-white transition">Services</Link></li>
                                <li><Link href="/web-development" prefetch={false} className="hover:text-white transition">Web Dev</Link></li>
                                <li><Link href="/service-areas" prefetch={false} className="hover:text-white transition text-tapoutsPurple font-bold">Service Areas</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-bold mb-6 text-tapoutsPurple">Contact</h4>
                            <ul className="space-y-3 text-sm text-gray-300">
                                <li>
                                    <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition">
                                        {CONTACT_INFO.email}
                                    </a>
                                </li>
                                <li>
                                    <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-white transition">
                                        {CONTACT_INFO.phone}
                                    </a>
                                </li>
                                <li>
                                    <a href={CONTACT_INFO.addressMapLink} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                                        {CONTACT_INFO.address}
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-bold mb-6 text-tapoutsPurple">Legal</h4>
                            <ul className="space-y-3 text-sm text-gray-300">
                                <li><Link href="/privacy-policy" prefetch={false} className="hover:text-white transition">Privacy Policy</Link></li>
                                <li><Link href="/terms-of-service" prefetch={false} className="hover:text-white transition">Terms of Service</Link></li>
                                <li><Link href="/cookie-policy" prefetch={false} className="hover:text-white transition">Cookie Policy</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                        <p>&copy; {new Date().getFullYear()} Tapouts. All Rights Reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            {/* Admin login removed */}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
