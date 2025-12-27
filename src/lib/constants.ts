
export interface ServiceDef {
    name: string; // The Sanity value
    title: string; // The Frontend display title
    slug: string; // The URL slug
    primary?: boolean;
}

export const SERVICES: ServiceDef[] = [
    { name: 'Web Development', title: 'Web Development', slug: 'web-development', primary: true },
    { name: 'Gen AI', title: 'Gen AI Services', slug: 'gen-ai-services' },
    { name: 'SEO Marketing', title: 'SEO Marketing', slug: 'seo-marketing' },
    { name: 'PPC Marketing', title: 'PPC Marketing', slug: 'ppc-marketing' },
    { name: 'Performance Marketing', title: 'Performance Marketing', slug: 'performance-marketing' },
    { name: 'Digital Marketing', title: 'Digital Marketing', slug: 'digital-marketing' },
    { name: 'Reputation Management', title: 'Reputation Management', slug: 'reputation-management' },
];

export const LOCATION_RANKS: Record<string, number> = {
    'london': 1,
    'birmingham': 2,
    'manchester': 3,
    'leeds': 4,
    'liverpool': 5,
    'glasgow': 6,
    'sheffield': 7,
    'bristol': 8
};

export const DEFAULT_LOCATION_RANK = 999;

export const SORT_ORDER_ASC = 'asc';
export const SORT_ORDER_DESC = 'desc';
export const SORT_BY_DATE = 'date';
export const SORT_BY_RANK = 'rank';

// Map for dynamic route lookup (Slug -> Sanity Name)
export const SERVICE_TYPE_MAP: Record<string, string> = SERVICES.reduce((acc, curr) => {
    acc[curr.slug] = curr.name;
    // Legacy support for 'gen-ai' slug if accidentally generated
    if (curr.name === 'Gen AI') acc['gen-ai'] = curr.name;
    return acc;
}, {} as Record<string, string>);
