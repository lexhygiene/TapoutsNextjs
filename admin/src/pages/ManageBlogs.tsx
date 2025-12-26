import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, ArrowLeft } from 'lucide-react';

interface Blog {
    id: string;
    title: string;
    slug: string;
    date: string;
}

const ManageBlogs: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = () => {
        fetch(`${import.meta.env.VITE_API_URL}/blogs`)
            .then(res => res.json())
            .then(data => {
                setBlogs(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching blogs:', err);
                setLoading(false);
            });
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) return;

        try {
            await fetch(`${import.meta.env.VITE_API_URL}/blogs/${id}`, {
                method: 'DELETE',
            });
            setBlogs(blogs.filter(blog => blog.id !== id));
        } catch (error) {
            console.error('Error deleting blog:', error);
            alert('Failed to delete blog.');
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
                            <Link to="/dashboard" className="mr-4 text-gray-500 hover:text-gray-700">
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <h1 className="text-xl font-bold text-gray-900">Manage Blogs</h1>
                        </div>
                        <div className="flex items-center">
                            <Link
                                to="/create-blog"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Create New
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {blogs.length === 0 ? (
                            <li className="px-4 py-4 sm:px-6 text-center text-gray-500">
                                No blogs found. Create one to get started.
                            </li>
                        ) : (
                            blogs.map((blog) => (
                                <li key={blog.id}>
                                    <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <p className="text-sm font-medium text-blue-600 truncate">{blog.title}</p>
                                            <p className="text-sm text-gray-500">/{blog.slug}</p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                Published: {new Date(blog.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <Link
                                                to={`/edit-blog/${blog.id}`}
                                                className="text-gray-400 hover:text-blue-600 transition-colors"
                                                title="Edit"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(blog.id)}
                                                className="text-gray-400 hover:text-red-600 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default ManageBlogs;
