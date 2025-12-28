import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { PortableText } from '@portabletext/react';
import { RichTextComponents } from '@/components/Blog/RichTextComponents';
import BrandName from '@/components/BrandName';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import EnquiryForm from '@/components/EnquiryForm';
import Link from 'next/link';
import { Code2, Sparkles, Search, MousePointerClick, TrendingUp, Globe, Shield } from 'lucide-react';

import { SERVICE_TYPE_MAP, SERVICES } from '@/lib/constants';

// Service icons mapping
const SERVICE_ICONS: Record<string, React.ElementType> = {
    'Web Development': Code2,
    'Gen AI': Sparkles,
    'SEO Marketing': Search,
    'PPC Marketing': MousePointerClick,
    'Performance Marketing': TrendingUp,
    'Digital Marketing': Globe,
    'Reputation Management': Shield,
};

interface Props {
    params: Promise<{
        serviceType: string;
        location: string;
    }>;
}

export const revalidate = 86400; // Revalidate every 24 hours

// Generate Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { serviceType, location } = await params;

    // Normalize service type
    const normalizedService = SERVICE_TYPE_MAP[serviceType];
    if (!normalizedService) return { title: 'Service Not Found' };

    const query = groq`
        *[_type == "servicePage" && serviceType == $serviceType && location->slug.current == $locationSlug][0] {
            seoTitle,
            seoDescription
        }
    `;

    const page = await client.fetch(query, {
        serviceType: normalizedService,
        locationSlug: location
    });

    if (!page) {
        return {
            title: 'Service Page Not Found',
        };
    }

    return {
        title: page.seoTitle,
        description: page.seoDescription,
    };
}

export default async function ServiceLocationPage({ params }: Props) {
    const { serviceType, location } = await params;

    const normalizedService = SERVICE_TYPE_MAP[serviceType];

    if (!normalizedService) {
        notFound();
    }

    const query = groq`
        *[_type == "servicePage" && serviceType == $serviceType && location->slug.current == $locationSlug][0] {
            ...,
            location->
        }
    `;

    const page = await client.fetch(query, {
        serviceType: normalizedService,
        locationSlug: location
    });

    if (!page) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
                    <p>We couldn't find a page for {normalizedService} in {location}.</p>
                </div>
            </div>
        );
    }

    // Get other services (excluding current one and Smart Maintenance for balanced grid)
    const otherServices = SERVICES.filter(s => s.title !== normalizedService && s.title !== 'Smart Maintenance');

    return (
        <main className="bg-white min-h-screen text-gray-900 pt-24 pb-20">
            {/* Hero Section */}
            <section className="bg-nexusDark text-white py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{page.title}</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        High-impact {normalizedService} tailored for the {page.location?.name} market.
                    </p>
                </div>
            </section>

            {/* Content Body & Sidebar */}
            <section className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12">
                <div className="lg:w-3/4">
                    <div className="prose prose-lg prose-indigo mx-auto text-gray-800">
                        <PortableText value={page.body} components={RichTextComponents} />
                    </div>

                    {/* Other Services in this Location */}
                    <div className="mt-16 pt-12 border-t border-gray-200">
                        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">
                            Other Services in {page.location?.name}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {otherServices.map((service) => {
                                const Icon = SERVICE_ICONS[service.title] || Globe;
                                return (
                                    <Link
                                        key={service.slug}
                                        href={`/services/${service.slug}/${location}`}
                                        className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-tapoutsPurple hover:bg-gray-50 transition-all group"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-tapoutsPurple/10 flex items-center justify-center transition-colors">
                                            <Icon className="w-5 h-5 text-gray-600 group-hover:text-tapoutsPurple" />
                                        </div>
                                        <span className="font-medium text-gray-900 group-hover:text-tapoutsPurple transition-colors">
                                            {service.title}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Sidebar with Shadow */}
                <aside className="lg:w-1/4 space-y-8 h-fit lg:sticky lg:top-24">
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-lg shadow-gray-200/50">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Get a Quote</h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Ready to transform your business in {page.location?.name}? Fill out the form below.
                        </p>
                        <EnquiryForm />
                    </div>

                    <div className="bg-nexusDark text-white p-6 rounded-2xl shadow-lg shadow-nexusDark/30">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            Why <BrandName />?
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li className="flex items-start">
                                <span className="mr-2 text-tapoutsPurple">✓</span> Data-Driven Strategies
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-tapoutsPurple">✓</span> AI-Powered Insights
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-tapoutsPurple">✓</span> Proven ROI
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-tapoutsPurple">✓</span> 24/7 Support
                            </li>
                        </ul>
                    </div>
                </aside>
            </section>

            {/* CTA Section */}
            <section className="bg-indigo-600 text-white py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Grow in {page.location?.name}?</h2>
                    <p className="mb-8 text-indigo-100">Contact us today to discuss your {normalizedService} needs.</p>
                    <a
                        href="/contact"
                        className="inline-block bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        Get a Quote
                    </a>
                </div>
            </section>
        </main>
    );
}

