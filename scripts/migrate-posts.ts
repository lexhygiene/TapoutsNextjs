import { createClient } from 'next-sanity';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

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

async function migrate() {
    console.log('Starting migration...');

    // 1. Ensure Author "Team Tapouts" Exists
    const authorName = "Team Tapouts";
    let authorId = "";

    // Check if author exists
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

    // 2. Ensure Categories Exist
    const categoriesList = ["Marketing", "SEO", "Technology", "Business", "Growth"];
    const categoryIds: string[] = [];

    for (const catName of categoriesList) {
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
    }

    // 3. Read CSV
    const csvPath = path.join(process.cwd(), 'Previous Post Master Sheet - Tapouts.csv');
    const fileContent = fs.readFileSync(csvPath, 'utf-8');

    const records: any[] = parse(fileContent, {
        columns: true,
        skip_empty_lines: true
    });

    console.log(`Found ${records.length} records to migrate.`);

    for (const record of records) {
        const title = record['Blog Title'];
        const url = record['URL'];

        // Extract slug
        const slugMatch = url.match(/tapouts\.co\/([^/]+)/);
        const slug = slugMatch ? slugMatch[1] : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        if (!slug) {
            console.warn(`Could not determine slug for: ${title}`);
            continue;
        }

        console.log(`Processing: ${title} -> ${slug}`);

        // Assign Random Category
        const randomCategory = categoryIds[Math.floor(Math.random() * categoryIds.length)];

        // Placeholder Body
        const body = [
            {
                _type: 'block',
                style: 'normal',
                children: [
                    {
                        _type: 'span',
                        text: `Content for "${title}" is coming soon. Stay tuned for expert insights on ${categoriesList.find(c => c === "Marketing") || "Marketing"}.`
                    }
                ]
            }
        ];

        const doc = {
            _type: 'post',
            title: title,
            slug: {
                _type: 'slug',
                current: slug,
            },
            author: {
                _type: 'reference',
                _ref: authorId
            },
            categories: [
                {
                    _type: 'reference',
                    _ref: randomCategory
                }
            ],
            publishedAt: new Date().toISOString(),
            body: body,

            // SEO Fields
            seoTitle: title,
            seoDescription: `Discover key insights on ${title}. Learn how Tapouts can help elevate your business strategy.`,
            seoKeywords: [title, "Marketing", "Business Growth", "Tapouts"],

            // Note: Cloudinary image is NOT in CSV, so we skip it. 
            // User can manually edit or bulk update later.
        };

        try {
            const existing = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug });

            if (existing) {
                console.log(`Skipping existing post: ${slug}`);
            } else {
                await client.create(doc);
                console.log(`Created post: ${slug}`);
            }
        } catch (err) {
            console.error(`Failed to create post ${slug}:`, err);
        }
    }

    console.log('Migration complete.');
}

migrate();
