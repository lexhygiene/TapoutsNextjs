import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

const EditBlog: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        metaDescription: '',
        keywords: '',
        canonicalUrl: '',
        content: '',
        featuredImage: '',
        category: '',
        date: '',
        isFeatured: false
    });

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/blogs/${id}`)
            .then(res => res.json())
            .then(data => {
                setFormData({
                    ...data,
                    date: data.date ? data.date.split('T')[0] : new Date().toISOString().split('T')[0],
                    isFeatured: data.isFeatured || false
                });
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching blog:', err);
                alert('Error fetching blog details.');
                navigate('/manage-blogs');
            });
    }, [id, navigate]);

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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/blogs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    date: new Date(formData.date).toISOString()
                }),
            });

            if (response.ok) {
                alert('Blog updated successfully!');
                navigate('/manage-blogs');
            } else {
                alert('Failed to update blog.');
            }
        } catch (error) {
            console.error('Error updating blog:', error);
            alert('Error updating blog. Is json-server running?');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <button onClick={() => navigate('/manage-blogs')} className="mr-4 text-gray-500 hover:text-gray-700">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <h1 className="text-xl font-bold text-gray-900">Edit Blog</h1>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">SEO Information</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Update SEO details for this blog post.
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
                                    Update your blog content here.
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
                            onClick={() => navigate('/manage-blogs')}
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Update Blog
                        </button>
                    </div>
                </form>
            </main>
        </div >
    );
};

export default EditBlog;
