import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import EnquiryForm from '@/components/EnquiryForm';
import ServiceAreasList from '@/components/ServiceAreasList';
import { Metadata } from 'next';

export const revalidate = 86400;

export const metadata: Metadata = {
    title: 'Our Service Areas | Tapouts',
    description: 'Explore the locations where we provide top-tier digital services.',
};

import { Location } from '@/types';
import { LOCATION_RANKS, DEFAULT_LOCATION_RANK } from '@/lib/constants';

export default async function ServiceAreasPage() {
    const query = groq`
        *[_type == "location"] | order(name asc) {
            name,
            slug,
            type,
            parent->{
                name,
                slug
            }
        }
    `;

    const locations: Location[] = await client.fetch(query);


    // SERVER-SIDE SORTING
    locations.sort((a, b) => {
        const nameA = a.name.toLowerCase().trim();
        const nameB = b.name.toLowerCase().trim();
        const rankA = LOCATION_RANKS[nameA] || DEFAULT_LOCATION_RANK;
        const rankB = LOCATION_RANKS[nameB] || DEFAULT_LOCATION_RANK;

        if (rankA !== rankB) return rankA - rankB;
        return a.name.localeCompare(b.name);
    });

    return (
        <main className="bg-white min-h-screen text-gray-900 pt-24 pb-20">
            {/* Hero Section */}
            <section className="bg-[#0a0f2c] text-white py-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        Global Reach, <span className="text-tapoutsPurple italic">Local Impact.</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
                        We deliver world-class digital solutions tailored to your specific location. Find your nearest service hub below.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12">
                {/* Main Content */}
                <div className="lg:w-3/4">
                    <ServiceAreasList locations={locations} />
                </div>

                {/* Sidebar */}
                <aside className="lg:w-1/4 space-y-8 h-fit lg:sticky lg:top-24">
                    <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Get a Quote</h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Ready to transform your business? Fill out the form below.
                        </p>
                        <EnquiryForm />
                    </div>

                    <div className="bg-[#0a0f2c] text-white p-8 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-tapoutsPurple/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                        <h3 className="text-xl font-bold mb-6 relative z-10">Why Choose Us?</h3>
                        <ul className="space-y-4 text-sm text-gray-300 relative z-10">
                            <li className="flex items-start bg-white/5 p-3 rounded-xl border border-white/10">
                                <span className="mr-3 text-tapoutsPurple font-bold">01.</span>
                                <span>Data-Driven ROI Strategies</span>
                            </li>
                            <li className="flex items-start bg-white/5 p-3 rounded-xl border border-white/10">
                                <span className="mr-3 text-tapoutsPurple font-bold">02.</span>
                                <span>AI-Powered Insights</span>
                            </li>
                            <li className="flex items-start bg-white/5 p-3 rounded-xl border border-white/10">
                                <span className="mr-3 text-tapoutsPurple font-bold">03.</span>
                                <span>24/7 Dedicated Support</span>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </main>
    );
}
