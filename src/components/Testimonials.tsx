import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialItem {
    name: string;
    role: string;
    quote: string;
}

interface TestimonialsProps {
    items?: TestimonialItem[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ items }) => {
    const defaultItems: TestimonialItem[] = [
        {
            name: "Amit Parmar",
            role: "General Manager Sales & Marketing, Rolls Royce India",
            quote: "Tapouts has completely transformed how we approach our business growth. The technical expertise they bring is unmatched."
        },
        {
            name: "Franky DeSouza",
            role: "Head of Marketing, Oysters Beach",
            quote: "A seamless experience from start to finish. Our website performance has improved significantly since working with Tapouts."
        },
        {
            name: "Ian Harris",
            role: "Founder, Cost Assist UK",
            quote: "Reliable, efficient, and results-driven. They simplified our web maintenance so we could focus on our core business."
        }
    ];

    const testimonials = items || defaultItems;

    return (
        <div className="bg-gray-50 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-16">See what our clients say</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow">
                            <div className="flex text-yellow-400 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                "{item.quote}"
                            </p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                                <div>
                                    <div className="font-bold text-gray-900">{item.name}</div>
                                    <div className="text-sm text-gray-500">{item.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
