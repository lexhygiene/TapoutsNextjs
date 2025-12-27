'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import BrandName from './BrandName';

interface NavItem {
    label: string;
    path: string;
}

const navItems: NavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Plans', path: '/membership' },
    { label: 'Services', path: '/services' },
    { label: 'Web Dev', path: '/web-development' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
];

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-2 hover:opacity-90 transition-opacity">
                        <BrandName className="text-3xl tracking-wide text-nexusDark" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`text-sm font-bold transition-colors duration-200 ${isActive ? 'text-tapoutsPurple' : 'text-gray-600 hover:text-tapoutsPurple'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                        <Link href="/membership" className="bg-tapoutsPurple text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-opacity-90 transition shadow-md hover:shadow-lg">
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-600 hover:text-tapoutsPurple focus:outline-none"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown - Classy Card Style */}
            {isMobileMenuOpen && (
                <div className="absolute top-24 left-4 md:hidden w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 transform transition-all duration-300 origin-top-left z-50">
                    <div className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive
                                        ? 'bg-tapoutsPurple/10 text-tapoutsPurple'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 group'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        {item.label}
                                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-tapoutsPurple" />}
                                    </div>
                                </Link>
                            );
                        })}
                        <div className="pt-2 mt-2 border-t border-gray-100">
                            <Link
                                href="/membership"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block w-full text-center bg-tapoutsPurple text-white px-4 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-transform active:scale-95"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
