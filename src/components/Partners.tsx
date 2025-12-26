import React from 'react';

const Partners: React.FC = () => {
    return (
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-white/80 text-sm font-bold uppercase tracking-widest mb-8">Our Partners</p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Placeholder Logos */}
                    <div className="flex items-center gap-2 text-white font-bold text-xl">
                        <div className="w-8 h-8 bg-white rounded-md"></div> TechCorp
                    </div>
                    <div className="flex items-center gap-2 text-white font-bold text-xl">
                        <div className="w-8 h-8 bg-white rounded-full"></div> GlobalSol
                    </div>
                    <div className="flex items-center gap-2 text-white font-bold text-xl">
                        <div className="w-8 h-8 bg-white rotate-45"></div> InnovateX
                    </div>
                    <div className="flex items-center gap-2 text-white font-bold text-xl">
                        <div className="w-8 h-8 bg-white rounded-tr-xl"></div> FutureNet
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Partners;
