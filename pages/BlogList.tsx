import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Search, Tag } from 'lucide-react';
import { Blog } from '../types';

const BlogList: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Technology', 'Business', 'Innovation', 'Growth', 'AI'];

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3005/api';
        fetch(`${apiUrl}/blogs`)
            .then(res => res.json())
            .then(data => {
                // Sort by date descending (Newest to Oldest)
                const sortedBlogs = data.sort((a: Blog, b: Blog) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                );

                // Use real categories, fallback to 'Uncategorized' if missing
                const blogsWithCategories = sortedBlogs.map((blog: Blog) => ({
                    ...blog,
                    category: blog.category || 'Uncategorized'
                }));

                setBlogs(blogsWithCategories);
                setFilteredBlogs(blogsWithCategories);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching blogs:', err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let result = blogs;

        if (selectedCategory !== 'All') {
            result = result.filter(blog => blog.category === selectedCategory);
        }

        if (searchQuery) {
            result = result.filter(blog =>
                blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.metaDescription?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredBlogs(result);
    }, [searchQuery, selectedCategory, blogs]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tapoutsPurple"></div>
            </div>
        );
    }

    // Find featured blog: First one marked isFeatured, or fallback to the newest (first in list)
    const featuredBlog = filteredBlogs.find(b => b.isFeatured) || filteredBlogs[0];
    const remainingBlogs = filteredBlogs.filter(b => b.id !== featuredBlog?.id);

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            {/* Header */}
            <div className="bg-[#0a0f2c] text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                        The <span className="text-tapoutsPurple italic font-brand tracking-wide">tapouts</span> Journal
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Insights, strategies, and stories for the modern digital landscape.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === category
                                    ? 'bg-tapoutsPurple text-white shadow-lg'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-72">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:ring-2 focus:ring-tapoutsPurple focus:border-transparent outline-none"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                </div>

                {filteredBlogs.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
                        <button
                            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                            className="mt-4 text-tapoutsPurple font-bold hover:underline"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Featured Post */}
                        {featuredBlog && (
                            <div className="mb-16">
                                <Link to={`/blog/${featuredBlog.slug}`} className="group block">
                                    <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[21/9]">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                                        {featuredBlog.featuredImage ? (
                                            <img
                                                src={featuredBlog.featuredImage}
                                                alt={featuredBlog.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-nexusDark flex items-center justify-center">
                                                <span className="text-6xl font-brand italic text-white/20">tapouts</span>
                                            </div>
                                        )}
                                        <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 max-w-4xl">
                                            <div className="flex items-center gap-4 mb-4">
                                                <span className="bg-tapoutsPurple text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                                    {featuredBlog.category || 'Featured'}
                                                </span>
                                                <span className="text-gray-300 text-sm font-medium flex items-center">
                                                    <Calendar className="w-4 h-4 mr-2" />
                                                    {new Date(featuredBlog.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-tapoutsPurple transition-colors">
                                                {featuredBlog.title}
                                            </h2>
                                            <p className="text-gray-200 text-lg line-clamp-2 md:line-clamp-3 max-w-2xl">
                                                {featuredBlog.metaDescription || featuredBlog.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...'}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )}

                        {/* Grid Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {remainingBlogs.map((blog) => (
                                <article key={blog.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group border border-gray-100">
                                    <Link to={`/blog/${blog.slug}`} className="block overflow-hidden h-56 relative">
                                        {blog.featuredImage ? (
                                            <img
                                                src={blog.featuredImage}
                                                alt={blog.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                                                <span className="font-brand italic text-2xl">tapouts</span>
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white/90 backdrop-blur-sm text-nexusDark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                                                {blog.category}
                                            </span>
                                        </div>
                                    </Link>

                                    <div className="p-6 flex-grow flex flex-col">
                                        <div className="flex items-center text-xs text-gray-400 mb-3 font-medium">
                                            <Calendar className="w-3 h-3 mr-1" />
                                            <span>{new Date(blog.date).toLocaleDateString()}</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-nexusDark mb-3 line-clamp-2 group-hover:text-tapoutsPurple transition-colors">
                                            <Link to={`/blog/${blog.slug}`}>
                                                {blog.title}
                                            </Link>
                                        </h3>

                                        <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-grow">
                                            {blog.metaDescription || blog.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...'}
                                        </p>

                                        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                                            <Link
                                                to={`/blog/${blog.slug}`}
                                                className="inline-flex items-center text-tapoutsPurple font-bold text-sm hover:underline"
                                            >
                                                Read More <ArrowRight className="w-4 h-4 ml-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BlogList;
