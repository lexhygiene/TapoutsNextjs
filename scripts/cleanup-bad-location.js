/* eslint-disable @typescript-eslint/no-require-imports */
const { createClient } = require('next-sanity');
const dotenv = require('dotenv');

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

async function cleanup() {
    console.log('Searching for "Location Name"...');

    // 1. Find the bad location
    const locationQuery = '*[_type == "location" && name == "Location Name"][0]';
    const location = await client.fetch(locationQuery);

    if (!location) {
        console.log('Location "Location Name" not found. Nothing to do.');
        return;
    }

    console.log(`Found location: ${location.name} (${location._id})`);

    // 2. Find associated service pages
    const servicesQuery = `*[_type == "servicePage" && location._ref == "${location._id}"]`;
    const services = await client.fetch(servicesQuery);

    console.log(`Found ${services.length} associated service pages.`);

    // 3. Delete Service Pages
    if (services.length > 0) {
        console.log('Deleting service pages...');
        const tx = client.transaction();
        services.forEach(doc => tx.delete(doc._id));
        await tx.commit();
        console.log(`Deleted ${services.length} service pages.`);
    }

    // 4. Delete Location
    console.log('Deleting location document...');
    await client.delete(location._id);
    console.log('Deleted location "Location Name".');

    console.log('Cleanup Complete! 🧹');
}

cleanup();
