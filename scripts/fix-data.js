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

const generateKey = () => Math.random().toString(36).substring(2, 10);

async function fixData() {
    console.log('Fetching all service pages...');
    const match = '*[_type == "servicePage"]';
    const docs = await client.fetch(match);

    console.log(`Found ${docs.length} documents.`);

    let fixedCount = 0;

    // Process in chunks or one by one
    for (let i = 0; i < docs.length; i++) {
        const doc = docs[i];
        let needsFix = false;

        if (!doc.body || !Array.isArray(doc.body)) continue;

        const newBody = doc.body.map(block => {
            let blockChanged = false;
            let newBlock = { ...block };

            // Fix 1: Ensure Key
            if (!newBlock._key) {
                newBlock._key = generateKey();
                blockChanged = true;
            }

            // Fix 2: Correct Style for Bullets
            // If it has listItem defined, style should usually be 'normal' (unless it's a header in a list?? unlikely)
            // But specifically, we know 'bullet' style is invalid.
            if (newBlock.style === 'bullet') {
                newBlock.style = 'normal';
                blockChanged = true;
            }

            // Fix Children Keys
            if (newBlock.children && Array.isArray(newBlock.children)) {
                newBlock.children = newBlock.children.map(child => {
                    if (!child._key) {
                        blockChanged = true;
                        return { ...child, _key: generateKey() };
                    }
                    return child;
                });
            }

            if (blockChanged) needsFix = true;
            return newBlock;
        });

        if (needsFix) {
            try {
                await client.patch(doc._id).set({ body: newBody }).commit();
                fixedCount++;
                process.stdout.write(`\rFixed ${fixedCount} / ${docs.length} documents...`);
            } catch (err) {
                console.error(`\nFailed to fix ${doc._id}: ${err.message}`);
            }
        }
    }

    console.log('\n\n--- Done ---');
    console.log(`Fixed: ${fixedCount}`);
}

fixData();
