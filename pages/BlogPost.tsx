import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Blog } from '../types';

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        topic: 'General Enquiry',
        message: '',
        gdprConsent: false,
        newsletter: false
    });

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3005/api';
        fetch(`${apiUrl}/blogs?slug=${slug}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    setBlog(data[0]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching blog:', err);
                setLoading(false);
            });
    }, [slug]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3005/api';
            const response = await fetch(`${apiUrl}/api/send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Enquiry sent successfully!');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    topic: 'General Enquiry',
                    message: '',
                    gdprConsent: false,
                    newsletter: false
                });
            } else {
                alert('Failed to send enquiry. Please try again.');
            }
        } catch (error) {
            console.error('Error sending enquiry:', error);
            alert('Error sending enquiry. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tapoutsPurple"></div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Post Not Found</h1>
                <Link to="/blog" className="text-tapoutsPurple hover:underline">Back to Blogs</Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/blog" className="inline-flex items-center text-gray-500 hover:text-tapoutsPurple mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blogs
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            {/* Featured Image */}
                            {blog.featuredImage && (
                                <div className="w-full h-64 md:h-96 overflow-hidden">
                                    <img
                                        src={blog.featuredImage}
                                        alt={blog.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            <div className="p-8">
                                <header className="mb-8">
                                    <div className="flex items-center text-sm text-gray-500 mb-4">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        <span>{new Date(blog.date).toLocaleDateString()}</span>
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-nexusDark mb-4">{blog.title}</h1>
                                </header>

                                {/* HTML Content Rendering */}
                                <div
                                    className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap"
                                    dangerouslySetInnerHTML={{ __html: blog.content }}
                                />
                            </div>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                <h3 className="text-xl font-bold text-nexusDark mb-4">Need Assistance?</h3>
                                <p className="text-gray-600 mb-6 text-sm">
                                    Our team is here to help you navigate your journey. Fill out the form below to get started.
                                </p>

                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-tapoutsPurple outline-none text-sm"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-tapoutsPurple outline-none text-sm"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-tapoutsPurple outline-none text-sm"
                                            placeholder="+447400085510"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Message</label>
                                        <textarea
                                            name="message"
                                            rows={4}
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-tapoutsPurple outline-none text-sm resize-none"
                                            placeholder="How can we help?"
                                        ></textarea>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-start gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="gdprConsent"
                                                required
                                                checked={formData.gdprConsent}
                                                onChange={handleChange}
                                                className="mt-1 w-4 h-4 text-tapoutsPurple rounded border-gray-300 focus:ring-tapoutsPurple"
                                            />
                                            <span className="text-xs text-gray-600">
                                                I agree to the <a href="#" className="text-tapoutsPurple hover:underline">UK GDPR laws</a> and privacy policy.
                                            </span>
                                        </label>

                                        <label className="flex items-start gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="newsletter"
                                                checked={formData.newsletter}
                                                onChange={handleChange}
                                                className="mt-1 w-4 h-4 text-tapoutsPurple rounded border-gray-300 focus:ring-tapoutsPurple"
                                            />
                                            <span className="text-xs text-gray-600">
                                                Subscribe to our newsletter for updates.
                                            </span>
                                        </label>
                                    </div>

                                    <button type="submit" className="w-full bg-tapoutsPurple text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition shadow-md">
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
