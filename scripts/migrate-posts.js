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
    token, // Needed for write access
    useCdn: false,
});

// Helper to generate a random key
const generateKey = () => Math.random().toString(36).substring(2, 10);

async function migrate() {
    console.log('Starting migration...');

    // 1. Ensure Author "Team Tapouts" Exists
    const authorName = "Team Tapouts";
    let authorId = "";

    // Check if author exists
    try {
        const existingAuthor = await client.fetch(`*[_type == "author" && name == $name][0]._id`, { name: authorName });
        if (existingAuthor) {
            authorId = existingAuthor;
            console.log(`Found author: ${authorName}`);
        } else {
            // Create author
            const newAuthor = await client.create({
                _type: 'author',
                name: authorName,
                slug: { _type: 'slug', current: 'team-tapouts' }
            });
            authorId = newAuthor._id;
            console.log(`Created author: ${authorName}`);
        }
    } catch (e) {
        console.error("Error creating author:", e.message);
    }

    // 2. Ensure Categories Exist
    const categoriesList = ["Marketing", "SEO", "Technology", "Business", "Growth"];
    const categoryIds = [];

    for (const catName of categoriesList) {
        try {
            const existingCat = await client.fetch(`*[_type == "category" && title == $title][0]._id`, { title: catName });
            if (existingCat) {
                categoryIds.push(existingCat);
            } else {
                const newCat = await client.create({
                    _type: 'category',
                    title: catName,
                    description: `${catName} related insights`
                });
                categoryIds.push(newCat._id);
                console.log(`Created category: ${catName}`);
            }
        } catch (e) {
            console.error(`Error processing category ${catName}:`, e.message);
        }
    }

    // 3. Read CSV
    const csvPath = path.join(process.cwd(), 'Previous Post Master Sheet - Tapouts (1).csv');
    const fileContent = fs.readFileSync(csvPath, 'utf-8');

    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true
    });

    console.log(`Found ${records.length} records to migrate.`);

    for (const record of records) {
        const title = record['Blog Title'];
        const url = record['URL'];
        const imageUrl = record['Cloudinary Image'];

        // Extract slug
        const slugMatch = url.match(/tapouts\.co\/([^/]+)/);
        const slug = slugMatch ? slugMatch[1] : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        if (!slug) {
            console.warn(`Could not determine slug for: ${title}`);
            continue;
        }

        console.log(`Processing: ${title} -> ${slug}`);

        // Assign Random Category
        const randomCategory = categoryIds.length > 0 ? categoryIds[Math.floor(Math.random() * categoryIds.length)] : null;

        // Placeholder Body
        const body = [
            {
                _type: 'block',
                _key: generateKey(),
                style: 'normal',
                children: [
                    {
                        _type: 'span',
                        _key: generateKey(),
                        text: `Content for "${title}" is coming soon. Stay tuned for expert insights on ${randomCategory ? 'this topic' : 'Marketing'}.`,
                        marks: []
                    }
                ],
                markDefs: []
            }
        ];

        const doc = {
            _type: 'post',
            title: title,
            slug: {
                _type: 'slug',
                current: slug,
            },
            author: authorId ? {
                _type: 'reference',
                _ref: authorId
            } : undefined,
            categories: randomCategory ? [
                {
                    _key: generateKey(),
                    _type: 'reference',
                    _ref: randomCategory
                }
            ] : [],
            publishedAt: new Date().toISOString(),
            body: body,

            // SEO Fields
            seoTitle: title,
            seoDescription: `Discover key insights on ${title}. Learn how Tapouts can help elevate your business strategy.`,
            seoKeywords: [title, "Marketing", "Business Growth", "Tapouts"],

            // Cloudinary Image
            cloudinaryImage: imageUrl ? {
                url: imageUrl,
                alt: title
            } : undefined
        };

        try {
            const existing = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug });

            if (existing) {
                console.log(`Updating existing post: ${slug}`);
                await client.createOrReplace({
                    ...doc,
                    _id: existing._id,
                });
            } else {
                await client.create(doc);
                console.log(`Created post: ${slug}`);
            }
        } catch (err) {
            console.error(`Failed to create/update post ${slug}:`, err);
        }
    }

    console.log('Migration complete.');
}

migrate();
