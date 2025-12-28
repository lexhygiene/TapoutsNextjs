'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '../components/Button';
import AnimatedHero from '../components/AnimatedHero';
import Partners from '../components/Partners';
import FeatureSection from '../components/FeatureSection';
import Testimonials from '../components/Testimonials';
import BrandName from '../components/BrandName';

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <AnimatedHero />

      {/* Partners Section */}
      <Partners />

      {/* Feature 1: Visibility */}
      <FeatureSection
        title="VISIBILITY"
        description="GenAI Content Ready. Omnichannel Visibility. Drive Traffic. Ensure your brand is seen where it matters most."
        features={[
          "GenAI Content Ready",
          "Omnichannel Visibility",
          "Drive Traffic"
        ]}
        imageSrc="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
        imageAlt="Visibility Dashboard"
        badge="Awareness"
        ctaLink="/web-development"
      />

      {/* Feature 2: Interest (Reversed) */}
      <FeatureSection
        title="INTEREST"
        description={<span>GenAI Content Ready. Omnichannel Engagement. Validate Need. Capture your audience's attention and drive meaningful interactions.</span>}
        features={[
          "GenAI Content Ready",
          "Omnichannel Engagement",
          "Validate Need"
        ]}
        imageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
        imageAlt="Interest Analytics"
        reversed={true}
        badge="Engagement"
        className="bg-blue-50/50"
        ctaLink="/services"
      />

      {/* Feature 3: Experiences */}
      <FeatureSection
        title="EXPERIENCES"
        description={<span>GenAI Content Ready. Omnichannel CX. Create Experiences. Deliver seamless and personalized customer journeys.</span>}
        features={[
          "GenAI Content Ready",
          "Omnichannel CX",
          "Create Experiences"
        ]}
        imageSrc="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1974&auto=format&fit=crop"
        imageAlt="Customer Experiences"
        badge="Satisfaction"
        ctaLink="/services"
      />

      {/* Feature 4: Growth Hacking (Reversed) */}
      <FeatureSection
        title="Growth Hacking"
        description={<span>Driving 10x growth in performance. We combine the power of Search, Social & Remarketing optimised by a unique self-learning algorithm. Power by Generative BI, <BrandName /> enable you to tap into the full potential of performance marketing.</span>}
        features={[
          "Visibility",
          "Interest",
          "Growth"
        ]}
        imageSrc="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
        imageAlt="Growth Hacking"
        reversed={true}
        badge="Performance"
        className="bg-blue-50/50"
        ctaLink="/membership"
        ctaText="View Plans"
      />

      {/* Feature 5: Reputation Matters */}
      <FeatureSection
        title="Reputation Matters"
        description="We are being judged today every step of the way by our audiences. Reputation management enables you to ensure the information which is visible everywhere is the one which you want them to see."
        features={[
          "Reach",
          "Interactions",
          "Engagements"
        ]}
        imageSrc="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop"
        imageAlt="Reputation Management"
        badge="Trust"
        ctaLink="/contact"
        ctaText="Talk to Us"
      />

      {/* Recommended Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">RECOMMENDED</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "OMNICHANNEL CX", desc: <span>Powered by GenAI, <BrandName /> are 100% Personalised & Omnichannel Ready</span> },
              { title: "UNLIMITED VIDEO", desc: <span>Powered by GenAI, <BrandName /> are 100% content ready marketing campaigns</span> },
              { title: "SOCIAL MEDIA OPTIMISATION", desc: <span>Powered by GenAI, <BrandName /> automate social media optimisations</span> },
              { title: "SEARCH ENGINE OPTIMISATION", desc: <span>Powered by GenAI, <BrandName /> automate search engine optimisations</span> },
              { title: "FACEBOOK MANAGEMENT", desc: <span>Powered by GenAI, <BrandName /> automate Facebook community management.</span> },
              { title: "GOOGLE SEO", desc: <span>Powered by GenAI, <BrandName /> automate Google SEO ranking improvements</span> },
              { title: "TWITTER MANAGEMENT", desc: <span>Powered by GenAI, <BrandName /> automate Twitter community management.</span> },
              { title: "LINKEDIN MANAGEMENT", desc: <span>Powered by GenAI, <BrandName /> automate LinkedIn community management.</span> },
              { title: "INSTAGRAM MANAGEMENT", desc: <span>Powered by GenAI, <BrandName /> automate Instagram community management.</span> },
              { title: "LOCAL SEO", desc: <span>Powered by GenAI, <BrandName /> automate Local SEO ranking improvements</span> },
              { title: "SNAPCHAT MANAGEMENT", desc: <span>Powered by GenAI, <BrandName /> automate snapchat community management.</span> },
              { title: "PINTEREST MANAGEMENT", desc: <span>Powered by GenAI, <BrandName /> automate pinterest community management.</span> },
              { title: "ANALYTICS", desc: <span>Powered by GenAI, <BrandName /> are automated Generative BI.</span> },
              { title: "BRAND CX", desc: <span>Powered by GenAI, <BrandName /> automate Brand community management.</span> },
              { title: "COMPETITOR TRACKING", desc: <span>Powered by GenAI, <BrandName /> automates competitor tracking.</span> },
              { title: "MARKETING STRATEGY", desc: <span>Powered by GenAI, <BrandName /> are automated marketing strategy</span> }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2 text-sm uppercase">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <div className="bg-[#0a0f2c] text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Are you ready?</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Join thousands of businesses that are scaling faster and smarter with <BrandName className="text-white" />. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="primary" size="lg" onClick={() => router.push('/membership')} className="border-none">
              Get Started Now
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:!text-gray-900" size="lg" onClick={() => router.push('/contact')}>
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
