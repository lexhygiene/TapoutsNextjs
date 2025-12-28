import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { Metadata } from 'next';
import BlogList from '@/components/Blog/BlogList';

export const metadata: Metadata = {
    title: "Blog | Tapouts",
    description: "Latest insights on digital marketing, AI, and business growth strategies from the Tapouts team.",
};

// Revalidate every 24 hours (matches blog post pages)
export const revalidate = 86400;

const query = groq`
  *[_type=='post'] {
    ...,
    author->,
    categories[]->
  } | order(publishedAt desc) [0...9]
`;

export default async function BlogPage() {
    const posts = await client.fetch(query);

    return (
        <div className="bg-white min-h-screen py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold mb-10 text-nexusDark">Our Blog</h1>
                <BlogList initialPosts={posts} />
            </div>
        </div>
    );
}
