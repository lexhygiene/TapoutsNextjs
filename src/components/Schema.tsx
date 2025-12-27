import { Action, Thing, WithContext, Organization } from 'schema-dts';

const jsonLd: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tapouts',
    url: 'https://tapouts.co',
    logo: 'https://tapouts.co/icon.svg',
    description: 'Smart Maintenance. Unified Approach. Exponential Results.',
    contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-555-0123', // Replace with actual if known, or omit
        contactType: 'customer service',
    },
    sameAs: [
        // Add social profiles here if available
    ],
};

export default function Schema() {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
