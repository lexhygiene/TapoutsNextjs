
const { createClient } = require('next-sanity');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2023-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

async function checkLocations() {
    console.log('Fetching parent locations...');
    const query = `*[_type == "location" && !defined(parent)] | order(name asc) { name }`;
    const locations = await client.fetch(query);

    console.log('--- Parent Locations Found ---');
    locations.forEach(loc => console.log(`"${loc.name}"`));
    console.log('------------------------------');
}

checkLocations();
