'use client';

import React, { useState } from 'react';
import BlogCard from '@/components/Blog/BlogCard';
import { fetchMorePosts } from '@/app/blog/actions';
import { Loader2 } from 'lucide-react';

interface BlogListProps {
    initialPosts: any[];
}

const POSTS_PER_PAGE = 9;

export default function BlogList({ initialPosts }: BlogListProps) {
    const [posts, setPosts] = useState(initialPosts);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(initialPosts.length === POSTS_PER_PAGE);

    const loadMore = async () => {
        if (loading) return;

        setLoading(true);
        try {
            const start = page * POSTS_PER_PAGE;
            const end = start + POSTS_PER_PAGE;
            const newPosts = await fetchMorePosts(start, end);

            if (newPosts.length < POSTS_PER_PAGE) {
                setHasMore(false);
            }

            setPosts(prev => [...prev, ...newPosts]);
            setPage(prev => prev + 1);
        } catch (error) {
            console.error('Error loading more posts:', error);
            alert('Failed to load more posts. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {posts.map((post: any) => (
                    <BlogCard key={post._id} post={post} />
                ))}
            </div>

            {hasMore && (
                <div className="flex justify-center mt-16">
                    <button
                        onClick={loadMore}
                        disabled={loading}
                        className="flex items-center gap-2 px-8 py-3 bg-tapoutsPurple text-white font-bold rounded-full hover:bg-opacity-90 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-tapoutsPurple/25"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            'Load More'
                        )}
                    </button>
                </div>
            )}
        </>
    );
}
