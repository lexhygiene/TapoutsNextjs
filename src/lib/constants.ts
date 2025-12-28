export const CONTACT_INFO = {
    email: "info@tapouts.co",
    phone: "+447400085510",
    address: "London, United Kingdom",
    addressMapLink: "https://maps.app.goo.gl/KRTgrdHtAQUBVgWX7",
};

export const SOCIAL_LINKS = {
    linkedin: "https://ve.linkedin.com/company/tapouts",
    google: "https://maps.app.goo.gl/KRTgrdHtAQUBVgWX7",
};

// Valid types for Location Ranks
export const DEFAULT_LOCATION_RANK = 100;

export const LOCATION_RANKS: Record<string, number> = {
    "london": 1,
    "birmingham": 2,
    "manchester": 3,
    "liverpool": 4,
    "bristol": 5,
    "sheffield": 6,
    "leeds": 7,
    "leicester": 8
};

export const SERVICES = [
    { title: "Web Development", slug: "web-development", primary: true },
    { title: "Gen AI Services", slug: "gen-ai-services", primary: false },
    { title: "SEO Marketing", slug: "seo-marketing", primary: false },
    { title: "PPC Marketing", slug: "ppc-marketing", primary: false },
    { title: "Performance Marketing", slug: "performance-marketing", primary: false },
    { title: "Digital Marketing", slug: "digital-marketing", primary: false },
    { title: "Reputation Management", slug: "reputation-management", primary: false }
];

export const SERVICE_TYPE_MAP: Record<string, string> = {
    'web-development': 'Web Development',
    'gen-ai-services': 'Gen AI',
    'seo-marketing': 'SEO Marketing',
    'ppc-marketing': 'PPC Marketing',
    'performance-marketing': 'Performance Marketing',
    'digital-marketing': 'Digital Marketing',
    'reputation-management': 'Reputation Management'
};
