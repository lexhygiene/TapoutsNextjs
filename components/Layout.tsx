import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Shield, Globe, Users } from 'lucide-react';
import { NavItem } from '../types';
import ChatWidget from './ChatWidget';
import SidebarForm from './SidebarForm';

const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Plans', path: '/membership' },
  { label: 'Services', path: '/services' },
  { label: 'Web Dev', path: '/web-development' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-white">
      {/* Navigation - Increased z-index to 50 to sit above sidebar panel */}
      <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <NavLink to="/" className="flex-shrink-0 flex items-center gap-2 hover:opacity-90 transition-opacity">
              <span className="font-brand italic text-3xl tracking-wide text-nexusDark">tapouts</span>
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-sm font-bold transition-colors duration-200 ${isActive ? 'text-tapoutsPurple' : 'text-gray-600 hover:text-tapoutsPurple'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <NavLink to="/membership" className="bg-tapoutsPurple text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-opacity-90 transition shadow-md hover:shadow-lg">
                Get Started
              </NavLink>
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

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-4 rounded-md text-base font-medium ${isActive ? 'bg-gray-50 text-tapoutsPurple' : 'text-gray-600 hover:bg-gray-50 hover:text-tapoutsPurple'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0f2c] text-white pt-16 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="font-brand italic text-3xl tracking-wide text-white">tapouts</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Smart Maintenance. Unified Approach. Exponential Results.
              </p>
              <div className="flex space-x-4">
                {/* Social placeholders */}
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-tapoutsPurple transition cursor-pointer">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-tapoutsPurple transition cursor-pointer">
                  <Users className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-tapoutsPurple">Quick Links</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><NavLink to="/about" className="hover:text-white transition">About</NavLink></li>
                <li><NavLink to="/membership" className="hover:text-white transition">Plans</NavLink></li>
                <li><NavLink to="/services" className="hover:text-white transition">Services</NavLink></li>
                <li><NavLink to="/web-development" className="hover:text-white transition">Web Dev</NavLink></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-tapoutsPurple">Contact</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li>info@tapouts.co</li>
                <li>+447400085510</li>
                <li>London, United Kingdom</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-tapoutsPurple">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Tapouts. All Rights Reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/admin" target="_blank" rel="noopener noreferrer" className="hover:text-white">Admin Login</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chat Widget - z-[60] to stay above everything */}
      <div className="relative z-[60]">
        <ChatWidget />
      </div>

      {/* Fixed Sidebar Form */}
      <SidebarForm />
    </div>
  );
};

export default Layout;