import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import { RichTextComponents } from '@/components/Blog/RichTextComponents';
import { Post as PostType } from '@/types';

// Update Props to reflect params is a Promise
import { Metadata } from 'next';

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export const revalidate = 86400; // Revalidate every 24 hours

// ... imports and other code ...

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const query = groq`*[_type=='post' && slug.current == $slug][0]{seoTitle, seoDescription, title, description}`;
    const post: PostType = await client.fetch(query, { slug });

    if (!post) return { title: 'Post Not Found' };

    return {
        title: post.seoTitle || post.title,
        description: post.seoDescription || post.description,
    };
}

// ... generateStaticParams ...

export default async function Post({ params }: Props) {
    const { slug } = await params;
    const query = groq`
    *[_type=='post' && slug.current == $slug][0]
    {
      ...,
      author->,
      categories[]->,
    }
  `;

    const post: PostType = await client.fetch(query, { slug });

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <article className="px-4 pb-28 mx-auto max-w-4xl min-h-screen bg-white text-gray-900 pt-24">
            <div className="space-y-2 border border-nexusDark/10 text-white bg-nexusDark rounded-3xl overflow-hidden mb-10">
                <div className="relative min-h-56 flex flex-col md:flex-row justify-between">
                    <div className="absolute top-0 w-full h-full opacity-10 p-10 blur-sm">
                        {post.cloudinaryImage?.url ? (
                            <img
                                className="object-cover object-center mx-auto w-full h-full"
                                src={post.cloudinaryImage.url}
                                alt={post.cloudinaryImage.alt || post.title}
                            />
                        ) : post.mainImage ? (
                            <Image
                                className="object-cover object-center mx-auto"
                                src={urlFor(post.mainImage).url()}
                                alt={post.author?.name || post.title}
                                fill
                            />
                        ) : null}
                    </div>

                    <section className="p-5 bg-nexusDark w-full">
                        <div className="flex flex-col md:flex-row justify-between gap-y-5">
                            <div>
                                <h1 className="text-4xl font-bold">{post.title}</h1>
                                <p>
                                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </p>
                            </div>

                            <div className="flex items-center space-x-2">
                                {post.author.image && (
                                    <Image
                                        className="rounded-full"
                                        src={urlFor(post.author.image).url()}
                                        alt={post.author.name}
                                        height={40}
                                        width={40}
                                    />
                                )}
                                <div className="w-64">
                                    <h3 className="text-lg font-bold">{post.author.name}</h3>
                                    {/* <div>Author Bio</div> */}
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="italic pt-10 text-white/60">{post.description}</h2>
                            <div className="flex items-center justify-end mt-auto space-x-2">
                                {post.categories?.map((category: any) => (
                                    <p key={category._id} className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold mt-4">
                                        {category.title}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <div className="prose prose-lg prose-indigo mx-auto text-gray-800">
                <PortableText value={post.body} components={RichTextComponents} />
            </div>
        </article>
    );
}
