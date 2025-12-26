import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import { Post } from '@/types';

interface Props {
    post: Post;
}

export default function BlogCard({ post }: Props) {
    return (
        <Link href={`/blog/${post.slug.current}`}>
            <div className="flex flex-col group cursor-pointer">
                <div className="relative w-full h-80 drop-shadow-xl group-hover:scale-105 transition-transform duration-200 ease-out">
                    {post.cloudinaryImage?.url ? (
                        <div className="relative w-full h-full">
                            <img
                                src={post.cloudinaryImage.url}
                                alt={post.cloudinaryImage.alt || post.title}
                                className="object-cover object-left lg:object-center rounded-t-2xl w-full h-full"
                            />
                        </div>
                    ) : post.mainImage ? (
                        <Image
                            className="object-cover object-left lg:object-center rounded-t-2xl"
                            src={urlFor(post.mainImage).url()}
                            alt={post.author?.name || post.title}
                            fill
                        />
                    ) : null}
                    <div className="absolute bottom-0 w-full bg-opacity-20 bg-black backdrop-blur-lg rounded drop-shadow-lg text-white p-5 flex justify-between">
                        <div>
                            <p className="font-bold">{post.title}</p>
                            <p>
                                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </p>
                        </div>

                    </div>
                </div>

                <div className="mt-5 flex-1 p-2">
                    <p className="underline text-lg font-bold">{post.title}</p>
                    <p className="text-gray-500 line-clamp-2">{post.description}</p>
                </div>
            </div>
        </Link>
    );
}
