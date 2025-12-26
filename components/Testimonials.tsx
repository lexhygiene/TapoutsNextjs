import React from 'react';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
    return (
        <div className="bg-gray-50 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-16">See what our clients say</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow">
                            <div className="flex text-yellow-400 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                "Tapouts has completely transformed how we approach our business growth. The AI insights are incredibly accurate and actionable."
                            </p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                                <div>
                                    <div className="font-bold text-gray-900">Sarah Johnson</div>
                                    <div className="text-sm text-gray-500">CEO, TechStart</div>
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
