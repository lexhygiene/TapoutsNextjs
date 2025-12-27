import { Zap, Rocket, Shield } from 'lucide-react';
import { MembershipTier } from '../types';

export const membershipPlans: MembershipTier[] = [
    {
        name: 'Tapouts Core',
        subtitle: '(The Foundation)',
        price: '£97',
        period: '/month',
        bestFor: 'Established small businesses needing a professional, automated front office.',
        description: 'This plan replaces your scattered tools with a single, unified system. We handle the heavy lifting of the initial build-out so you can start capturing leads on day one.',
        benefits: [
            'Fully Managed Onboarding: We build your initial lead-capture funnels and sync your existing customer data.',
            'The "Missed-Call" Safety Net: Automated text-back systems so you never lose a lead.',
            'Unified Communication: All your texts, emails, and social messages in one central "Command Center."',
            'Automated Reputation Building: Review request system to boost your Google ranking.'
        ],
        icon: Zap,
        stripeLink: 'https://buy.stripe.com/00w8wP7mxgKegnsbio0ZW01'
    },
    {
        name: 'Tapouts Accelerator',
        subtitle: '(The Growth Engine)',
        price: '£297',
        period: '/month',
        bestFor: 'Scaling businesses that want to automate their sales pipeline and nurturing.',
        description: 'This is our most popular plan. It’s designed to turn "interest" into "appointments" without you lifting a finger.',
        recommended: true,
        benefits: [
            'Everything in Core, PLUS:',
            'Advanced Workflow Design: Custom automated "nurture sequences" that follow up for months.',
            'Smart Calendar Management: Integrated booking systems handling reminders/rescheduling.',
            'Managed Social Ecosystem: Social channels connected to CRM for full tracking.',
            'Monthly Performance Audits: Dedicated account manager reviews automation health every 30 days.'
        ],
        icon: Rocket,
        stripeLink: 'https://buy.stripe.com/14A5kDcGR9hM6MS2LS0ZW02'
    },
    {
        name: 'Tapouts Elite',
        subtitle: '(The Total Hands-Off Solution)',
        price: '£997',
        period: '/month',
        bestFor: 'High-growth companies and agencies wanting a full "Growth Department" as a service.',
        description: 'For those who want to "tap out" of the technical side entirely. We act as your fractional COO/CMO, managing the entire ecosystem.',
        benefits: [
            'Everything in Accelerator, PLUS:',
            'Bespoke System Architecture: Custom logic, API integrations, and advanced reporting dashboards.',
            'AI-Powered Lead Handling: AI conversational agents to qualify leads and book appointments 24/7.',
            'White-Glove Support: Priority "Front of the Line" technical support and unlimited workflow adjustments.',
            'Done-For-You Content: Setup of email newsletters and recurring marketing broadcasts.'
        ],
        icon: Shield,
        stripeLink: 'https://buy.stripe.com/00w4gz36hctY9Z4aek0ZW03'
    }
];
