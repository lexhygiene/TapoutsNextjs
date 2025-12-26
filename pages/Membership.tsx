import React from 'react';
import { Check, Zap, Shield, Rocket } from 'lucide-react';
import Button from '../components/Button';
import { MembershipTier } from '../types';

const tiers: MembershipTier[] = [
  {
    name: 'Essential Plan',
    price: '£250',
    period: '/month',
    bestFor: 'Small Business',
    benefits: [
      'CMS & Plugin Updates',
      'Security Monitoring + Malware Protection',
      'Off-site Backups (Rolling 30 Days)',
      '24/7 Uptime Monitoring',
      'Basic Speed Optimisation',
      'SSL Monitoring',
      '2 Hours/Month Content Support',
      'Monthly Health Report',
      'Email Support (48hr SLA)'
    ],
    icon: Zap
  },
  {
    name: 'Growth Plan',
    price: '£450',
    period: '/month',
    bestFor: 'Growing Brands',
    recommended: true,
    benefits: [
      'Real-Time Security Alerts + Firewall Setup',
      'CDN + Caching for Performance Boost',
      'WooCommerce/Shopify Plugin Assistance',
      '5 Hours/Month of Content',
      'SEO Audits + Analytics Reports',
      'Dedicated Support Manager',
      'Phone + Email Support (24hr SLA)',
      'AWS + Integration Support'
    ],
    icon: Shield
  },
  {
    name: 'Performance Plan',
    price: '£750',
    period: '/month',
    bestFor: 'High Traffic Sites',
    benefits: [
      'Malware Removal Guarantee',
      'Bi-weekly SEO & Speed Audits',
      '10 Hours/Month Dev or UX Support',
      'Custom API & Integration Monitoring',
      'Custom KPI Dashboard',
      'Same-Day Priority Support',
      'Monthly Strategy Calls',
      'Network & Server Monitoring'
    ],
    icon: Rocket
  }
];

const Membership: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-nexusDark mb-6 tracking-tight">
            Website Maintenance Plans
          </h1>
          <p className="text-xl text-gray-600">
            Essential website care to keep your site fast, secure, and consistently up and running.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col ${tier.recommended ? 'border-2 border-tapoutsPurple ring-4 ring-purple-50 transform scale-105 z-10' : 'border border-gray-100'
                }`}
            >
              {tier.recommended && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <div className="bg-blue-500 text-white text-xs font-bold uppercase tracking-wide px-4 py-1 rounded-bl-lg shadow-md">
                    POPULAR
                  </div>
                </div>
              )}

              <div className="p-8 border-b border-gray-100 flex-grow-0 text-center">
                {tier.icon && (
                  <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <tier.icon className={`w-8 h-8 ${tier.recommended ? 'text-tapoutsPurple' : 'text-gray-600'}`} />
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-sm text-green-500 font-medium mb-6">{tier.bestFor}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-black text-nexusDark">{tier.price}</span>
                  <span className="text-gray-500 ml-2">{tier.period}</span>
                </div>
              </div>

              <div className="p-8 flex-grow">
                <ul className="space-y-4">
                  {tier.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600">
                      <Check className="w-5 h-5 text-tapoutsPurple mr-3 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 pt-0 mt-auto">
                <Button
                  variant={tier.recommended ? 'primary' : 'outline'}
                  className="w-full"
                >
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center">
          <h3 className="text-2xl font-bold text-nexusDark mb-4">Need a Custom Solution?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We offer tailored maintenance packages for enterprise-level websites with specific security and compliance requirements.
          </p>
          <Button variant="secondary">Contact Sales</Button>
        </div>
      </div>
    </div>
  );
};

export default Membership;