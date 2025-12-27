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

async function fixKeys() {
    console.log('Fetching all service pages...');
    const match = '*[_type == "servicePage"]';
    const docs = await client.fetch(match);

    console.log(`Found ${docs.length} documents.`);

    let validCount = 0;
    let fixedCount = 0;

    // Process in chunks to avoid large payloads if many need fixing
    // But for 800, we can probably do it in a loop with individual commits or small batches.
    // Let's do individual commits to be safe and see progress.

    for (let i = 0; i < docs.length; i++) {
        const doc = docs[i];
        let needsFix = false;

        if (!doc.body || !Array.isArray(doc.body)) continue;

        const newBody = doc.body.map(block => {
            let blockChanged = false;

            // Fix Block Key
            let newBlock = { ...block };
            if (!newBlock._key) {
                newBlock._key = generateKey();
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
        } else {
            validCount++;
        }
    }

    console.log('\n\n--- Summary ---');
    console.log(`Total Scanned: ${docs.length}`);
    console.log(`Fixed: ${fixedCount}`);
    console.log(`Already Valid: ${validCount}`);
    console.log('Done!');
}

fixKeys();
