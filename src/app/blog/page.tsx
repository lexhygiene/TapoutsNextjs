import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import BlogCard from '@/components/Blog/BlogCard';
import { Metadata } from 'next';

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
  } | order(publishedAt desc)
`;

export default async function BlogPage() {
    const posts = await client.fetch(query);

    return (
        <div className="bg-white min-h-screen py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold mb-10 text-nexusDark">Our Blog</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {posts.map((post: any) => (
                        <BlogCard key={post._id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
}
