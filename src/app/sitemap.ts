import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { SERVICES } from '@/lib/constants';

const BASE_URL = 'https://tapouts.co'; // Update if using a different domain

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // 1. Static Routes
    const routes = [
        '',
        '/about',
        '/contact',
        '/service-areas',
        '/blog',
        '/membership', // Assuming this exists based on folder structure
        '/web-development', // Assuming this exists
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1.0,
    }));

    // 2. Fetch Blog Posts
    const postsQuery = groq`*[_type == "post"] { "slug": slug.current, _updatedAt }`;
    const posts = await client.fetch(postsQuery);

    const postRoutes = posts.map((post: any) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post._updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // 3. Fetch Service Pages
    // We need serviceType and locationSlug to build the URL
    const servicePagesQuery = groq`*[_type == "servicePage"] { serviceType, "locationSlug": location->slug.current, _updatedAt }`;
    const servicePages = await client.fetch(servicePagesQuery);

    // Create a lookup map for Sanity Name -> URL Slug
    const serviceSlugMap = SERVICES.reduce((acc, curr) => {
        acc[curr.title] = curr.slug;
        return acc;
    }, {} as Record<string, string>);

    const serviceRoutes = servicePages
        .filter((page: any) => serviceSlugMap[page.serviceType]) // Only include known services
        .map((page: any) => ({
            url: `${BASE_URL}/services/${serviceSlugMap[page.serviceType]}/${page.locationSlug}`,
            lastModified: new Date(page._updatedAt),
            changeFrequency: 'monthly' as const,
            priority: 0.9,
        }));

    return [...routes, ...postRoutes, ...serviceRoutes];
}
