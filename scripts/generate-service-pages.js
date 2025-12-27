/* eslint-disable @typescript-eslint/no-require-imports */
const { createClient } = require('next-sanity');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

// Load env vars
dotenv.config({ path: '.env.local' });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
    console.error('Missing environment variables. Check .env.local');
    process.exit(1);
}

const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-02-06',
    token,
    useCdn: false,
});

const services = [
    "Gen AI",
    "Web Development",
    "Performance Marketing",
    "PPC Marketing",
    "SEO Marketing",
    "Reputation Management",
    "Digital Marketing"
];

// Helper to generate a random key
const generateKey = () => Math.random().toString(36).substring(2, 10);

// Content Templates
const generateBody = (service, location) => {
    return [
        {
            _type: 'block',
            _key: generateKey(),
            style: 'h2',
            children: [{ _type: 'span', _key: generateKey(), text: `Best ${service} Services in ${location}` }]
        },
        {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [{ _type: 'span', _key: generateKey(), text: `Are you looking for top-tier ${service} solutions in ${location}? At Tapouts, we specialize in delivering cutting-edge strategies tailored for businesses in ${location}. whether you are a startup or an established enterprise, our expert team helps you achieve measurable growth.` }]
        },
        {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [{ _type: 'span', _key: generateKey(), text: `Why Choose Tapouts for ${service} in ${location}?` }]
        },
        {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [{ _type: 'span', _key: generateKey(), text: `We understand the local market dynamics of ${location}. Our data-driven approach ensures that your ${service} campaigns resonate with your target audience. We combine creativity with technology to drive results that matter.` }]
        },
        {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            listItem: 'bullet',
            children: [{ _type: 'span', _key: generateKey(), text: `Customized ${service} strategies for ${location} businesses.` }]
        },
        {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            listItem: 'bullet',
            children: [{ _type: 'span', _key: generateKey(), text: `Proven track record of success in ${location}.` }]
        },
        {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            listItem: 'bullet',
            children: [{ _type: 'span', _key: generateKey(), text: `Dedicated support and transparent reporting.` }]
        },
        {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [{ _type: 'span', _key: generateKey(), text: `Transform Your Business in ${location} Today` }]
        },
        {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [{ _type: 'span', _key: generateKey(), text: `Don't let your competitors get ahead. Partner with Tapouts for the best ${service} in ${location}. Contact us today for a free consultation and let's discuss how we can elevate your brand.` }]
        }
    ];
};

async function generate() {
    console.log('Starting Service Page Generation...');

    const csvPath = path.join(process.cwd(), 'service-areas-template.csv');
    const fileContent = fs.readFileSync(csvPath, 'utf-8');

    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        relax_quotes: true,
        relax_column_count: true
    });

    console.log(`Found ${records.length} locations.`);

    // 1. Create Locations Map (to handle parents)
    const locationMap = new Map(); // Name -> ID

    // Sort records to process parents first (if possible, simple check: if parent empty)
    // Actually, multipass is safer. Pass 1: Create all locations. Pass 2: Link parents.

    // Pass 1: Ensure all locations exist
    console.log('Phase 1: Syncing Locations...');
    for (const record of records) {
        const name = record['Location Name'];
        const type = record['Location Type'];
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        if (!name) continue;

        let locId;
        const existing = await client.fetch(`*[_type == "location" && slug.current == $slug][0]._id`, { slug });

        if (existing) {
            locId = existing;
            console.log(`Location exists: ${name}`);
        } else {
            const doc = {
                _type: 'location',
                name: name,
                type: type,
                slug: { _type: 'slug', current: slug },
                description: record['Description (Optional)']
            };
            const res = await client.create(doc);
            locId = res._id;
            console.log(`Created location: ${name}`);
        }
        locationMap.set(name, locId);
    }

    // Pass 2: Link Parents
    console.log('Phase 2: Linking Parents...');
    for (const record of records) {
        const name = record['Location Name'];
        const parentName = record['Parent Location'];

        if (parentName && locationMap.has(parentName)) {
            const childId = locationMap.get(name);
            const parentId = locationMap.get(parentName);

            await client.patch(childId).set({
                parent: { _type: 'reference', _ref: parentId }
            }).commit();
            console.log(`Linked ${name} -> ${parentName}`);
        }
    }

    // Pass 3: Generate Service Pages
    console.log('Phase 3: Generating Service Pages...');
    for (const record of records) {
        const locationName = record['Location Name'];
        const locationId = locationMap.get(locationName);

        if (!locationId) continue;

        for (const service of services) {
            const slugBase = `${service.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-services-${locationName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
            const title = `${service} Services in ${locationName}`;

            const doc = {
                _type: 'servicePage',
                title: title,
                slug: { _type: 'slug', current: slugBase },
                serviceType: service,
                location: { _type: 'reference', _ref: locationId },
                seoTitle: `${title} | Top Rated Agency Tapouts`,
                seoDescription: `Looking for ${service} in ${locationName}? Tapouts offers expert ${service} strategies to grow your business in ${locationName}. Get a free quote today!`,
                body: generateBody(service, locationName)
            };

            const existing = await client.fetch(`*[_type == "servicePage" && slug.current == $slug][0]._id`, { slug: slugBase });

            if (existing) {
                console.log(`Updating ${title}`);
                await client.createOrReplace({ ...doc, _id: existing });
            } else {
                await client.create(doc);
                console.log(`Created ${title}`);
            }
        }
    }

    console.log('Generation Complete! 🚀');
}

generate();
