'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Code, Sparkles, TrendingUp, BarChart, Globe, Search, Shield } from 'lucide-react';

interface Location {
    name: string;
    slug: { current: string };
    type: string;
    parent?: {
        name: string;
        slug: { current: string };
    };
}

import { SERVICES as SERVICES_DATA } from '@/lib/constants';

const ICON_MAP: Record<string, any> = {
    'web-development': Code,
    'gen-ai-services': Sparkles,
    'seo-marketing': Search,
    'ppc-marketing': BarChart,
    'performance-marketing': TrendingUp,
    'digital-marketing': Globe,
    'reputation-management': Shield,
};

const SERVICES = SERVICES_DATA.map(service => ({
    name: service.title,
    slug: service.slug,
    icon: ICON_MAP[service.slug] || Globe,
    primary: service.primary
}));

export default function ServiceAreasList({ locations }: { locations: Location[] }) {
    const [searchQuery, setSearchQuery] = useState('');

    // Grouping and Filtering Logic
    const { displayedParents, groupedLocations } = useMemo(() => {
        const groups: Record<string, Location[]> = {};
        const parents: Location[] = [];

        // First pass: Organize all data
        locations.forEach(loc => {
            if (!loc.parent) {
                parents.push(loc);
                if (!groups[loc.name]) groups[loc.name] = [];
            } else {
                const parentName = loc.parent.name;
                if (!groups[parentName]) groups[parentName] = [];
                groups[parentName].push(loc);
            }
        });

        // Filter based on search query
        const query = searchQuery.toLowerCase().trim();

        if (!query) {
            return { displayedParents: parents, groupedLocations: groups };
        }

        const filteredParents = parents.filter(parent => {
            const parentName = parent.name.toLowerCase();
            const children = groups[parent.name] || [];
            const hasMatchingChild = children.some(child => child.name.toLowerCase().includes(query));

            return parentName.includes(query) || hasMatchingChild;
        });

        return { displayedParents: filteredParents, groupedLocations: groups };
    }, [locations, searchQuery]);

    return (
        <div className="flex flex-col gap-8">
            {/* Search Input */}
            <div className="relative max-w-md w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-4 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-tapoutsPurple focus:border-tapoutsPurple sm:text-sm shadow-sm transition-shadow"
                    placeholder="Search for your city or town..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Results Grid */}
            {displayedParents.length > 0 ? (
                <div className="grid grid-cols-1 gap-12">
                    {displayedParents.map((parent) => (
                        <div key={parent.slug.current} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:border-tapoutsPurple/20 transition-all duration-300 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-tapoutsPurple/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>

                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">{parent.name}</h2>
                                <p className="text-gray-500 mb-8">Serving businesses across the entire {parent.name} region.</p>

                                {/* Primary Service Highlight - Web Development */}
                                <div className="mb-8">
                                    <Link
                                        href={`/services/web-development/${parent.slug.current}`}
                                        className="block bg-gradient-to-r from-[#0a0f2c] to-[#1a1f3c] text-white p-6 rounded-2xl hover:shadow-lg hover:shadow-tapoutsPurple/20 transition-all group/card border border-gray-800"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-tapoutsPurple/20 p-3 rounded-xl text-tapoutsPurple">
                                                    <Code className="w-8 h-8" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold group-hover/card:text-tapoutsPurple transition-colors">
                                                        Web Development in {parent.name}
                                                    </h3>
                                                    <p className="text-gray-400 text-sm mt-1">
                                                        Custom websites, e-commerce, and high-performance web apps.
                                                    </p>
                                                </div>
                                            </div>
                                            <ArrowRight className="text-tapoutsPurple opacity-0 -translate-x-4 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-300" />
                                        </div>
                                    </Link>
                                </div>

                                {/* Other Services Grid */}
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Other Services in {parent.name}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                                    {SERVICES.filter(s => !s.primary).map((service) => (
                                        <Link
                                            key={service.slug}
                                            href={`/services/${service.slug}/${parent.slug.current}`}
                                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group/link"
                                        >
                                            <service.icon className="w-5 h-5 text-gray-400 group-hover/link:text-tapoutsPurple transition-colors" />
                                            <span className="text-gray-700 font-medium group-hover/link:text-gray-900">
                                                {service.name}
                                            </span>
                                        </Link>
                                    ))}
                                </div>

                                {/* Sub-Location Pills */}
                                {groupedLocations[parent.name] && groupedLocations[parent.name].length > 0 && (
                                    <div className="pt-6 border-t border-gray-100">
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                            <span className="w-1 h-1 bg-tapoutsPurple rounded-full"></span>
                                            Areas covered in {parent.name}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {groupedLocations[parent.name].map((child) => (
                                                <Link
                                                    key={child.slug.current}
                                                    href={`/services/web-development/${child.slug.current}`}
                                                    className={`px-3 py-1 text-sm rounded-full transition-colors border ${searchQuery && child.name.toLowerCase().includes(searchQuery.toLowerCase())
                                                        ? 'bg-tapoutsPurple/10 text-tapoutsPurple border-tapoutsPurple/20 font-medium ring-1 ring-tapoutsPurple/20'
                                                        : 'bg-gray-50 text-gray-600 border-gray-100 hover:bg-tapoutsPurple/10 hover:text-tapoutsPurple'
                                                        }`}
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100 border-dashed">
                    <p className="text-gray-500 text-lg">No locations found via search.</p>
                    <button
                        onClick={() => setSearchQuery('')}
                        className="mt-4 text-tapoutsPurple font-bold hover:underline"
                    >
                        Clear Search
                    </button>
                </div>
            )}
        </div>
    );
}
