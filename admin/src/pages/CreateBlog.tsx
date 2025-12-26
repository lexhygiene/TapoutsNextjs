import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

const CreateBlog: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        metaDescription: '',
        keywords: '',
        canonicalUrl: '',
        content: '',
        featuredImage: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        isFeatured: false
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type, checked } = target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/blogs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    id: Date.now().toString(),
                    // Ensure date is stored properly (append time if needed or keep as YYYY-MM-DD)
                    date: new Date(formData.date).toISOString(),
                }),
            });

            if (response.ok) {
                alert('Blog submitted successfully!');
                navigate('/dashboard');
            } else {
                alert('Failed to submit blog.');
            }
        } catch (error: any) {
            console.error('Error submitting blog:', error);
            setErrorMessage(`Error submitting blog: ${error.message || error}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <button onClick={() => navigate('/dashboard')} className="mr-4 text-gray-500 hover:text-gray-700">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <h1 className="text-xl font-bold text-gray-900">Create New Blog</h1>
                        </div>
                        <div className="flex items-center">
                            <a
                                href="/"
                                className="text-gray-600 hover:text-gray-900 font-medium"
                            >
                                Back to Website
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
                {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{errorMessage}</span>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">SEO Information</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Optimize your blog post for search engines.
                                </p>
                            </div>
                            <div className="mt-5 md:mt-0 md:col-span-2 space-y-6">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        Blog Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        required
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                                        URL Slug
                                    </label>
                                    <input
                                        type="text"
                                        name="slug"
                                        id="slug"
                                        required
                                        value={formData.slug}
                                        onChange={handleChange}
                                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700">
                                        Meta Description
                                    </label>
                                    <textarea
                                        name="metaDescription"
                                        id="metaDescription"
                                        rows={3}
                                        value={formData.metaDescription}
                                        onChange={handleChange}
                                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">
                                        Keywords (comma separated)
                                    </label>
                                    <input
                                        type="text"
                                        name="keywords"
                                        id="keywords"
                                        value={formData.keywords}
                                        onChange={handleChange}
                                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="canonicalUrl" className="block text-sm font-medium text-gray-700">
                                        Canonical URL (optional)
                                    </label>
                                    <input
                                        type="url"
                                        name="canonicalUrl"
                                        id="canonicalUrl"
                                        value={formData.canonicalUrl}
                                        onChange={handleChange}
                                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                                    />
                                </div>

                                <input
                                    type="url"
                                    name="featuredImage"
                                    id="featuredImage"
                                    value={formData.featuredImage}
                                    onChange={handleChange}
                                    placeholder="Featured Image URL (https://...)"
                                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                                />
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                >
                                    <option value="">Select a category</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Business">Business</option>
                                    <option value="Innovation">Innovation</option>
                                    <option value="Growth">Growth</option>
                                    <option value="AI">AI</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                    Publish Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    id="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                                />
                            </div>

                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="isFeatured"
                                        name="isFeatured"
                                        type="checkbox"
                                        checked={formData.isFeatured}
                                        onChange={handleChange}
                                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="isFeatured" className="font-medium text-gray-700">
                                        Featured Post
                                    </label>
                                    <p className="text-gray-500">Check this to make this the main featured blog post.</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Content</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Write your blog content here.
                                </p>
                            </div>
                            <div className="mt-5 md:mt-0 md:col-span-2">
                                <div>
                                    <label htmlFor="content" className="sr-only">
                                        Content
                                    </label>
                                    <p className="text-xs text-gray-500 mb-2">HTML tags are supported (e.g., &lt;b&gt;, &lt;p&gt;, &lt;ul&gt;).</p>
                                    <textarea
                                        id="content"
                                        name="content"
                                        rows={20}
                                        required
                                        value={formData.content}
                                        onChange={handleChange}
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                        placeholder="Write your blog content... (HTML supported)"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard')}
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Publish Blog
                        </button>
                    </div>
                </form>
            </main>
        </div >
    );
};

export default CreateBlog;
